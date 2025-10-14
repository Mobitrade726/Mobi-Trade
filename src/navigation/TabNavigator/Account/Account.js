// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   ScrollView,
// } from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/Ionicons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import DeviceInfo from 'react-native-device-info';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import Toast from 'react-native-toast-message';
// import {API_BASE_URL} from '../../../utils/utils';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// const ProfileScreen = ({navigation}) => {
//   const [appVersion, setAppVersion] = useState('');
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [cat, setCat] = useState('');
//   const [data, setData] = useState('');

//   useEffect(() => {
//     const fetchVersionAndProfile = async () => {
//       const version = await DeviceInfo.getVersion();
//       setAppVersion(version);

//       try {
//         const token = await AsyncStorage.getItem('TOKEN');
//         const response = await axios.get(`${API_BASE_URL}/profile`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         if (response.data?.status === true) {
//           const profile = response.data.data;
//           setName(profile?.customer_name || '');
//           setEmail(profile?.email || '');
//           setCat(profile?.vendor_category || '');
//           setData(response?.data?.data || '');
//         }
//       } catch (error) {
//         console.error(
//           'Profile API Error:',
//           error.response?.data || error.message,
//         );
//       }
//     };

//     fetchVersionAndProfile();
//   }, []);

//   const options = [
//     {
//       label: 'My Orders',
//       image: require('../../../../assets/images/OrdersIcon.png'),
//       screen: 'Myorder',
//     },
//     {
//       label: 'KYC Status',
//       image: require('../../../../assets/images/kycstatus.png'),
//       screen: 'KYCStatus',
//     },
//     {
//       label: 'Wishlist',
//       image: require('../../../../assets/images/WishlistIcon.png'),
//       screen: 'WatchList',
//     },
//     {
//       label: 'My Wallet',
//       image: require('../../../../assets/images/wallet.png'),
//       screen: 'Wallet',
//     },
//     {
//       label: 'Saved Addresses',
//       image: require('../../../../assets/images/AddressIcon.png'),
//       screen: 'Addresses',
//     },
//     {
//       label: 'Help Centre',
//       image: require('../../../../assets/images/HelpIcon.png'),
//       subtext: 'FAQs',
//       screen: 'HelpSupport',
//     },
//     // {
//     //   label: 'Warranty Tracking',
//     //   image: require('../../../../assets/images/HelpIcon.png'),
//     //   subtext: 'Search by IMEI No. / Order Id',
//     //   screen: 'Warranty',
//     // },
//     // {
//     //   label: 'Chat Support',
//     //   image: require('../../../../assets/images/HelpIcon.png'),
//     //   subtext: 'Raise an issue',
//     //   screen: 'ChatSupport',
//     // },
//     {
//       label: 'About',
//       image: require('../../../../assets/images/about.png'),
//       subtext: `App Version: v${appVersion}`,
//       screen: 'AboutMobiTrade',
//     },
//     {
//       label: 'Settings',
//       image: require('../../../../assets/images/setting.png'),
//       screen: 'Settings',
//     },
//   ];

//   const handleNavigation = screen => {
//     if (screen) {
//       navigation.navigate(screen, {
//         cat: cat,
//         profileEdit: data,
//       });
//     }
//   };

//   const handleLogout = async () => {
//     const token = await AsyncStorage.getItem('TOKEN');
//     const device_id = await AsyncStorage.getItem('DEVICEID');
//     const user_id = await AsyncStorage.getItem('USERID');
//     console.log("token------------->", device_id, user_id);
//     try {
//       if (!token) {
//         Toast.show({type: 'error', text2: 'No token found'});
//         return;
//       }

//       const response = await axios.post(`${API_BASE_URL}/logout`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       if (response?.data?.status === true) {
//         await AsyncStorage.clear();

//         Toast.show({
//           type: 'success',
//           text2: response.data.message || 'Logged out successfully',
//         });

//         navigation.reset({
//           index: 0,
//           routes: [{name: 'LoginScreen'}],
//         });
//       } else {
//         console.log("response------------->", response?.data?.data);
//         Toast.show({
//           type: 'error',
//           text2: response.data.message || 'Logout failed',
//         });
//       }
//     } catch (error) {
//               console.log("error------------->", error?.response?.data);
//       Toast.show({
//         type: 'error',
//         text2: error?.response?.data?.message || error.message,
//       });
//     }
//   };

//   return (
//     <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={styles.backButton}>
//           <Ionicons name="chevron-back" size={wp('6%')} color="#000" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Profile info</Text>
//         <TouchableOpacity onPress={() => navigation.navigate('Search')}>
//           <Ionicons name="search" size={wp('6%')} color="#333" />
//         </TouchableOpacity>
//       </View>

//       <ScrollView
//         contentContainerStyle={styles.container}
//         showsVerticalScrollIndicator={false}>
//         {/* Profile Header */}
//         <View style={styles.profileContainer}>
//           <Text style={styles.name}>{name}</Text>
//           <Text style={styles.email}>{email}</Text>
//         </View>

//         {/* Options */}
//         {options.map((item, index) => (
//           <TouchableOpacity
//             key={index}
//             onPress={() => handleNavigation(item.screen)}
//             style={styles.optionRow}>
//             <Image source={item.image} style={styles.optionImage} />
//             <View style={styles.optionTextContainer}>
//               <Text style={styles.optionLabel}>{item.label}</Text>
//               {item.subtext && (
//                 <Text style={styles.optionSubtext}>{item.subtext}</Text>
//               )}
//             </View>
//             <Icon name="chevron-forward" size={wp('5%')} color="#999" />
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       {/* Logout Button */}
//       <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
//         <Text style={styles.logoutText}>Log out</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//     marginHorizontal: wp('3%'),
//     flexGrow: 1,
//     paddingBottom: hp('2%'),
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: hp('1.5%'),
//     justifyContent: 'space-between',
//     marginHorizontal: wp('3%'),
//   },
//   backButton: {
//     backgroundColor: '#cf',
//     borderRadius: wp('6%'),
//     padding: wp('2%'),
//   },
//   headerTitle: {
//     fontSize: wp('4.5%'),
//     fontWeight: '600',
//     color: '#000',
//     textAlign: 'center',
//   },
//   profileContainer: {
//     alignItems: 'center',
//     marginBottom: hp('2%'),
//   },
//   name: {
//     fontSize: wp('5%'),
//     fontWeight: '700',
//     marginTop: hp('1%'),
//     color: '#333',
//   },
//   email: {
//     fontSize: wp('3.5%'),
//     color: '#999',
//     marginBottom: hp('1%'),
//   },
//   optionRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: hp('2%'),
//     paddingHorizontal: wp('2%'),
//     borderBottomColor: '#eee',
//     borderBottomWidth: 1,
//     borderRadius: wp('2%'),
//   },
//   optionImage: {
//     width: wp('7%'),
//     height: wp('7%'),
//     marginRight: wp('3%'),
//     resizeMode: 'contain',
//   },
//   optionTextContainer: {
//     flex: 1,
//   },
//   optionLabel: {
//     fontSize: wp('4%'),
//     fontWeight: '600',
//     color: '#222',
//   },
//   optionSubtext: {
//     fontSize: wp('3%'),
//     color: '#888',
//     marginTop: hp('0.5%'),
//   },
//   logoutBtn: {
//     backgroundColor: '#000',
//     borderRadius: wp('2%'),
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginHorizontal: wp('4%'),
//     paddingVertical: hp('2%'),
//   },
//   logoutText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: wp('4%'),
//   },
// });

// export default ProfileScreen;



import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DeviceInfo from 'react-native-device-info';
import {useSelector, useDispatch} from 'react-redux';
import { fetchProfile } from '../../../redux/slices/profileSlice';
import Toast from 'react-native-toast-message';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {data, error} = useSelector(state => state.profile);
  const [appVersion, setAppVersion] = React.useState('');

  useEffect(() => {
    const getVersion = async () => {
      const version = await DeviceInfo.getVersion();
      setAppVersion(version);
    };
    getVersion();
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      Toast.show({type: 'error', text2: error});
    }
  }, [error]);

  const options = [
    {label: 'My Orders', image: require('../../../../assets/images/OrdersIcon.png'), screen: 'Myorder'},
    {label: 'KYC Status', image: require('../../../../assets/images/kycstatus.png'), screen: 'KYCStatus'},
    {label: 'Wishlist', image: require('../../../../assets/images/WishlistIcon.png'), screen: 'WatchList'},
    {label: 'My Wallet', image: require('../../../../assets/images/wallet.png'), screen: 'Wallet'},
    {label: 'Saved Addresses', image: require('../../../../assets/images/AddressIcon.png'), screen: 'Addresses'},
    {label: 'Help Centre', image: require('../../../../assets/images/HelpIcon.png'), subtext: 'FAQs', screen: 'HelpSupport'},
    {label: 'About', image: require('../../../../assets/images/about.png'), subtext: `App Version: v${appVersion}`, screen: 'AboutMobiTrade'},
    {label: 'Settings', image: require('../../../../assets/images/setting.png'), screen: 'Settings'},
  ];

  const handleNavigation = screen => {
    if (screen) {
      navigation.navigate(screen, {
        cat: data?.vendor_category || '',
        profileEdit: data,
      });
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={wp('6%')} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile info</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={wp('6%')} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.profileContainer}>
          <Text style={styles.name}>{data?.customer_name || ''}</Text>
          <Text style={styles.email}>{data?.email || ''}</Text>
        </View>

        {options.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => handleNavigation(item.screen)} style={styles.optionRow}>
            <Image source={item.image} style={styles.optionImage} />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionLabel}>{item.label}</Text>
              {item.subtext && <Text style={styles.optionSubtext}>{item.subtext}</Text>}
            </View>
            <Icon name="chevron-forward" size={wp('5%')} color="#999" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: wp('3%'),
    flexGrow: 1,
    paddingBottom: hp('2%'),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('1.5%'),
    justifyContent: 'space-between',
    marginHorizontal: wp('3%'),
  },
  backButton: {
    backgroundColor: '#cf',
    borderRadius: wp('6%'),
    padding: wp('2%'),
  },
  headerTitle: {
    fontSize: wp('4.5%'),
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  name: {
    fontSize: wp('5%'),
    fontWeight: '700',
    marginTop: hp('1%'),
    color: '#333',
  },
  email: {
    fontSize: wp('3.5%'),
    color: '#999',
    marginBottom: hp('1%'),
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('2%'),
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    borderRadius: wp('2%'),
  },
  optionImage: {
    width: wp('7%'),
    height: wp('7%'),
    marginRight: wp('3%'),
    resizeMode: 'contain',
  },
  optionTextContainer: {
    flex: 1,
  },
  optionLabel: {
    fontSize: wp('4%'),
    fontWeight: '600',
    color: '#222',
  },
  optionSubtext: {
    fontSize: wp('3%'),
    color: '#888',
    marginTop: hp('0.5%'),
  },
  logoutBtn: {
    backgroundColor: '#000',
    borderRadius: wp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: wp('4%'),
  },
});
