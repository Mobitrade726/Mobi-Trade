import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles } from './styles';

const Addresses = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('Billing');
  const [selectedAddress, setSelectedAddress] = useState('Home');

  const addresses = [
    {
      id: '1',
      type: 'Home',
      address: '123 Elm Street, Springfield, IL 62701',
      icon: 'home-outline',
    },
    {
      id: '2',
      type: 'Warehouse',
      address: '123 Elm Street, Springfield, IL 62701',
      icon: 'business-outline',
    },
    {
      id: '3',
      type: 'Office',
      address: '123 Elm Street, Springfield, IL 62701',
      icon: 'storefront-outline',
    },
  ];

  const renderAddress = ({item}) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={{justifyContent:"center"}}>
          <Ionicons name={item.icon} size={24} color="#11A5D7" />
        </View>
        <View style={styles.iconText}>
          <Text style={styles.title}>{item.type}</Text>
          <Text style={styles.address}>{item.address}</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.radioRow}
        onPress={() => setSelectedAddress(item.type)}>
        <Ionicons
          name={
            selectedAddress === item.type
              ? 'radio-button-on'
              : 'radio-button-off'
          }
          size={20}
          color="#11A5D7"
        />
        <Text style={styles.defaultLabel}>Set as default</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Ionicons name="chevron-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Saved Address</Text>
      </View>

      {/* Tab Toggle */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Billing' && styles.activeTab]}
          onPress={() => setActiveTab('Billing')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Billing' && styles.activeTabText,
            ]}>
            Billing
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Shipping' && styles.activeTab]}
          onPress={() => setActiveTab('Shipping')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Shipping' && styles.activeTabText,
            ]}>
            Shipping
          </Text>
        </TouchableOpacity>
      </View>

      {/* Address List */}
      <FlatList
        data={addresses}
        keyExtractor={item => item.id}
        renderItem={renderAddress}
        contentContainerStyle={{padding: 15}}
      />

      {/* Add Address Button */}
      <TouchableOpacity onPress={()=> navigation.navigate('AddNewAddress')} style={styles.addButton}>
        <Ionicons name="add-circle-outline" size={22} color="#fff" />
        <Text style={styles.addButtonText}>Add New Address</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Addresses;
