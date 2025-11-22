// // import React, {useState, useEffect} from 'react';
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   SafeAreaView,
// //   ActivityIndicator,
// //   useColorScheme,
// //   StatusBar,
// //   PermissionsAndroid,
// //   Platform,
// // } from 'react-native';
// // import Ionicons from 'react-native-vector-icons/Ionicons';
// // import styles from './styles';
// // import axios from 'axios';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import Toast from 'react-native-toast-message';
// // import {API_BASE_URL} from '../../utils/utils';
// // import DeviceInfo from 'react-native-device-info';
// // import Geolocation from 'react-native-geolocation-service';

// // const LoginScreen = ({navigation}) => {
// //   const [emailOrPhone, setEmailOrPhone] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [errors, setErrors] = useState({});
// //   const [submitted, setSubmitted] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [location, setLocation] = useState(null);
// //   const [address, setAddress] = useState(null);
// //   const [devicetype, setDeviceType] = useState(null);
// //   const colorScheme = useColorScheme();
// //   const isDarkMode = colorScheme === 'dark';

// //   console.log("location-------->", location?.latitude);
// //   console.log("address-------->", address);
// //   console.log("devicetype-------->", devicetype);

// //   // ✅ Validation logic reused
// //   const validateInputs = (email = emailOrPhone, pass = password) => {
// //     const newErrors = {};
// //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //     const phoneRegex = /^[0-9]{10}$/;

// //     if (!email.trim()) {
// //       newErrors.emailOrPhone = 'Email or phone is required';
// //     } else if (
// //       !emailRegex.test(email.trim()) &&
// //       !phoneRegex.test(email.trim())
// //     ) {
// //       newErrors.emailOrPhone = 'Enter a valid email or phone';
// //     }

// //     if (!pass.trim()) {
// //       newErrors.password = 'Password is required';
// //     } else if (pass.length < 6) {
// //       newErrors.password = 'Password must be at least 6 characters';
// //     }

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   // ✅ Real-time validation if form was submitted
// //   useEffect(() => {
// //     if (submitted) {
// //       validateInputs();
// //       getDeviceAndLocation();
// //       requestLocationPermission();
// //     }
// //   }, [emailOrPhone, password]);

// //   async function requestLocationPermission() {
// //     if (Platform.OS === 'android') {
// //       const granted = await PermissionsAndroid.request(
// //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
// //       );
// //       return granted === PermissionsAndroid.RESULTS.GRANTED;
// //     }
// //     return true;
// //   }

// //   const getDeviceAndLocation = async () => {
// //     const systemName = await DeviceInfo.getSystemName();
// //     setDeviceType(systemName);
// //     Geolocation.getCurrentPosition(
// //       async position => {
// //         const {latitude, longitude} = position.coords;
// //         setLocation({latitude, longitude});

// //         // 🌍 OpenStreetMap Reverse Geocoding
// //         try {
// //           const response = await axios.get(
// //             `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
// //           );
// //           console.log("address resp====================", response);
// //           const {address} = response.data;
// //           setAddress({
// //             city: address.city || address.town || address.village,
// //             state: address.state,
// //           });
// //         } catch (error) {
// //           console.log('Error fetching address', error);
// //         }
// //       },
// //       error => {
// //         console.log(error);
// //       },
// //       {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
// //     );
// //   };

// //   const handleLogin = async () => {
// //     setSubmitted(true);
// //     const isValid = validateInputs();

// //     if (!isValid) return;

// //     try {
// //       setLoading(true);
// //       const response = await axios.post(API_BASE_URL + 'buyer/login', {
// //         email: emailOrPhone,
// //         password: password,
// //       });

// //       if (response.data.status === true) {
// //         await AsyncStorage.setItem('TOKEN', response.data.data.token);
// //         await AsyncStorage.setItem(
// //           'USERID',
// //           JSON.stringify(response.data.data.user_id),
// //         );
// //         Toast.show({type: 'success', text2: response.data.message});
// //         navigation.navigate('BottomNavigator');
// //       } else {
// //         Toast.show({
// //           type: 'error',
// //           text2: response.data.message || 'Invalid credentials',
// //         });
// //       }
// //     } catch (error) {
// //       Toast.show({
// //         type: 'error',
// //         text2: error?.response?.data?.message || error.message,
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <StatusBar barStyle="dark-content" backgroundColor="#f0fefa" />

// //       <View style={{marginHorizontal: 10}}>
// //         {/* Back Arrow */}
// //         <TouchableOpacity
// //           style={styles.backButton}
// //           onPress={() => navigation.goBack()}>
// //           <Ionicons
// //             name="chevron-back-outline"
// //             size={24}
// //             style={{
// //               backgroundColor: '#fff',
// //               borderRadius: 20,
// //               padding: 6,
// //             }}
// //           />
// //         </TouchableOpacity>

// //         <Text style={styles.title}>Hey!</Text>

// //         {/* Email or Phone */}
// //         <TextInput
// //           style={[styles.input, errors.emailOrPhone && {borderColor: 'red'}]}
// //           placeholder="Email or Phone"
// //           placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
// //           value={emailOrPhone}
// //           onChangeText={setEmailOrPhone}
// //         />
// //         {errors.emailOrPhone && (
// //           <Text style={styles.errorText}>{errors.emailOrPhone}</Text>
// //         )}

// //         {/* Password */}
// //         <TextInput
// //           style={[styles.input, errors.password && {borderColor: 'red'}]}
// //           placeholder="Password"
// //           placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
// //           secureTextEntry
// //           value={password}
// //           onChangeText={setPassword}
// //         />
// //         {errors.password && (
// //           <Text style={styles.errorText}>{errors.password}</Text>
// //         )}

// //         {/* Forgot Password */}
// //         <TouchableOpacity
// //           onPress={() => navigation.navigate('ForgetPassword')}
// //           style={styles.forgotContainer}>
// //           <Text style={styles.forgotText}>Forgot Password?</Text>
// //         </TouchableOpacity>

// //         {/* Login Button */}
// //         <TouchableOpacity
// //           onPress={handleLogin}
// //           style={styles.loginButton}
// //           disabled={loading}>
// //           {loading ? (
// //             <ActivityIndicator color="#fff" />
// //           ) : (
// //             <Text style={styles.loginText}>Log in</Text>
// //           )}
// //         </TouchableOpacity>

// //         {/* Sign Up */}
// //         <TouchableOpacity
// //           onPress={() => navigation.navigate('LandingPage')}
// //           style={styles.signupButton}>
// //           <Text style={styles.signupText}>Sign up</Text>
// //         </TouchableOpacity>

// //         <TouchableOpacity onPress={() => navigation.navigate('LandingPage')}>
// //           <Text style={styles.bottomText}>New here? Create an Account?</Text>
// //         </TouchableOpacity>
// //       </View>
// //     </SafeAreaView>
// //   );
// // };

// // export default LoginScreen;

// // // import React, {useEffect, useState} from 'react';
// // // import {View, Text, PermissionsAndroid, Platform} from 'react-native';
// // // import Geolocation from 'react-native-geolocation-service';
// // // import axios from 'axios';

// // // const CurrentLocation = () => {
// // //   const [location, setLocation] = useState(null);
// // //   const [address, setAddress] = useState(null);

// // //   useEffect(() => {
// // //     const requestPermission = async () => {
// // //       if (Platform.OS === 'android') {
// // //         const granted = await PermissionsAndroid.request(
// // //           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
// // //         );
// // //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
// // //           getLocation();
// // //         } else {
// // //           console.log('Permission denied');
// // //         }
// // //       } else {
// // //         getLocation();
// // //       }
// // //     };

// // //     requestPermission();
// // //   }, []);

// // // const getLocation = () => {
// // //   Geolocation.getCurrentPosition(
// // //     async position => {
// // //       const {latitude, longitude} = position.coords;
// // //       setLocation({latitude, longitude});

// // //       // 🌍 OpenStreetMap Reverse Geocoding
// // //       try {
// // //         const response = await axios.get(
// // //           `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`
// // //         );

// // //         const {address} = response.data;
// // //         setAddress({
// // //           city: address.city || address.town || address.village,
// // //           state: address.state,
// // //         });
// // //       } catch (error) {
// // //         console.log('Error fetching address', error);
// // //       }
// // //     },
// // //     error => {
// // //       console.log(error);
// // //     },
// // //     {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
// // //   );
// // // };

// // //   return (
// // //     <View style={{padding: 20}}>
// // //       {location && (
// // //         <Text>
// // //           Lat: {location.latitude}, Lng: {location.longitude}
// // //         </Text>
// // //       )}
// // //       {address && (
// // //         <Text>
// // //           City: {address.city} | State: {address.state}
// // //         </Text>
// // //       )}
// // //     </View>
// // //   );
// // // };

// // // export default CurrentLocation;

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   SafeAreaView,
//   ActivityIndicator,
//   useColorScheme,
//   StatusBar,
//   PermissionsAndroid,
//   Platform,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import styles from './styles';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Toast from 'react-native-toast-message';
// import {API_BASE_URL} from '../../utils/utils';
// import DeviceInfo from 'react-native-device-info';
// import Geolocation from 'react-native-geolocation-service';

// const LoginScreen = ({navigation}) => {
//   const [emailOrPhone, setEmailOrPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [errors, setErrors] = useState({});
//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [location, setLocation] = useState(null);
//   const [address, setAddress] = useState(null);
//   const [devicetype, setDeviceType] = useState(null);
//   const [device_id, setDeviceId] = useState(null);
//   const colorScheme = useColorScheme();
//   const isDarkMode = colorScheme === 'dark';

//   console.log('location-------->', location?.latitude, location?.longitude);
//   console.log('address-------->', address);
//   console.log('devicetype-------->', devicetype);
//   console.log('deviceId-------->', device_id);

//   // ✅ Validation
//   const validateInputs = (email = emailOrPhone, pass = password) => {
//     const newErrors = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phoneRegex = /^[0-9]{10}$/;

//     if (!email.trim()) {
//       newErrors.emailOrPhone = 'Email or phone is required';
//     } else if (
//       !emailRegex.test(email.trim()) &&
//       !phoneRegex.test(email.trim())
//     ) {
//       newErrors.emailOrPhone = 'Enter a valid email or phone';
//     }

//     if (!pass.trim()) {
//       newErrors.password = 'Password is required';
//     } else if (pass.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   async function requestLocationPermission() {
//     if (Platform.OS === 'android') {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     }
//     return true;
//   }

//   const getDeviceAndLocation = async () => {
//     const systemName = await DeviceInfo.getSystemName();
//     const deviceId = await DeviceInfo.getUniqueId();
//     setDeviceType(systemName);
//     setDeviceId(deviceId);

//     Geolocation.getCurrentPosition(
//       async position => {
//         const {latitude, longitude} = position.coords;
//         setLocation({latitude, longitude});

//         // ✅ Reverse Geocoding with User-Agent
//         try {
//           const response = await axios.get(
//             `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
//             {
//               headers: {
//                 'User-Agent': 'MyApp/1.0 (contact@myapp.com)', // Required
//               },
//             },
//           );

//           console.log('address resp====================', response.data);

//           const {address} = response.data;
//           setAddress({
//             city:
//               address?.city ||
//               address?.town ||
//               address?.village ||
//               address?.hamlet ||
//               'Unknown',
//             state: address?.state || 'Unknown',
//           });
//         } catch (error) {
//           console.log('Error fetching address', error?.message);
//         }
//       },
//       error => {
//         console.log('Location error:', error);
//       },
//       {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
//     );
//   };

//   useEffect(() => {
//     if (submitted) {
//       validateInputs();
//       getDeviceAndLocation();
//       requestLocationPermission();
//     }
//   }, [emailOrPhone, password]);

//   const handleLogin = async () => {
//     setSubmitted(true);
//     const isValid = validateInputs();

//     if (!isValid) return;

//     try {
//       setLoading(true);
//       const response = await axios.post(API_BASE_URL + 'buyer/login', {
//         email: emailOrPhone,
//         password: password,
//         device_type: devicetype,
//         latitude: location?.latitude,
//         longitude: location?.longitude,
//         city: address?.city,
//         state: address?.state,
//         device_id: device_id,
//       });

//       if (response.data.status === true) {
//         await AsyncStorage.setItem('TOKEN', response.data.data.token);
//         await AsyncStorage.setItem(
//           'USERID',
//           JSON.stringify(response.data.data.user_id),
//         );
//         Toast.show({type: 'success', text2: response.data.message});
//         navigation.navigate('BottomNavigator');
//       } else {
//         Toast.show({
//           type: 'error',
//           text2: response.data.message || 'Invalid credentials',
//         });
//       }
//     } catch (error) {
//       console.log('err++++++++++', error?.response?.data);
//       Toast.show({
//         type: 'error',
//         text2: error?.response?.data?.message || error.message,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#f0fefa" />

//       <View style={{marginHorizontal: 10}}>
//         {/* Back Arrow */}
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => navigation.goBack()}>
//           <Ionicons
//             name="chevron-back-outline"
//             size={24}
//             style={{
//               backgroundColor: '#fff',
//               borderRadius: 20,
//               padding: 6,
//             }}
//           />
//         </TouchableOpacity>

//         <Text style={styles.title}>Hey!</Text>

//         {/* Email or Phone */}
//         <TextInput
//           style={[styles.input, errors.emailOrPhone && {borderColor: 'red'}]}
//           placeholder="Email or Phone"
//           placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
//           value={emailOrPhone}
//           onChangeText={setEmailOrPhone}
//         />
//         {errors.emailOrPhone && (
//           <Text style={styles.errorText}>{errors.emailOrPhone}</Text>
//         )}

//         {/* Password */}
//         <TextInput
//           style={[styles.input, errors.password && {borderColor: 'red'}]}
//           placeholder="Password"
//           placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
//           secureTextEntry
//           value={password}
//           onChangeText={setPassword}
//         />
//         {errors.password && (
//           <Text style={styles.errorText}>{errors.password}</Text>
//         )}

//         {/* Forgot Password */}
//         <TouchableOpacity
//           onPress={() => navigation.navigate('ForgetPassword')}
//           style={styles.forgotContainer}>
//           <Text style={styles.forgotText}>Forgot Password?</Text>
//         </TouchableOpacity>

//         {/* Login Button */}
//         <TouchableOpacity
//           onPress={handleLogin}
//           style={styles.loginButton}
//           disabled={loading}>
//           {loading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.loginText}>Log in</Text>
//           )}
//         </TouchableOpacity>

//         {/* Sign Up */}
//         <TouchableOpacity
//           onPress={() => navigation.navigate('LandingPage')}
//           style={styles.signupButton}>
//           <Text style={styles.signupText}>Sign up</Text>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => navigation.navigate('LandingPage')}>
//           <Text style={styles.bottomText}>New here? Create an Account?</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default LoginScreen;

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
        console.log('iOS Location Permission:', auth);
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
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${loc.latitude}&lon=${loc.longitude}&zoom=10&addressdetails=1`,
            {
              headers: {'User-Agent': 'MyApp/2.1 (contactssss@myapp.com)'},
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

      console.log('location-------->', loc?.latitude, loc?.longitude);
      console.log('address-------->', addr);
      console.log('devicetype-------->', deviceType);
      console.log('deviceId-------->', deviceId?._j);

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
      console.log('err++++++++++', error?.response?.data);
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
          <TextInput
            style={[styles.input, errors.password && {borderColor: 'red'}]}
            placeholder="Password"
            placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
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
