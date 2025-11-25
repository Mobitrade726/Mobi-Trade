import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../../../constants/Header';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {API_BASE_URL} from '../../../../utils/utils';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function WithdrawScreen({navigation}) {
  const [amount, setAmount] = useState('');
  const [acholdername, setAcholdername] = useState('');
  const [accountno, setAccountno] = useState('');
  const [ifsccode, setIfsccode] = useState('');
  const [remark, setRemark] = useState('');
  const [transactionType, setTransactionType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [refundHistory, setRefundHistory] = useState([]);

  const transactionOptions = [
    {label: 'UPI', value: '0'},
    {label: 'NEFT', value: '1'},
    {label: 'IMPS', value: '2'},
    {label: 'RTGS', value: '3'},
    {label: 'CARD', value: '4'},
    {label: 'Net Banking', value: '5'},
  ];

  // 🧾 Fetch Refund History API
  const fetchRefundHistory = async () => {
    try {
      setHistoryLoading(true);
      const token = await AsyncStorage.getItem('TOKEN');
      const userId = await AsyncStorage.getItem('USERID');

      const response = await axios.get(
        `https://api.mobitrade.in/api/refundhistory/${userId}`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response?.data?.status === true) {
        setRefundHistory(response.data?.refund_history || []);
      } else {
        setRefundHistory([]);
      }
    } catch (error) {
      setRefundHistory([]);
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    fetchRefundHistory();
  }, []);

  // 💸 Handle Withdraw Request
  const handleWithdraw = async () => {
    if (
      !amount ||
      !accountno ||
      !ifsccode ||
      !acholdername ||
      !transactionType
    ) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('TOKEN');
      const userId = await AsyncStorage.getItem('USERID');

      if (!userId || !token) {
        Alert.alert('Error', 'User not authenticated. Please log in again.');
        setLoading(false);
        return;
      }

      const payload = {
        vendor_sales_id: userId,
        refund_account_name: acholdername,
        refund_account_no: accountno,
        refund_ifsc_code: ifsccode,
        refund_amount: amount,
        refund_remarks: remark,
        refund_type: transactionType,
      };

      const response = await axios.post(
        `${API_BASE_URL}/refund/create`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        },
      );

      if (response.data?.status === true) {
        Toast.show({
          type: 'success',
          text1: response.data.message || 'Withdrawal Request Submitted',
        });
        setAmount('');
        setAccountno('');
        setIfsccode('');
        setAcholdername('');
        setRemark('');
        setTransactionType(null);
        fetchRefundHistory(); // refresh after new request
      } else {
        Toast.show({
          type: 'error',
          text1: response.data?.message || 'Failed to submit withdrawal',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error.response?.data?.message || 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  const renderTransaction = ({item}) => {
    // fallback values
    // Determine transaction type
    const isCredit =
      item.transaction_type === '1' || item.status_text === 'Credit';
    const isDebit =
      item.transaction_type === '0' || item.status_text === 'Debit';

    // Determine payment status (0 = Pending, 1 = Completed, 2 = Failed/Rejected)
    const isCompleted = item.payment_status === '1';
    const isPending = item.payment_status === '0';
    const isFailed = item.payment_status === '2';

    // Dynamic icon color
    const iconColor = isFailed
      ? '#EF4444'
      : isPending
      ? '#FBBF24'
      : isCredit
      ? '#10B981'
      : '#111';

    // Dynamic icon
    let icon = 'cash-multiple';
    if (isCredit) icon = 'cash-plus';
    else if (isDebit) icon = 'cash-minus';
    else if (isPending) icon = 'timer-sand';
    else if (isFailed) icon = 'close-octagon-outline';

    // Label (fallback)
    const label = isCredit
      ? 'Amount Credited'
      : isDebit
      ? 'Amount Debited'
      : 'Wallet Transaction';

    return (
      <View style={styles.transactionRow}>
        <MaterialCommunityIcons
          name={icon}
          size={24}
          color={iconColor}
          style={styles.transactionIcon}
        />

        <View style={{flex: 1}}>
          <Text
            style={[
              styles.amount,
              {color: isCredit ? '#10B981' : isFailed ? '#EF4444' : '#000'},
            ]}>
            {isCredit ? '+ ' : '- '}₹{' '}
            {Number(item.amount || 0).toLocaleString()}
          </Text>

          <Text style={styles.label}>{label}</Text>
          <Text style={styles.date}>
            {item.payment_date}{' '}
            {item.payment_time ? `, ${item.payment_time}` : '--'}
          </Text>
          <Text style={styles.date}>{item.payment_status || '--'}</Text>
          {isCompleted ? (
            <Text style={styles.date}>Complete</Text>
          ) : isPending ? (
            <Text style={styles.date}>Pending</Text>
          ) : (
            <Text style={styles.date}>Cancel</Text>
          )}
        </View>

        {isCompleted ? (
          <Ionicons name="checkmark-circle-outline" size={22} color="#10B981" />
        ) : isPending ? (
          <Ionicons name="time-outline" size={22} color="#FBBF24" />
        ) : (
          <Ionicons name="close-circle-outline" size={22} color="#EF4444" />
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Header title="Withdraw" navigation={navigation} showBack={true} />

        {/* Withdrawal Form */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Account Details</Text>

          <TextInput
            style={styles.input}
            placeholder="Account Holder Name"
            value={acholdername}
            onChangeText={setAcholdername}
          />
          <TextInput
            style={styles.input}
            placeholder="Account Number"
            keyboardType="number-pad"
            value={accountno}
            onChangeText={setAccountno}
          />
          <TextInput
            style={styles.input}
            placeholder="IFSC Code"
            autoCapitalize="characters"
            value={ifsccode}
            onChangeText={setIfsccode}
          />

          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={transactionOptions}
            labelField="label"
            valueField="value"
            placeholder="Select Transaction Type"
            value={transactionType}
            onChange={item => setTransactionType(item.value)}
          />

          <TextInput
            style={styles.input}
            placeholder="Amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />

          <TextInput
            style={[styles.input, {height: 80}]}
            placeholder="Remark (optional)"
            multiline
            value={remark}
            onChangeText={setRemark}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleWithdraw}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Ionicons name="wallet-outline" size={20} color="#fff" />
                <Text style={styles.buttonText}>Withdraw Now</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Refund History */}
        <View style={styles.historyCard}>
          <Text style={styles.sectionTitle}>Recent Withdrawals</Text>
          {historyLoading ? (
            <ActivityIndicator color="#14AE5C" />
          ) : refundHistory.length === 0 ? (
            <Text
              style={{textAlign: 'center', color: '#777', marginVertical: 10}}>
              No withdrawal history found.
            </Text>
          ) : (
            <FlatList
              data={refundHistory}
              renderItem={renderTransaction}
              showsVerticalScrollIndicator={false}
              keyExtractor={item =>
                item.id?.toString() || Math.random().toString()
              }
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// 🧭 Styles
const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: '#FBFEFC'},
  container: {marginHorizontal: 16},
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 15,
  },
  dropdown: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
  },
  placeholderStyle: {fontSize: 15, color: '#999'},
  selectedTextStyle: {fontSize: 15, color: '#111'},
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {color: '#fff', fontWeight: '600', marginLeft: 8, fontSize: 16},
  historyCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    marginBottom:10,
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  historyText: {color: '#333', fontSize: 15},
  historyStatusSuccess: {color: 'green', fontWeight: '600'},
  historyStatusPending: {color: '#f39c12', fontWeight: '600'},
  historyStatusFailed: {color: '#e74c3c', fontWeight: '600'},
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
