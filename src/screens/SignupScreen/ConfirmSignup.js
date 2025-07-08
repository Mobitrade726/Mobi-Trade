import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import { scale } from 'react-native-size-matters';
import { styles_confirmSignup } from './styles';

const ConfirmSignup = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {accountType} = route.params;


  return (
    <ScrollView contentContainerStyle={styles_confirmSignup.container}>
      <StatusBar backgroundColor="#f9fdfb" barStyle="dark-content" />

      <TouchableOpacity
        style={{
          position: 'absolute',
          top: responsiveHeight(6),
          left: responsiveWidth(4),
          backgroundColor: '#e9f8f4',
          borderRadius: 20,
          padding: 6,
          elevation: 4,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.3,
          shadowRadius: 2,
        }}
        onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="#1a1a1a" />
      </TouchableOpacity>

      <Text style={styles_confirmSignup.title}>You're Registered!</Text>
      {accountType === 'individual' ? (
        <Image
          source={require('../../../assets/images/confirmsignup.png')}
          style={styles_confirmSignup.image}
          resizeMode="contain"
        />
      ) : (
        <Image
          source={require('../../../assets/images/confirmsignupreg.png')}
          style={styles_confirmSignup.image}
          resizeMode="contain"
        />
      )}

      <Text style={styles_confirmSignup.welcomeText}>Welcome to</Text>
      <Text style={styles_confirmSignup.brandText}>Mobi-Trade</Text>

      <Text style={styles_confirmSignup.description}>
        Your account has been successfully created as an {accountType} account.
        You're now ready to explore exclusive inventory!
      </Text>

      <TouchableOpacity
        style={styles_confirmSignup.loginButton}
        onPress={() => navigation.navigate('LoginScreen', { accountType: accountType })}>
        <Text style={styles_confirmSignup.loginButtonText}>Continue to Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ConfirmSignup;
