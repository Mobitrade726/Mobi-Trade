import {StyleSheet, View, Image, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

const Splash = () => {
  const navigation = useNavigation();

  setTimeout(async () => {
    const token = await AsyncStorage.getItem('TOKEN');
    if (token !== null) {
      navigation.navigate('BottomNavigator');
    } else {
      navigation.navigate('OnboardingScreen');
    }
  }, 1000);

  return (
    <>
      <LinearGradient
        colors={['#F5EFFE', '#FBFCDB']}
        locations={[0.2, 1]}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        style={styles.container}>
        <Image
          source={require('../../../assets/images/Logo.png')}
          style={styles.logo}
        />
      </LinearGradient>
    </>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: '75%',
    resizeMode: 'contain',
  },
});
