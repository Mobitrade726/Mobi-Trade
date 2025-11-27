import React, {useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../../../constants/Header';
import {
  fetchWalletBalance,
  fetchLatestWalletHistory,
} from '../../../../redux/slices/walletSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

export default function Wallet({navigation}) {
  const dispatch = useDispatch();
  const {balance, latesthistory, loading, error} = useSelector(
    state => state.wallet,
  );

  // ✅ fetch when screen mounts
  useEffect(() => {
    dispatch(fetchWalletBalance());
    dispatch(fetchLatestWalletHistory());
  }, [dispatch]);

  // ✅ Auto refresh on screen focus
  useFocusEffect(
    useCallback(() => {
      dispatch(fetchWalletBalance());
      dispatch(fetchLatestWalletHistory());
    }, [dispatch]),
  );

  console.log('balance-------------------->', balance);
  console.log('latesthistory-------------------->', latesthistory);

  // const renderTransaction = ({item}) => (
  //   <View style={styles.transactionRow}>
  //     <MaterialCommunityIcons
  //       name={item.icon}
  //       size={24}
  //       color={item.type === 'credit' ? 'orange' : 'green'}
  //       style={styles.transactionIcon}
  //     />
  //     <View style={{flex: 1}}>
  //       <Text
  //         style={[
  //           styles.amount,
  //           {color: item.type === 'credit' ? 'green' : 'red'},
  //         ]}>
  //         {item.type === 'credit' ? '+ ' : '- '}₹ {item.amount.toLocaleString()}
  //       </Text>
  //       <Text style={styles.label}>{item.status_text}</Text>
  //       <Text style={styles.date}>{item.payment_date}</Text>
  //     </View>
  //     <Ionicons name="checkmark-circle-outline" size={22} color="green" />
  //   </View>
  // );

  // const renderTransaction = ({item}) => {
  //   let displayAmount = '';

  //   if (item.status_text === 'Money Added') {
  //     displayAmount = `+ ₹ ${item.amount.toLocaleString()}`; // Only price
  //   } else if (item.status_text === 'Verification Pending') {
  //     displayAmount = `₹ ${item.amount.toLocaleString()}`; // +price
  //   } else if (item.status_text === 'Rejected') {
  //     displayAmount = `₹ ${item.amount.toLocaleString()}`; // Only price
  //   } else {
  //     // fallback for other statuses
  //     displayAmount =
  //       item.type === 'credit'
  //         ? `+ ₹ ${item.amount.toLocaleString()}`
  //         : `- ₹ ${item.amount.toLocaleString()}`;
  //   }

  //   return (
  //     <View style={styles.transactionRow}>
  //       <MaterialCommunityIcons
  //         name={item.icon}
  //         size={24}
  //         color={item.type === 'credit' ? 'orange' : 'green'}
  //         style={styles.transactionIcon}
  //       />
  //       <View style={{flex: 1}}>
  //         <Text style={styles.amount}>{displayAmount}</Text>
  //         <Text style={styles.label}>{item.status_text}</Text>
  //         <Text style={styles.date}>{item.payment_date}</Text>
  //       </View>
  //       <Ionicons name="checkmark-circle-outline" size={22} color="green" />
  //     </View>
  //   );
  // };

  // const renderTransaction = ({item}) => {
  //   let displayAmount = '';
  //   let iconColor = 'gray'; // default icon color

  //   // Determine amount based on status_text
  //   if (item.status_text === 'Money Added') {
  //     displayAmount = `+ ₹ ${item.amount.toLocaleString()}`;
  //     iconColor = 'green';
  //   } else if (item.status_text === 'Verification Pending') {
  //     displayAmount = `₹ ${item.amount.toLocaleString()}`;
  //     iconColor = 'orange';
  //   } else if (item.status_text === 'Rejected') {
  //     displayAmount = `₹ ${item.amount.toLocaleString()}`;
  //     iconColor = 'red';
  //   } else {
  //     // fallback for other statuses
  //     displayAmount =
  //       item.type === 'credit'
  //         ? `+ ₹ ${item.amount.toLocaleString()}`
  //         : `- ₹ ${item.amount.toLocaleString()}`;
  //     iconColor = item.type === 'credit' ? 'green' : 'red';
  //   }

  //   return (
  //     <View style={styles.transactionRow}>
  //       <MaterialCommunityIcons
  //         name={item.icon}
  //         size={24}
  //         color={iconColor}
  //         style={styles.transactionIcon}
  //       />
  //       <View style={{flex: 1}}>
  //         <Text style={[styles.amount, {color: iconColor}]}>
  //           {displayAmount}
  //         </Text>
  //         <Text style={styles.label}>{item.status_text}</Text>
  //         <Text style={styles.date}>{item.payment_date}</Text>
  //       </View>
  //       <Ionicons name="checkmark-circle-outline" size={22} color="green" />
  //     </View>
  //   );
  // };

  const renderTransaction = ({item}) => {
    let displayAmount = '';
    let iconColor = 'gray'; // main icon color
    let checkmarkColor = 'green'; // default checkmark color

    // Determine amount and colors based on status_text
    if (item.status_text === 'Money Added') {
      displayAmount = `+ ₹ ${item.amount.toLocaleString()}`;
      iconColor = 'green';
      checkmarkColor = 'green';
    } else if (item.status_text === 'Verification Pending') {
      displayAmount = `₹ ${item.amount.toLocaleString()}`;
      iconColor = 'orange';
      checkmarkColor = 'orange';
    } else if (item.status_text === 'Rejected') {
      displayAmount = `₹ ${item.amount.toLocaleString()}`;
      iconColor = 'red';
      checkmarkColor = 'red';
    } else {
      // fallback for other statuses
      displayAmount =
        item.type === 'credit'
          ? `+ ₹ ${item.amount.toLocaleString()}`
          : `- ₹ ${item.amount.toLocaleString()}`;
      iconColor = item.type === 'credit' ? 'green' : 'red';
      checkmarkColor = item.type === 'credit' ? 'green' : 'red';
    }

    return (
      <View style={styles.transactionRow}>
        <MaterialCommunityIcons
          name={item.icon}
          size={24}
          color={iconColor}
          style={styles.transactionIcon}
        />
        <View style={{flex: 1}}>
          <Text style={[styles.amount, {color: iconColor}]}>
            {displayAmount}
          </Text>
          <Text style={styles.label}>{item.status_text}</Text>
          <Text style={styles.date}>{item.payment_date}</Text>
        </View>
        <Ionicons
          name="checkmark-circle-outline"
          size={22}
          color={checkmarkColor}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginHorizontal: 10}}>
        <Header title="Wallet" navigation={navigation} showBack={true} />

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Your Balance</Text>
          <Text style={styles.balanceAmount}>₹{balance}</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              onPress={() => navigation.navigate('WalletAddMoney')}
              style={styles.addMoneyBtn}>
              <Text style={styles.addMoneyText}>Add Money</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Withdraw')}
              style={styles.withdrawBtn}>
              <Text style={styles.withdrawText}>Withdraw</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('WalletTransactions')}
            style={styles.allTransactionsBtn}>
            <Text style={styles.allTransactionsText}>
              View All Transactions
            </Text>
          </TouchableOpacity>
        </View>

        {/* Recent Transactions */}
        <Text style={styles.recentTitle}>Recent Transactions</Text>
        <FlatList
          data={latesthistory}
          renderItem={renderTransaction}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFEFC',
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
    backgroundColor: '#F9F9F9',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 0.2,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  balanceLabel: {
    fontSize: 14,
    color: 'gray',
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  addMoneyBtn: {
    backgroundColor: 'green',
    paddingVertical: 8,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  addMoneyText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  withdrawBtn: {
    backgroundColor: '#444',
    paddingVertical: 8,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  withdrawText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  allTransactionsBtn: {
    backgroundColor: '#222',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  allTransactionsText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  recentTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'gray',
    marginBottom: 10,
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  transactionIcon: {
    marginRight: 10,
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
});
