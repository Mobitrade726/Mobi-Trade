import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const supportOptions = [
  {id: '1', title: 'FAQs', screen: 'FAQsScreen'},
  {id: '2', title: 'Return & Refund Policy', screen: 'ReturnPolicyScreen'},
  {id: '3', title: 'Shipping & Delivery Info', screen: 'ShippingScreen'},
  {id: '4', title: 'Terms & Conditions', screen: 'TermsScreen'},
  {id: '5', title: 'Contact Us', screen: 'ContactScreen'},
];

const HelpSupport = ({navigation}) => {
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate(item.screen)}>
      <Text style={styles.itemText}>{item.title}</Text>
      <Ionicons name="chevron-forward" size={20} color="#000" />
    </TouchableOpacity>
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
        <Text style={styles.headerTitle}>Help & Support</Text>
      </View>

      {/* Support List */}
      <FlatList
        data={supportOptions}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
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
    justifyContent: 'center',
    paddingVertical: 10,
    borderColor: '#ccc',
    position: 'relative',
    height: 50, // optional, to help with alignment
  },
  backButton: {
    position: 'absolute', // ADD THIS
    left: 15,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'medium', // change 'medium' to a valid value
    color: '#000',
    textAlign: 'center',
  },
  list: {
    paddingHorizontal: 16,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 0.7,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 16,
    color: '#000',
    fontWeight:"medium",
    color:"#171D1C"
  },
});

export default HelpSupport;
