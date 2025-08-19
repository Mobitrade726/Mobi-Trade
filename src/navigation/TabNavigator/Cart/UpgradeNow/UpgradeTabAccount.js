import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import Signup_Address from './Signup_Address';
import UpgradeAccountAddress from './UpgradeAccountAddress';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute} from '@react-navigation/native';
import UpgradeBusinessAccount from './UpgradeBusinessAccount';

const Tab = createMaterialTopTabNavigator();

const UpgradeTabAccount = ({navigation}) => {
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
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Ionicons name="chevron-back" size={22} color="#000" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Upgrade Account</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Top Tabs */}
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color}) => {
            let iconName;
            if (route.name === 'Signup') {
              iconName =
                accountType === 'individual' || catEdit === 'vendor_customer'
                  ? focused
                    ? 'person'
                    : 'person-outline'
                  : focused
                  ? 'cube'
                  : 'cube-outline';
            } else if (route.name === 'Signup_Address') {
              iconName = focused ? 'location' : 'location-outline';
            }
            return <Ionicons name={iconName} size={16} color={color} />;
          },
          tabBarLabel: ({focused}) => {
            let label =
              route.name === 'Signup'
                ? accountType === 'individual' || catEdit === 'vendor_customer'
                  ? 'Basic Details'
                  : 'Business Details'
                : 'Address';
            return (
              <Text style={{color: focused ? '#2E8BFF' : '#aaa', fontSize: 12}}>
                {label}
              </Text>
            );
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#2E8BFF',
            height: 2,
          },
          tabBarActiveTintColor: '#2E8BFF',
          tabBarInactiveTintColor: '#aaa',
          tabBarShowIcon: true,
        })}>
        <Tab.Screen
          name="Signup"
          component={UpgradeBusinessAccount}
          initialParams={{
            accountType: derivedAccountType,
            profileEdit: profileData,
          }}
        />

        <Tab.Screen name="Signup_Address" component={UpgradeAccountAddress} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    justifyContent: 'space-between',
  },
  backIcon: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 5,
    elevation: 2,
  },
  title: {
    fontSize: 17,
    fontWeight: 'semibold',
    color: '#111',
  },
});

export default UpgradeTabAccount;
