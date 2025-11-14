// import React, {useEffect} from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   SafeAreaView,
//   Dimensions,
//   ScrollView,
//   StyleSheet,
//   ImageBackground,
// } from 'react-native';
// import {useSelector, useDispatch} from 'react-redux';
// import {
//   removeFromCartAPI,
//   fetchCartAPI,
//   clearCartAPI,
// } from './slices/cartSlice';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {useNavigation, useRoute} from '@react-navigation/native';
// import {checkoutAPI} from '../redux/slices/cartSlice';
// import Toast from 'react-native-toast-message';

// const Cart = () => {
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const {items: cartItems} = useSelector(state => state.cart);
//   const {data} = useSelector(state => state.profile);

//   console.log('kyc----------->', data?.vendordocuments);

//   const handleCartCheckout = () => {
//     cartItems.forEach((elements, index) => {
//       dispatch(
//         checkoutAPI({
//           type: 'cart_product',
//           barcode_id: elements?.barcode_id,
//           single_product_price: elements?.price,
//           cart_id: elements?.cart_id,
//           navigation,
//         }),
//       );
//     });
//   };

//   // Safe filtering (if productData is undefined, use [])
//   useEffect(() => {
//     dispatch(fetchCartAPI()); // fetch cart from API on mount
//   }, [navigation]);

//   const getTotalPrice = () =>
//     cartItems.reduce((sum, item) => sum + item.price, 0);

//   const subtotal = getTotalPrice();
//   const gst = subtotal * 0.18; //gst 18%
//   const total = subtotal + gst;

//   const renderItem = ({item}) => (
//     <View style={styles.cartItem}>
//       <View style={styles.details}>
//         <Text style={styles.name}>{item.model}</Text>
//         <Text style={styles.name}>
//           {item.ram || '-'}/{item.rom || '-'}
//         </Text>
//         <Text style={styles.price}>₹{item.price.toFixed(2)}</Text>
//       </View>
//       <Image source={{uri: item.feature_image}} style={styles.image} />
//       <TouchableOpacity
//         onPress={() => dispatch(removeFromCartAPI(item.barcode_id))}>
//         <Ionicons name="close" size={22} color="#555" />
//         <Text style={styles.price}>+{item.quantity}</Text>
//       </TouchableOpacity>
//     </View>
//   );
//   // if (customerName === null) {
//   //   const KYCStatusCard = ({
//   //     title,
//   //     subtitle,
//   //     buttonText,
//   //     icon,
//   //     bgColor,
//   //     iconColor,
//   //     buttonColor,
//   //     textColor,
//   //     isDisabled,
//   //   }) => {
//   //     return (
//   //       <View style={[styles.card, {backgroundColor: bgColor}]}>
//   //         <View style={styles.cardHeader}>
//   //           <Text style={[styles.titleS, {color: textColor}]}>{title}</Text>
//   //           <Ionicons
//   //             name={icon}
//   //             size={24}
//   //             color={iconColor}
//   //             style={styles.iconCircle}
//   //           />
//   //         </View>
//   //         <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//   //           <Text style={[styles.subtitle, {color: textColor}]}>
//   //             {subtitle}
//   //           </Text>
//   //           <TouchableOpacity
//   //             onPress={() => navigation.navigate('KycCompleteStatus')}
//   //             style={[styles.button, {backgroundColor: buttonColor}]}
//   //             disabled={isDisabled}>
//   //             <Text style={styles.buttonText}>{buttonText}</Text>
//   //           </TouchableOpacity>
//   //         </View>
//   //       </View>
//   //     );
//   //   };
//   // }

//   // Define the component at the top level
//   const KYCStatusCard = ({
//     title,
//     subtitle,
//     buttonText,
//     icon,
//     bgColor,
//     iconColor,
//     buttonColor,
//     textColor,
//     isDisabled,
//     navigation,
//   }) => {
//     return (
//       <View style={[styles.card, {backgroundColor: bgColor}]}>
//         <View style={styles.cardHeader}>
//           <Text style={[styles.titleS, {color: textColor}]}>{title}</Text>
//           <Ionicons
//             name={icon}
//             size={24}
//             color={iconColor}
//             style={styles.iconCircle}
//           />
//         </View>
//         <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//           <Text style={[styles.subtitle, {color: textColor}]}>{subtitle}</Text>
//           <TouchableOpacity
//             onPress={() => navigation.navigate('KycCompleteStatus')}
//             style={[styles.button, {backgroundColor: buttonColor}]}
//             disabled={isDisabled}>
//             <Text style={styles.buttonText}>{buttonText}</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };

//   // Then, conditionally render it in JSX

//   // {
//   //   !data?.vendordocuments && (
//       <KYCStatusCard
//         title="Complete KYC"
//         subtitle="Your KYC is pending"
//         buttonText="Complete Now"
//         icon="person-circle-outline"
//         bgColor="#f5f5f5"
//         iconColor="#333"
//         buttonColor="#000"
//         textColor="#000"
//         isDisabled={false}
//         navigation={navigation}
//       />
//   //   );
//   // }

//   const kycStatus = 'pending'; // 'verified' | 'under_review' | 'pending'

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView>
//         <View style={styles.header}>
//           <TouchableOpacity
//             onPress={() => navigation.goBack()}
//             style={styles.backButton}>
//             <Ionicons name="chevron-back" size={22} color="#000" />
//           </TouchableOpacity>
//           <View>
//             <Text style={styles.headerTitle}>Cart</Text>
//           </View>
//           <TouchableOpacity onPress={() => navigation.navigate('Search')}>
//             <Ionicons name="search" size={24} color="#333" />
//           </TouchableOpacity>
//         </View>
//         {/* Business Banner */}
//         <ImageBackground
//           source={{
//             uri: 'https://i.postimg.cc/d0Hky5p1/Depth-3-Frame-0.png',
//           }} // Replace with your real URL
//           style={styles.banner}
//           imageStyle={{borderRadius: 12}}>
//           <View style={{flex: 1, justifyContent: 'center'}}>
//             <Text style={styles.bannerTitle}>
//               Upgrade to{'\n'}Business Account
//             </Text>
//             <View
//               style={{
//                 flexDirection: 'row',
//               }}>
//               <View>
//                 <Text style={styles.bannerSubtitle}>
//                   Unlock exclusive dealer pricing and
//                 </Text>
//                 <Text style={styles.bannerSubtitle}>bulk order options.</Text>
//               </View>
//               <View
//                 onPress={() => navigation.navigate('UpgradeNow')}
//                 style={styles.upgradeBtn}>
//                 <Text style={styles.upgradeText}>Upgrade Now</Text>
//               </View>
//             </View>
//           </View>
//         </ImageBackground>
//         <View style={{marginHorizontal: 10}}>
//           {cartItems.length === 0 ? (
//             <View style={styles.emptyContainer}>
//               <Text style={styles.emptyText}>🛒 Your cart is empty</Text>
//             </View>
//           ) : (
//             <>
//               <FlatList
//                 data={cartItems}
//                 renderItem={renderItem}
//                 keyExtractor={item => item.id}
//                 contentContainerStyle={styles.list}
//               />
//               <TouchableOpacity
//                 style={styles.clearBtn}
//                 onPress={() => dispatch(clearCartAPI())}>
//                 <Text style={styles.clearText}>🗑️ Clear Cart</Text>
//               </TouchableOpacity>

//               <View style={styles.summary}>
//                 <Text style={styles.summaryTitle}>Price Summary</Text>
//                 <View style={styles.row}>
//                   <Text style={styles.label}>Subtotal:</Text>
//                   <Text style={styles.value}>
//                     ₹{getTotalPrice().toFixed(2)}
//                   </Text>
//                 </View>

//                 <View style={styles.row}>
//                   <Text style={styles.label}>Shipping:</Text>
//                   <Text style={styles.value}>Free</Text>
//                 </View>

//                 <View style={styles.row}>
//                   <Text style={styles.label}>GST:</Text>
//                   <Text style={styles.value}>₹{gst.toFixed(2)}</Text>
//                 </View>

//                 <View style={styles.row}>
//                   <Text style={styles.labelTotal}>Total:</Text>
//                   <Text style={styles.valueTotal}>₹{total.toFixed(2)}</Text>
//                 </View>
//               </View>
//             </>
//           )}

// {!data?.vendordocuments ? (
//   <ScrollView contentContainerStyle={styles.container}>
//     <ScrollView
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       contentContainerStyle={styles.carousel}>
//       {kycStatus === 'verified' && (
//         <KYCStatusCard
//           title="KYC verified"
//           subtitle="We’re reviewing your details. You can proceed with your order."
//           buttonText="Verified"
//           icon="checkmark-circle-outline"
//           bgColor="#1A9E41"
//           iconColor="#fff"
//           buttonColor="#fff"
//           textColor="#fff"
//           isDisabled={true}
//         />
//       )}

//       {kycStatus === 'under_review' && (
//         <KYCStatusCard
//           title="KYC under review"
//           subtitle="We’re reviewing your details. You can proceed with your order."
//           buttonText="View Status"
//           icon="time-outline"
//           bgColor="#3A3A3C"
//           iconColor="#fff"
//           buttonColor="#fff"
//           textColor="#fff"
//           isDisabled={false}
//         />
//       )}

//       {kycStatus === 'pending' && (
//         <KYCStatusCard
//           title="Your KYC is pending"
//           subtitle="Complete your KYC to place orders and unlock business account benefits."
//           buttonText="Complete now"
//           icon="information-circle-outline"
//           bgColor="#00A9E0"
//           iconColor="#fff"
//           buttonColor="#fff"
//           textColor="#fff"
//           isDisabled={false}
//         />
//       )}
//     </ScrollView>

//     {/* Footer Buttons */}
//     <View style={styles.footer}>
//       <TouchableOpacity
//         onPress={() => navigation.navigate('Home')}
//         style={[styles.footerBtn, {backgroundColor: '#333333'}]}>
//         <Text style={styles.footerBtnText}>Continue Shopping</Text>
//       </TouchableOpacity>
//     </View>
//   </ScrollView>
// ) : null}
//           <TouchableOpacity
//             onPress={() => handleCartCheckout()}
//             style={[styles.footerBtn, {backgroundColor: '#666666'}]}>
//             <Text style={styles.footerBtnText}>Proceed to Checkout</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {flex: 1, backgroundColor: '#fff'},
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 10,
//     justifyContent: 'space-between',
//     marginHorizontal: 10,
//   },
//   backButton: {
//     backgroundColor: '#f5f5f5',
//     borderRadius: 20,
//     padding: 6,
//     left: 0,
//   },
//   headerTitle: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#000',
//     textAlign: 'center',
//   },
//   title: {fontSize: 24, fontWeight: 'bold', marginBottom: 10},
//   banner: {
//     backgroundColor: '#F6EAD9',
//     padding: 16,
//     borderRadius: 12,
//     height: 200,
//     marginBottom: 10,
//     marginHorizontal: 10,
//   },
//   bannerTitle: {fontSize: 18, fontWeight: 'bold', color: '#fff', marginTop: 50},
//   bannerSubtitle: {fontSize: 12, color: '#fff', marginTop: 10},
//   upgradeBtn: {
//     backgroundColor: '#fff',
//     alignSelf: 'flex-start',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 8,
//     marginTop: 30,
//     marginLeft: 60,
//   },
//   upgradeText: {fontWeight: '500', color: '#000'},

//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginHorizontal: 16,
//     marginTop: 20,
//   },
//   cartItem: {
//     flexDirection: 'row',
//     padding: 12,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 10,
//     marginBottom: 12,
//   },
//   image: {width: 70, height: 70, borderRadius: 8, marginRight: 12},
//   details: {flex: 1},
//   name: {fontSize: 16, fontWeight: '600'},
//   price: {color: '#444', marginTop: 4},
//   summary: {
//     padding: 16,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     backgroundColor: '#f9f9f9',
//     borderRadius: 8,
//     marginTop: 10,
//   },
//   summaryTitle: {fontSize: 18, fontWeight: '600', marginBottom: 12},
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 6,
//   },
//   label: {fontSize: 16, color: '#555'},
//   value: {fontSize: 16, color: '#111'},
//   labelTotal: {fontSize: 18, fontWeight: 'bold'},
//   valueTotal: {fontSize: 18, fontWeight: 'bold'},
//   checkoutBtn: {
//     marginTop: 16,
//     backgroundColor: '#3ac5b9',
//     padding: 14,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   checkoutText: {color: '#fff', fontWeight: '600', fontSize: 16},
//   clearBtn: {
//     marginTop: 0,
//     padding: 10,
//     backgroundColor: '#ffe5e5',
//     alignItems: 'center',
//     borderRadius: 8,
//   },
//   clearText: {color: '#cc0000', fontWeight: '600'},
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: 200,
//   },
//   emptyText: {fontSize: 18, color: '#666'},
//   list: {paddingBottom: 0},

//   cardD: {
//     width: 200,
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     marginRight: 15,
//     overflow: 'hidden',
//     // shadowColor: '#000',
//     // shadowOpacity: 0.1,
//     // shadowOffset: {width: 0, height: 2},
//     shadowRadius: 4,
//     // elevation: 3,
//   },
//   imageContainerD: {
//     position: 'relative',
//     backgroundColor: '#f4f4f4',
//   },
//   imageD: {
//     width: '100%',
//     height: 250,
//     resizeMode: 'stretch',
//   },
//   refurbishedLabelD: {
//     position: 'absolute',
//     alignSelf: 'center',
//     fontSize: 12,
//     color: '#000',
//     backgroundColor: '#EAE6E5',
//     width: '98%',
//     textAlign: 'center',
//     padding: 5,
//   },
//   heartIconD: {
//     position: 'absolute',
//     top: 25,
//     right: 6,
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 5,
//     elevation: 2,
//   },
//   badgeTextD: {
//     color: '#fff',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   gradeBoxD: {
//     paddingVertical: 2,
//     position: 'absolute',
//     marginTop: 225,
//     alignSelf: 'center',
//     backgroundColor: '#fff',
//     width: '92%',
//     borderRadius: 10,
//     borderWidth: 0.2,
//   },
//   gradeTextD: {
//     fontSize: 12,
//     fontWeight: '500',
//     color: '#555',
//     textAlign: 'center',
//   },
//   productNameD: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginTop: 6,
//     marginHorizontal: 10,
//     color: '#000',
//   },
//   colorTextD: {
//     fontSize: 13,
//     color: '#000',
//     marginHorizontal: 10,
//     marginTop: 2,
//   },
//   priceRowD: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginHorizontal: 10,
//     marginTop: 4,
//     marginBottom: 10,
//   },
//   priceD: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#000',
//     marginRight: 6,
//   },
//   originalPriceD: {
//     fontSize: 13,
//     color: '#888',
//     textDecorationLine: 'line-through',
//   },

//   carousel: {
//     paddingBottom: 16,
//     gap: 12,
//   },
//   card: {
//     width: Dimensions.get('window').width * 0.95,
//     padding: 16,
//     borderRadius: 16,
//     minHeight: 100,
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   titleS: {
//     fontSize: 18,
//     fontWeight: '700',
//     flex: 1,
//     paddingRight: 10,
//   },
//   subtitle: {
//     fontSize: 13,
//     marginVertical: 10,
//     width: '50%',
//   },
//   iconCircle: {
//     backgroundColor: '#ffffff20',
//     padding: 6,
//     borderRadius: 20,
//   },
//   button: {
//     alignSelf: 'flex-start',
//     paddingHorizontal: 16,
//     paddingVertical: 6,
//     borderRadius: 20,
//     marginTop: 35,
//   },
//   buttonText: {
//     fontWeight: '600',
//     fontSize: 12,
//     color: '#000',
//   },
//   footer: {
//     marginTop: 5,
//     gap: 12,
//     marginBottom:5,
//   },
//   footerBtn: {
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginTop:5,
//   },
//   footerBtnText: {
//     color: '#fff',
//     fontWeight: '700',
//     fontSize: 16,
//   },
// });

// export default Cart;

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
        onPress={() => dispatch(removeFromCartAPI(item.barcode_id))}
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
                onPress={() => dispatch(clearCartAPI())}>
                <Text style={styles.clearText}>🗑️ Clear Cart</Text>
              </TouchableOpacity>
            </>
          )}
          {/* KYC Section */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carousel}>
            {data?.vendordocuments?.aadhaar_no ? (
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
      <View style={{marginHorizontal: 10}}>
        <TouchableOpacity
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
