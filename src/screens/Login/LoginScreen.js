import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  useColorScheme,
  StatusBar,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {API_BASE_URL} from '../../utils/utils';
import DeviceInfo from 'react-native-device-info';
import Geolocation from 'react-native-geolocation-service';

const LoginScreen = ({navigation}) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  // ✅ Validation
  const validateInputs = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!emailOrPhone.trim()) {
      newErrors.emailOrPhone = 'Email or phone is required';
    } else if (
      !emailRegex.test(emailOrPhone.trim()) &&
      !phoneRegex.test(emailOrPhone.trim())
    ) {
      newErrors.emailOrPhone = 'Enter a valid email or phone';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'App needs access to your location for secure login.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const auth = await Geolocation.requestAuthorization('whenInUse');
        return auth === 'granted';
      }
    } catch (err) {
      console.warn('Permission Error:', err);
      return false;
    }
  };

  const getLocation = () =>
    new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => resolve(position.coords),
        error => reject(error),
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    });

  const handleLogin = async () => {
    const isValid = validateInputs();
    if (!isValid) return;

    setLoading(true);

    try {
      // 1️⃣ Request location permission
      const permissionGranted = await requestLocationPermission();

      let loc = null;
      let addr = null;

      // 2️⃣ Get device info
      const deviceType = DeviceInfo.getSystemName();
      const deviceId = DeviceInfo.getUniqueId();

      if (permissionGranted) {
        try {
          // 3️⃣ Get location
          loc = await getLocation();

          // 4️⃣ Reverse geocoding
          // const response = await axios.get(
          //   `https://nominatim.openstreetmap.org/reverse?format=json&lat=${loc.latitude}&lon=${loc.longitude}&zoom=10&addressdetails=1`,
          //   {
          //     headers: {'User-Agent': 'MyApp/2.1 (contactssss@myapp.com)'},
          //   },
          // );

          const response = await axios.get(
            'https://nominatim.openstreetmap.org/reverse',
            {
              params: {
                format: 'json',
                lat: loc.latitude,
                lon: loc.longitude,
                zoom: 10,
                addressdetails: 1,
                email: 'support@yourapp.com', // ✅ recommended by Nominatim
              },
              timeout: 12000,
            },
          );

          const addressData = response.data.address;
          addr = {
            city:
              addressData?.city ||
              addressData?.town ||
              addressData?.village ||
              addressData?.hamlet ||
              'Unknown',
            state: addressData?.state || 'Unknown',
          };
        } catch (error) {
          console.log('Location/address fetch error:', error.message);
        }
      }

      // 5️⃣ Call login API
      const response = await axios.post(`${API_BASE_URL}/buyer/login`, {
        email: emailOrPhone,
        password: password,
        device_type: deviceType,
        city: addr?.city,
        state: addr?.state,
        device_id: deviceId?._j,
      });
      if (response.data.status === true) {
        await AsyncStorage.setItem('TOKEN', response.data.data.token);
        await AsyncStorage.setItem('DEVICEID', deviceId?._j);
        await AsyncStorage.setItem(
          'USERID',
          JSON.stringify(response.data.data.user_id),
        );
        Toast.show({type: 'success', text2: response.data.message});
        navigation.navigate('BottomNavigator');
      } else {
        Toast.show({
          type: 'error',
          text2: response.data.message || 'Invalid credentials',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text2: error?.response?.data?.message || error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="dark-content"
      />
      <SafeAreaView style={styles.container}>
        <View style={{marginHorizontal: 10}}>
          {/* Back Arrow */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-outline"
              size={24}
              style={{
                backgroundColor: '#fff',
                borderRadius: 20,
                padding: 6,
              }}
            />
          </TouchableOpacity>

          <Text style={styles.title}>Hey!</Text>

          {/* Email or Phone */}
          <TextInput
            style={[styles.input, errors.emailOrPhone && {borderColor: 'red'}]}
            placeholder="Email or Phone"
            placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
            value={emailOrPhone}
            onChangeText={setEmailOrPhone}
          />
          {errors.emailOrPhone && (
            <Text style={styles.errorText}>{errors.emailOrPhone}</Text>
          )}

          {/* Password */}
          {/* <TextInput
            style={[styles.input, errors.password && {borderColor: 'red'}]}
            placeholder="Password"
            placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )} */}

          <View style={{position: 'relative'}}>
            <TextInput
              style={[styles.input, errors.password && {borderColor: 'red'}]}
              placeholder="Password"
              placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
              secureTextEntry={!showPassword} // 👈 Hide/Show logic
              value={password}
              onChangeText={setPassword}
            />

            {/* 👁️ Password Toggle Button */}
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 15,
                top: 18,
              }}
              onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={22}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          {/* Error Message */}
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          {/* Forgot Password */}
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgetPassword')}
            style={styles.forgotContainer}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            style={styles.loginButton}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginText}>Log in</Text>
            )}
          </TouchableOpacity>

          {/* Sign Up */}
          <TouchableOpacity
            onPress={() => navigation.navigate('LandingPage')}
            style={styles.signupButton}>
            <Text style={styles.signupText}>Sign up</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('LandingPage')}>
            <Text style={styles.bottomText}>New here? Create an Account?</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default LoginScreen;
