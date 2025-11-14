// // import React, {useEffect, useState} from 'react';
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   TextInput,
// //   TouchableOpacity,
// //   ScrollView,
// //   Alert,
// //   ActivityIndicator,
// // } from 'react-native';
// // import Ionicons from 'react-native-vector-icons/Ionicons';
// // import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// // import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// // import Header from '../../../../constants/Header';
// // import {API_BASE_URL} from '../../../../utils/utils';
// // import axios from 'axios';
// // import AsyncStorage from '@react-native-async-storage/async-storage';

// // const Withdraw = ({navigation}) => {
// //   const [amount, setAmount] = useState('');
// //   const [accountno, setAccountno] = useState('');
// //   const [ifsccode, setIfsccode] = useState('');
// //   const [remark, setRemark] = useState('');
// //   const [acholdername, setAcholdername] = useState('');
// //   const [balance, setBalance] = useState('0.00');
// //   const [loading, setLoading] = useState(false);

// //   // ✅ Fetch Wallet Balance API
// //   const fetchWalletBalance = async () => {
// //     try {
// //       setLoading(true);
// //       const token = await AsyncStorage.getItem('TOKEN');
// //       const userId = await AsyncStorage.getItem('USERID');

// //       const payload = {
// //         buyer_id: userId,
// //       };

// //       const response = await axios.post(
// //         `${API_BASE_URL}/wallet/balance`,
// //         payload,
// //         {
// //           headers: {
// //             Accept: 'application/json',
// //             Authorization: `Bearer ${token}`,
// //           },
// //         },
// //       );
// //       if (response?.data?.status !== undefined) {
// //         setBalance(response.data.balance.toString());
// //       } else {
// //         setBalance('0.00');
// //       }
// //     } catch (error) {
// //       console.log(
// //         'Balance fetch error:',
// //         error?.response?.data || error.message,
// //       );
// //       Alert.alert('Error', 'Unable to fetch wallet balance.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // 🔁 Load balance when screen opens
// //   useEffect(() => {
// //     fetchWalletBalance();
// //   }, []);

// //   const handleWithdraw = () => {
// //     console.log('Withdraw Request Sent:', amount);
// //     console.log('Withdraw Request Sent:', ifsccode);
// //     console.log('Withdraw Request Sent:', accountno);
// //     console.log('Withdraw Request Sent:', remark);
// //     console.log('Withdraw Request Sent:', acholdername);
// //   };

// //   return (
// //     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
// //       <Header title="Withdraw" navigation={navigation} showBack={true} />
// //       <View style={{marginHorizontal: 10}}>
// //         {/* Current Balance */}
// //         <View style={styles.balanceCard}>
// //           <Text style={styles.balanceLabel}>Current Balance</Text>
// //           {loading ? (
// //             <ActivityIndicator color="#14AE5C" />
// //           ) : (
// //             <Text style={styles.balanceAmount}>₹{balance}</Text>
// //           )}
// //         </View>

// //         {/* Enter Amount Section */}
// //         <Text style={styles.sectionTitle}>Enter Amount</Text>
// //         <TextInput
// //           style={styles.amountInput}
// //           placeholder="₹ xx,xxx"
// //           placeholderTextColor="#999"
// //           keyboardType="numeric"
// //           value={amount}
// //           onChangeText={setAmount}
// //         />

// //         {/* Account Info */}
// //         <View style={styles.accountRow}>
// //           <View style={styles.inputBox}>
// //             <Text style={styles.inputLabel}>Account No.</Text>
// //             <TextInput
// //               style={styles.input}
// //               placeholder="XXXXXXXXXXXXXXXX"
// //               value={accountno}
// //               onChangeText={setAccountno}
// //             />
// //           </View>
// //           <View style={styles.inputBox}>
// //             <Text style={styles.inputLabel}>IFSC Code</Text>
// //             <TextInput
// //               style={styles.input}
// //               placeholder="XXXXXXXXX"
// //               value={ifsccode}
// //               onChangeText={setIfsccode}
// //             />
// //           </View>
// //         </View>
// //         <View style={[styles.accountRow, {marginTop: 10}]}>
// //           <View style={styles.inputBox}>
// //             <Text style={styles.inputLabel}>Refund Remark</Text>
// //             <TextInput
// //               style={styles.input}
// //               placeholder="XXXXXXXXX"
// //               value={remark}
// //               onChangeText={setRemark}
// //             />
// //           </View>
// //           <View style={styles.inputBox}>
// //             <Text style={styles.inputLabel}>Refund a/c holder name</Text>
// //             <TextInput
// //               style={styles.input}
// //               placeholder="XXXXXXXXX"
// //               value={acholdername}
// //               onChangeText={setAcholdername}
// //             />
// //           </View>
// //         </View>

// //         {/* Request Withdraw Button */}
// //         <TouchableOpacity
// //           style={styles.withdrawButton}
// //           onPress={handleWithdraw}>
// //           <Text style={styles.withdrawButtonText}>Request Withdraw</Text>
// //         </TouchableOpacity>

// //         {/* Notes */}
// //         <View style={styles.notesSection}>
// //           <Text style={styles.note}>
// //             • Funds will be credited within 3–7 business days.
// //           </Text>
// //           <Text style={styles.note}>• Minimum withdrawal amount is ₹100.</Text>
// //           <Text style={styles.note}>
// //             • Amount can be withdrawn in the favor of account holder only.
// //           </Text>
// //         </View>

// //         {/* Previous Withdraws */}
// //         <Text style={styles.previousTitle}>Previous Withdraws</Text>

// //         {/* Verified */}
// //         <View style={styles.historyCard}>
// //           <FontAwesome5 name="money-bill-wave" size={18} color="#1A9E41" />
// //           <View style={styles.historyDetails}>
// //             <Text style={styles.historyAmount}>- ₹ 3,499</Text>
// //             <Text style={styles.historyStatus}>↑ Withdraw Verified</Text>
// //             <Text style={styles.historyDate}>10 May, 12:30 PM</Text>
// //           </View>
// //           <Ionicons name="checkmark-done-circle" size={22} color="#1A9E41" />
// //         </View>

// //         {/* Rejected */}
// //         <View style={styles.historyCard}>
// //           <FontAwesome5 name="money-bill-wave" size={18} color="#C0392B" />
// //           <View style={styles.historyDetails}>
// //             <Text style={styles.historyAmount}>- ₹ 3,499</Text>
// //             <Text style={[styles.historyStatus, {color: '#C0392B'}]}>
// //               ↑ Withdraw Rejected
// //             </Text>
// //             <Text style={styles.historyDate}>10 May, 12:30 PM</Text>
// //             <Text style={styles.reasonText}>
// //               *Reason - User account no. did not match.
// //             </Text>
// //           </View>
// //           <MaterialIcons name="cancel" size={22} color="#C0392B" />
// //         </View>

// //         {/* Under Verification */}
// //         <View style={styles.historyCard}>
// //           <FontAwesome5 name="money-bill-wave" size={18} color="#F4B400" />
// //           <View style={styles.historyDetails}>
// //             <Text style={styles.historyAmount}>- ₹ 3,499</Text>
// //             <Text style={[styles.historyStatus, {color: '#555'}]}>
// //               ↑ Withdraw Under Verification
// //             </Text>
// //             <Text style={styles.historyDate}>--</Text>
// //           </View>
// //           <Ionicons name="time" size={22} color="#F4B400" />
// //         </View>
// //       </View>
// //     </ScrollView>
// //   );
// // };

// // export default Withdraw;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#FBFEFC',
// //   },
// //   balanceCard: {
// //     backgroundColor: '#fff',
// //     borderRadius: 12,
// //     padding: 16,
// //     marginBottom: 20,
// //     shadowColor: '#000',
// //     shadowOpacity: 0.05,
// //     shadowRadius: 6,
// //     elevation: 3,
// //   },
// //   balanceLabel: {
// //     fontSize: 15,
// //     color: '#666',
// //   },
// //   balanceAmount: {
// //     fontSize: 26,
// //     fontWeight: '700',
// //     color: '#111',
// //     marginTop: 4,
// //   },
// //   sectionTitle: {
// //     fontSize: 18,
// //     fontWeight: '700',
// //     marginBottom: 8,
// //     color: '#222',
// //   },
// //   amountInput: {
// //     backgroundColor: '#EFEFEF',
// //     borderRadius: 10,
// //     padding: 14,
// //     fontSize: 16,
// //     color: '#000',
// //     marginBottom: 20,
// //   },
// //   accountRow: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     gap: 10,
// //   },
// //   inputBox: {
// //     flex: 1,
// //   },
// //   inputLabel: {
// //     fontSize: 14,
// //     color: '#333',
// //     marginBottom: 6,
// //   },
// //   input: {
// //     backgroundColor: '#fff',
// //     borderRadius: 10,
// //     padding: 12,
// //     fontSize: 15,
// //     color: '#1A9E41',
// //     borderWidth: 1,
// //     borderColor: '#ddd',
// //   },
// //   withdrawButton: {
// //     backgroundColor: '#111',
// //     borderRadius: 10,
// //     paddingVertical: 14,
// //     alignItems: 'center',
// //     marginTop: 24,
// //   },
// //   withdrawButtonText: {
// //     color: '#fff',
// //     fontSize: 16,
// //     fontWeight: '600',
// //   },
// //   notesSection: {
// //     marginTop: 18,
// //   },
// //   note: {
// //     fontSize: 13,
// //     color: '#444',
// //     marginBottom: 4,
// //   },
// //   previousTitle: {
// //     fontSize: 17,
// //     fontWeight: '700',
// //     color: '#222',
// //     marginTop: 30,
// //     marginBottom: 10,
// //   },
// //   historyCard: {
// //     backgroundColor: '#fff',
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     borderRadius: 10,
// //     padding: 14,
// //     marginBottom: 12,
// //     shadowColor: '#000',
// //     shadowOpacity: 0.05,
// //     shadowRadius: 6,
// //     elevation: 2,
// //   },
// //   historyDetails: {
// //     flex: 1,
// //     marginHorizontal: 12,
// //   },
// //   historyAmount: {
// //     fontSize: 16,
// //     fontWeight: '700',
// //     color: '#222',
// //   },
// //   historyStatus: {
// //     fontSize: 14,
// //     color: '#1A9E41',
// //     marginTop: 2,
// //   },
// //   historyDate: {
// //     fontSize: 12,
// //     color: '#777',
// //     marginTop: 2,
// //   },
// //   reasonText: {
// //     fontSize: 12,
// //     color: '#C0392B',
// //     marginTop: 3,
// //   },
// // });

// // import React, { useState } from 'react';
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   StyleSheet,
// //   SafeAreaView,
// //   ScrollView,
// //   Alert,
// // } from 'react-native';
// // import { Dropdown } from 'react-native-element-dropdown';
// // import Ionicons from 'react-native-vector-icons/Ionicons';
// // import Header from '../../../../constants/Header';

// // export default function WithdrawScreen({navigation}) {
// //   const [amount, setAmount] = useState('');
// //   const [acholdername, setAcholdername] = useState('');
// //   const [accountno, setAccountno] = useState('');
// //   const [ifsccode, setIfsccode] = useState('');
// //   const [remark, setRemark] = useState('');
// //   const [transactionType, setTransactionType] = useState(null);

// //   const transactionOptions = [
// //     { label: 'UPI', value: '0' },
// //     { label: 'NEFT', value: '1' },
// //     { label: 'IMPS', value: '1' },
// //     { label: 'RTGS', value: '3' },
// //     { label: 'CARD', value: '4' },
// //     { label: 'Net Banking', value: '5' },
// //   ];

// //   const handleWithdraw = () => {
// //     if (!amount || !accountno || !ifsccode || !acholdername || !transactionType) {
// //       Alert.alert('Error', 'Please fill all required fields');
// //       return;
// //     }

// //     const payload = {
// //       amount,
// //       acholdername,
// //       accountno,
// //       ifsccode,
// //       remark,
// //       transactionType,
// //     };

// //     console.log('Withdraw Payload:', payload);
// //     Alert.alert('Withdraw Request Sent', `Type: ${transactionType}`);
// //     // TODO: Send payload to Laravel backend API using axios or fetch
// //   };

// //   return (
// //     <SafeAreaView style={styles.safeArea}>
// //       <ScrollView contentContainerStyle={styles.container}>
// //         <Header title="Withdraw" navigation={navigation} showBack={true} />

// //         <View style={styles.card}>
// //           <Text style={styles.sectionTitle}>Account Details</Text>

// //           <TextInput
// //             style={styles.input}
// //             placeholder="Account Holder Name"
// //             value={acholdername}
// //             onChangeText={setAcholdername}
// //           />

// //           <TextInput
// //             style={styles.input}
// //             placeholder="Account Number"
// //             keyboardType="number-pad"
// //             value={accountno}
// //             onChangeText={setAccountno}
// //           />

// //           <TextInput
// //             style={styles.input}
// //             placeholder="IFSC Code"
// //             autoCapitalize="characters"
// //             value={ifsccode}
// //             onChangeText={setIfsccode}
// //           />

// //           <Dropdown
// //             style={styles.dropdown}
// //             placeholderStyle={styles.placeholderStyle}
// //             selectedTextStyle={styles.selectedTextStyle}
// //             data={transactionOptions}
// //             labelField="label"
// //             valueField="value"
// //             placeholder="Select Transaction Type"
// //             value={transactionType}
// //             onChange={item => setTransactionType(item.value)}
// //           />

// //           <TextInput
// //             style={styles.input}
// //             placeholder="Amount"
// //             keyboardType="numeric"
// //             value={amount}
// //             onChangeText={setAmount}
// //           />

// //           <TextInput
// //             style={[styles.input, { height: 80 }]}
// //             placeholder="Remark (optional)"
// //             multiline
// //             value={remark}
// //             onChangeText={setRemark}
// //           />

// //           <TouchableOpacity style={styles.button} onPress={handleWithdraw}>
// //             <Ionicons name="wallet-outline" size={20} color="#fff" />
// //             <Text style={styles.buttonText}>Withdraw Now</Text>
// //           </TouchableOpacity>
// //         </View>

// //         <View style={styles.historyCard}>
// //           <Text style={styles.sectionTitle}>Recent Withdrawals</Text>
// //           <View style={styles.historyRow}>
// //             <Text style={styles.historyText}>₹500 • UPI</Text>
// //             <Text style={styles.historyStatusSuccess}>Success</Text>
// //           </View>
// //           <View style={styles.historyRow}>
// //             <Text style={styles.historyText}>₹2000 • NEFT</Text>
// //             <Text style={styles.historyStatusPending}>Pending</Text>
// //           </View>
// //         </View>
// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   safeArea: {
// //     flex: 1, backgroundColor: '#FBFEFC',
// //   },
// //   container: {
// //     marginHorizontal: 16,
// //   },
// //   title: {
// //     fontSize: 22,
// //     fontWeight: '700',
// //     color: '#222',
// //     marginBottom: 10,
// //   },
// //   card: {
// //     backgroundColor: '#fff',
// //     borderRadius: 12,
// //     padding: 16,
// //     shadowColor: '#000',
// //     shadowOpacity: 0.1,
// //     shadowRadius: 6,
// //     elevation: 3,
// //     marginBottom: 20,
// //   },
// //   sectionTitle: {
// //     fontSize: 16,
// //     fontWeight: '600',
// //     marginBottom: 10,
// //     color: '#333',
// //   },
// //   input: {
// //     backgroundColor: '#f9f9f9',
// //     borderRadius: 10,
// //     borderWidth: 1,
// //     borderColor: '#ddd',
// //     paddingHorizontal: 12,
// //     paddingVertical: 10,
// //     marginBottom: 12,
// //     fontSize: 15,
// //   },
// //   dropdown: {
// //     backgroundColor: '#f9f9f9',
// //     borderRadius: 10,
// //     paddingHorizontal: 12,
// //     paddingVertical: 8,
// //     borderWidth: 1,
// //     borderColor: '#ddd',
// //     marginBottom: 12,
// //   },
// //   placeholderStyle: {
// //     fontSize: 15,
// //     color: '#999',
// //   },
// //   selectedTextStyle: {
// //     fontSize: 15,
// //     color: '#111',
// //   },
// //   button: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     backgroundColor: '#007bff',
// //     paddingVertical: 12,
// //     borderRadius: 10,
// //     marginTop: 10,
// //   },
// //   buttonText: {
// //     color: '#fff',
// //     fontWeight: '600',
// //     marginLeft: 8,
// //     fontSize: 16,
// //   },
// //   historyCard: {
// //     backgroundColor: '#fff',
// //     borderRadius: 12,
// //     padding: 16,
// //     elevation: 3,
// //   },
// //   historyRow: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     marginBottom: 8,
// //   },
// //   historyText: {
// //     color: '#333',
// //     fontSize: 15,
// //   },
// //   historyStatusSuccess: {
// //     color: 'green',
// //     fontWeight: '600',
// //   },
// //   historyStatusPending: {
// //     color: '#f39c12',
// //     fontWeight: '600',
// //   },
// // });

// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   ScrollView,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import {Dropdown} from 'react-native-element-dropdown';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Header from '../../../../constants/Header';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Toast from 'react-native-toast-message';
// import {API_BASE_URL} from '../../../../utils/utils';

// export default function WithdrawScreen({navigation}) {
//   const [amount, setAmount] = useState('');
//   const [acholdername, setAcholdername] = useState('');
//   const [accountno, setAccountno] = useState('');
//   const [ifsccode, setIfsccode] = useState('');
//   const [remark, setRemark] = useState('');
//   const [transactionType, setTransactionType] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const transactionOptions = [
//     {label: 'UPI', value: '0'},
//     {label: 'NEFT', value: '1'},
//     {label: 'IMPS', value: '2'},
//     {label: 'RTGS', value: '3'},
//     {label: 'CARD', value: '4'},
//     {label: 'Net Banking', value: '5'},
//   ];

//   const handleWithdraw = async () => {
//     if (
//       !amount ||
//       !accountno ||
//       !ifsccode ||
//       !acholdername ||
//       !transactionType
//     ) {
//       Alert.alert('Error', 'Please fill all required fields');
//       return;
//     }

//     try {
//       setLoading(true);
//       const token = await AsyncStorage.getItem('TOKEN');
//       const userId = await AsyncStorage.getItem('USERID');

//       if (!userId || !token) {
//         Alert.alert('Error', 'User not authenticated. Please log in again.');
//         setLoading(false);
//         return;
//       }

//       const payload = {
//         vendor_sales_id: userId,
//         refund_account_name: acholdername,
//         refund_account_no: accountno,
//         refund_ifsc_code: ifsccode,
//         refund_amount: amount,
//         refund_remarks: remark,
//         refund_type: transactionType,
//       };

//       console.log('Withdraw Payload:', payload);

//       const response = await axios.post(
//         `${API_BASE_URL}/refund/create`,
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: 'application/json',
//           },
//         },
//       );

//       console.log('API Response:', response.data);

//       if (response.data?.status === true) {
//         Toast.show({
//           type: 'success',
//           text1: response.data.message || 'Withdrawal Request Submitted',
//         });
//         setAmount('');
//         setAccountno('');
//         setIfsccode('');
//         setAcholdername('');
//         setRemark('');
//         setTransactionType(null);
//         navigation.navigate('Wallet');
//       } else {
//         Toast.show({
//           type: 'error',
//           text1: response.data?.message || 'Failed to submit withdrawal',
//         });
//       }
//     } catch (error) {
//       console.log('Withdraw API Error:', error.response?.data || error.message);
//       Toast.show({
//         type: 'error',
//         text1: error.response?.data?.message || 'Something went wrong',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ScrollView contentContainerStyle={styles.container}>
//         <Header title="Withdraw" navigation={navigation} showBack={true} />

//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>Account Details</Text>

//           <TextInput
//             style={styles.input}
//             placeholder="Account Holder Name"
//             value={acholdername}
//             onChangeText={setAcholdername}
//           />

//           <TextInput
//             style={styles.input}
//             placeholder="Account Number"
//             keyboardType="number-pad"
//             value={accountno}
//             onChangeText={setAccountno}
//           />

//           <TextInput
//             style={styles.input}
//             placeholder="IFSC Code"
//             autoCapitalize="characters"
//             value={ifsccode}
//             onChangeText={setIfsccode}
//           />

//           <Dropdown
//             style={styles.dropdown}
//             placeholderStyle={styles.placeholderStyle}
//             selectedTextStyle={styles.selectedTextStyle}
//             data={transactionOptions}
//             labelField="label"
//             valueField="value"
//             placeholder="Select Transaction Type"
//             value={transactionType}
//             onChange={item => setTransactionType(item.value)}
//           />

//           <TextInput
//             style={styles.input}
//             placeholder="Amount"
//             keyboardType="numeric"
//             value={amount}
//             onChangeText={setAmount}
//           />

//           <TextInput
//             style={[styles.input, {height: 80}]}
//             placeholder="Remark (optional)"
//             multiline
//             value={remark}
//             onChangeText={setRemark}
//           />

//           <TouchableOpacity
//             style={styles.button}
//             onPress={handleWithdraw}
//             disabled={loading}>
//             {loading ? (
//               <ActivityIndicator color="#fff" />
//             ) : (
//               <>
//                 <Ionicons name="wallet-outline" size={20} color="#fff" />
//                 <Text style={styles.buttonText}>Withdraw Now</Text>
//               </>
//             )}
//           </TouchableOpacity>
//         </View>

//         <View style={styles.historyCard}>
//           <Text style={styles.sectionTitle}>Recent Withdrawals</Text>
//           <View style={styles.historyRow}>
//             <Text style={styles.historyText}>₹500 • UPI</Text>
//             <Text style={styles.historyStatusSuccess}>Success</Text>
//           </View>
//           <View style={styles.historyRow}>
//             <Text style={styles.historyText}>₹2000 • NEFT</Text>
//             <Text style={styles.historyStatusPending}>Pending</Text>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {flex: 1, backgroundColor: '#FBFEFC'},
//   container: {marginHorizontal: 16},
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 16,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 3,
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 10,
//     color: '#333',
//   },
//   input: {
//     backgroundColor: '#f9f9f9',
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//     marginBottom: 12,
//     fontSize: 15,
//   },
//   dropdown: {
//     backgroundColor: '#f9f9f9',
//     borderRadius: 10,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     marginBottom: 12,
//   },
//   placeholderStyle: {fontSize: 15, color: '#999'},
//   selectedTextStyle: {fontSize: 15, color: '#111'},
//   button: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#007bff',
//     paddingVertical: 12,
//     borderRadius: 10,
//     marginTop: 10,
//   },
//   buttonText: {color: '#fff', fontWeight: '600', marginLeft: 8, fontSize: 16},
//   historyCard: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 16,
//     elevation: 3,
//   },
//   historyRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   historyText: {color: '#333', fontSize: 15},
//   historyStatusSuccess: {color: 'green', fontWeight: '600'},
//   historyStatusPending: {color: '#f39c12', fontWeight: '600'},
// });

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
      console.log('res++++++++++++++++++++++++++++', response?.data);
      if (response?.data?.status === true) {
        setRefundHistory(response.data?.refund_history || []);
      } else {
        setRefundHistory([]);
      }
    } catch (error) {
      console.log(
        'Refund History Error:',
        error.response?.data || error.message,
      );
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

      console.log('Withdraw Payload:', payload);

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

      console.log('API Response:', response.data);

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
      console.log('Withdraw API Error:', error.response?.data || error.message);
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
