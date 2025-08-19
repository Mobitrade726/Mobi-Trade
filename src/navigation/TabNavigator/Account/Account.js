import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {API_BASE_URL} from '../../../utils/utils';

const ProfileScreen = ({navigation}) => {
  const [appVersion, setAppVersion] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cat, setCat] = useState('');
  const [data, setData] = useState('');

  // useEffect(() => {
  //   const fetchVersion = async () => {
  //     const version = await DeviceInfo.getVersion();
  //     setAppVersion(version);
  //   };

  //   fetchVersion();
  // }, []);

  useEffect(() => {
    const fetchVersionAndProfile = async () => {
      const version = await DeviceInfo.getVersion();
      setAppVersion(version);

      try {
        const token = await AsyncStorage.getItem('TOKEN');
        const response = await axios.get(API_BASE_URL + 'profile', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        console.log('Profile API Response:', response.data);

        if (response.data?.status === true) {
          const profile = response.data.data;
          setName(profile?.customer_name || ''); // Adjust based on actual key name
          setEmail(profile?.email || '');
          setCat(profile?.vendor_category || '');
          setData(response?.data?.data || '');
        }
      } catch (error) {
        console.error(
          'Profile API Error:',
          error.response?.data || error.message,
        );
      }
    };

    fetchVersionAndProfile();
  }, []);

  const options = [
    {
      label: 'My Orders',
      image: require('../../../../assets/images/OrdersIcon.png'),
      screen: 'Myorder',
    },
    {
      label: 'KYC Status',
      image: require('../../../../assets/images/kycstatus.png'),
      screen: 'KYCStatus',
    },
    {
      label: 'Wishlist',
      image: require('../../../../assets/images/WishlistIcon.png'),
      screen: 'WatchList',
    },
    {
      label: 'My Wallet',
      image: require('../../../../assets/images/wallet.png'),
      screen: 'Wallet',
    },
    {
      label: 'Saved Addresses',
      image: require('../../../../assets/images/AddressIcon.png'),
      screen: 'Addresses',
    },
    {
      label: 'Help Centre',
      image: require('../../../../assets/images/HelpIcon.png'),
      subtext: 'FAQs',
      screen: 'HelpSupport',
    },
    {
      label: 'Warranty Tracking',
      image: require('../../../../assets/images/HelpIcon.png'),
      subtext: 'Search by IMEI No. / Order Id',
      screen: 'Warranty',
    },
    {
      label: 'Chat Support',
      image: require('../../../../assets/images/HelpIcon.png'),
      subtext: 'Raise an issue',
      screen: 'ChatSupport',
    },
    {
      label: 'About',
      image: require('../../../../assets/images/about.png'),
      subtext: `App Version: v${appVersion}`,
      screen: 'AboutMobiTrade',
    },
    {
      label: 'Settings',
      image: require('../../../../assets/images/setting.png'),
      screen: 'Settings',
    },
  ];

  const handleNavigation = screen => {
    if (screen) {
      navigation.navigate(screen, {
        cat: cat,
        profileEdit: data,
      });
    }
  };

  const handleLogout = async () => {
    const token = await AsyncStorage.getItem('TOKEN');
    console.log('Tsgddfhfg', token);
    try {
      if (!token) {
        Toast.show({type: 'error', text2: 'No token found'});
        return;
      }

      const response = await axios.post(
        API_BASE_URL + 'logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response?.data?.status === true) {
        // Clear token and other user info from storage
        await AsyncStorage.clear();

        Toast.show({
          type: 'success',
          text2: response.data.message || 'Logged out successfully',
        });

        // Redirect to login
        navigation.reset({
          index: 0,
          routes: [{name: 'LoginScreen'}],
        });
      } else {
        Toast.show({
          type: 'error',
          text2: response.data.message || 'Logout failed',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text2: error?.response?.data?.message || error.message,
      });
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff7f5'}}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Ionicons name="chevron-back" size={22} color="#000" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Profile info</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
          {/* <TouchableOpacity
            onPress={() =>
              navigation.navigate('SignUpTab', {
                cat: cat,
                profileEdit: data,
              })
            }>
            <Text>Edit</Text>
          </TouchableOpacity> */}
        </View>

        {/* Options */}
        {options.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleNavigation(item.screen)}
            style={styles.optionRow}>
            <Image source={item.image} style={styles.optionImage} />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionLabel}>{item.label}</Text>
              {item.subtext && (
                <Text style={styles.optionSubtext}>{item.subtext}</Text>
              )}
            </View>
            <Icon name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        ))}

        {/* Logout Button */}
        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff7f5',
    paddingBottom: 40,
    marginHorizontal:10,
    flex:1,
  },
   header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 0,
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
  profileContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    borderWidth: 1,
    padding: 20,
    borderRadius: 100,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 12,
    color: '#333',
  },
  email: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 5,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    borderRadius: 8,
  },
  optionImage: {
    width: 24,
    height: 24,
    marginRight: 15,
    resizeMode: 'contain',
  },
  optionTextContainer: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  optionSubtext: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  logoutBtn: {
    backgroundColor: '#000',
    padding: 14,
    borderRadius: 10,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfileScreen;
