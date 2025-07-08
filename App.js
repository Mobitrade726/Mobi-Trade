import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import DrawerNavigator from './src/navigation/DrawerNavigator';

const {width} = Dimensions.get('window');

const App = () => {
  const [isConnected, setIsConnected] = useState(true);

  const checkConnection = () => {
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
    });
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  if (isConnected) {
    return <DrawerNavigator />;
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Image
          source={require('./assets/images/no-wifi.png')} // Update path as needed
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>Oops!</Text>
        <Text style={styles.message}>
          Slow or no internet connection.{'\n'}Check your internet settings.
        </Text>
        <TouchableOpacity style={styles.button} onPress={checkConnection}>
          <Text style={styles.buttonText}>Try again</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  image: {
    width: width * 0.6,
    height: 200,
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3ac5b9',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#3ac5b9',
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default App;
