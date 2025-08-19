import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  useColorScheme,
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
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  // ✅ Validation logic reused
  const validateInputs = (email = emailOrPhone, pass = password) => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!email.trim()) {
      newErrors.emailOrPhone = 'Email or phone is required';
    } else if (
      !emailRegex.test(email.trim()) &&
      !phoneRegex.test(email.trim())
    ) {
      newErrors.emailOrPhone = 'Enter a valid email or phone';
    }

    if (!pass.trim()) {
      newErrors.password = 'Password is required';
    } else if (pass.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Real-time validation if form was submitted
  useEffect(() => {
    if (submitted) {
      validateInputs();
    }
  }, [emailOrPhone, password]);

  const handleLogin = async () => {
    setSubmitted(true);
    const isValid = validateInputs();

    if (!isValid) return;

    try {
      setLoading(true);
      const response = await axios.post(API_BASE_URL + 'buyer/login', {
        email: emailOrPhone,
        password: password,
      });

      if (response.data.status === true) {
        await AsyncStorage.setItem('TOKEN', response.data.data.token);
        Toast.show({type: 'success', text2: response.data.message});
        navigation.navigate('BottomNavigator');
      } else {
        Toast.show({type: 'error', text2: response.data.message || 'Invalid credentials'});
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
              shadowRadius: 2,
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
        {errors.emailOrPhone && <Text style={styles.errorText}>{errors.emailOrPhone}</Text>}

        {/* Password */}
        <TextInput
          style={[styles.input, errors.password && {borderColor: 'red'}]}
          placeholder="Password"
          placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

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
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.loginText}>Log in</Text>}
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
  );
};

export default LoginScreen;
