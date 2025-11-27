import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_BASE_URL} from '../../../../utils/utils';

export default function WalletTransactions({navigation, route}) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch wallet transactions
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('TOKEN');
      const userId = await AsyncStorage.getItem('USERID');

      const response = await axios.get(
        `${API_BASE_URL}/wallet/totalhistory/${userId}`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data?.status) {
        setTransactions(response.data.history);
      } else {
        setTransactions([]);
      }
    } catch (error) {
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // const renderTransaction = ({item}) => {
  //   // fallback values
  //   // Determine transaction type
  //   const isCredit =
  //     item.transaction_type === '1' || item.status_text === 'Credit';
  //   const isDebit =
  //     item.transaction_type === '0' || item.status_text === 'Debit';

  //   // Determine payment status (0 = Pending, 1 = Completed, 2 = Failed/Rejected)
  //   const isCompleted = item.payment_status === '1'; // veryfied
  //   const isPending = item.payment_status === '0'; // pending
  //   const isFailed = item.payment_status === '2'; //rejected

  //   // Dynamic icon color
  //   const iconColor = isFailed
  //     ? '#EF4444'
  //     : isPending
  //     ? '#FBBF24'
  //     : isCredit
  //     ? '#10B981'
  //     : '#111';

  //   // Dynamic icon
  //   let icon = 'cash-multiple';
  //   if (isCredit) icon = 'cash-plus';
  //   else if (isDebit) icon = 'cash-minus';
  //   else if (isPending) icon = 'timer-sand';
  //   else if (isFailed) icon = 'close-octagon-outline';

  //   return (
  //     <View style={styles.transactionRow}>
  //       <MaterialCommunityIcons
  //         name={icon}
  //         size={24}
  //         color={iconColor}
  //         style={styles.transactionIcon}
  //       />

  //       <View style={{flex: 1}}>
  //         <Text
  //           style={[
  //             styles.amount,
  //             {color: isCredit ? '#10B981' : isFailed ? '#EF4444' : '#000'},
  //           ]}>
  //           {isCredit ? '+ ' : '- '}₹{' '}
  //           {Number(item.amount || 0).toLocaleString()}
  //         </Text>

  //         <Text style={styles.label}>{item.status_text || '--'}</Text>
  //         <Text style={styles.date}>
  //           {item.payment_date}{' '}
  //           {item.payment_time ? `, ${item.payment_time}` : ''}
  //         </Text>
  //       </View>

  //       {isCompleted ? (
  //         <Ionicons name="checkmark-circle-outline" size={22} color="#10B981" />
  //       ) : isPending ? (
  //         <Ionicons name="time-outline" size={22} color="#FBBF24" />
  //       ) : (
  //         <Ionicons name="close-circle-outline" size={22} color="#EF4444" />
  //       )}
  //     </View>
  //   );
  // };

  const renderTransaction = ({item}) => {
    let icon = 'cash-multiple';
    let iconColor = '#000';
    let checkmarkIcon = 'checkmark-circle-outline';
    let checkmarkColor = '#10B981'; // default green
    let displayAmount = Number(item.amount || 0).toLocaleString();

    switch (item.status_text) {
      case 'Money Added':
        icon = 'cash-plus';
        iconColor = '#10B981';
        checkmarkIcon = 'checkmark-circle-outline';
        checkmarkColor = '#10B981';
        displayAmount = `+ ₹ ${displayAmount}`;
        break;
      case 'Verification Pending':
        icon = 'timer-sand';
        iconColor = '#FBBF24';
        checkmarkIcon = 'time-outline';
        checkmarkColor = '#FBBF24';
        displayAmount = `₹ ${displayAmount}`;
        break;
      case 'Rejected':
        icon = 'close-octagon-outline';
        iconColor = '#EF4444';
        checkmarkIcon = 'close-circle-outline';
        checkmarkColor = '#EF4444';
        displayAmount = `₹ ${displayAmount}`;
        break;
      default:
        // fallback for credit/debit or unknown status
        icon = item.transaction_type === '1' ? 'cash-plus' : 'cash-minus';
        iconColor = item.transaction_type === '1' ? '#10B981' : '#EF4444';
        checkmarkIcon =
          item.transaction_type === '1'
            ? 'checkmark-circle-outline'
            : 'close-circle-outline';
        checkmarkColor = iconColor;
        displayAmount =
          item.transaction_type === '1'
            ? `+ ₹ ${displayAmount}`
            : `- ₹ ${displayAmount}`;
        break;
    }

    return (
      <View style={styles.transactionRow}>
        <MaterialCommunityIcons
          name={icon}
          size={24}
          color={iconColor}
          style={styles.transactionIcon}
        />
        <View style={{flex: 1}}>
          <Text style={[styles.amount, {color: iconColor}]}>
            {displayAmount}
          </Text>
          <Text style={styles.label}>{item.status_text || '--'}</Text>
          <Text style={styles.date}>
            {item.payment_date}{' '}
            {item.payment_time ? `, ${item.payment_time}` : ''}
          </Text>
        </View>
        <Ionicons name={checkmarkIcon} size={22} color={checkmarkColor} />
      </View>
    );
  };

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
          <Text style={styles.headerTitle}>Wallet : Transactions</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#1A9E41"
          style={{marginTop: 40}}
        />
      ) : transactions.length === 0 ? (
        <View style={{alignItems: 'center', marginTop: 40}}>
          <Ionicons name="wallet-outline" size={50} color="#bbb" />
          <Text style={{color: '#888', marginTop: 10}}>
            No transactions found
          </Text>
        </View>
      ) : (
        <FlatList
          data={transactions}
          renderItem={renderTransaction}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id?.toString() || Math.random().toString()}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
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
    marginVertical: 8,
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
    // height: 1,
    backgroundColor: '#eee',
  },
});
