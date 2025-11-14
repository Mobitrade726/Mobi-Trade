import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import Header from '../../../../constants/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  checkoutAPI,
  fetchCartAPI,
  checkoutDetailsAPI,
} from '../../../../redux/slices/cartSlice';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {API_BASE_URL} from '../../../../utils/utils';
import Toast from 'react-native-toast-message';
import RazorpayCheckout from 'react-native-razorpay';

const CheckoutScreen = () => {
  const navigation = useNavigation(); // <-- Add this
  const dispatch = useDispatch();
  const {
    checkoutData,
    checkoutDetailsData,
    items: cartItems,
    loading,
  } = useSelector(state => state.cart);
  const [deliveryMode, setDeliveryMode] = useState('home');
  const [selectedStore, setSelectedStore] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('pickup');

  // ✅ Mapping between method name → transaction_type value
  const transactionTypeMap = {
    upi: '0',
    neft: '1',
    imps: '2',
    rtgs: '3',
    card: '4',
    netbanking: '5',
  };

  // Fetch cart on mount
  useEffect(() => {
    dispatch(checkoutAPI());
    dispatch(fetchCartAPI());
  }, [dispatch]);

  useEffect(() => {
    if (checkoutData?.checkout_id) {
      dispatch(checkoutDetailsAPI(checkoutData.checkout_id));
    }
  }, [checkoutData, dispatch]);

  // GST label logic
  const gstLabel =
    parseFloat(checkoutDetailsData?.invoice_amount?.igst_amount) > 0
      ? '18%'
      : parseFloat(checkoutDetailsData?.invoice_amount?.cgst_amount) > 0
      ? '9%'
      : '0%';

  // GST amount logic
  let gstAmount = '0.00';
  if (gstLabel === '18%') {
    gstAmount = checkoutDetailsData?.invoice_amount?.igst_amount || '0.00';
  } else if (gstLabel === '9%') {
    const cgst =
      parseFloat(checkoutDetailsData?.invoice_amount?.cgst_amount) || 0;
    const sgst =
      parseFloat(checkoutDetailsData?.invoice_amount?.sgst_amount) || 0;
    gstAmount = (cgst + sgst).toFixed(2);
  }

  // 🧾 Helper function to map payment option
  const getPaymentOptionValue = (method, mode) => {
    if (mode === 'home') {
      // 🏠 Home Delivery
      switch (method) {
        case 'cod':
          return '0'; // COD
        case 'online':
          return '1'; // Online
        case 'wallet':
          return '2'; // Wallet
        default:
          return '0';
      }
    } else {
      // 🏬 Store Pickup
      switch (method) {
        case 'pickup':
          return '0'; // Pay at Store Pickup
        case 'online':
          return '1';
        case 'wallet':
          return '2';
        default:
          return '0';
      }
    }
  };

  const getDeliveryModeValue = mode => (mode === 'home' ? '0' : '1');

  const handlePlaceOrder = async () => {
    const paymentOption = getPaymentOptionValue(paymentMethod);
    const deliveryModeValue = getDeliveryModeValue(deliveryMode);

    try {
      const token = await AsyncStorage.getItem('TOKEN');
      const barcode_ids = cartItems.map(item => ({
        barcode_id: item.barcode_id,
        barcode_price: item.price,
      }));

      const payload = {
        user_id: checkoutData?.user_id,
        payment_mode: paymentOption,
        delivery_type: deliveryModeValue,
        delivery_address_id: 1,
        checkout_id: checkoutData?.checkout_id,
        barcode_ids: barcode_ids,
      };

      console.log('Payload ===>', payload);

      // ✅ Step 1: Create Order in backend
      const createOrderRes = await axios.post(
        `${API_BASE_URL}/orders/create`,
        payload,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const razorpayOrderId = createOrderRes?.data?.data?.razorpay_order_id;
      const totalAmount = createOrderRes?.data?.data?.total_amount;
      const orderId = createOrderRes?.data?.data?.order_id;

      // -------------------- CASE 1 --------------------
      // ✅ COD (no Razorpay needed)
      if (paymentMethod === 'pickup' && deliveryMode === 'home') {
        Toast.show({
          type: 'success',
          text2: 'Order placed successfully with COD!',
        });
        navigation.navigate('BottomNavigator');
        return;
      }

      console.log(
        'paymentMethod+++++++++++++++++++++++++++++++++++++++++',
        paymentMethod,
      );

      // -------------------- CASE 2 --------------------
      // ✅ Online Payment via Razorpay (UPI, Card, Netbanking)
      if (paymentMethod === 'online') {
        const options = {
          description: 'Payment for Order',
          image: 'https://i.postimg.cc/3x3QzSGq/logo.png',
          currency: 'INR',
          key: 'rzp_test_RLLrUG1OvG4YYd',
          amount: totalAmount * 100,
          name: 'MobiTrde',
          order_id: razorpayOrderId,
          prefill: {
            email: 'user@example.com',
            contact: '9999999999',
            name: 'User',
          },
          theme: {color: '#1C9C48'},
          method: transactionTypeMap // ✅ numeric value
        };

        console.log('options------------------------------------>', options);

        RazorpayCheckout.open(options)
          .then(async data => {
            console.log('Razorpay Response ===>', data);

            const paymentStatus =
              data?.razorpay_payment_id && data?.razorpay_signature
                ? 'success'
                : 'failed';

            try {
              const verifyResponse = await axios.post(
                `${API_BASE_URL}/orders/verify-payment`,
                {
                  razorpay_payment_id: data?.razorpay_payment_id || null,
                  razorpay_order_id: data?.razorpay_order_id || razorpayOrderId,
                  razorpay_signature: data?.razorpay_signature || null,
                  order_id: orderId,
                  status: paymentStatus,
                },
                {
                  headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                },
              );

              if (verifyResponse?.data?.status === true) {
                Toast.show({
                  type: 'success',
                  text2: verifyResponse?.data?.message || 'Payment Successful!',
                });
                navigation.navigate('BottomNavigator');
              } else {
                Toast.show({
                  type: 'error',
                  text2:
                    verifyResponse?.data?.message ||
                    'Payment verification failed.',
                });
              }
            } catch (error) {
              console.log('verify-payment error ===>', error?.response?.data);
            }
          })
          .catch(error => {
            console.log('Razorpay Cancelled/Error ===>', error);
            Toast.show({
              type: 'error',
              text2: 'Payment cancelled or failed.',
            });
          });

        return;
      }

      // -------------------- CASE 3 --------------------
      // ✅ Wallet Payment (handled through /wallet/verify)
      if (paymentMethod === 'wallet') {
        if (!totalAmount || parseFloat(totalAmount) <= 0) {
          Alert.alert('Invalid Amount', 'Please enter a valid amount.');
          return;
        }

        try {
          const tokenwallet = await AsyncStorage.getItem('TOKEN');
          const userId = await AsyncStorage.getItem('USERID');

          const payloadwallet = {
            buyer_id: userId,
            amount: totalAmount,
            transaction_type: transactionTypeMap[selectedMethod], // ✅ numeric value
          };

          // ✅ Create Razorpay order
          const response = await axios.post(
            `${API_BASE_URL}/wallet/create-order`,
            payloadwallet,
            {
              headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${tokenwallet}`,
              },
            },
          );

          const order = response.data;

          const paymentMethods = {
            upi: selectedMethod === 'upi',
            card: selectedMethod === 'card',
            netbanking: selectedMethod === 'netbanking',
            wallet: false,
            emi: false,
            paylater: false,
          };

          const options = {
            description: 'Add Money to Wallet',
            currency: 'INR',
            key: order?.razorpay_key,
            amount: order.amount,
            name: 'MobiTrade Wallet',
            order_id: order.order_id,
            theme: {color: '#14AE5C'},
            method: paymentMethods,
          };

          console.log('options------------------>', options);

          // ✅ NEFT / IMPS / RTGS handled manually (offline)
          if (['neft', 'imps', 'rtgs'].includes(selectedMethod)) {
            Alert.alert(
              `${selectedMethod.toUpperCase()} Selected`,
              'Please complete this transfer using your bank app or contact support.',
            );
            return;
          }
          // ✅ Launch Razorpay checkout
          RazorpayCheckout.open(options)
            .then(async data => {
              const verifyResponse = await axios.post(
                `${API_BASE_URL}/wallet/verify`,
                {
                  razorpay_payment_id: data.razorpay_payment_id,
                  razorpay_order_id: data.razorpay_order_id,
                  razorpay_signature: data.razorpay_signature,
                  amount: totalAmount,
                  transaction_type: transactionTypeMap[selectedMethod],
                },
                {
                  headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                },
              );
              Toast.show({
                type: 'success',
                text2: verifyResponse?.data?.message || 'Payment Successful!',
              });
              navigation.navigate('BottomNavigator');
              console.log('res--------------------------------->', verifyResponse?.data);
            })
            .catch(error => {
              console.log('error--------------------------------->', error);
              Alert.alert(
                'Payment Failed',
                error.description || 'Transaction cancelled.',
              );
            });
        } catch (error) {
          console.log('Payment Error:', error.response?.data || error.message);
          Alert.alert('Error', 'Something went wrong! Please try again.');
        }
      }
    } catch (error) {
      console.log('handlePlaceOrder error ===>', error?.response?.data);
      Alert.alert('Error', 'Something went wrong while placing the order.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Checkout" navigation={navigation} showBack={true} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.Scrollcontainer}>
        {/* Delivery Options */}
        <Text style={styles.sectionTitle}>Delivery Options</Text>
        <View style={styles.optionGroup}>
          <TouchableOpacity
            style={[
              styles.radioBox,
              deliveryMode === 'home' && styles.selectedBox,
            ]}
            onPress={() => setDeliveryMode('home')}>
            <Ionicons
              name={
                deliveryMode === 'home' ? 'radio-button-on' : 'radio-button-off'
              }
              size={20}
              color={deliveryMode === 'home' ? '#00A859' : '#00A859'} // icon color changes on select
            />
            <Text style={styles.optionText}>Home Delivery</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.radioBox,
              deliveryMode === 'pickup' && styles.selectedBox,
            ]}
            onPress={() => setDeliveryMode('pickup')}>
            <Ionicons
              name={
                deliveryMode === 'pickup'
                  ? 'radio-button-on'
                  : 'radio-button-off'
              }
              size={20}
              color={deliveryMode === 'home' ? '#00A859' : '#00A859'} // icon color changes on select
            />
            <Text style={styles.optionText}>Store Pickup</Text>
          </TouchableOpacity>
        </View>

        {/* Pickup Locations */}
        {deliveryMode === 'pickup' && (
          <>
            <View style={styles.containerImage}>
              <View style={styles.textContainerImage}>
                <Text style={styles.titleImage}>
                  Available Pickup Locations
                </Text>
                <Text style={styles.subtitleImage}>
                  This item is currently available in 3{'\n'}locations near you.
                </Text>
              </View>
              <Image
                source={{
                  uri: 'https://i.postimg.cc/JnmLKcrv/Depth-4-Frame-1-10.png',
                }} // Use your actual image URI here
                style={styles.imageImage}
                resizeMode="contain"
              />
            </View>

            {selectedStore === 1 ? (
              <View style={styles.containerMoreKm}>
                <Image
                  source={require('../../../../../assets/images/question.png')} // Replace with your local icon or use a vector icon
                  style={styles.iconKM}
                />
                <View style={styles.textContainerKM}>
                  <Text style={styles.boldTextKM}>
                    Nearest Pickup location is more than 100 km away.
                  </Text>
                  <Text style={styles.subTextKM}>
                    Change location or choose{' '}
                    <Text
                      onPress={() => setDeliveryMode('home')}
                      style={styles.linkTextKM}>
                      Home Delivery
                    </Text>
                  </Text>
                </View>
              </View>
            ) : (
              <>
                {storeData.map(store => (
                  <TouchableOpacity
                    key={store.id}
                    style={styles.storeItem}
                    onPress={() => setSelectedStore(store.id)}>
                    <View style={{flex: 1}}>
                      <Text style={styles.storeName}>{store.name}</Text>
                      <Text style={styles.storeStatus}>{store.status}</Text>
                      <Text style={styles.storeDistance}>{store.distance}</Text>
                      <Text style={styles.storeAddress}>{store.address}</Text>
                    </View>
                    <Ionicons
                      name={
                        selectedStore === store.id
                          ? 'radio-button-on'
                          : 'radio-button-off'
                      }
                      size={22}
                      color="#1A9E41"
                    />
                  </TouchableOpacity>
                ))}
              </>
            )}
          </>
        )}

        {/* Address & Instructions */}

        <View style={{marginTop: 10}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('SelectAddress')}
            style={styles.infoBox}>
            <View style={{borderWidth: 1, padding: 5, borderRadius: 50}}>
              <Ionicons name="location-outline" size={20} />
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.infoTitle}>Deliver to</Text>
              <Text style={[styles.infoValue]}>123 Main St, Springfield</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} />
          </TouchableOpacity>

          {/* <View style={styles.infoBox}>
            <View style={{borderWidth: 1, padding: 5, borderRadius: 50}}>
              <Ionicons name="person-outline" size={20} />
            </View>

            <View style={{flex: 1}}>
              <Text style={styles.infoTitle}>Instructions</Text>
              <Text style={styles.infoValue}>
                Johnathan Doe {'\n'}+91 xxxxx-xxxxx
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} />
          </View> */}
        </View>

        {/* Payment Option */}
        <Text style={styles.sectionTitle}>Select Payment Option</Text>
        <View style={styles.optionGroup}>
          <TouchableOpacity
            style={[
              styles.radioBox,
              paymentMethod === 'pickup' && styles.selectedPayBox,
            ]}
            onPress={() => setPaymentMethod('pickup')}>
            <Ionicons
              name={
                paymentMethod === 'pickup'
                  ? 'radio-button-on'
                  : 'radio-button-off'
              }
              size={20}
              color="#1A9E41"
            />
            {deliveryMode === 'home' ? (
              <Text style={styles.optionText}>Cash on delivery</Text>
            ) : (
              <Text style={styles.optionText}>Pay at Store Pickup</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.radioBox,
              paymentMethod === 'online' && styles.selectedBox,
            ]}
            onPress={() => setPaymentMethod('online')}>
            <Ionicons
              name={
                paymentMethod === 'online'
                  ? 'radio-button-on'
                  : 'radio-button-off'
              }
              size={20}
              color="#000"
            />
            <Text style={styles.optionText}>Pay Online</Text>
            <Text style={styles.discount}>Get 5% OFF</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.radioBox,
              paymentMethod === 'wallet' && styles.selectedBox,
            ]}
            onPress={() => setPaymentMethod('wallet')}>
            <Ionicons
              name={
                paymentMethod === 'wallet'
                  ? 'radio-button-on'
                  : 'radio-button-off'
              }
              size={20}
              color="#000"
            />
            <Text style={styles.optionText}>Pay via Wallet</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionTitle}>Price Summary</Text>
        <View style={styles.priceSummary}>
          <View style={styles.priceRow}>
            <Text>Subtotal </Text>
            <Text style={styles.bold}>
              ₹{checkoutDetailsData?.invoice_amount?.subtotal}
            </Text>
          </View>
          <View style={styles.priceRow}>
            <Text>Shipping </Text>
            <Text style={styles.bold}>Free</Text>
          </View>
          <View style={styles.priceRow}>
            <Text>GST({gstLabel})</Text>
            <Text style={styles.bold}>₹{gstAmount}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text>Total </Text>
            <Text style={[styles.bold, {fontSize: 16}]}>
              ₹{checkoutDetailsData?.invoice_amount?.total_amount}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={handlePlaceOrder}
          style={styles.placeOrderBtn}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.placeOrderText}>
              {deliveryMode === 'pickup' && paymentMethod === 'pickup'
                ? 'Confirm Pickup'
                : paymentMethod === 'online' || paymentMethod === 'wallet'
                ? 'Pay'
                : 'Place Order'}
            </Text>
          )}
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By placing the order, you agree to our Terms & Return Policy.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  containerMoreKm: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  Scrollcontainer: {flex: 1, marginHorizontal: 10},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  backButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    padding: 6,
    left: 0,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 15,
  },
  optionGroup: {
    gap: 10,
    marginBottom: 0,
  },
  radioBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 10,
  },
  selectedBox: {
    borderColor: '#1C9C48',
  },
  selectedPayBox: {
    borderColor: '#1C9C48',
    backgroundColor: '#E9F6ED',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  discount: {
    marginLeft: 'auto',
    fontSize: 12,
    color: '#888',
  },
  availableText: {
    color: '#1C9C48',
    fontSize: 13,
    marginBottom: 10,
  },
  storeItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  storeName: {
    fontWeight: '600',
    fontSize: 14,
  },
  storeStatus: {
    color: '#1C9C48',
    fontSize: 13,
    marginTop: 2,
  },
  storeDistance: {
    fontSize: 12,
    color: '#555',
  },
  storeAddress: {
    fontSize: 12,
    color: '#777',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    gap: 10,
    height: 60,
  },
  infoTitle: {
    fontWeight: '600',
    fontSize: 13,
  },
  infoValue: {
    fontSize: 13,
    color: '#444',
  },
  priceSummary: {
    borderColor: '#eee',
    marginTop: 0,
  },
  priceRow: {
    fontSize: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '5',
  },
  bold: {
    fontWeight: '700',
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginVertical: 8,
  },
  placeOrderBtn: {
    backgroundColor: '#1C9C48',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  placeOrderText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  termsText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 40,
  },

  containerImage: {
    backgroundColor: '#FDFDFD',
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    marginVertical: 5,
  },
  textContainerImage: {
    flex: 1,
    paddingRight: 10,
  },
  titleImage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
  },
  subtitleImage: {
    fontSize: 14,
    color: '#4B9B8F', // greenish text
    marginTop: 4,
    lineHeight: 20,
  },
  imageImage: {
    width: 100,
    height: 80,
    borderRadius: 10,
  },
  iconKM: {
    width: 20,
    height: 20,
    marginRight: 8,
    marginTop: 3,
  },
  textContainerKM: {
    flex: 1,
    marginBottom: 15,
  },
  boldTextKM: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#000',
  },
  subTextKM: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  linkTextKM: {
    textDecorationLine: 'underline',
    color: '#000',
  },

  containerPay: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  paymentItem: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  cardPay: {
    width: 90,
    height: 60,
    // backgroundColor: '#4a4a4a',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCardPay: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: 'green',
  },
  iconPay: {
    width: 50,
    height: 30,
  },
  labelPay: {
    marginTop: 6,
    fontSize: 13,
    color: '#000',
    fontWeight: '500',
  },
});
