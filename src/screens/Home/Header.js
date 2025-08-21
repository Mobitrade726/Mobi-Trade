import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const Header = ({navigation}) => {
  return (
    <View
      style={{
        backgroundColor: '#1ca147',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 16,
        justifyContent: 'space-between',
      }}>
      <Text
        style={{
          color: 'white',
          fontSize: 20,
          fontWeight: 'bold',
          letterSpacing: 1,
        }}>
        MOBI TRADE
      </Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            borderRadius: 20,
            paddingHorizontal: 16,
            paddingVertical: 10,
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 12,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 2,
          }}>
          <MaterialCommunityIcons name="cube-outline" size={24} color="#555" />
          <Text
            style={{
              fontSize: 16,
              marginLeft: 8,
              color: '#333',
              fontWeight: '500',
            }}>
            Bulk Deals
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <EvilIcons name="search" size={45} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
