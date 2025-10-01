import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute} from '@react-navigation/native';
import Android from './Android/Android';
import iOS from './iOS/iOS';
import WindowsOS from './WindowsOS/WindowsOS';
import MacOS from './MacOS/MacOS';

const Tab = createMaterialTopTabNavigator();

const CategoriesSmartphones = ({navigation, route}) => {
    const { initialTab } = route.params || {}; // Get passed param

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Ionicons name="chevron-back" size={22} color="#000" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}></Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Top Tabs */}
      <Tab.Navigator
        initialRouteName={initialTab} // 👈 this activates correct tab
        screenOptions={{
          tabBarLabelStyle: {fontSize: 12},
          tabBarActiveTintColor: '#2E8BFF',
          tabBarInactiveTintColor: '#aaa',
          tabBarIndicatorStyle: {
            backgroundColor: '#2E8BFF',
            height: 2,
          },
        }}>
        <Tab.Screen name="Android" component={Android} />
        <Tab.Screen name="iOS" component={iOS} />
        <Tab.Screen name="WindowsOS" component={WindowsOS} />
        <Tab.Screen name="MacOS" component={MacOS} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  backButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    padding: 6,
    left: 0,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
});

export default CategoriesSmartphones;
