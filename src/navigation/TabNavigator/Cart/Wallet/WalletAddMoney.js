// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   ScrollView,
//   SafeAreaView,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import RazorpayCheckout from 'react-native-razorpay';
// import axios from 'axios';
// import {API_BASE_URL} from '../../../../utils/utils';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Header from '../../../../constants/Header';

// export default function WalletAddMoney({navigation}) {
//   const [amount, setAmount] = useState('');
//   const [balance, setBalance] = useState('0.00');
//   const [loading, setLoading] = useState(false);

//   // ✅ Fetch Wallet Balance API
//   const fetchWalletBalance = async () => {
//     try {
//       setLoading(true);
//       const token = await AsyncStorage.getItem('TOKEN');
//       const userId = await AsyncStorage.getItem('USERID');

//       const payload = {
//         buyer_id: userId,
//       };

//       const response = await axios.post(
//         `${API_BASE_URL}/wallet/balance`,
//         payload,
//         {
//           headers: {
//             Accept: 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );
//       if (response?.data?.status !== undefined) {
//         setBalance(response.data.balance.toString());
//       } else {
//         setBalance('0.00');
//       }
//     } catch (error) {
//       console.log(
//         'Balance fetch error:',
//         error?.response?.data || error.message,
//       );
//       Alert.alert('Error', 'Unable to fetch wallet balance.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔁 Load balance when screen opens
//   useEffect(() => {
//     fetchWalletBalance();
//   }, []);

//   // 🔥 Razorpay + Laravel Integration Function
//   const handleAddMoney = async () => {
//     if (!amount || parseFloat(amount) <= 0) {
//       Alert.alert('Invalid Amount', 'Please enter a valid amount.');
//       return;
//     }

//     try {
//       const token = await AsyncStorage.getItem('TOKEN');
//       const userId = await AsyncStorage.getItem('USERID');

//       const payload = {
//         buyer_id: userId,
//         amount: amount,
//       };

//       const response = await axios.post(
//         `${API_BASE_URL}/wallet/create-order`,
//         payload,
//         {
//           headers: {
//             Accept: 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       const order = response.data;
//       const options = {
//         description: 'Add Money to Wallet',
//         image: 'https://your-logo-url.com/logo.png',
//         currency: 'INR',
//         key: order?.razorpay_key,
//         amount: order.amount, // in paisa
//         name: 'MobiTrade Wallet',
//         order_id: order.order_id,
//         prefill: {
//           email: 'user@example.com',
//           contact: '9810124920',
//           name: 'John Doe',
//         },
//         theme: {color: '#14AE5C'},
//       };

//       RazorpayCheckout.open(options)
//         .then(async data => {
//           // ✅ Verify payment on backend
//           const verifyResponse = await axios.post(
//             `${API_BASE_URL}/wallet/verify`,
//             {
//               razorpay_payment_id: data.razorpay_payment_id,
//               razorpay_order_id: data.razorpay_order_id,
//               razorpay_signature: data.razorpay_signature,
//               amount: amount,
//             },
//             {
//               headers: {
//                 Accept: 'application/json',
//                 Authorization: `Bearer ${token}`,
//               },
//             },
//           );

//           Alert.alert(
//             'Success',
//             verifyResponse?.data?.message || 'Money added successfully!',
//           );
//           setAmount('');
//           fetchWalletBalance(); // 🔁 Refresh wallet balance after payment
//         })
//         .catch(error => {
//           console.log("err-------------------->", error?.response)
//           Alert.alert(
//             'Payment Failed',
//             error.description || 'Transaction cancelled.',
//           );
//         });
//     } catch (error) {
//       console.log('Payment Error:', error.response?.data || error.message);
//       Alert.alert('Error', 'Something went wrong! Please try again.');
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         style={{marginHorizontal: 10}}>
//         <Header
//           title="Wallet : Add Money"
//           navigation={navigation}
//           showBack={true}
//         />

//         {/* Current Balance */}
//         <View style={styles.balanceCard}>
//           <Text style={styles.balanceLabel}>Current Balance</Text>
//           {loading ? (
//             <ActivityIndicator color="#14AE5C" />
//           ) : (
//             <Text style={styles.balanceAmount}>₹{balance}</Text>
//           )}
//         </View>

//         {/* Enter Amount */}
//         <Text style={styles.sectionLabel}>Enter Amount</Text>
//         <TextInput
//           style={styles.amountInput}
//           placeholder="₹ XX,XXX"
//           placeholderTextColor="#999"
//           keyboardType="numeric"
//           value={amount}
//           onChangeText={setAmount}
//         />

//         {/* Add Money Button */}
//         <TouchableOpacity style={styles.addButton} onPress={handleAddMoney}>
//           <Text style={styles.addButtonText}>Add Money</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {flex: 1, backgroundColor: '#FBFEFC'},
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 10,
//     justifyContent: 'space-between',
//     marginHorizontal: 10,
//   },
//   backButton: {
//     backgroundColor: '#f5f5f5',
//     borderRadius: 20,
//     padding: 6,
//   },
//   headerTitle: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#000',
//     textAlign: 'center',
//   },
//   balanceCard: {
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 10,
//     marginVertical: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     elevation: 1,
//     borderWidth: 0.2,
//   },
//   balanceLabel: {color: '#555'},
//   balanceAmount: {fontSize: 20, fontWeight: 'bold', color: '#14AE5C'},
//   sectionLabel: {fontWeight: '600', marginTop: 15, marginBottom: 8},
//   amountInput: {
//     backgroundColor: '#F3F4F6',
//     padding: 12,
//     borderRadius: 8,
//     fontSize: 16,
//     marginBottom: 15,
//   },
//   addButton: {
//     backgroundColor: '#14AE5C',
//     padding: 15,
//     borderRadius: 8,
//     marginVertical: 20,
//   },
//   addButtonText: {color: '#fff', textAlign: 'center', fontWeight: '600'},
// });

// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   ScrollView,
//   SafeAreaView,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import RazorpayCheckout from 'react-native-razorpay';
// import axios from 'axios';
// import {API_BASE_URL} from '../../../../utils/utils';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Header from '../../../../constants/Header';

// export default function WalletAddMoney({navigation}) {
//   const [amount, setAmount] = useState('');
//   const [balance, setBalance] = useState('0.00');
//   const [loading, setLoading] = useState(false);

//   // ✅ Fetch Wallet Balance API
//   const fetchWalletBalance = async () => {
//     try {
//       setLoading(true);
//       const token = await AsyncStorage.getItem('TOKEN');
//       const userId = await AsyncStorage.getItem('USERID');

//       const payload = {
//         buyer_id: userId,
//       };

//       const response = await axios.post(
//         `${API_BASE_URL}/wallet/balance`,
//         payload,
//         {
//           headers: {
//             Accept: 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );
//       if (response?.data?.status !== undefined) {
//         setBalance(response.data.balance.toString());
//       } else {
//         setBalance('0.00');
//       }
//     } catch (error) {
//       console.log(
//         'Balance fetch error:',
//         error?.response?.data || error.message,
//       );
//       Alert.alert('Error', 'Unable to fetch wallet balance.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔁 Load balance when screen opens
//   useEffect(() => {
//     fetchWalletBalance();
//   }, []);

//   // 🔥 Razorpay + Laravel Integration Function
//   const handleAddMoney = async () => {
//     if (!amount || parseFloat(amount) <= 0) {
//       Alert.alert('Invalid Amount', 'Please enter a valid amount.');
//       return;
//     }

//     try {
//       const token = await AsyncStorage.getItem('TOKEN');
//       const userId = await AsyncStorage.getItem('USERID');

//       const payload = {
//         buyer_id: userId,
//         amount: amount,
//         transaction_type: '0',
//       };

//       const response = await axios.post(
//         `${API_BASE_URL}/wallet/create-order`,
//         payload,
//         {
//           headers: {
//             Accept: 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       const order = response.data;
//       const options = {
//         description: 'Add Money to Wallet',
//         image: 'https://your-logo-url.com/logo.png',
//         currency: 'INR',
//         key: order?.razorpay_key,
//         amount: order.amount, // in paisa
//         name: 'MobiTrade Wallet',
//         order_id: order.order_id,
//         prefill: {
//           email: 'user@example.com',
//           contact: '9810124920',
//           name: 'John Doe',
//         },
//         theme: {color: '#14AE5C'},
//       };

//       RazorpayCheckout.open(options)
//         .then(async data => {
//           // ✅ Verify payment on backend
//           const verifyResponse = await axios.post(
//             `${API_BASE_URL}/wallet/verify`,
//             {
//               razorpay_payment_id: data.razorpay_payment_id,
//               razorpay_order_id: data.razorpay_order_id,
//               razorpay_signature: data.razorpay_signature,
//               amount: amount,
//             },
//             {
//               headers: {
//                 Accept: 'application/json',
//                 Authorization: `Bearer ${token}`,
//               },
//             },
//           );

//           Alert.alert(
//             'Success',
//             verifyResponse?.data?.message || 'Money added successfully!',
//           );
//           setAmount('');
//           fetchWalletBalance(); // 🔁 Refresh wallet balance after payment
//         })
//         .catch(error => {
//           Alert.alert(
//             'Payment Failed',
//             error.description || 'Transaction cancelled.',
//           );
//         });
//     } catch (error) {
//       console.log('Payment Error:', error.response?.data || error.message);
//       Alert.alert('Error', 'Something went wrong! Please try again.');
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         style={{marginHorizontal: 10}}>
//         <Header
//           title="Wallet : Add Money"
//           navigation={navigation}
//           showBack={true}
//         />

//         {/* Current Balance */}
//         <View style={styles.balanceCard}>
//           <Text style={styles.balanceLabel}>Current Balance</Text>
          // {loading ? (
          //   <ActivityIndicator color="#14AE5C" />
          // ) : (
          //   <Text style={styles.balanceAmount}>₹{balance}</Text>
          // )}
//         </View>

//         {/* Enter Amount */}
//         <Text style={styles.sectionLabel}>Enter Amount</Text>
//         <TextInput
//           style={styles.amountInput}
//           placeholder="₹ XX,XXX"
//           placeholderTextColor="#999"
//           keyboardType="numeric"
//           value={amount}
//           onChangeText={setAmount}
//         />

//         {/* Add Money Button */}
//         <TouchableOpacity style={styles.addButton} onPress={handleAddMoney}>
//           <Text style={styles.addButtonText}>Add Money</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {flex: 1, backgroundColor: '#FBFEFC'},
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 10,
//     justifyContent: 'space-between',
//     marginHorizontal: 10,
//   },
//   backButton: {
//     backgroundColor: '#f5f5f5',
//     borderRadius: 20,
//     padding: 6,
//   },
//   headerTitle: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#000',
//     textAlign: 'center',
//   },
//   balanceCard: {
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 10,
//     marginVertical: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     elevation: 1,
//     borderWidth: 0.2,
//   },
//   balanceLabel: {color: '#555'},
//   balanceAmount: {fontSize: 20, fontWeight: 'bold', color: '#14AE5C'},
//   sectionLabel: {fontWeight: '600', marginTop: 15, marginBottom: 8},
//   amountInput: {
//     backgroundColor: '#F3F4F6',
//     padding: 12,
//     borderRadius: 8,
//     fontSize: 16,
//     marginBottom: 15,
//   },
//   addButton: {
//     backgroundColor: '#14AE5C',
//     padding: 15,
//     borderRadius: 8,
//     marginVertical: 20,
//   },
//   addButtonText: {color: '#fff', textAlign: 'center', fontWeight: '600'},
// });

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

const AddMoneyScreen = ({navigation}) => {
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [walletBalance, setBalance] = useState('0.00');
  const [loading, setLoading] = useState('');

  // ✅ Mapping between method name → transaction_type value
  const transactionTypeMap = {
    upi: '0',
    neft: '1',
    imps: '2',
    rtgs: '3',
    card: '4',
    netbanking: '5',
  };

  // ✅ Fetch Wallet Balance API
  const fetchWalletBalance = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('TOKEN');
      const userId = await AsyncStorage.getItem('USERID');

      const payload = {
        buyer_id: userId,
      };

      const response = await axios.post(
        `${API_BASE_URL}/wallet/balance`,
        payload,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response?.data?.status !== undefined) {
        setBalance(response.data.balance.toString());
      } else {
        setBalance('0.00');
      }
    } catch (error) {
      console.log(
        'Balance fetch error:',
        error?.response?.data || error.message,
      );
      Alert.alert('Error', 'Unable to fetch wallet balance.');
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Load balance when screen opens
  useEffect(() => {
    fetchWalletBalance();
  }, []);

  const handleAddMoney = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount.');
      return;
    }

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

      console.log("options------------------>", options);

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
          Alert.alert('Success', verifyResponse?.data?.message);

          setAmount('');
          fetchWalletBalance();
        })
        .catch(error => {
          Alert.alert(
            'Payment Failed',
            error.description || 'Transaction cancelled.',
          );
        });
    } catch (error) {
      console.log('Payment Error:', error.response?.data || error.message);
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
          <Text style={styles.balanceValue}>₹{walletBalance}</Text>
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

        <TouchableOpacity style={styles.payButton} onPress={handleAddMoney}>
          <Text style={styles.payButtonText}>Proceed to Pay</Text>
        </TouchableOpacity>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

export default AddMoneyScreen;

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
