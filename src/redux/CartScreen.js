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
  ImageBackground,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  removeFromCartAPI,
  fetchCartAPI,
  clearCartAPI,
  checkoutAPI,
} from './slices/cartSlice';
import {fetchProfile} from './slices/profileSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import Header from '../constants/Header';

const Cart = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {items: cartItems} = useSelector(state => state.cart);
  const {data} = useSelector(state => state.profile);

  const handleClear = () => {
    dispatch(clearCartAPI()).then(() => {
      dispatch(fetchCartAPI()); // refresh cart from backend ✅
    });
  };

  const isKYCIncomplete = !data?.vendordocuments?.aadhaar_no;

  // Fetch cart on mount
  useEffect(() => {
    dispatch(fetchCartAPI());
    dispatch(fetchProfile());
  }, [dispatch]);

  const handleCartCheckout = () => {
    cartItems.forEach(item => {
      dispatch(
        checkoutAPI({
          type: 'cart_product',
          barcode_id: item?.barcode_id,
          cart_id: item?.cart_id,
          navigation,
        }),
      );
    });
  };

  const renderItem = ({item}) => (
    <View style={styles.cartItem}>
      <Image source={{uri: item.feature_image}} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.model}</Text>
        <Text style={styles.name}>
          {item.ram || '-'} / {item.rom || '-'}
        </Text>
        <Text style={styles.price}>₹{item.price.toFixed(2)}</Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          dispatch(removeFromCartAPI(item.barcode_id)).then(() =>
            dispatch(fetchCartAPI()),
          )
        }
        style={{alignItems: 'center', justifyContent: 'center'}}>
        <Ionicons name="close" size={22} color="#555" />
        <Text style={styles.price}>x{item.quantity}</Text>
      </TouchableOpacity>
    </View>
  );

  // KYC Card Component
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
    const navigation = useNavigation();
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header title="Cart" navigation={navigation} showBack={true} />

        {/* Business Banner */}
        <ImageBackground
          source={{uri: 'https://i.postimg.cc/d0Hky5p1/Depth-3-Frame-0.png'}}
          style={styles.banner}
          imageStyle={{borderRadius: 12}}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={styles.bannerTitle}>
              Upgrade to{'\n'}Business Account
            </Text>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Text style={styles.bannerSubtitle}>
                  Unlock exclusive dealer pricing and
                </Text>
                <Text style={styles.bannerSubtitle}>bulk order options.</Text>
              </View>
              <View
                onPress={() => navigation.navigate('UpgradeNow')}
                style={styles.upgradeBtn}>
                <Text style={styles.upgradeText}>Upgrade Now</Text>
              </View>
            </View>
          </View>
        </ImageBackground>

        <View style={{marginHorizontal: 10}}>
          {/* Empty Cart */}
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
                onPress={() => handleClear()}>
                <Text style={styles.clearText}>🗑️ Clear Cart</Text>
              </TouchableOpacity>
            </>
          )}
          {/* KYC Section */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carousel}>
            {isKYCIncomplete ? (
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
            ) : null}
          </ScrollView>
        </View>
      </ScrollView>
      {/* Footer Buttons */}
      {cartItems.length !== 0 ? (
        <View style={{marginHorizontal: 10}}>
          <TouchableOpacity
            disabled={isKYCIncomplete}
            onPress={handleCartCheckout}
            style={[styles.footerBtn, {backgroundColor: '#666666'}]}>
            <Text style={styles.footerBtnText}>Proceed to Checkout</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={[
              styles.footerBtn,
              {backgroundColor: '#333333', marginTop: 10},
            ]}>
            <Text style={styles.footerBtnText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : null}
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
  },
  headerTitle: {fontSize: 16, fontWeight: '500', color: '#000'},
  banner: {
    backgroundColor: '#F6EAD9',
    padding: 16,
    borderRadius: 12,
    height: 200,
    marginBottom: 10,
    marginHorizontal: 10,
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
    marginLeft: 60,
  },
  upgradeText: {fontWeight: '500', color: '#000'},
  cartItem: {
    flexDirection: 'row',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
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
  row: {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6},
  label: {fontSize: 16, color: '#555'},
  value: {fontSize: 16, color: '#111'},
  labelTotal: {fontSize: 18, fontWeight: 'bold'},
  valueTotal: {fontSize: 18, fontWeight: 'bold'},
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
  titleS: {fontSize: 18, fontWeight: '700', flex: 1, paddingRight: 10},
  subtitle: {fontSize: 13, marginVertical: 10, width: '50%'},
  iconCircle: {backgroundColor: '#ffffff20', padding: 6, borderRadius: 20},
  button: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 35,
  },
  buttonText: {fontWeight: '600', fontSize: 12, color: '#000'},
  carousel: {paddingBottom: 16, gap: 12},
  footerBtn: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 5,
  },
  footerBtnText: {color: '#fff', fontWeight: '700', fontSize: 16},
});

export default Cart;
