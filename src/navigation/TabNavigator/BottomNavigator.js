import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Home from '../../screens/Home/Home';
import Account from './Account/Account';
import Discover from './Discover/Discover';
import {Image} from 'react-native';
import WatchList from '../TabNavigator/Account/Watchlist/WatchList';
import Cart from './Cart/Cart';
import Categories from '../../screens/Home/Categories/Categories';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          if (route.name === 'Category') {
            return (
              <Image
                source={require('../../../assets/images/cat.png')} // Update path to your image
                style={{width: size, height: size, tintColor: color}}
              />
            );
          } else if (route.name === 'Home') {
            return <Ionicons name="home-outline" size={size} color={color} />;
          } else if (route.name === 'Account') {
            return <AntDesign name="user" size={size} color={color} />;
          } else if (route.name === 'Wishlist') {
            return <AntDesign name="hearto" size={size} color={color} />;
          } else if (route.name === 'Cart') {
            return <AntDesign name="shoppingcart" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: '#00b894',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Category" component={Categories} />
      <Tab.Screen name="Wishlist" component={WatchList} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
