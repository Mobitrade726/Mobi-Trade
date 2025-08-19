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
      {/* <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={props => <CustomDrawerContent {...props} />
      }
        screenOptions={{headerShown: false}}>
        <Drawer.Screen name="Home" component={StackNavigator} />
      </Drawer.Navigator> */}
      <StackNavigator/>
      <Toast />
    </NavigationContainer>
  );
};

export default DrawerNavigator;
