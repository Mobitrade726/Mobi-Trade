import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Picker} from '@react-native-picker/picker';

export default function Withdraw({navigation}) {
  const [selectedBank, setSelectedBank] = useState('');
  const [upiExpanded, setUpiExpanded] = useState(true);
  const [cardExpanded, setCardExpanded] = useState(true);
  const [netBankingExpanded, setNetBankingExpanded] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{marginHorizontal:10}}>
        {/* Header */}
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Ionicons name="chevron-back" size={22} color="#000" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Wallet : Withdraw</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Ionicons name="search" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Current Balance */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Current Balance</Text>
          <Text style={styles.balanceAmount}>₹2,500</Text>
        </View>

        {/* Enter Amount */}
        <Text style={styles.sectionLabel}>Enter Amount</Text>
        <TextInput
          style={styles.amountInput}
          placeholder="₹ XX,XXX"
          placeholderTextColor="#999"
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Withdraw Now</Text>
        </TouchableOpacity>

        <Text>*Funds will be credited within 1-2 business days. </Text>
        <Text style={{marginTop:10}}>*Minimum withdrawal amount is ₹100. </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFEFC',
  },
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
  balanceCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,

    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 1,
    justifyContent: 'space-between',
    marginBottom: 10,
    borderWidth:0.2,
  },
  balanceLabel: {
    color: '#555',
  },
  balanceAmount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionLabel: {
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 8,
  },
  amountInput: {
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 15,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginTop:10,
  },
  paymentTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentTitle: {
    marginLeft: 8,
    fontWeight: '600',
  },
  upiAppsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  upiApp: {
    alignItems: 'center',
    width: '23%',
  },
  upiLabel: {
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    marginVertical: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginVertical: 6,
  },
  addButton: {
    backgroundColor: '#171D1C',
    padding: 15,
    borderRadius: 8,
    marginVertical: 20,
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});

