// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   SafeAreaView,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Modal,
//   Image,
//   Alert,
// } from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
// import {useRoute} from '@react-navigation/native';
// import axios from 'axios';
// import Toast from 'react-native-toast-message';

// import {styles_confirmSignup} from './styles'; // Keep your existing confirmSignup styles

// const Signup_Address = ({navigation}) => {
//   const route = useRoute();

//   let regData = route.params?.RegData;
//   console.log('1st --------->', regData?.accountType);

//   const [isBilling, setIsBilling] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [form, setForm] = useState({
//     billingAddress: '',
//     billingZip: '',
//     billingCity: '',
//     billingState: '',
//     shippingAddress: '',
//     shippingZip: '',
//     shippingCity: '',
//     shippingState: '',
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (name, value) => {
//     setForm({...form, [name]: value});
//   };

//   console.log('2nd --------->', regData?.accountType);

//   const handleRegister = async () => {
//     // if (Object.keys(errors).length === 0) {
//     //   setShowModal(true);
//     // }

//     const payload = {
//       email: regData?.email,
//       name: regData?.contactPerson,
//       password: regData?.password,
//       confirm_password: regData?.confirmPassword,
//       phone: regData?.contactNumber,
//       vendor_type: regData?.accountType,
//       billing_Address: form.billingAddress,
//       billing_City: form.billingCity,
//       billing_State: form.billingState,
//       billing_Zip: form.billingZip,
//       shipping_Address: form.shippingAddress,
//       shipping_City: form.shippingAddress,
//       shipping_State: form.shippingState,
//       shipping_Zip: form.shippingZip,
//     };

//     console.log('payload--------------------->', payload);

//     try {
//       const response = await axios.post(
//         'https://api.mobitrade.in/api/buyer/register',
//         payload,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         },
//       );

//       console.log('Registration Successful:', response.data);

//       Alert.alert('Success', 'Registered successfully!', [
//         {
//           text: 'OK',
//           onPress: () => navigation.navigate('LoginScreen'),
//         },
//       ]);
//     } catch (error) {
//       if (error.response && error.response.data) {
//         const {message, errors} = error.response.data;

//         if (errors && typeof errors === 'object') {
//           // Collect all error messages from the "errors" object
//           const errorMessages = Object.values(errors).flat().join('\n');

//           Alert.alert('Validation Error', errorMessages);
//         } else {
//           // Fallback if no detailed errors
//           Alert.alert('Error', message || 'Something went wrong');
//         }
//       } else {
//         Alert.alert('Error', 'Network error or server not responding');
//       }

//       console.log(
//         'Registration Error:',
//         error?.response?.data || error.message,
//       );
//     }

//     navigation.navigate('Home');
//   };

//   useEffect(() => {
//     const newErrors = {};
//     if (!form.billingAddress.trim())
//       newErrors.billingAddress = 'Address is required';
//     if (!form.billingZip.trim()) newErrors.billingZip = 'ZIP is required';
//     if (!form.billingCity.trim()) newErrors.billingCity = 'City is required';
//     if (!form.billingState.trim()) newErrors.billingState = 'State is required';

//     if (!isBilling) {
//       if (!form.shippingAddress.trim())
//         newErrors.shippingAddress = 'Address is required';
//       if (!form.shippingZip.trim()) newErrors.shippingZip = 'ZIP is required';
//       if (!form.shippingCity.trim())
//         newErrors.shippingCity = 'City is required';
//       if (!form.shippingState.trim())
//         newErrors.shippingState = 'State is required';
//     }

//     setErrors(newErrors);
//   }, [form, isBilling]);

//   const handleContinue = async () => {
//     setShowModal(false);

//     const payload = {
//       email: regData?.email,
//       name: regData?.email,
//       password: regData?.password,
//       confirm_password: regData?.confirm_password,
//       phone: regData?.phone,
//       vendor_type: regData?.vendor_type,
//       billing_Address: form.billingAddress,
//       billing_City: form.billingCity,
//       billing_State: form.billingState,
//       billing_Zip: form.billingZip,
//       shipping_Address: form.shippingAddress,
//       shipping_City: form.shippingAddress,
//       shipping_State: form.shippingState,
//       shipping_Zip: form.shippingZip,
//     };

//     console.log('payload--------------------->', payload);

//     try {
//       const response = await axios.post(
//         'https://api.mobitrade.in/api/buyer/register',
//         payload,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         },
//       );

//       console.log('Registration Successful:', response.data);

//       Alert.alert('Success', 'Registered successfully!', [
//         {
//           text: 'OK',
//           onPress: () => navigation.navigate('LoginScreen'),
//         },
//       ]);
//     } catch (error) {
//       if (error.response && error.response.data) {
//         const {message, errors} = error.response.data;

//         if (errors && typeof errors === 'object') {
//           // Collect all error messages from the "errors" object
//           const errorMessages = Object.values(errors).flat().join('\n');

//           Alert.alert('Validation Error', errorMessages);
//         } else {
//           // Fallback if no detailed errors
//           Alert.alert('Error', message || 'Something went wrong');
//         }
//       } else {
//         Alert.alert('Error', 'Network error or server not responding');
//       }

//       console.log(
//         'Registration Error:',
//         error?.response?.data || error.message,
//       );
//     }

//     navigation.navigate('Home');
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.form}>
//         {/* Billing Address Section */}
//         <Text style={styles.sectionHeaderText}>Billing Address</Text>
//         <View style={styles.divider} />

//         <Text style={styles.label}>Address Line *</Text>
//         <TextInput
//           style={[styles.input, errors.billingAddress && styles.errorInput]}
//           value={form.billingAddress}
//           onChangeText={value => handleChange('billingAddress', value)}
//           placeholder="Enter your address"
//           multiline
//           numberOfLines={4}
//           placeholderTextColor="#888"
//         />
//         {errors.billingAddress && (
//           <Text style={styles.errorText}>{errors.billingAddress}</Text>
//         )}

//         <Text style={styles.label}>ZIP Code *</Text>
//         <TextInput
//           style={[styles.input, errors.billingZip && styles.errorInput]}
//           value={form.billingZip}
//           onChangeText={value => handleChange('billingZip', value)}
//           keyboardType="numeric"
//           placeholder="Enter ZIP code"
//           placeholderTextColor="#888"
//         />
//         {errors.billingZip && (
//           <Text style={styles.errorText}>{errors.billingZip}</Text>
//         )}

//         <Text style={styles.label}>City *</Text>
//         <TextInput
//           style={[styles.input, errors.billingCity && styles.errorInput]}
//           value={form.billingCity}
//           onChangeText={value => handleChange('billingCity', value)}
//           placeholder="Enter city"
//           placeholderTextColor="#888"
//         />
//         {errors.billingCity && (
//           <Text style={styles.errorText}>{errors.billingCity}</Text>
//         )}

//         <Text style={styles.label}>State/Province *</Text>
//         <TextInput
//           style={[styles.input, errors.billingState && styles.errorInput]}
//           value={form.billingState}
//           onChangeText={value => handleChange('billingState', value)}
//           placeholder="Enter state"
//           placeholderTextColor="#888"
//         />
//         {errors.billingState && (
//           <Text style={styles.errorText}>{errors.billingState}</Text>
//         )}

//         {/* Shipping Address */}
//         <Text style={styles.sectionHeaderText}>Shipping Address</Text>
//         <View style={styles.divider} />

//         <View style={styles.checkboxContainer}>
//           <CheckBox
//             value={isBilling}
//             onValueChange={setIsBilling}
//             tintColors={{true: '#1C9C48', false: '#aaa'}}
//             style={styles.checkbox}
//           />
//           <Text style={styles.checkboxLabel}>Same as above</Text>
//         </View>

//         {!isBilling && (
//           <>
//             <Text style={styles.label}>Address Line *</Text>
//             <TextInput
//               style={[
//                 styles.input,
//                 errors.shippingAddress && styles.errorInput,
//               ]}
//               value={form.shippingAddress}
//               onChangeText={value => handleChange('shippingAddress', value)}
//               placeholder="Enter your address"
//               multiline
//               numberOfLines={4}
//               placeholderTextColor="#888"
//             />
//             {errors.shippingAddress && (
//               <Text style={styles.errorText}>{errors.shippingAddress}</Text>
//             )}

//             <Text style={styles.label}>ZIP Code *</Text>
//             <TextInput
//               style={[styles.input, errors.shippingZip && styles.errorInput]}
//               value={form.shippingZip}
//               onChangeText={value => handleChange('shippingZip', value)}
//               keyboardType="numeric"
//               placeholder="Enter ZIP code"
//               placeholderTextColor="#888"
//             />
//             {errors.shippingZip && (
//               <Text style={styles.errorText}>{errors.shippingZip}</Text>
//             )}

//             <Text style={styles.label}>City *</Text>
//             <TextInput
//               style={[styles.input, errors.shippingCity && styles.errorInput]}
//               value={form.shippingCity}
//               onChangeText={value => handleChange('shippingCity', value)}
//               placeholder="Enter city"
//               placeholderTextColor="#888"
//             />
//             {errors.shippingCity && (
//               <Text style={styles.errorText}>{errors.shippingCity}</Text>
//             )}

//             <Text style={styles.label}>State/Province *</Text>
//             <TextInput
//               style={[styles.input, errors.shippingState && styles.errorInput]}
//               value={form.shippingState}
//               onChangeText={value => handleChange('shippingState', value)}
//               placeholder="Enter state"
//               placeholderTextColor="#888"
//             />
//             {errors.shippingState && (
//               <Text style={styles.errorText}>{errors.shippingState}</Text>
//             )}
//           </>
//         )}

//         <TouchableOpacity
//           style={[
//             styles.registerButton,
//             {
//               backgroundColor:
//                 Object.keys(errors).length > 0 ? '#aaa' : '#4B9AC1',
//             },
//           ]}
//           onPress={handleRegister}
//           disabled={Object.keys(errors).length > 0}>
//           <Text style={styles.registerText}>Register</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       {/* Modal */}
//       {/* <Modal transparent visible={showModal} animationType="fade">
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <Text style={styles_confirmSignup.title}>You're Registered!</Text>
//             <Image
//               source={
//                 regData?.accountType === 'individual'
//                   ? require('../../../assets/images/confirmsignup.png')
//                   : require('../../../assets/images/confirmsignupreg.png')
//               }
//               style={styles_confirmSignup.image}
//               resizeMode="contain"
//             />
//             <Text style={styles_confirmSignup.welcomeText}>Welcome to</Text>
//             <Text style={styles_confirmSignup.brandText}>Mobi-Trade</Text>
//             <Text style={styles_confirmSignup.description}>
//               Your account has been successfully created as an {regData?.accountType}{' '}
//               account.
//             </Text>
//             <TouchableOpacity
//               style={styles_confirmSignup.loginButton}
//               onPress={handleContinue}>
//               <Text style={styles_confirmSignup.loginButtonText}>Continue</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal> */}
//     </SafeAreaView>
//   );
// };

// export default Signup_Address;

// const styles = StyleSheet.create({
//   container: {flex: 1, backgroundColor: '#FAFAFA'},
//   form: {padding: 20},
//   sectionHeaderText: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#171D1C',
//     marginTop: 20,
//   },
//   divider: {
//     borderBottomWidth: 2.8,
//     borderColor: '#4B9AC1',
//     marginBottom: 20,
//     marginTop: 5,
//   },
//   label: {
//     marginBottom: 6,
//     fontSize: 16,
//     color: '#000',
//     fontWeight: '500',
//   },
//   input: {
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     padding: 14,
//     fontSize: 14,
//     color: '#000',
//     marginBottom: 8,
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   errorInput: {
//     borderColor: 'red',
//     borderWidth: 1.5,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 13,
//     marginBottom: 8,
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   checkbox: {
//     width: 20,
//     height: 20,
//     marginRight: 10,
//   },
//   checkboxLabel: {
//     fontSize: 15,
//     color: '#333',
//   },
//   registerButton: {
//     paddingVertical: 14,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   registerText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: '#00000070',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 20,
//     alignItems: 'center',
//     marginHorizontal: 30,
//   },
// });

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   SafeAreaView,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
// } from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
// import {useRoute} from '@react-navigation/native';
// import axios from 'axios';
// import Toast from 'react-native-toast-message';

// const Signup_Address = ({navigation}) => {
//   const route = useRoute();
//   const regData = route.params?.RegData;

//   const [isBilling, setIsBilling] = useState(false);
//   const [form, setForm] = useState({
//     billingAddress: '',
//     billingZip: '',
//     billingCity: '',
//     billingState: '',
//     shippingAddress: '',
//     shippingZip: '',
//     shippingCity: '',
//     shippingState: '',
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (name, value) => {
//     setForm({...form, [name]: value});
//   };

//   const handleRegister = async () => {
//     const payload = {
//       email: regData?.email,
//       name: regData?.contactPerson,
//       password: regData?.password,
//       confirm_password: regData?.confirmPassword,
//       phone: regData?.contactNumber,
//       vendor_type: regData?.accountType,
//       billing_Address: form.billingAddress,
//       billing_City: form.billingCity,
//       billing_State: form.billingState,
//       billing_Zip: form.billingZip,
//       shipping_Address: isBilling ? form.billingAddress : form.shippingAddress,
//       shipping_City: isBilling ? form.billingCity : form.shippingCity,
//       shipping_State: isBilling ? form.billingState : form.shippingState,
//       shipping_Zip: isBilling ? form.billingZip : form.shippingZip,
//     };

//     try {
//       const response = await axios.post(
//         'https://api.mobitrade.in/api/buyer/register',
//         payload,
//         {
//           headers: {'Content-Type': 'application/json'},
//         },
//       );

//       Toast.show({
//         type: 'success',
//         text1: 'Success',
//         text2: 'Registered successfully!',
//       });

//       navigation.navigate('LoginScreen');
//     } catch (error) {
//       if (error.response && error.response.data) {
//         const {message, errors} = error.response.data;

//         if (errors && typeof errors === 'object') {
//           const errorMessages = Object.values(errors).flat().join('\n');
//           Toast.show({
//             type: 'error',
//             text1: 'Validation Error',
//             text2: errorMessages,
//           });
//         } else {
//           Toast.show({
//             type: 'error',
//             text1: 'Error',
//             text2: message || 'Something went wrong',
//           });
//         }
//       } else {
//         Toast.show({
//           type: 'error',
//           text1: 'Network Error',
//           text2: 'Server not responding',
//         });
//       }
//     }
//   };

//   useEffect(() => {
//     const newErrors = {};
//     if (!form.billingAddress.trim())
//       newErrors.billingAddress = 'Address is required';
//     if (!form.billingZip.trim()) newErrors.billingZip = 'ZIP is required';
//     if (!form.billingCity.trim()) newErrors.billingCity = 'City is required';
//     if (!form.billingState.trim()) newErrors.billingState = 'State is required';

//     if (!isBilling) {
//       if (!form.shippingAddress.trim())
//         newErrors.shippingAddress = 'Address is required';
//       if (!form.shippingZip.trim()) newErrors.shippingZip = 'ZIP is required';
//       if (!form.shippingCity.trim())
//         newErrors.shippingCity = 'City is required';
//       if (!form.shippingState.trim())
//         newErrors.shippingState = 'State is required';
//     }

//     setErrors(newErrors);
//   }, [form, isBilling]);

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.form}>
//         <Text style={styles.sectionHeaderText}>Billing Address</Text>
//         <View style={styles.divider} />

//         <Text style={styles.label}>Address Line *</Text>
//         <TextInput
//           style={[styles.input, errors.billingAddress && styles.errorInput]}
//           value={form.billingAddress}
//           onChangeText={value => handleChange('billingAddress', value)}
//           placeholder="Enter your address"
//           multiline
//           placeholderTextColor="#888"
//         />
//         {errors.billingAddress && (
//           <Text style={styles.errorText}>{errors.billingAddress}</Text>
//         )}

//         <Text style={styles.label}>ZIP Code *</Text>
//         <TextInput
//           style={[styles.input, errors.billingZip && styles.errorInput]}
//           value={form.billingZip}
//           onChangeText={value => handleChange('billingZip', value)}
//           keyboardType="numeric"
//           placeholder="Enter ZIP code"
//           placeholderTextColor="#888"
//         />
//         {errors.billingZip && (
//           <Text style={styles.errorText}>{errors.billingZip}</Text>
//         )}

//         <Text style={styles.label}>City *</Text>
//         <TextInput
//           style={[styles.input, errors.billingCity && styles.errorInput]}
//           value={form.billingCity}
//           onChangeText={value => handleChange('billingCity', value)}
//           placeholder="Enter city"
//           placeholderTextColor="#888"
//         />
//         {errors.billingCity && (
//           <Text style={styles.errorText}>{errors.billingCity}</Text>
//         )}

//         <Text style={styles.label}>State/Province *</Text>
//         <TextInput
//           style={[styles.input, errors.billingState && styles.errorInput]}
//           value={form.billingState}
//           onChangeText={value => handleChange('billingState', value)}
//           placeholder="Enter state"
//           placeholderTextColor="#888"
//         />
//         {errors.billingState && (
//           <Text style={styles.errorText}>{errors.billingState}</Text>
//         )}

//         <Text style={styles.sectionHeaderText}>Shipping Address</Text>
//         <View style={styles.divider} />

//         <View style={styles.checkboxContainer}>
//           <CheckBox
//             value={isBilling}
//             onValueChange={setIsBilling}
//             tintColors={{true: '#1C9C48', false: '#aaa'}}
//           />
//           <Text style={styles.checkboxLabel}>Same as above</Text>
//         </View>

//         {!isBilling && (
//           <>
//             <Text style={styles.label}>Address Line *</Text>
//             <TextInput
//               style={[
//                 styles.input,
//                 errors.shippingAddress && styles.errorInput,
//               ]}
//               value={form.shippingAddress}
//               onChangeText={value => handleChange('shippingAddress', value)}
//               placeholder="Enter your address"
//               multiline
//               placeholderTextColor="#888"
//             />
//             {errors.shippingAddress && (
//               <Text style={styles.errorText}>{errors.shippingAddress}</Text>
//             )}

//             <Text style={styles.label}>ZIP Code *</Text>
//             <TextInput
//               style={[styles.input, errors.shippingZip && styles.errorInput]}
//               value={form.shippingZip}
//               onChangeText={value => handleChange('shippingZip', value)}
//               keyboardType="numeric"
//               placeholder="Enter ZIP code"
//               placeholderTextColor="#888"
//             />
//             {errors.shippingZip && (
//               <Text style={styles.errorText}>{errors.shippingZip}</Text>
//             )}

//             <Text style={styles.label}>City *</Text>
//             <TextInput
//               style={[styles.input, errors.shippingCity && styles.errorInput]}
//               value={form.shippingCity}
//               onChangeText={value => handleChange('shippingCity', value)}
//               placeholder="Enter city"
//               placeholderTextColor="#888"
//             />
//             {errors.shippingCity && (
//               <Text style={styles.errorText}>{errors.shippingCity}</Text>
//             )}

//             <Text style={styles.label}>State/Province *</Text>
//             <TextInput
//               style={[styles.input, errors.shippingState && styles.errorInput]}
//               value={form.shippingState}
//               onChangeText={value => handleChange('shippingState', value)}
//               placeholder="Enter state"
//               placeholderTextColor="#888"
//             />
//             {errors.shippingState && (
//               <Text style={styles.errorText}>{errors.shippingState}</Text>
//             )}
//           </>
//         )}

//         <TouchableOpacity
//           style={[
//             styles.registerButton,
//             {
//               backgroundColor:
//                 Object.keys(errors).length > 0 ? '#aaa' : '#4B9AC1',
//             },
//           ]}
//           onPress={handleRegister}
//           disabled={Object.keys(errors).length > 0}>
//           <Text style={styles.registerText}>Register</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default Signup_Address;

// const styles = StyleSheet.create({
//   container: {flex: 1, backgroundColor: '#FAFAFA'},
//   form: {padding: 20},
//   sectionHeaderText: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#171D1C',
//     marginTop: 20,
//   },
//   divider: {
//     borderBottomWidth: 2.8,
//     borderColor: '#4B9AC1',
//     marginBottom: 20,
//     marginTop: 5,
//   },
//   label: {
//     marginBottom: 6,
//     fontSize: 16,
//     color: '#000',
//     fontWeight: '500',
//   },
//   input: {
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     padding: 14,
//     fontSize: 14,
//     color: '#000',
//     marginBottom: 8,
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   errorInput: {
//     borderColor: 'red',
//     borderWidth: 1.5,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 13,
//     marginBottom: 8,
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   checkboxLabel: {
//     fontSize: 15,
//     color: '#333',
//     marginHorizontal:10,
//   },
//   registerButton: {
//     paddingVertical: 14,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   registerText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   SafeAreaView,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
// } from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
// import {useRoute} from '@react-navigation/native';
// import axios from 'axios';
// import Toast from 'react-native-toast-message';

// const Signup_Address = ({navigation}) => {
//   const route = useRoute();
//   const regData = route.params?.RegData;

//   const [isBilling, setIsBilling] = useState(false);
//   const [form, setForm] = useState({
//     billingAddress: '',
//     billingZip: '',
//     billingCity: '',
//     billingState: '',
//     shippingAddress: '',
//     shippingZip: '',
//     shippingCity: '',
//     shippingState: '',
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (name, value) => {
//     setForm({...form, [name]: value});
//   };

//   const handleRegister = async () => {
//     const payload = {
//       email: regData?.email,
//       name: regData?.contactPerson,
//       password: regData?.password,
//       confirm_password: regData?.confirmPassword,
//       phone: regData?.contactNumber,
//       vendor_type: regData?.accountType,
//       billing_Address: form.billingAddress,
//       billing_City: form.billingCity,
//       billing_State: form.billingState,
//       billing_Zip: form.billingZip,
//       shipping_Address: isBilling ? form.billingAddress : form.shippingAddress,
//       shipping_City: isBilling ? form.billingCity : form.shippingCity,
//       shipping_State: isBilling ? form.billingState : form.shippingState,
//       shipping_Zip: isBilling ? form.billingZip : form.shippingZip,
//     };

//     try {
//       const response = await axios.post(
//         'https://api.mobitrade.in/api/buyer/register',
//         payload,
//         {
//           headers: {'Content-Type': 'application/json'},
//         },
//       );

//       Toast.show({
//         type: 'success',
//         text1: 'Success',
//         text2: 'Registered successfully!',
//       });

//       navigation.navigate('LoginScreen');
//     } catch (error) {
//       if (error.response && error.response.data) {
//         const {message, errors} = error.response.data;

//         if (errors && typeof errors === 'object') {
//           const errorMessages = Object.values(errors).flat().join('\n');
//           Toast.show({
//             type: 'error',
//             text1: 'Validation Error',
//             text2: errorMessages,
//           });
//         } else {
//           Toast.show({
//             type: 'error',
//             text1: 'Error',
//             text2: message || 'Something went wrong',
//           });
//         }
//       } else {
//         Toast.show({
//           type: 'error',
//           text1: 'Network Error',
//           text2: 'Server not responding',
//         });
//       }
//     }
//   };

//   useEffect(() => {
//     const newErrors = {};
//     if (!form.billingAddress.trim())
//       newErrors.billingAddress = 'Address is required';
//     if (!form.billingZip.trim()) newErrors.billingZip = 'ZIP is required';
//     if (!form.billingCity.trim()) newErrors.billingCity = 'City is required';
//     if (!form.billingState.trim()) newErrors.billingState = 'State is required';

//     if (!isBilling) {
//       if (!form.shippingAddress.trim())
//         newErrors.shippingAddress = 'Address is required';
//       if (!form.shippingZip.trim()) newErrors.shippingZip = 'ZIP is required';
//       if (!form.shippingCity.trim())
//         newErrors.shippingCity = 'City is required';
//       if (!form.shippingState.trim())
//         newErrors.shippingState = 'State is required';
//     }

//     setErrors(newErrors);
//   }, [form, isBilling]);

//   useEffect(() => {
//     const fetchPostalDetails = async zip => {
//       try {
//         const res = await axios.get(
//           `https://api.mobitrade.in/api/get-postal/${zip}`,
//         );

//         if (
//           res.data?.status === 'success' &&
//           res.data?.data?.PostOffice &&
//           res.data.data.PostOffice.length > 0
//         ) {
//           const postOffice = res.data.data.PostOffice[0];

//           if (form.billingZip === zip) {
//             setForm(prev => ({
//               ...prev,
//               billingCity: postOffice.District || '',
//               billingState: postOffice.State || '',
//             }));
//           } else if (form.shippingZip === zip) {
//             setForm(prev => ({
//               ...prev,
//               shippingCity: postOffice.District || '',
//               shippingState: postOffice.State || '',
//             }));
//           }
//         }
//       } catch (error) {
//         console.log('Postal fetch failed:', error);
//       }
//     };

//     if (form.billingZip.length === 6) {
//       fetchPostalDetails(form.billingZip);
//     }

//     if (!isBilling && form.shippingZip.length === 6) {
//       fetchPostalDetails(form.shippingZip);
//     }
//   }, [form.billingZip, form.shippingZip, isBilling]);

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.form}>
//         <Text style={styles.sectionHeaderText}>Billing Address</Text>
//         <View style={styles.divider} />

//         <Text style={styles.label}>Address Line *</Text>
//         <TextInput
//           style={[styles.input, errors.billingAddress && styles.errorInput]}
//           value={form.billingAddress}
//           onChangeText={value => handleChange('billingAddress', value)}
//           placeholder="Enter your address"
//           multiline
//           placeholderTextColor="#888"
//         />
//         {errors.billingAddress && (
//           <Text style={styles.errorText}>{errors.billingAddress}</Text>
//         )}

//         <Text style={styles.label}>ZIP Code *</Text>
//         <TextInput
//           style={[styles.input, errors.billingZip && styles.errorInput]}
//           value={form.billingZip}
//           onChangeText={value => handleChange('billingZip', value)}
//           keyboardType="numeric"
//           placeholder="Enter ZIP code"
//           maxLength={6}
//           placeholderTextColor="#888"
//         />
//         {errors.billingZip && (
//           <Text style={styles.errorText}>{errors.billingZip}</Text>
//         )}

//         <Text style={styles.label}>City *</Text>
//         <TextInput
//           style={[styles.input, errors.billingCity && styles.errorInput]}
//           value={form.billingCity}
//           editable={false}
//           placeholder="Auto-filled city"
//           placeholderTextColor="#888"
//         />
//         {errors.billingCity && (
//           <Text style={styles.errorText}>{errors.billingCity}</Text>
//         )}

//         <Text style={styles.label}>State/Province *</Text>
//         <TextInput
//           style={[styles.input, errors.billingState && styles.errorInput]}
//           value={form.billingState}
//           editable={false}
//           placeholder="Auto-filled state"
//           placeholderTextColor="#888"
//         />
//         {errors.billingState && (
//           <Text style={styles.errorText}>{errors.billingState}</Text>
//         )}

//         <Text style={styles.sectionHeaderText}>Shipping Address</Text>
//         <View style={styles.divider} />

//         <View style={styles.checkboxContainer}>
//           <CheckBox
//             value={isBilling}
//             onValueChange={setIsBilling}
//             tintColors={{true: '#1C9C48', false: '#aaa'}}
//           />
//           <Text style={styles.checkboxLabel}>Same as above</Text>
//         </View>

//         {!isBilling && (
//           <>
//             <Text style={styles.label}>Address Line *</Text>
//             <TextInput
//               style={[
//                 styles.input,
//                 errors.shippingAddress && styles.errorInput,
//               ]}
//               value={form.shippingAddress}
//               onChangeText={value => handleChange('shippingAddress', value)}
//               placeholder="Enter your address"
//               multiline
//               placeholderTextColor="#888"
//             />
//             {errors.shippingAddress && (
//               <Text style={styles.errorText}>{errors.shippingAddress}</Text>
//             )}

//             <Text style={styles.label}>ZIP Code *</Text>
//             <TextInput
//               style={[styles.input, errors.shippingZip && styles.errorInput]}
//               value={form.shippingZip}
//               onChangeText={value => handleChange('shippingZip', value)}
//               keyboardType="numeric"
//               placeholder="Enter ZIP code"
//               maxLength={6}
//               placeholderTextColor="#888"
//             />
//             {errors.shippingZip && (
//               <Text style={styles.errorText}>{errors.shippingZip}</Text>
//             )}

//             <Text style={styles.label}>City *</Text>
//             <TextInput
//               style={[styles.input, errors.shippingCity && styles.errorInput]}
//               value={form.shippingCity}
//               editable={false}
//               placeholder="Auto-filled city"
//               placeholderTextColor="#888"
//             />
//             {errors.shippingCity && (
//               <Text style={styles.errorText}>{errors.shippingCity}</Text>
//             )}

//             <Text style={styles.label}>State/Province *</Text>
//             <TextInput
//               style={[styles.input, errors.shippingState && styles.errorInput]}
//               value={form.shippingState}
//               editable={false}
//               placeholder="Auto-filled state"
//               placeholderTextColor="#888"
//             />
//             {errors.shippingState && (
//               <Text style={styles.errorText}>{errors.shippingState}</Text>
//             )}
//           </>
//         )}

//         <TouchableOpacity
//           style={[
//             styles.registerButton,
//             {
//               backgroundColor:
//                 Object.keys(errors).length > 0 ? '#aaa' : '#4B9AC1',
//             },
//           ]}
//           onPress={handleRegister}
//           disabled={Object.keys(errors).length > 0}>
//           <Text style={styles.registerText}>Register</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default Signup_Address;

// const styles = StyleSheet.create({
//   container: {flex: 1, backgroundColor: '#FAFAFA'},
//   form: {padding: 20},
//   sectionHeaderText: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#171D1C',
//     marginTop: 20,
//   },
//   divider: {
//     borderBottomWidth: 2.8,
//     borderColor: '#4B9AC1',
//     marginBottom: 20,
//     marginTop: 5,
//   },
//   label: {
//     marginBottom: 6,
//     fontSize: 16,
//     color: '#000',
//     fontWeight: '500',
//   },
//   input: {
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     padding: 14,
//     fontSize: 14,
//     color: '#000',
//     marginBottom: 8,
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   errorInput: {
//     borderColor: 'red',
//     borderWidth: 1.5,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 13,
//     marginBottom: 8,
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   checkboxLabel: {
//     fontSize: 15,
//     color: '#333',
//     marginHorizontal: 10,
//   },
//   registerButton: {
//     paddingVertical: 14,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   registerText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signup_Address = ({navigation}) => {
  const route = useRoute();
  const regData = route.params?.RegData;
  const profileEdit = route.params?.EditData;
  const [isBilling, setIsBilling] = useState(false);
  const [zipLoading, setZipLoading] = useState(false);
  const [loading, setLoading] = useState(false); // 👈 Add loading state
  const [form, setForm] = useState({
    billingAddress: '',
    billingZip: '',
    billingCity: '',
    billingState: '',
    shippingAddress: '',
    shippingZip: '',
    shippingCity: '',
    shippingState: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setForm({...form, [name]: value});
  };

  // const handleRegister = async () => {
  //   if (regData?.accountType == 'individual') {
  //     const payload = {
  //       email: regData?.email,
  //       name: regData?.contactPerson,
  //       password: regData?.password,
  //       confirm_password: regData?.confirmPassword,
  //       phone: regData?.contactNumber,
  //       vendor_type: regData?.accountType,
  //       billing_Address: form.billingAddress,
  //       billing_City: form.billingCity,
  //       billing_State: form.billingState,
  //       billing_Zip: form.billingZip,
  //       shipping_Address: isBilling
  //         ? form.billingAddress
  //         : form.shippingAddress,
  //       shipping_City: isBilling ? form.billingCity : form.shippingCity,
  //       shipping_State: isBilling ? form.billingState : form.shippingState,
  //       shipping_Zip: isBilling ? form.billingZip : form.shippingZip,
  //     };
  //   } else if (
  //     regData?.accountType == 'business' &&
  //     regData?.gstNumberAvailable == false
  //   ) {
  //     const payload2 = {
  //       email: regData?.email,
  //       name: regData?.contactPerson,
  //       password: regData?.password,
  //       confirm_password: regData?.confirmPassword,
  //       phone: regData?.contactNumber,
  //       vendor_type: regData?.accountType,
  //       ask_gst: regData?.gstNumberAvailable,
  //       firm_name: regData?.firm_name,
  //       billing_Address: form.billingAddress,
  //       billing_City: form.billingCity,
  //       billing_State: form.billingState,
  //       billing_Zip: form.billingZip,
  //       shipping_Address: isBilling
  //         ? form.billingAddress
  //         : form.shippingAddress,
  //       shipping_City: isBilling ? form.billingCity : form.shippingCity,
  //       shipping_State: isBilling ? form.billingState : form.shippingState,
  //       shipping_Zip: isBilling ? form.billingZip : form.shippingZip,
  //     };
  //   }
  //   try {
  //     const response = await axios.post(
  //       'https://api.mobitrade.in/api/buyer/register',
  //       payload,
  //       {
  //         headers: {'Content-Type': 'application/json'},
  //       },
  //     );

  //     Toast.show({
  //       type: 'success',
  //       text1: 'Success',
  //       text2: 'Registered successfully!',
  //     });

  //     navigation.navigate('LoginScreen');
  //   } catch (error) {
  //     if (error.response && error.response.data) {
  //       const {message, errors} = error.response.data;

  //       if (errors && typeof errors === 'object') {
  //         const errorMessages = Object.values(errors).flat().join('\n');
  //         Toast.show({
  //           type: 'error',
  //           text1: 'Validation Error',
  //           text2: errorMessages,
  //         });
  //       } else {
  //         Toast.show({
  //           type: 'error',
  //           text1: 'Error',
  //           text2: message || 'Something went wrong',
  //         });
  //       }
  //     } else {
  //       Toast.show({
  //         type: 'error',
  //         text1: 'Network Error',
  //         text2: 'Server not responding',
  //       });
  //     }
  //   }
  // };

  // useEffect(() => {
  //     if (profileEdit && Object.keys(profileEdit).length > 0) {
  //       setIsBilling(profileEdit.customer_name || '');
  //     }
  //   }, [profileEdit]);

  console.log('ask----------->', regData?.gstNumberAvailable);

  const handleRegister = async () => {
    const vendorCode = profileEdit?.profileEdit?.vendor_code;
    console.log('vendorCode--------->', vendorCode);
    const url = vendorCode
      ? `https://api.mobitrade.in/api/buyerUpdate/${vendorCode}`
      : 'https://api.mobitrade.in/api/buyer/register';
    const token = await AsyncStorage.getItem('TOKEN');
    const axiosMethod = vendorCode ? 'put' : 'post';

    // The back code

    let payload = null;

    // COMMON FIELDS
    const commonFields = {
      email: regData?.email,
      name: regData?.contactPerson,

      // ✅ Include password only if NOT editing (i.e., no vendor_code)
      ...(!profileEdit?.profileEdit?.vendor_code
        ? {
            password: regData.password,
            confirm_password: regData.confirmPassword,
          }
        : {}),

      phone: regData?.contactNumber,
      vendor_type: regData?.accountType,
      billing_Address: form.billingAddress,
      billing_City: form.billingCity,
      billing_State: form.billingState,
      billing_Zip: form.billingZip,
      shipping_Address: isBilling ? form.billingAddress : form.shippingAddress,
      shipping_City: isBilling ? form.billingCity : form.shippingCity,
      shipping_State: isBilling ? form.billingState : form.shippingState,
      shipping_Zip: isBilling ? form.billingZip : form.shippingZip,
    };

    // PAYLOAD BASED ON CONDITIONS
    if (regData?.accountType === 'individual') {
      payload = {
        ...commonFields,
      };
    } else if (regData?.accountType === 'business') {
      if (regData?.gstNumberAvailable === false) {
        payload = {
          ...commonFields,
          ask_gst: 'no',
          firm_name: regData?.firmName,
          contact_person: regData?.contactPerson,
          business_entity_type: regData?.value,
        };
      } else {
        payload = {
          ...commonFields,
          ask_gst: 'yes',
          contact_person: regData?.contactPerson,
          gst_number: regData?.gstNumber,
          firm_name: regData?.firmName,
          business_entity_type: regData?.value,
        };
      }
    }

    // SAFETY CHECK
    if (!payload) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Invalid registration data. Please check your input.',
      });
      return;
    }

    console.log('payload---------->', payload);

    if (axiosMethod === 'post') {
      setLoading(true); // 👈 Start loading
      const body = payload;
      axios
        .post(url, body)
        .then(res => {
          if (res?.data?.status === true) {
            Toast.show({
              type: 'success',
              text2: res?.data?.message,
            });
            navigation.navigate('LoginScreen');
          } else {
            Toast.show({
              type: 'error',
              text2: res?.data?.message,
            });
          }
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text2: JSON.stringify(err?.response?.data?.errors),
          });
        })
        .finally(() => {
          setLoading(false); // 👈 Stop loading no matter what
        });
    } else if (axiosMethod === 'put') {
      setLoading(true); // 👈 Start loading
      let data = JSON.stringify(payload);
      let config = {
        method: axiosMethod,
        maxBodyLength: Infinity,
        url: url,
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        data: data,
      };
      axios
        .request(config)
        .then(res => {
          if (res?.data?.status === true) {
            Toast.show({
              type: 'success',
              text2: res?.data?.message,
            });
            navigation.navigate('LoginScreen');
          } else {
            Toast.show({
              type: 'error',
              text2: res?.data?.message,
            });
          }
        })
        .catch(error => {
          Toast.show({
            type: 'error',
            text2: JSON.stringify(error?.response?.data?.errors),
          });
        })
        .finally(() => {
          setLoading(false); // 👈 Always stop loading
        });
    }
  };

  useEffect(() => {
    const newErrors = {};
    if (!form.billingAddress.trim())
      newErrors.billingAddress = 'Address is required';
    if (!form.billingZip.trim()) newErrors.billingZip = 'ZIP is required';
    if (!form.billingCity.trim()) newErrors.billingCity = 'City is required';
    if (!form.billingState.trim()) newErrors.billingState = 'State is required';

    if (!isBilling) {
      if (!form.shippingAddress.trim())
        newErrors.shippingAddress = 'Address is required';
      if (!form.shippingZip.trim()) newErrors.shippingZip = 'ZIP is required';
      if (!form.shippingCity.trim())
        newErrors.shippingCity = 'City is required';
      if (!form.shippingState.trim())
        newErrors.shippingState = 'State is required';
    }

    setErrors(newErrors);
  }, [form, isBilling]);

  useEffect(() => {
    if (
      profileEdit?.profileEdit?.vendoraddress &&
      profileEdit?.profileEdit?.vendoraddress?.length > 0
    ) {
      const data = profileEdit?.profileEdit?.vendoraddress[0];

      setForm({
        billingAddress: data.billing_Address || '',
        billingZip: data.billing_Zip || '',
        billingCity: data.billing_City || '',
        billingState: data.billing_State || '',
        shippingAddress: data.shipping_Address || '',
        shippingZip: data.shipping_Zip || '',
        shippingCity: data.shipping_City || '',
        shippingState: data.shipping_State || '',
      });

      setIsBilling(
        data.shipping_Address === data.billing_Address &&
          data.shipping_Zip === data.billing_Zip,
      );
    }
  }, [profileEdit]);

  useEffect(() => {
    const fetchPostalDetails = async zip => {
      try {
        setZipLoading(true);
        const res = await axios.get(
          `https://api.mobitrade.in/api/get-postal/${zip}`,
        );

        if (
          res.data?.status === 'success' &&
          res.data?.data?.PostOffice &&
          res.data.data.PostOffice.length > 0
        ) {
          const postOffice = res.data.data.PostOffice[0];

          if (form.billingZip === zip) {
            setForm(prev => ({
              ...prev,
              billingCity: postOffice.District || '',
              billingState: postOffice.State || '',
            }));
          } else if (form.shippingZip === zip) {
            setForm(prev => ({
              ...prev,
              shippingCity: postOffice.District || '',
              shippingState: postOffice.State || '',
            }));
          }
        }
      } catch (error) {
        console.log('Postal fetch failed:', error);
      } finally {
        setZipLoading(false);
      }
    };

    if (form.billingZip.length === 6) {
      fetchPostalDetails(form.billingZip);
    }

    if (!isBilling && form.shippingZip.length === 6) {
      fetchPostalDetails(form.shippingZip);
    }
  }, [form.billingZip, form.shippingZip, isBilling]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.sectionHeaderText}>Billing Address</Text>
        <View style={styles.divider} />

        <Text style={styles.label}>Address Line *</Text>
        <TextInput
          style={[styles.input, errors.billingAddress && styles.errorInput]}
          value={form.billingAddress}
          onChangeText={value => handleChange('billingAddress', value)}
          placeholder="Enter your address"
          multiline
          placeholderTextColor="#888"
        />
        {errors.billingAddress && (
          <Text style={styles.errorText}>{errors.billingAddress}</Text>
        )}

        <Text style={styles.label}>ZIP Code *</Text>
        <TextInput
          style={[styles.input, errors.billingZip && styles.errorInput]}
          value={form.billingZip}
          onChangeText={value => handleChange('billingZip', value)}
          keyboardType="numeric"
          placeholder="Enter ZIP code"
          maxLength={6}
          placeholderTextColor="#888"
        />
        {zipLoading && form.billingZip.length === 6 && (
          <ActivityIndicator
            size="small"
            color="#4B9AC1"
            style={{marginBottom: 10}}
          />
        )}
        {errors.billingZip && (
          <Text style={styles.errorText}>{errors.billingZip}</Text>
        )}

        <Text style={styles.label}>City *</Text>
        <TextInput
          style={[styles.input, errors.billingCity && styles.errorInput]}
          value={form.billingCity}
          editable={false}
          placeholder="Auto-filled city"
          placeholderTextColor="#888"
        />
        {errors.billingCity && (
          <Text style={styles.errorText}>{errors.billingCity}</Text>
        )}

        <Text style={styles.label}>State/Province *</Text>
        <TextInput
          style={[styles.input, errors.billingState && styles.errorInput]}
          value={form.billingState}
          editable={false}
          placeholder="Auto-filled state"
          placeholderTextColor="#888"
        />
        {errors.billingState && (
          <Text style={styles.errorText}>{errors.billingState}</Text>
        )}

        <Text style={styles.sectionHeaderText}>Shipping Address</Text>
        <View style={styles.divider} />

        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isBilling}
            onValueChange={setIsBilling}
            tintColors={{true: '#1C9C48', false: '#aaa'}}
          />
          <Text style={styles.checkboxLabel}>Same as above</Text>
        </View>

        {!isBilling && (
          <>
            <Text style={styles.label}>Address Line *</Text>
            <TextInput
              style={[
                styles.input,
                errors.shippingAddress && styles.errorInput,
              ]}
              value={form.shippingAddress}
              onChangeText={value => handleChange('shippingAddress', value)}
              placeholder="Enter your address"
              multiline
              placeholderTextColor="#888"
            />
            {errors.shippingAddress && (
              <Text style={styles.errorText}>{errors.shippingAddress}</Text>
            )}

            <Text style={styles.label}>ZIP Code *</Text>
            <TextInput
              style={[styles.input, errors.shippingZip && styles.errorInput]}
              value={form.shippingZip}
              onChangeText={value => handleChange('shippingZip', value)}
              keyboardType="numeric"
              placeholder="Enter ZIP code"
              maxLength={6}
              placeholderTextColor="#888"
            />
            {zipLoading && form.shippingZip.length === 6 && (
              <ActivityIndicator
                size="small"
                color="#4B9AC1"
                style={{marginBottom: 10}}
              />
            )}
            {errors.shippingZip && (
              <Text style={styles.errorText}>{errors.shippingZip}</Text>
            )}

            <Text style={styles.label}>City *</Text>
            <TextInput
              style={[styles.input, errors.shippingCity && styles.errorInput]}
              value={form.shippingCity}
              editable={false}
              placeholder="Auto-filled city"
              placeholderTextColor="#888"
            />
            {errors.shippingCity && (
              <Text style={styles.errorText}>{errors.shippingCity}</Text>
            )}

            <Text style={styles.label}>State/Province *</Text>
            <TextInput
              style={[styles.input, errors.shippingState && styles.errorInput]}
              value={form.shippingState}
              editable={false}
              placeholder="Auto-filled state"
              placeholderTextColor="#888"
            />
            {errors.shippingState && (
              <Text style={styles.errorText}>{errors.shippingState}</Text>
            )}
          </>
        )}

        <TouchableOpacity
          style={[
            styles.registerButton,
            {
              backgroundColor:
                Object.keys(errors).length > 0 ? '#aaa' : '#4B9AC1',
            },
          ]}
          onPress={handleRegister}
          disabled={Object.keys(errors).length > 0}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.registerText}>Register</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup_Address;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FAFAFA'},
  form: {padding: 20},
  sectionHeaderText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#171D1C',
    marginTop: 20,
  },
  divider: {
    borderBottomWidth: 2.8,
    borderColor: '#4B9AC1',
    marginBottom: 20,
    marginTop: 5,
  },
  label: {
    marginBottom: 6,
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    fontSize: 14,
    color: '#000',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 1.5,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginBottom: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkboxLabel: {
    fontSize: 15,
    color: '#333',
    marginHorizontal: 10,
  },
  registerButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  registerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
