// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   SafeAreaView,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import styles from './styles';

// const LoginScreen = ({navigation}) => {
//   const [emailOrPhone, setEmailOrPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     const newErrors = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phoneRegex = /^[0-9]{10}$/;

//     if (emailOrPhone.trim() === '') {
//       newErrors.emailOrPhone = 'Email or phone is required';
//     } else if (
//       !emailRegex.test(emailOrPhone.trim()) &&
//       !phoneRegex.test(emailOrPhone.trim())
//     ) {
//       newErrors.emailOrPhone = 'Enter a valid email';
//     }

//     if (password.trim() === '') {
//       newErrors.password = 'Password is required';
//     } else if (password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }

//     setErrors(newErrors);
//   }, [emailOrPhone, password]);

//   const handleLogin = () => {
//     if (Object.keys(errors).length === 0) {
//       navigation.navigate('BottomNavigator');
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
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
//               elevation: 4,
//               shadowColor: '#000',
//               shadowOffset: {width: 0, height: 2},
//               shadowOpacity: 0.3,
//               shadowRadius: 2,
//             }}
//           />
//         </TouchableOpacity>

//         {/* Header */}
//         <Text style={styles.title}>Hey!</Text>

//         {/* Email/Phone Input */}
//         <TextInput
//           style={[
//             styles.input,
//             errors.emailOrPhone && {borderColor: 'red'},
//           ]}
//           placeholder="Email or Phone"
//           placeholderTextColor="#555"
//           value={emailOrPhone}
//           onChangeText={setEmailOrPhone}
//         />
//         {errors.emailOrPhone && (
//           <Text style={styles.errorText}>{errors.emailOrPhone}</Text>
//         )}

//         {/* Password Input */}
//         <TextInput
//           style={[
//             styles.input,
//             errors.password && {borderColor: 'red'},
//           ]}
//           placeholder="Password"
//           placeholderTextColor="#555"
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
//           style={styles.loginButton}>
//           <Text style={styles.loginText}>Log in</Text>
//         </TouchableOpacity>

//         {/* Sign Up Button */}
//         <TouchableOpacity
//           onPress={() => navigation.navigate('LandingPage')}
//           style={styles.signupButton}>
//           <Text style={styles.signupText}>Sign up</Text>
//         </TouchableOpacity>

//         {/* Bottom Link */}
//         <TouchableOpacity>
//           <Text style={styles.bottomText}>New here? Create an Account?</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default LoginScreen;

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {API_BASE_URL} from '../../utils/utils';

const LoginScreen = ({navigation}) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // 👈 Add loading state

  useEffect(() => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (emailOrPhone.trim() === '') {
      newErrors.emailOrPhone = 'Email or phone is required';
    } else if (
      !emailRegex.test(emailOrPhone.trim()) &&
      !phoneRegex.test(emailOrPhone.trim())
    ) {
      newErrors.emailOrPhone = 'Enter a valid email or phone';
    }

    if (password.trim() === '') {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
  }, [emailOrPhone, password]);

  const handleLogin = async () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (emailOrPhone.trim() === '') {
      newErrors.emailOrPhone = 'Email or phone is required';
    } else if (
      !emailRegex.test(emailOrPhone.trim()) &&
      !phoneRegex.test(emailOrPhone.trim())
    ) {
      newErrors.emailOrPhone = 'Enter a valid email or phone';
    }

    if (password.trim() === '') {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      setLoading(true); // 👈 Start loading
      const body = {
        email: emailOrPhone,
        password: password,
      };

      const response = await axios.post(API_BASE_URL + 'buyer/login', body);

      if (response.data.status === true) {
        await AsyncStorage.setItem('TOKEN', response.data.data.token);

        Toast.show({
          type: 'success',
          text2: response.data.message,
        });

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
      setLoading(false); // 👈 Stop loading
    }
  };

  return (
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
              elevation: 4,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.3,
              shadowRadius: 2,
            }}
          />
        </TouchableOpacity>

        {/* Header */}
        <Text style={styles.title}>Hey!</Text>

        {/* Email/Phone Input */}
        <TextInput
          style={[styles.input, errors.emailOrPhone && {borderColor: 'red'}]}
          placeholder="Email or Phone"
          placeholderTextColor="#555"
          value={emailOrPhone}
          onChangeText={setEmailOrPhone}
        />
        {errors.emailOrPhone && (
          <Text style={styles.errorText}>{errors.emailOrPhone}</Text>
        )}

        {/* Password Input */}
        <TextInput
          style={[styles.input, errors.password && {borderColor: 'red'}]}
          placeholder="Password"
          placeholderTextColor="#555"
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
            <ActivityIndicator color="#fff" /> // 👈 Show loader
          ) : (
            <Text style={styles.loginText}>Log in</Text>
          )}
        </TouchableOpacity>

        {/* Sign Up Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate('LandingPage')}
          style={styles.signupButton}>
          <Text style={styles.signupText}>Sign up</Text>
        </TouchableOpacity>

        {/* Bottom Link */}
        <TouchableOpacity>
          <Text style={styles.bottomText}>New here? Create an Account?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
