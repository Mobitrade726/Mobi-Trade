import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function WalletTransactions({navigation}) {
  const transactions = [
    {
      id: '1',
      type: 'credit',
      amount: 799,
      label: 'Cashback Received',
      date: '13 May, 10:43 AM',
      icon: 'gift-outline',
      status: 'success',
      iconColor: '#FBBF24',
    },
    {
      id: '2',
      type: 'debit',
      amount: 34799,
      label: 'Payment done',
      date: '12 May, 09:15 AM',
      icon: 'cart-outline',
      status: 'success',
      iconColor: '#10B981',
    },
    {
      id: '3',
      type: 'credit',
      amount: 799,
      label: 'Refund Successful',
      date: '11 May, 02:30 PM',
      icon: 'arrow-up',
      status: 'success',
      iconColor: '#FBBF24',
      isArrow: true,
    },
    {
      id: '4',
      type: 'credit',
      amount: 3499,
      label: 'Top-up Received',
      date: '10 May, 12:30 PM',
      icon: 'cash-multiple',
      status: 'success',
      iconColor: '#10B981',
    },
    {
      id: '5',
      type: 'debit',
      amount: 3499,
      label: 'Withdraw Successful',
      date: '10 May, 12:30 PM',
      icon: 'cash-multiple',
      status: 'success',
      iconColor: '#10B981',
    },
    {
      id: '6',
      type: 'credit',
      amount: 3799,
      label: 'Payment Failed',
      date: '12 May, 09:15 AM',
      icon: 'cart-outline',
      status: 'failed',
      iconColor: '#EF4444',
    },
    {
      id: '7',
      type: 'credit',
      amount: 4799,
      label: 'Top-up Failed',
      date: '10 May, 12:30 PM',
      icon: 'cash-multiple',
      status: 'failed',
      iconColor: '#EF4444',
    },
    {
      id: '8',
      type: 'credit',
      amount: 4799,
      label: 'Withdraw Failed',
      date: '10 May, 12:30 PM',
      icon: 'cash-multiple',
      status: 'failed',
      iconColor: '#EF4444',
    },
  ];

  const renderTransaction = ({item}) => (
    <View style={styles.transactionRow}>
      {item.isArrow ? (
        <Ionicons
          name="arrow-up"
          size={24}
          color={item.iconColor}
          style={styles.transactionIcon}
        />
      ) : (
        <MaterialCommunityIcons
          name={item.icon}
          size={24}
          color={item.iconColor}
          style={styles.transactionIcon}
        />
      )}
      <View style={{flex: 1}}>
        <Text
          style={[
            styles.amount,
            {color: item.type === 'credit' ? '#10B981' : '#EF4444'},
          ]}>
          {item.type === 'credit' ? '+ ' : '- '}₹ {item.amount.toLocaleString()}
        </Text>
        <Text style={styles.label}>{item.label}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      {item.status === 'success' ? (
        <Ionicons name="checkmark-circle-outline" size={22} color="#10B981" />
      ) : (
        <Ionicons name="close-circle-outline" size={22} color="#EF4444" />
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Ionicons name="chevron-back" size={22} color="#000" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Wallet : Transactions</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Ionicons name="search" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Section title */}
        <Text style={styles.recentTitle}>Recent Transactions</Text>

        {/* Transactions List */}
        <FlatList
          data={transactions}
          renderItem={renderTransaction}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingTop: 15,
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
  recentTitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#111',
    marginVertical: 0,
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  transactionIcon: {
    marginRight: 12,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    color: '#000',
  },
  date: {
    fontSize: 12,
    color: 'gray',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
  },
});
