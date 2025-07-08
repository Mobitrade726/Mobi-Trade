import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Home from '../../screens/Home/Home';
import Account from './Account/Account';
import Discover from './Discover/Discover';
import {Image} from 'react-native';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          if (route.name === 'Discover') {
            return (
              <Image
                source={require('../../../assets/images/ShopIcon.png')} // Update path to your image
                style={{width: size, height: size, tintColor: color}}

              />
            );
          } else if (route.name === 'Home') {
            return <Ionicons name="home-outline" size={size} color={color} />;
          } else if (route.name === 'Account') {
            return <AntDesign name="user" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: '#00b894',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Discover" component={Discover} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
