import {StyleSheet, View, Image, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = () => {
  const navigation = useNavigation();

  setTimeout(async () => {
    const token = await AsyncStorage.getItem('TOKEN');
    console.log("---------------------------------->",token)
    if (token !== null) {
      navigation.navigate('BottomNavigator');
    } else {
      navigation.navigate('OnboardingScreen');
    }
  }, 1000);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Image
          source={require('../../../assets/images/Logo.png')}
          style={styles.logo}
        />
      </View>
    </>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '75%',
    resizeMode: 'contain',
  },
});
