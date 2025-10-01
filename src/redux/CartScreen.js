import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  removeFromCartAPI,
  fetchCartAPI,
  clearCartAPI,
} from './slices/cartSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {checkoutAPI} from '../redux/slices/cartSlice';
import Toast from 'react-native-toast-message';

const Cart = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {items: cartItems, loading} = useSelector(state => state.cart);

  console.log(
    'cartItems|||||||||||||||||||||||||||||||||||||||||||||||||||',
    cartItems,
  );

  const handleCartCheckout = () => {
    cartItems.forEach((elements, index) => {
      dispatch(
        checkoutAPI({
          type: 'cart_product',
          barcode_id: elements?.barcode_id,
          single_product_price: elements?.price,
          cart_id: elements?.cart_id,
          navigation,
        }),
      );
    });
  };

  // Safe filtering (if productData is undefined, use [])
  useEffect(() => {
    dispatch(fetchCartAPI()); // fetch cart from API on mount
  }, [navigation]);

  const getTotalPrice = () =>
    cartItems.reduce((sum, item) => sum + item.price, 0);

  const subtotal = getTotalPrice();
  const gst = subtotal * 0.18; //gst 18%
  const total = subtotal + gst;

  const renderItem = ({item}) => (
    <View style={styles.cartItem}>
      <View style={styles.details}>
        <Text style={styles.name}>{item.model}</Text>
        <Text style={styles.name}>
          {item.ram || '-'}/{item.rom || '-'}
        </Text>
        <Text style={styles.price}>₹{item.price.toFixed(2)}</Text>
      </View>
      <Image source={{uri: item.feature_image}} style={styles.image} />
      <TouchableOpacity
        onPress={() => dispatch(removeFromCartAPI(item.barcode_id))}>
        <Ionicons name="close" size={22} color="#555" />
        <Text style={styles.price}>+{item.quantity}</Text>
      </TouchableOpacity>
    </View>
  );

  const recentlyView = [
    {
      id: '1',
      image:
        'https://i.postimg.cc/FR7g3304/Whats-App-Image-2025-07-11-at-5-45-27-PM-1.jpg',
      name: 'Samsung Galaxy S21',
      color: 'Black',
      price: '₹20,999',
      originalPrice: '₹24,999',
      grade: 'A1',
      refurbished: true,
    },
    {
      id: '2',
      image:
        'https://i.postimg.cc/FR7g3304/Whats-App-Image-2025-07-11-at-5-45-27-PM-1.jpg',
      name: 'Apple iPhone 13',
      color: 'Midnight',
      price: '₹69,900',
      originalPrice: '₹79,900',
      grade: 'A1',
      refurbished: true,
    },
    {
      id: '3',
      image:
        'https://i.postimg.cc/FR7g3304/Whats-App-Image-2025-07-11-at-5-45-27-PM-1.jpg',
      name: 'OnePlus 9',
      color: 'Winter Mist',
      price: '₹44,999',
      originalPrice: '₹49,999',
      grade: 'A1',
      refurbished: true,
    },
  ];

  const RecentlyView = ({item}) => (
    <View style={styles.cardD}>
      <View style={styles.imageContainerD}>
        <Image source={{uri: item.image}} style={styles.imageD} />
        {item.refurbished && (
          <Text style={styles.refurbishedLabelD}>(Refurbished)</Text>
        )}
        <TouchableOpacity style={styles.heartIconD}>
          <Ionicons name="heart-outline" size={20} color="#333" />
        </TouchableOpacity>
      </View>
      <View style={styles.gradeBoxD}>
        <Text style={styles.gradeTextD}>Grade {item.grade}</Text>
      </View>
      <Text style={styles.productNameD}>{item.name}</Text>
      <Text style={styles.colorTextD}>● {item.color}</Text>
      <View style={styles.priceRowD}>
        <Text style={styles.priceD}>{item.price}</Text>
        <Text style={styles.originalPriceD}>{item.originalPrice}</Text>
      </View>
    </View>
  );

  const KYCStatusCard = ({
    title,
    subtitle,
    buttonText,
    icon,
    bgColor,
    iconColor,
    buttonColor,
    textColor,
    isDisabled,
  }) => {
    return (
      <View style={[styles.card, {backgroundColor: bgColor}]}>
        <View style={styles.cardHeader}>
          <Text style={[styles.titleS, {color: textColor}]}>{title}</Text>
          <Ionicons
            name={icon}
            size={24}
            color={iconColor}
            style={styles.iconCircle}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={[styles.subtitle, {color: textColor}]}>{subtitle}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('KycCompleteStatus')}
            style={[styles.button, {backgroundColor: buttonColor}]}
            disabled={isDisabled}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const kycStatus = 'pending'; // 'verified' | 'under_review' | 'pending'

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Ionicons name="chevron-back" size={22} color="#000" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Cart</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Ionicons name="search" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        <View style={{marginHorizontal: 10}}>
          {cartItems.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>🛒 Your cart is empty</Text>
            </View>
          ) : (
            <>
              <FlatList
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
              />
              <TouchableOpacity
                style={styles.clearBtn}
                onPress={() => dispatch(clearCartAPI())}>
                <Text style={styles.clearText}>🗑️ Clear Cart</Text>
              </TouchableOpacity>

              <View style={styles.summary}>
                <Text style={styles.summaryTitle}>Price Summary</Text>
                <View style={styles.row}>
                  <Text style={styles.label}>Subtotal:</Text>
                  <Text style={styles.value}>
                    ₹{getTotalPrice().toFixed(2)}
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.label}>Shipping:</Text>
                  <Text style={styles.value}>Free</Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.label}>GST:</Text>
                  <Text style={styles.value}>₹{gst.toFixed(2)}</Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.labelTotal}>Total:</Text>
                  <Text style={styles.valueTotal}>₹{total.toFixed(2)}</Text>
                </View>
              </View>
            </>
          )}
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <Text style={{fontSize: 18, fontWeight: '600', color: '#222'}}>
              Recently Viewed
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('RecentlyView')}>
              <Ionicons name="chevron-forward" size={20} color="#333" />
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            data={recentlyView}
            renderItem={({item}) => <RecentlyView item={item} />}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainerD}
            showsHorizontalScrollIndicator={false}
          /> */}
          <ScrollView contentContainerStyle={styles.container}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.carousel}>
              {kycStatus === 'verified' && (
                <KYCStatusCard
                  title="KYC verified"
                  subtitle="We’re reviewing your details. You can proceed with your order."
                  buttonText="Verified"
                  icon="checkmark-circle-outline"
                  bgColor="#1A9E41"
                  iconColor="#fff"
                  buttonColor="#fff"
                  textColor="#fff"
                  isDisabled={true}
                />
              )}

              {kycStatus === 'under_review' && (
                <KYCStatusCard
                  title="KYC under review"
                  subtitle="We’re reviewing your details. You can proceed with your order."
                  buttonText="View Status"
                  icon="time-outline"
                  bgColor="#3A3A3C"
                  iconColor="#fff"
                  buttonColor="#fff"
                  textColor="#fff"
                  isDisabled={false}
                />
              )}

              {kycStatus === 'pending' && (
                <KYCStatusCard
                  title="Your KYC is pending"
                  subtitle="Complete your KYC to place orders and unlock business account benefits."
                  buttonText="Complete now"
                  icon="information-circle-outline"
                  bgColor="#00A9E0"
                  iconColor="#fff"
                  buttonColor="#fff"
                  textColor="#fff"
                  isDisabled={false}
                />
              )}
            </ScrollView>

            {/* Footer Buttons */}
            <View style={styles.footer}>
              <TouchableOpacity
                style={[styles.footerBtn, {backgroundColor: '#333333'}]}>
                <Text style={styles.footerBtnText}>Continue Shopping</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleCartCheckout()}
                style={[styles.footerBtn, {backgroundColor: '#666666'}]}>
                <Text style={styles.footerBtnText}>Proceed to Checkout</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
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
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 10},
  cartItem: {
    flexDirection: 'row',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 12,
  },
  image: {width: 70, height: 70, borderRadius: 8, marginRight: 12},
  details: {flex: 1},
  name: {fontSize: 16, fontWeight: '600'},
  price: {color: '#444', marginTop: 4},
  summary: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginTop: 10,
  },
  summaryTitle: {fontSize: 18, fontWeight: '600', marginBottom: 12},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {fontSize: 16, color: '#555'},
  value: {fontSize: 16, color: '#111'},
  labelTotal: {fontSize: 18, fontWeight: 'bold'},
  valueTotal: {fontSize: 18, fontWeight: 'bold'},
  checkoutBtn: {
    marginTop: 16,
    backgroundColor: '#3ac5b9',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: {color: '#fff', fontWeight: '600', fontSize: 16},
  clearBtn: {
    marginTop: 0,
    padding: 10,
    backgroundColor: '#ffe5e5',
    alignItems: 'center',
    borderRadius: 8,
  },
  clearText: {color: '#cc0000', fontWeight: '600'},
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  emptyText: {fontSize: 18, color: '#666'},
  list: {paddingBottom: 0},

  banner: {
    backgroundColor: '#F6EAD9',
    padding: 16,
    borderRadius: 12,
    height: 200,
    marginBottom: 10,
  },
  bannerTitle: {fontSize: 18, fontWeight: 'bold', color: '#fff', marginTop: 50},
  bannerSubtitle: {fontSize: 12, color: '#fff', marginTop: 10},
  upgradeBtn: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 30,
  },
  upgradeText: {fontWeight: '500', color: '#000'},

  cardD: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 15,
    overflow: 'hidden',
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    // elevation: 3,
  },
  imageContainerD: {
    position: 'relative',
    backgroundColor: '#f4f4f4',
  },
  imageD: {
    width: '100%',
    height: 250,
    resizeMode: 'stretch',
  },
  refurbishedLabelD: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 12,
    color: '#000',
    backgroundColor: '#EAE6E5',
    width: '98%',
    textAlign: 'center',
    padding: 5,
  },
  heartIconD: {
    position: 'absolute',
    top: 25,
    right: 6,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    elevation: 2,
  },
  badgeTextD: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  gradeBoxD: {
    paddingVertical: 2,
    position: 'absolute',
    marginTop: 225,
    alignSelf: 'center',
    backgroundColor: '#fff',
    width: '92%',
    borderRadius: 10,
    borderWidth: 0.2,
  },
  gradeTextD: {
    fontSize: 12,
    fontWeight: '500',
    color: '#555',
    textAlign: 'center',
  },
  productNameD: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 6,
    marginHorizontal: 10,
    color: '#000',
  },
  colorTextD: {
    fontSize: 13,
    color: '#000',
    marginHorizontal: 10,
    marginTop: 2,
  },
  priceRowD: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 4,
    marginBottom: 10,
  },
  priceD: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 6,
  },
  originalPriceD: {
    fontSize: 13,
    color: '#888',
    textDecorationLine: 'line-through',
  },

  carousel: {
    paddingBottom: 16,
    gap: 12,
  },
  card: {
    width: Dimensions.get('window').width * 0.95,
    padding: 16,
    borderRadius: 16,
    minHeight: 100,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleS: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    paddingRight: 10,
  },
  subtitle: {
    fontSize: 13,
    marginVertical: 10,
    width: '50%',
  },
  iconCircle: {
    backgroundColor: '#ffffff20',
    padding: 6,
    borderRadius: 20,
  },
  button: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 35,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 12,
    color: '#000',
  },
  footer: {
    marginTop: 5,
    gap: 12,
  },
  footerBtn: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  footerBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default Cart;
