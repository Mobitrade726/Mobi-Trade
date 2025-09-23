import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Ionicons from 'react-native-vector-icons/Ionicons';


const AddNewAddress = ({navigation}) => {
  const [billing, setBilling] = useState({
    address: '',
    zip: '',
    city: '',
    state: '',
  });
  const [shipping, setShipping] = useState({
    address: '',
    zip: '',
    city: '',
    state: '',
  });
  const [sameAsBilling, setSameAsBilling] = useState(false);

  const handleBillingChange = (key, value) => {
    setBilling({...billing, [key]: value});
  };

  const handleShippingChange = (key, value) => {
    setShipping({...shipping, [key]: value});
  };

  // 🟢 Auto-copy billing → shipping if sameAsBilling is true
  useEffect(() => {
    if (sameAsBilling) {
      setShipping(billing);
    }
  }, [billing, sameAsBilling]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Ionicons name="chevron-back" size={22} color="#000" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Add Address</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Ionicons name="search" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        {/* Billing Address */}
        <Text style={styles.heading}>Billing Address</Text>
        <View style={styles.underline} />

        <Text style={styles.label}>Address Line</Text>
        <TextInput
          style={[styles.input, {height: 80}]}
          placeholder="Enter your address"
          value={billing.address}
          multiline
          onChangeText={text => handleBillingChange('address', text)}
        />

        <Text style={styles.label}>ZIP Code *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your postal code"
          value={billing.zip}
          keyboardType="numeric"
          onChangeText={text => handleBillingChange('zip', text)}
        />

        <Text style={styles.label}>City *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your city"
          value={billing.city}
          onChangeText={text => handleBillingChange('city', text)}
        />

        <Text style={styles.label}>State/Province *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your state or province"
          value={billing.state}
          onChangeText={text => handleBillingChange('state', text)}
        />

        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>

        {/* Shipping Address */}
        <Text style={styles.heading}>Shipping Address</Text>
        <View style={styles.underline} />

        <View style={styles.checkboxRow}>
          <CheckBox value={sameAsBilling} onValueChange={setSameAsBilling} />
          <Text style={styles.checkboxLabel}>Save as above</Text>
        </View>

        <Text style={styles.label}>Address Line</Text>
        <TextInput
          style={[styles.input, {height: 80}]}
          placeholder="Enter your address"
          value={shipping.address}
          multiline
          editable={!sameAsBilling} // disable editing if checked
          onChangeText={text => handleShippingChange('address', text)}
        />

        <Text style={styles.label}>ZIP Code *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your postal code"
          value={shipping.zip}
          keyboardType="numeric"
          editable={!sameAsBilling}
          onChangeText={text => handleShippingChange('zip', text)}
        />

        <Text style={styles.label}>City *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your city"
          value={shipping.city}
          editable={!sameAsBilling}
          onChangeText={text => handleShippingChange('city', text)}
        />

        <Text style={styles.label}>State/Province *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your state or province"
          value={shipping.state}
          editable={!sameAsBilling}
          onChangeText={text => handleShippingChange('state', text)}
        />

        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddNewAddress;

const styles = StyleSheet.create({
  container: {padding: 16, paddingBottom: 30},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
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
  heading: {fontSize: 18, fontWeight: '600', marginTop: 20, color: '#000'},
  underline: {height: 1.5, backgroundColor: '#29A9E0', marginVertical: 8},
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 4,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#000',
  },
  saveBtn: {
    backgroundColor: '#29A9E0',
    borderRadius: 8,
    marginTop: 20,
    paddingVertical: 12,
    alignItems: 'center',
    width: 200,
    alignSelf: 'flex-end',
  },
  saveText: {color: '#fff', fontWeight: '600', fontSize: 16},
  checkboxRow: {flexDirection: 'row', alignItems: 'center', marginTop: 10},
  checkboxLabel: {fontSize: 14, marginLeft: 8, color: '#333'},
});
