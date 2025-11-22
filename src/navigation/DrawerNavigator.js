import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import StackNavigator from './StackNavigator';
import CustomDrawerContent from './CustomDrawerContent';
import Toast from 'react-native-toast-message';
import App from '../redux/App';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <NavigationContainer>
      <StackNavigator/>
      <Toast />
    </NavigationContainer>
  );
};

export default DrawerNavigator;
