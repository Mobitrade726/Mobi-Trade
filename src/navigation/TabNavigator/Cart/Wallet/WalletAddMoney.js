import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {API_BASE_URL} from '../../../../utils/utils';
import Header from '../../../../constants/Header';
import {fetchWalletBalance} from '../../../../redux/slices/walletSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

const WalletAddMoney = ({navigation}) => {
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  const dispatch = useDispatch();
  const {balance, loading, error} = useSelector(state => state.wallet);

  useEffect(() => {
    dispatch(fetchWalletBalance());
  }, [dispatch]);

  // ✅ Mapping between method name → transaction_type value
  const transactionTypeMap = {
    upi: '0',
    neft: '1',
    imps: '2',
    rtgs: '3',
    card: '4',
    netbanking: '5',
  };

  const handleAddMoney = async () => {
    if (isProcessing) return; // ❌ Prevent double click

    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount.');
      return;
    }

    setIsProcessing(true); // 🔒 Lock button

    try {
      const token = await AsyncStorage.getItem('TOKEN');
      const userId = await AsyncStorage.getItem('USERID');

      const payload = {
        buyer_id: userId,
        amount: amount,
        transaction_type: transactionTypeMap[selectedMethod], // ✅ numeric value
      };

      // ✅ Create Razorpay order
      const response = await axios.post(
        `${API_BASE_URL}/wallet/create-order`,
        payload,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const order = response.data;

      const paymentMethods = {
        upi: selectedMethod === 'upi',
        card: selectedMethod === 'card',
        netbanking: selectedMethod === 'netbanking',
        wallet: false,
        emi: false,
        paylater: false,
      };

      const options = {
        description: 'Add Money to Wallet',
        currency: 'INR',
        key: order?.razorpay_key,
        amount: order.amount,
        name: 'MobiTrade Wallet',
        order_id: order.order_id,
        theme: {color: '#14AE5C'},
        method: paymentMethods,
      };

      // ✅ NEFT / IMPS / RTGS handled manually (offline)
      if (['neft', 'imps', 'rtgs'].includes(selectedMethod)) {
        Alert.alert(
          `${selectedMethod.toUpperCase()} Selected`,
          'Please complete this transfer using your bank app or contact support.',
        );
        return;
      }
      // ✅ Launch Razorpay checkout
      RazorpayCheckout.open(options)
        .then(async data => {
          // SUCCESS
          const verifyResponse = await axios.post(
            `${API_BASE_URL}/wallet/verify`,
            {
              razorpay_payment_id: data.razorpay_payment_id,
              razorpay_order_id: data.razorpay_order_id,
              razorpay_signature: data.razorpay_signature,
              amount: amount,
              transaction_type: transactionTypeMap[selectedMethod],
            },
            {
              headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
              },
            },
          );

          Alert.alert('Success', verifyResponse.data.message);
          setAmount('');
          dispatch(fetchWalletBalance());
          setIsProcessing(false); // 🔓 Unlock
        })
        .catch(err => {
          Alert.alert(
            'Payment Failed',
            err.description || 'Transaction cancelled.',
          );
          setIsProcessing(false); // 🔓 Unlock even if Razorpay closed
        });
    } catch (error) {
      Alert.alert('Error', 'Something went wrong! Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Wallet : Add Money"
        navigation={navigation}
        showBack={true}
      />
      <ScrollView
        contentContainerStyle={{padding: 20}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Wallet Balance</Text>
          {loading ? (
            <ActivityIndicator color="#14AE5C" />
          ) : (
            <Text style={styles.balanceValue}>₹{balance}</Text>
          )}
        </View>

        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        <Text style={styles.subHeader}>Select Payment Method</Text>
        <View style={styles.methodContainer}>
          {['upi', 'neft', 'imps', 'rtgs', 'card', 'netbanking'].map(method => (
            <TouchableOpacity
              key={method}
              style={[
                styles.methodButton,
                selectedMethod === method && styles.methodButtonActive,
              ]}
              onPress={() => setSelectedMethod(method)}>
              <Text
                style={[
                  styles.methodText,
                  selectedMethod === method && styles.methodTextActive,
                ]}>
                {method.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.payButton}
          onPress={handleAddMoney}
          disabled={isProcessing} // ❌ disable double press
        >
          <Text style={styles.payButtonText}>Proceed to Pay</Text>
        </TouchableOpacity>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

export default WalletAddMoney;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FBFEFC'},
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginVertical: 10,
  },
  balanceContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
  },
  balanceLabel: {fontSize: 16, color: '#888'},
  balanceValue: {fontSize: 28, fontWeight: 'bold', color: '#14AE5C'},
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
    elevation: 2,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  methodContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  methodButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    margin: 5,
    backgroundColor: '#fff',
  },
  methodButtonActive: {
    backgroundColor: '#14AE5C',
    borderColor: '#14AE5C',
  },
  methodText: {color: '#333', fontWeight: '500'},
  methodTextActive: {color: '#fff'},
  payButton: {
    backgroundColor: '#14AE5C',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  payButtonText: {color: '#fff', fontSize: 18, fontWeight: 'bold'},
});
