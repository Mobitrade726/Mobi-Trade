import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const storeData = [
  {
    id: 1,
    name: 'Springfield Store #1',
    status: 'In Stock',
    distance: '101 km away',
    address: '123 Main Street, Springfield, IL 62704',
  },
  {
    id: 2,
    name: 'Springfield Store #2',
    status: 'Low Stock',
    distance: '4.1 km away',
    address: '789 Elm Street, Springfield, IL 62704',
  },
  {
    id: 3,
    name: 'Springfield Store #3',
    status: 'In Stock',
    distance: '6.5 km away',
    address: '456 Oak Avenue, Springfield, IL 62704',
  },
];

const CheckoutScreen = () => {
  const navigation = useNavigation(); // <-- Add this
  const [deliveryMode, setDeliveryMode] = useState('pickup');
  const [selectedStore, setSelectedStore] = useState(2);
  const [paymentMethod, setPaymentMethod] = useState('pickup');
  const [selected, setSelected] = useState('UPI');
  const paymentMethods = [
    {
      id: 'UPI',
      label: 'UPI',
      image: require('../../../../../assets/images/R.png'),
    },
    {
      id: 'CARD',
      label: 'Card',
      image: require('../../../../../assets/images/R2.jpeg'),
    },
    {
      id: 'NETBANKING',
      label: 'Net Banking',
      image: require('../../../../../assets/images/R1.png'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Ionicons name="chevron-back" size={22} color="#000" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Checkout</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>

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
          <TouchableOpacity onPress={()=> navigation.navigate('SelectAddress')} style={styles.infoBox}>
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
        </View>

        {/* Price Summary */}
        {/* {paymentMethod === 'online' ? (
          <>
            <Text style={styles.sectionTitle}>Choose Payment Method</Text>
            <View style={styles.containerPay}>
              {paymentMethods.map(method => (
                <View key={method.id} style={styles.paymentItem}>
                  <TouchableOpacity
                    onPress={() => setSelected(method.id)}
                    style={[
                      styles.cardPay,
                      selected === method.id && styles.selectedCardPay,
                    ]}>
                    <Image
                      source={method.image}
                      style={styles.iconPay}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <Text style={styles.labelPay}>{method.label}</Text>
                </View>
              ))}
            </View>
          </>
        ) : null} */}
        <Text style={styles.sectionTitle}>Price Summary</Text>
        <View style={styles.priceSummary}>
          <View style={styles.priceRow}>
            <Text>Subtotal </Text>
            <Text style={styles.bold}>₹131,095</Text>
          </View>
          <View style={styles.priceRow}>
            <Text>Shipping </Text>
            <Text style={styles.bold}>Free</Text>
          </View>
          <View style={styles.priceRow}>
            <Text>GST </Text>
            <Text style={styles.bold}>₹6,554.75</Text>
          </View>
          {/* <View style={styles.divider} /> */}
          <View style={styles.priceRow}>
            <Text>Total </Text>
            <Text style={[styles.bold, {fontSize: 16}]}>₹133,899.75</Text>
          </View>
        </View>

        {/* Place Order */}
        <TouchableOpacity
          onPress={() => navigation.navigate('PaymentMethod')}
          style={styles.placeOrderBtn}>
          {paymentMethod === 'online' ? (
            <Text style={styles.placeOrderText}>Pay</Text>
          ) : (
            <Text style={styles.placeOrderText}>Place Order</Text>
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
