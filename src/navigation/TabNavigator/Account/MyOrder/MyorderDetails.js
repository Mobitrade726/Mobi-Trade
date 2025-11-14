import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../../../constants/Header';
import {useDispatch, useSelector} from 'react-redux';
import {fetchOrderDetailsAPI} from '../../../../redux/slices/orderSlice';

const MyorderDetails = ({navigation, route}) => {
  const {order_id} = route.params;
  const dispatch = useDispatch();
  const {orderDetails, loading, error} = useSelector(state => state.orders);

  useEffect(() => {
    dispatch(fetchOrderDetailsAPI(order_id));
  }, [dispatch, order_id]);

  // GST label logic
  const gstLabel =
    parseFloat(orderDetails?.checkout_detail?.igst_tax_amount) > 0
      ? '18%'
      : parseFloat(orderDetails?.checkout_detail?.cgst_tax_amount) > 0
      ? '9%'
      : '0%';

  // GST amount logic
  let gstAmount = '0.00';
  if (gstLabel === '18%') {
    gstAmount = orderDetails?.checkout_detail?.igst_tax_amount || '0.00';
  } else if (gstLabel === '9%') {
    const cgst =
      parseFloat(orderDetails?.checkout_detail?.cgst_tax_amount) || 0;
    const sgst =
      parseFloat(orderDetails?.checkout_detail?.sgst_tax_amount) || 0;
    gstAmount = (cgst + sgst).toFixed(2);
  }

  // Grand total
  const amountBeforeTax = orderDetails?.checkout_detail?.amount_before_tax || 0;
  const grandTotal =
    orderDetails?.checkout_detail?.grand_total ||
    (amountBeforeTax + parseFloat(gstAmount)).toFixed(2);

  if (loading) return <ActivityIndicator size="large" color="#000" />;
  if (error) return <Text>Error: {error}</Text>;
  if (!orderDetails) return <Text>No order details found.</Text>;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Header
        title={`#${orderDetails?.order_id}`}
        navigation={navigation}
        showBack={true}
      />

      <ScrollView contentContainerStyle={{marginHorizontal: 16}}>
        {/* Track Bar */}
        <TouchableOpacity style={styles.trackBanner}>
          <View style={{flex: 1}}>
            <Text style={styles.trackText}>Your order is delever</Text>
          </View>
          <Image
            source={require('../../../../../assets/images/orderdelever.png')}
            style={{width: 60, height: 35, resizeMode: 'contain'}}
          />
        </TouchableOpacity>

        {/* Delivery Info */}
        <TouchableOpacity style={styles.grayBox}>
          <Ionicons name="location-outline" size={24} color="#000" />
          <View style={styles.grayBoxContent}>
            <Text style={styles.grayBoxLabel}>Deliver to</Text>
            <Text style={styles.grayBoxText}>123 Main St, Springfield</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.grayBox}>
          <Ionicons name="person-circle-outline" size={24} />
          <View style={styles.grayBoxContent}>
            <Text style={styles.grayBoxLabel}>Buyer name</Text>
            <Text style={styles.grayBoxText}>{orderDetails?.buyer_name}</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.billTitle}>Product list</Text>

        {orderDetails?.bill_details?.map((elements, index) => (
          <>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View key={index} style={{}}>
                <Text style={[styles.billText && styles.boldText]}>
                  {elements?.model_name}
                </Text>
                <Text style={{}}>₹{elements?.price}</Text>
              </View>
              <Image
                source={{uri: elements.model_image}}
                style={styles.imageBox}
              />
            </View>

            <View style={styles.billRow}>
              <Text style={styles.billText}>Payment mode</Text>
              <Text style={styles.billText}>({elements?.payment_mode})</Text>
            </View>
            <View style={styles.billRow}>
              <Text style={styles.billText}>Delivery type</Text>
              <Text style={styles.billText}>({elements?.delivery_type})</Text>
            </View>
          </>
        ))}

        <View style={styles.divider} />
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 0,
            marginBottom: 10,
            color: '#000',
          }}>
          Bill Details
        </Text>

        <View style={styles.billRow}>
          <Text style={styles.billText}>GST({gstLabel})</Text>
          <Text style={styles.billText}>{gstAmount}</Text>
        </View>
        <View style={styles.billRow}>
          <Text style={styles.billText}>Subtotal</Text>
          <Text style={styles.billText}>{amountBeforeTax}</Text>
        </View>
        <View style={styles.billRow}>
          <Text style={styles.billText}>Grand Total</Text>
          <Text style={styles.billText}>{grandTotal}</Text>
        </View>

        {/* Buttons */}
        <TouchableOpacity style={styles.trackOrderBtn}>
          <Text style={[styles.buttonText, {color: '#28A745'}]}>
            Track Order
          </Text>
        </TouchableOpacity>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ReturnRequest')}
            style={styles.returnBtn}>
            <Text style={styles.primaryBtnText}>Return</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rateBtn}>
            <Text style={styles.primaryBtnText}>Rate</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyorderDetails;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    position: 'relative',
  },
  backBtn: {
    position: 'absolute',
    left: 15,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  trackBanner: {
    backgroundColor: '#1C9C48',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  trackText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  trackLink: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  imageBox: {
    height: 50,
    width: 50,
    marginBottom: 5,
    resizeMode: 'cover',
    backgroundColor: '#e0e0e0',
    // borderRadius: 16,
    // marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  infoLabel: {
    color: '#333',
    fontSize: 14,
  },
  infoValue: {
    color: '#333',
    fontSize: 14,
  },
  grayBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
  },
  grayBoxContent: {
    flex: 1,
    marginLeft: 10,
  },
  grayBoxLabel: {
    fontSize: 12,
    color: '#555',
    marginBottom: 2,
  },
  grayBoxText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },

  billTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#000',
  },
  billRow: {
    marginBottom: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  billText: {
    fontSize: 14,
    color: '#333',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  trackOrderBtn: {
    borderWidth: 1.5,
    borderColor: '#1C9C48',
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 20,
    alignItems: 'center',
  },
  continueBtn: {
    backgroundColor: '#1C9C48',
    borderRadius: 16,
    paddingVertical: 14,
    marginTop: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'semibold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 16,
  },

  returnBtn: {
    flex: 1,
    backgroundColor: '#11A5D7', // You can change to primary color
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  rateBtn: {
    flex: 1,
    backgroundColor: '#1C9C48', // You can change to primary color
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  returnBtn: {
    flex: 1,
    backgroundColor: '#11A5D7', // You can change to primary color
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },

  primaryBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
