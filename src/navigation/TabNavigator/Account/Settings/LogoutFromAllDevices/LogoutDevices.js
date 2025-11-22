import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_BASE_URL} from '../../../../../utils/utils';
import Header from '../../../../../constants/Header';
import Toast from 'react-native-toast-message';

const LogoutDevices = ({navigation}) => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);

  const deviceId = devices?.[0]?.device_id;

  console.log('devices----------------------------->', devices);

  // Fetch devices from API
  const fetchDevices = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('TOKEN');
      const userId = await AsyncStorage.getItem('USERID');

      const response = await axios.get(
        `${API_BASE_URL}/buyerLoginHistory/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        },
      );

      if (response.data.status) {
        const mappedDevices = response.data.data.map((item, index) => ({
          id: item.id.toString(),
          name: item.device_type || `Device ${index + 1}`,
          location: `${item.city}, ${item.state}`,
          lastActive: item.login_time,
          image: require('../../../../../../assets/images/logouticon.png'), // Replace with your image
          device_id: item?.device_id,
        }));
        setDevices(mappedDevices);
      }
    } catch (error) {
      console.log('Error fetching devices:', error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  // Logout single device
  const handleLogoutDevice = async device_id => {
    try {
      const token = await AsyncStorage.getItem('TOKEN');
      const userId = await AsyncStorage.getItem('USERID');

      if (!token) {
        Alert.alert('Error', 'No token found. Please login again.');
        return;
      }

      if (!device_id) {
        Alert.alert('Error', 'Invalid device ID.');
        return;
      }

      Alert.alert(
        'Confirm Logout',
        'Do you want to log out from this device?',
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Yes',
            onPress: async () => {
              try {
                // Make POST request with proper body
                const response = await axios.post(
                  `${API_BASE_URL}/logout`,
                  {
                    user_id: userId,
                    device_id: device_id,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                  },
                );

                if (response.data.status) {
                  // Clear storage after logout
                  await AsyncStorage.removeItem('TOKEN');
                  await AsyncStorage.removeItem('USERID');
                  Toast.show({
                    type: 'success',
                    text2: response?.data?.message,
                  });
                  // Navigate to login
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'LoginScreen'}],
                  });
                  fetchDevices(); // Refresh devices list
                } else {
                  Alert.alert(
                    'Failed',
                    response.data.message || 'Logout failed',
                  );
                }
              } catch (err) {
                Alert.alert(
                  'Error',
                  err.response?.data?.message || 'Logout failed.',
                );
              }
            },
          },
        ],
        {cancelable: true},
      );
    } catch (error) {
      console.log('Token/Device Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  // Logout all devices
  const handleLogoutAllDevices = async () => {
    const userId = await AsyncStorage.getItem('USERID');

    Alert.alert(
      'Confirm Logout All',
      'You will be logged out of all devices. Continue?',
      [
        {text: 'No', style: 'cancel'},
        {
          text: 'Yes',
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem('TOKEN');

              const response = await axios.post(
                `${API_BASE_URL}/alllogoutdevices`,
                {user_id: userId},
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                  },
                },
              );

              if (response.data.status) {
                // Clear storage after logout
                await AsyncStorage.removeItem('TOKEN');
                await AsyncStorage.removeItem('USERID');
                Toast.show({
                  type: 'success',
                  text2: response?.data?.message,
                });
                // Navigate to login
                navigation.reset({
                  index: 0,
                  routes: [{name: 'LoginScreen'}],
                });
              } else {
                Alert.alert('Failed', response.data.message || 'Logout failed');
              }
            } catch (error) {
              console.log('Logout All Error:', error.response?.data);
              Alert.alert('Error', 'Something went wrong. Please try again.');
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <Image
        source={item.image}
        style={styles.deviceImage}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <Ionicons name="phone-portrait-outline" size={14} color="#555" />
          <Text style={styles.lastActiveText}>
            Last active: {item.lastActive}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.deviceName}>{item.name}</Text>
          {/* Logout button for this device */}
          <TouchableOpacity onPress={() => handleLogoutDevice(item.device_id)}>
            <SimpleLineIcons name="logout" size={20} color="#C84040" />
          </TouchableOpacity>
        </View>
        <Text style={styles.deviceLocation}>Location: {item.location}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header
        title="Logged-in Devices"
        navigation={navigation}
        showBack={true}
      />

      {/* Loader */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#4AB1E8"
          style={{marginTop: 30}}
        />
      ) : (
        <FlatList
          data={devices}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{padding: 16}}
          ListEmptyComponent={
            <Text style={{textAlign: 'center', marginTop: 20}}>
              No logged-in devices found.
            </Text>
          }
        />
      )}

      {/* Logout All Devices Button */}
      <TouchableOpacity
        onPress={() => handleLogoutAllDevices()}
        style={styles.logoutAllButton}>
        <SimpleLineIcons name="logout" size={18} color="#fff" />
        <Text style={styles.logoutAllText}> Log out of all devices</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LogoutDevices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDFB',
  },
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
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
  card: {
    borderWidth: 1,
    borderColor: '#4AB1E8',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  deviceImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  infoContainer: {
    marginVertical: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  lastActiveText: {
    fontSize: 10,
    color: '#666',
    fontWeight: '500',
    marginLeft: 6,
  },
  deviceName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  deviceLocation: {
    fontSize: 15,
    color: '#444',
    fontWeight: '400',
  },
  logoutAllButton: {
    flexDirection: 'row',
    backgroundColor: '#C84040',
    margin: 16,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
  },
  logoutAllText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '500',
    marginHorizontal: 8,
  },
});
