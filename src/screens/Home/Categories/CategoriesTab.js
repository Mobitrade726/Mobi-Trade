import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import Signup from './Signup';
import Signup_Address from '../../SignupScreen/Signup_Address';
import Signup from '../../SignupScreen/Signup';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute} from '@react-navigation/native';
import Android from './Android';
import iOS from './iOS';
import WindowsOS from './WindowsOS';
import MacOS from './MacOS';
import Accessories from './Accessories';

const Tab = createMaterialTopTabNavigator();

const SignUpTab = ({navigation}) => {
  const route = useRoute();
  const accountType = route?.params?.accountType;
  const catEdit = route?.params?.cat;
  const profileData = route?.params?.profileEdit;

  const derivedAccountType = accountType
    ? accountType
    : catEdit === 'vendor_customer'
    ? 'individual'
    : catEdit
    ? 'business'
    : '';

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      {/* <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.backIcon}>
            <Ionicons name="chevron-back" size={24} color="#333" />
          </View>
        </TouchableOpacity>
        {accountType ? (
          <Text style={styles.title}>Register as {accountType}</Text>
        ) : catEdit ? (
          <Text style={styles.title}>
            Register as{' '}
            {catEdit === 'vendor_customer' ? 'individual' : 'business'}
          </Text>
        ) : null}
        <View style={{width: 24}} /> 
      </View> */}

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Ionicons name="chevron-back" size={22} color="#000" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Smartphones</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Top Tabs */}
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 12,
          },
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
        {/* <Tab.Screen name="Accessories" component={Accessories} /> */}
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

export default SignUpTab;
