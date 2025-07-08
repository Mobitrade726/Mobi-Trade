// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   ScrollView,
//   Alert,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import DropDownPicker from 'react-native-dropdown-picker';
// import CheckBox from '@react-native-community/checkbox';
// import {useNavigation, useRoute} from '@react-navigation/native';

// import {styles_addnewaddress} from '../../navigation/TabNavigator/Account/Addresses/styles';
// import Toast from 'react-native-toast-message';

// const RegisterAsDealer = ({navigation}) => {
//   const [currentTab, setCurrentTab] = useState('business');
//   const [isBilling, setIsBilling] = useState(false);
//   const [gstNumberAvailable, setGstNumberAvailable] = useState(true);
//   const [gstNumber, setGstNumber] = useState('');
//   const [firmName, setFirmName] = useState('');
//   const [contactPerson, setContactPerson] = useState('');
//   const [contactNumber, setContactNumber] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState(null);
//   const [items, setItems] = useState([
//     {label: 'Proprietorship', value: 'proprietorship'},
//     {label: 'Partnership', value: 'partnership'},
//     {label: 'Private Ltd', value: 'pvt_ltd'},
//     {label: 'Public Ltd', value: 'public_ltd'},
//   ]);
//   const route = useRoute();
//   // const {accountType} = route?.params?.accountType;

//   let accountType = route?.params?.accountType;
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     const newErrors = {};

//     if (!contactPerson.trim()) newErrors.contactPerson = 'Name no is required';
//     if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
//       newErrors.email = 'Enter a valid email';
//     if (!/^[0-9]{10}$/.test(contactNumber))
//       newErrors.contactNumber = 'Enter a valid mobile number';
//     if (password.length < 6)
//       newErrors.password = 'Password must be at least 6 characters';
//     if (password !== confirmPassword)
//       newErrors.confirmPassword = 'Passwords do not match';

//     setErrors(newErrors);
//   }, [
//     firmName,
//     contactPerson,
//     contactNumber,
//     email,
//     password,
//     confirmPassword,
//   ]);

//   const [address1, setAddress1] = useState('');
//   const [address2, setAddress2] = useState('');
//   const [city, setCity] = useState('');
//   const [state, setState] = useState('');
//   const [pincode, setPincode] = useState('');
//   const [businessFormCompleted, setBusinessFormCompleted] = useState(false);

//   const handleVerifyGST = async () => {
//     if (!gstNumber) {
//       Toast.show({
//         type: 'error',
//         text2: 'Please enter a GST number',
//       });
//       return;
//     }

//     try {
//       const response = await axios.post(
//         'https://api.mobitrade.in/api/getDetail-gstno',
//         {gst_number: gstNumber},
//       );

//       if (response.data.status === 'success') {
//         const gstData = response.data.data.taxpayerInfo;
//         Toast.show({
//           type: 'success',
//           text1: 'GST Verified',
//           text2: `${gstData.lgnm || 'Business'} (${gstData.gstin})`,
//         });

//         // Optional: You can also autofill form fields using GST data:
//         // setFirmName(gstData.lgnm);
//         // setAddress1(gstData.pradr?.addr?.bno + ', ' + gstData.pradr?.addr?.st);
//         // setCity(gstData.pradr?.addr?.loc);
//         // setState(gstData.pradr?.addr?.stcd);
//         // setPincode(gstData.pradr?.addr?.pncd);
//       } else {
//         Toast.show({
//           type: 'error',
//           text2: 'Invalid GST number or not found',
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       Toast.show({
//         type: 'error',
//         text2: 'Something went wrong while verifying GST',
//       });
//     }
//   };

//   // const handleNext = () => {
//   //   navigation.navigate('Signup_Address', {accountType: accountType});
//   // };

//   const handleNext = () => {
//     if (Object.keys(errors).length > 0) {
//       Toast.show({
//         type: 'error',
//         text2: 'Please complete form fill',
//       });
//       return;
//     }

//     navigation.navigate('Signup_Address', {
//       RegData: {
//         gstNumberAvailable,
//         gstNumber,
//         firmName,
//         accountType,
//         contactPerson,
//         contactNumber,
//         email,
//         password,
//         address1,
//         address2,
//         city,
//         state,
//         pincode,
//         confirmPassword,
//         value,
//       },
//     });
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {accountType == 'individual' ? (
//         <ScrollView contentContainerStyle={styles.formContainer}>
//           <TextInput
//             style={[styles.input, errors.contactPerson && {borderColor: 'red'}]}
//             placeholder="Name*"
//             value={contactPerson}
//             onChangeText={setContactPerson}
//           />
//           {errors.contactPerson && (
//             <Text style={styles.errorText}>{errors.contactPerson}</Text>
//           )}

//           <TextInput
//             style={[styles.input, errors.contactNumber && {borderColor: 'red'}]}
//             placeholder="Phone*"
//             keyboardType="phone-pad"
//             value={contactNumber}
//             onChangeText={setContactNumber}
//           />
//           {errors.contactNumber && (
//             <Text style={styles.errorText}>{errors.contactNumber}</Text>
//           )}

//           <TextInput
//             style={[styles.input, errors.email && {borderColor: 'red'}]}
//             placeholder="Email*"
//             keyboardType="email-address"
//             value={email}
//             onChangeText={setEmail}
//           />
//           {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

//           <TextInput
//             style={[styles.input, errors.password && {borderColor: 'red'}]}
//             placeholder="Password"
//             secureTextEntry
//             value={password}
//             onChangeText={setPassword}
//           />
//           {errors.password && (
//             <Text style={styles.errorText}>{errors.password}</Text>
//           )}

//           <TextInput
//             style={[
//               styles.input,
//               errors.confirmPassword && {borderColor: 'red'},
//             ]}
//             placeholder="Confirm Password*"
//             secureTextEntry
//             value={confirmPassword}
//             onChangeText={setConfirmPassword}
//           />
//           {errors.confirmPassword && (
//             <Text style={styles.errorText}>{errors.confirmPassword}</Text>
//           )}

//           <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
//             <Text style={styles.nextButtonText}>Next</Text>
//           </TouchableOpacity>
//         </ScrollView>
//       ) : (
//         <ScrollView contentContainerStyle={styles.formContainer}>
//           {currentTab === 'business' ? (
//             <>
//               <View style={{flexDirection: 'row'}}>
//                 <Text style={styles.label}>Do you have a GST number ?</Text>
//                 <View style={styles.radioContainer}>
//                   <TouchableOpacity
//                     style={styles.radioButton}
//                     onPress={() => setGstNumberAvailable(true)}>
//                     <View style={styles.radioOuter}>
//                       {gstNumberAvailable && <View style={styles.radioInner} />}
//                     </View>
//                     <Text style={styles.radioLabel}>Yes</Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     style={styles.radioButton}
//                     onPress={() => setGstNumberAvailable(false)}>
//                     <View style={styles.radioOuter}>
//                       {!gstNumberAvailable && (
//                         <View style={styles.radioInner} />
//                       )}
//                     </View>
//                     <Text style={styles.radioLabel}>No</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>

//               {gstNumberAvailable && (
//                 <View style={styles.gstInputWrapper}>
//                   <TextInput
//                     style={styles.gstInput}
//                     placeholder="Enter GSTIN (e.g., 22AAAAA0000A1Z5)"
//                     value={gstNumber}
//                     onChangeText={setGstNumber}
//                     autoCapitalize="characters"
//                     maxLength={15}
//                   />
//                   <TouchableOpacity
//                     style={styles.verifyButton}
//                     onPress={handleVerifyGST}>
//                     <Text style={styles.verifyButtonText}>Verify</Text>
//                   </TouchableOpacity>
//                 </View>
//               )}

//               <TextInput
//                 style={styles.input}
//                 placeholder="Firm Name*"
//                 value={firmName}
//                 onChangeText={setFirmName}
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Contact Person*"
//                 value={contactPerson}
//                 onChangeText={setContactPerson}
//               />

//               <View style={{marginBottom: 15, zIndex: 1000}}>
//                 <DropDownPicker
//                   open={open}
//                   value={value}
//                   items={items}
//                   setOpen={setOpen}
//                   setValue={setValue}
//                   setItems={setItems}
//                   placeholder="Business Entity Type*"
//                   style={{
//                     borderColor: '#000',
//                     borderRadius: 10,
//                   }}
//                   dropDownContainerStyle={{
//                     borderColor: '#000',
//                     borderRadius: 10,
//                   }}
//                 />
//               </View>

//               <TextInput
//                 style={styles.input}
//                 placeholder="Contact Number*"
//                 keyboardType="phone-pad"
//                 value={contactNumber}
//                 onChangeText={setContactNumber}
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Email Address*"
//                 keyboardType="email-address"
//                 value={email}
//                 onChangeText={setEmail}
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Password"
//                 secureTextEntry
//                 value={password}
//                 onChangeText={setPassword}
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Confirm Password*"
//                 secureTextEntry
//                 value={confirmPassword}
//                 onChangeText={setConfirmPassword}
//               />

//               <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
//                 <Text style={styles.nextButtonText}>Next</Text>
//               </TouchableOpacity>
//             </>
//           ) : (
//             <>
//               <ScrollView contentContainerStyle={styles_addnewaddress.form}>
//                 {/* Input fields */}
//                 <Text style={styles_addnewaddress.label}>Title *</Text>
//                 <TextInput
//                   style={styles_addnewaddress.input}
//                   placeholder="Eg. Home, Office,etc"
//                 />

//                 <Text style={styles_addnewaddress.label}>Address Line</Text>
//                 <TextInput
//                   style={styles_addnewaddress.input}
//                   placeholder="Enter your address"
//                 />

//                 {/* <Text style={styles_addnewaddress.label}>Full Name *</Text>
//               <TextInput
//                 style={styles_addnewaddress.input}
//                 placeholder="Enter your full name"
//               />

//               <Text style={styles_addnewaddress.label}>Email Address *</Text>
//               <TextInput
//                 style={styles_addnewaddress.input}
//                 placeholder="Enter your email address"
//                 keyboardType="email-address"
//               /> */}

//                 {/* <Text style={styles_addnewaddress.label}>Phone Number *</Text>
//               <TextInput
//                 style={styles_addnewaddress.input}
//                 placeholder="Enter your phone number"
//                 keyboardType="phone-pad"
//               /> */}

//                 <TextInput
//                   style={styles_addnewaddress.input}
//                   placeholder="Optional: Enter additional address information"
//                 />

//                 <Text style={styles_addnewaddress.label}>City *</Text>
//                 <TextInput
//                   style={styles_addnewaddress.input}
//                   placeholder="Enter your city"
//                 />

//                 <Text style={styles_addnewaddress.label}>State/Province *</Text>
//                 <TextInput
//                   style={styles_addnewaddress.input}
//                   placeholder="Enter your state or province"
//                 />

//                 <Text style={styles_addnewaddress.label}>Postal Code *</Text>
//                 <TextInput
//                   style={styles_addnewaddress.input}
//                   placeholder="Enter your postal code"
//                   keyboardType="numeric"
//                 />

//                 <Text style={styles_addnewaddress.label}>Country *</Text>
//                 <TextInput
//                   style={styles_addnewaddress.input}
//                   placeholder="Select your country"
//                 />

//                 {/* Checkbox */}
//                 <View style={styles_addnewaddress.checkboxContainer}>
//                   <CheckBox
//                     value={isBilling}
//                     onValueChange={setIsBilling}
//                     tintColors={{true: '#1C9C48', false: '#ccc'}}
//                     boxType="square" // This makes checkbox square on iOS
//                     style={{width: 20, height: 20}} // Optional: force square size
//                   />

//                   <View>
//                     <Text style={styles_addnewaddress.checkboxLabel}>
//                       Billing Address
//                     </Text>
//                     <Text style={styles_addnewaddress.checkboxSubText}>
//                       Copy address data from Billing
//                     </Text>
//                   </View>
//                 </View>
//               </ScrollView>
//               <TouchableOpacity
//                 style={styles.nextButton}
//                 onPress={handleSubmit}>
//                 <Text style={styles.nextButtonText}>Submit</Text>
//               </TouchableOpacity>
//             </>
//           )}
//         </ScrollView>
//       )}
//     </SafeAreaView>
//   );
// };

// export default RegisterAsDealer;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 15,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginLeft: 10,
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     borderColor: '#ddd',
//     justifyContent: 'space-around',
//     paddingBottom: 10,
//   },
//   tabActive: {
//     color: '#2196F3',
//     fontWeight: 'bold',
//     borderBottomWidth: 2,
//     borderColor: '#2196F3',
//     paddingBottom: 5,
//   },
//   tabInactive: {
//     color: '#888',
//   },
//   formContainer: {
//     padding: 20,
//   },
//   label: {
//     fontWeight: '600',
//     marginBottom: 10,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   statusDot: {
//     height: 16,
//     width: 16,
//     borderRadius: 8,
//     backgroundColor: '#ccc',
//     marginLeft: 10,
//   },
//   statusDotActive: {
//     backgroundColor: 'green',
//   },
//   gstInputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#000',
//     borderRadius: 10,
//     overflow: 'hidden',
//     marginBottom: 15,
//   },
//   gstInput: {
//     flex: 1,
//     padding: 12,
//   },
//   verifyButton: {
//     backgroundColor: 'green',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     justifyContent: 'center',
//     borderTopRightRadius: 10,
//     borderBottomRightRadius: 10,
//   },
//   verifyButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#333333',
//     borderRadius: 16,
//     padding: 12,
//     marginBottom: 15,
//     fontFamily: 'Source Serif 4',
//   },
//   nextButton: {
//     backgroundColor: '#4BA4D9',
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   nextButtonText: {
//     color: '#fff',
//     fontSize: 17,
//     fontWeight: 'semibold',
//     fontFamily: 'Source Serif 4',
//   },
//   radioContainer: {
//     flexDirection: 'row',
//     marginBottom: 15,
//     gap: 20,
//     marginLeft: 8,
//   },
//   radioButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   radioOuter: {
//     height: 20,
//     width: 20,
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: '#4BA4D9',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 6,
//   },
//   radioInner: {
//     height: 10,
//     width: 10,
//     borderRadius: 5,
//     backgroundColor: '#4BA4D9',
//   },
//   radioLabel: {
//     fontSize: 14,
//     color: '#333',
//   },
//   errorText: {
//     color: 'red',
//     marginBottom: 10,
//     fontSize: 13,
//     marginLeft: 4,
//   },
// });

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import CheckBox from '@react-native-community/checkbox';
import {useNavigation, useRoute} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import {styles_addnewaddress} from '../../navigation/TabNavigator/Account/Addresses/styles';

const RegisterAsDealer = ({navigation}) => {
  const [currentTab, setCurrentTab] = useState('business');
  const [isBilling, setIsBilling] = useState(false);
  const [gstNumberAvailable, setGstNumberAvailable] = useState(true);
  const [gstNumber, setGstNumber] = useState('');
  const [firmName, setFirmName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Proprietorship', value: 'proprietorship'},
    {label: 'Partnership', value: 'partnership'},
    {label: 'Private Ltd', value: 'pvt_ltd'},
    {label: 'Public Ltd', value: 'public_ltd'},
  ]);
  const route = useRoute();
  let accountType = route?.params?.accountType;
  let profileEdit = route?.params?.profileEdit;
  const [errors, setErrors] = useState({});
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

  console.log('profileEdit-------------->', profileEdit?.vendordocuments?.ask_gst);

  useEffect(() => {
    const newErrors = {};
    if (!contactPerson.trim()) newErrors.contactPerson = 'Name is required';
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
      newErrors.email = 'Enter a valid email';
    if (!/^[0-9]{10}$/.test(contactNumber))
      newErrors.contactNumber = 'Enter a valid mobile number';
    if (password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
  }, [
    firmName,
    contactPerson,
    contactNumber,
    email,
    password,
    confirmPassword,
  ]);

  useEffect(() => {
    if (profileEdit && Object.keys(profileEdit).length > 0) {
      setContactPerson(profileEdit.customer_name || '');
      setEmail(profileEdit.email || '');
      setContactNumber(profileEdit.contact_number || '');
      setFirmName(profileEdit.firm_name || '');
      setValue(profileEdit.business_entity_type || '');
      setGstNumber(profileEdit?.vendordocuments?.gst_number || '');
      setGstNumberAvailable(profileEdit?.vendordocuments?.ask_gst === 'yes' ? true : false);
    }
  }, [profileEdit]);

  const handleVerifyGST = async () => {
    if (!gstNumber) {
      Toast.show({
        type: 'error',
        text2: 'Please enter a GST number',
      });
      return;
    }

    try {
      const response = await axios.post(
        'https://api.mobitrade.in/api/getDetail-gstno',
        {gst_number: gstNumber},
      );

      if (response.data.status === 'success') {
        const gstData = response.data.data.taxpayerInfo;
        Toast.show({
          type: 'success',
          text1: 'GST Verified',
          text2: `${gstData.lgnm} (${gstData.gstin})`,
        });

        // Autofill optional fields from response
        setFirmName(gstData.lgnm);
        setAddress1(
          `${gstData.pradr?.addr?.bno || ''}, ${gstData.pradr?.addr?.st || ''}`,
        );
        setCity(gstData.pradr?.addr?.loc || '');
        setState(gstData.pradr?.addr?.stcd || '');
        setPincode(gstData.pradr?.addr?.pncd || '');
      } else {
        Toast.show({
          type: 'error',
          text2: 'Invalid GST number or not found',
        });
      }
    } catch (error) {
      console.log('GST Error:', error);
      Toast.show({
        type: 'error',
        text2: 'Something went wrong while verifying GST',
      });
    }
  };

  const handleNext = () => {
    if (profileEdit && Object.keys(profileEdit).length > 0) {
      navigation.navigate('Signup_Address', {
        RegData: {
          gstNumberAvailable,
          gstNumber,
          firmName,
          accountType,
          contactPerson,
          contactNumber,
          email,
          address1,
          address2,
          city,
          state,
          pincode,
          value,
        },
        EditData: {
          profileEdit,
        },
      });
    } else {
      if (Object.keys(errors).length > 0) {
        Toast.show({
          type: 'error',
          text2: 'Please complete form fill',
        });
        return;
      }
      navigation.navigate('Signup_Address', {
        RegData: {
          gstNumberAvailable,
          gstNumber,
          firmName,
          accountType,
          contactPerson,
          contactNumber,
          email,
          password,
          address1,
          address2,
          city,
          state,
          pincode,
          confirmPassword,
          value,
        },
      });
    }
  };

  const renderIndividualForm = () => (
    <>
      <TextInput
        style={[styles.input, errors.contactPerson && {borderColor: 'red'}]}
        placeholder="Name*"
        value={contactPerson}
        onChangeText={setContactPerson}
      />
      {errors.contactPerson && (
        <Text style={styles.errorText}>{errors.contactPerson}</Text>
      )}

      <TextInput
        style={[styles.input, errors.contactNumber && {borderColor: 'red'}]}
        placeholder="Phone*"
        keyboardType="phone-pad"
        value={contactNumber}
        onChangeText={setContactNumber}
      />
      {errors.contactNumber && (
        <Text style={styles.errorText}>{errors.contactNumber}</Text>
      )}

      <TextInput
        style={[styles.input, errors.email && {borderColor: 'red'}]}
        placeholder="Email*"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      {!profileEdit?.vendor_type && (
        <>
          <TextInput
            style={[styles.input, errors.password && {borderColor: 'red'}]}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          <TextInput
            style={[
              styles.input,
              errors.confirmPassword && {borderColor: 'red'},
            ]}
            placeholder="Confirm Password*"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          {errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}
        </>
      )}
    </>
  );

  const renderBusinessForm = () => (
    <>
      <>
        <View style={{flexDirection: 'row', marginBottom: 8}}>
          <Text style={styles.label}>Do you have a GST number?</Text>
          <View style={styles.radioContainer}>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setGstNumberAvailable(true)}>
              <View style={styles.radioOuter}>
                {gstNumberAvailable && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioLabel}>Yes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setGstNumberAvailable(false)}>
              <View style={styles.radioOuter}>
                {!gstNumberAvailable && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioLabel}>No</Text>
            </TouchableOpacity>
          </View>
        </View>

        {gstNumberAvailable && (
          <View style={styles.gstInputWrapper}>
            <TextInput
              style={styles.gstInput}
              placeholder="Enter GSTIN"
              value={gstNumber}
              onChangeText={setGstNumber}
              autoCapitalize="characters"
              maxLength={15}
            />
            <TouchableOpacity
              style={styles.verifyButton}
              onPress={handleVerifyGST}>
              <Text style={styles.verifyButtonText}>Verify</Text>
            </TouchableOpacity>
          </View>
        )}
      </>
      {/* )} */}
      <TextInput
        style={styles.input}
        placeholder="Firm Name*"
        value={firmName}
        onChangeText={setFirmName}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Person*"
        value={contactPerson}
        onChangeText={setContactPerson}
      />

      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Business Entity Type*"
        style={{borderColor: '#000', borderRadius: 10, marginBottom: 15}}
        dropDownContainerStyle={{borderColor: '#000', borderRadius: 10}}
      />

      <TextInput
        style={styles.input}
        placeholder="Contact Number*"
        keyboardType="phone-pad"
        value={contactNumber}
        onChangeText={setContactNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Email Address*"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      {!profileEdit?.vendor_type && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password*"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </>
      )}
    </>
  );

  const renderForm = () => {
    if (profileEdit && Object.keys(profileEdit).length > 0) {
      return profileEdit?.vendor_type === 'Unregistered' &&
        profileEdit?.vendor_category === 'vendor_customer'
        ? renderIndividualForm()
        : renderBusinessForm();
    } else {
      return accountType === 'individual'
        ? renderIndividualForm()
        : renderBusinessForm();
    }
  };

  return (
    //     <SafeAreaView style={styles.container}>
    //       <ScrollView contentContainerStyle={styles.formContainer}>

    // {
    //   if (profileEdit && Object.keys(profileEdit).length > 0) {
    //             {profileEdit?.vendor_type === 'individual' ? (
    //           <>
    //             <TextInput
    //               style={[
    //                 styles.input,
    //                 errors.contactPerson && {borderColor: 'red'},
    //               ]}
    //               placeholder="Name*"
    //               value={contactPerson}
    //               onChangeText={setContactPerson}
    //             />
    //             {errors.contactPerson && (
    //               <Text style={styles.errorText}>{errors.contactPerson}</Text>
    //             )}

    //             <TextInput
    //               style={[
    //                 styles.input,
    //                 errors.contactNumber && {borderColor: 'red'},
    //               ]}
    //               placeholder="Phone*"
    //               keyboardType="phone-pad"
    //               value={contactNumber}
    //               onChangeText={setContactNumber}
    //             />
    //             {errors.contactNumber && (
    //               <Text style={styles.errorText}>{errors.contactNumber}</Text>
    //             )}

    //             <TextInput
    //               style={[styles.input, errors.email && {borderColor: 'red'}]}
    //               placeholder="Email*"
    //               keyboardType="email-address"
    //               value={email}
    //               onChangeText={setEmail}
    //             />
    //             {errors.email && (
    //               <Text style={styles.errorText}>{errors.email}</Text>
    //             )}

    //             {profileEdit && Object.keys(profileEdit).length > 0 ? null : (
    //               <>
    //                 <TextInput
    //                   style={[
    //                     styles.input,
    //                     errors.password && {borderColor: 'red'},
    //                   ]}
    //                   placeholder="Password"
    //                   secureTextEntry
    //                   value={password}
    //                   onChangeText={setPassword}
    //                 />
    //                 {errors.password && (
    //                   <Text style={styles.errorText}>{errors.password}</Text>
    //                 )}

    //                 <TextInput
    //                   style={[
    //                     styles.input,
    //                     errors.confirmPassword && {borderColor: 'red'},
    //                   ]}
    //                   placeholder="Confirm Password*"
    //                   secureTextEntry
    //                   value={confirmPassword}
    //                   onChangeText={setConfirmPassword}
    //                 />
    //                 {errors.confirmPassword && (
    //                   <Text style={styles.errorText}>{errors.confirmPassword}</Text>
    //                 )}
    //               </>
    //             )}
    //           </>
    //         ) : (
    //           <>
    //             <View style={{flexDirection: 'row'}}>
    //               <Text style={styles.label}>Do you have a GST number ?</Text>
    //               <View style={styles.radioContainer}>
    //                 <TouchableOpacity
    //                   style={styles.radioButton}
    //                   onPress={() => setGstNumberAvailable(true)}>
    //                   <View style={styles.radioOuter}>
    //                     {gstNumberAvailable && <View style={styles.radioInner} />}
    //                   </View>
    //                   <Text style={styles.radioLabel}>Yes</Text>
    //                 </TouchableOpacity>

    //                 <TouchableOpacity
    //                   style={styles.radioButton}
    //                   onPress={() => setGstNumberAvailable(false)}>
    //                   <View style={styles.radioOuter}>
    //                     {!gstNumberAvailable && <View style={styles.radioInner} />}
    //                   </View>
    //                   <Text style={styles.radioLabel}>No</Text>
    //                 </TouchableOpacity>
    //               </View>
    //             </View>

    //             {gstNumberAvailable && (
    //               <View style={styles.gstInputWrapper}>
    //                 <TextInput
    //                   style={styles.gstInput}
    //                   placeholder="Enter GSTIN"
    //                   value={gstNumber}
    //                   onChangeText={setGstNumber}
    //                   autoCapitalize="characters"
    //                   maxLength={15}
    //                 />
    //                 <TouchableOpacity
    //                   style={styles.verifyButton}
    //                   onPress={handleVerifyGST}>
    //                   <Text style={styles.verifyButtonText}>Verify</Text>
    //                 </TouchableOpacity>
    //               </View>
    //             )}

    //             <TextInput
    //               style={styles.input}
    //               placeholder="Firm Name*"
    //               value={firmName}
    //               onChangeText={setFirmName}
    //             />
    //             <TextInput
    //               style={styles.input}
    //               placeholder="Contact Person*"
    //               value={contactPerson}
    //               onChangeText={setContactPerson}
    //             />
    //             <View style={{marginBottom: 15, zIndex: 1000}}>
    //               <DropDownPicker
    //                 open={open}
    //                 value={value}
    //                 items={items}
    //                 setOpen={setOpen}
    //                 setValue={setValue}
    //                 setItems={setItems}
    //                 placeholder="Business Entity Type*"
    //                 style={{
    //                   borderColor: '#000',
    //                   borderRadius: 10,
    //                 }}
    //                 dropDownContainerStyle={{
    //                   borderColor: '#000',
    //                   borderRadius: 10,
    //                 }}
    //               />
    //             </View>

    //             <TextInput
    //               style={styles.input}
    //               placeholder="Contact Number*"
    //               keyboardType="phone-pad"
    //               value={contactNumber}
    //               onChangeText={setContactNumber}
    //             />
    //             <TextInput
    //               style={styles.input}
    //               placeholder="Email Address*"
    //               keyboardType="email-address"
    //               value={email}
    //               onChangeText={setEmail}
    //             />
    //             <TextInput
    //               style={styles.input}
    //               placeholder="Password"
    //               secureTextEntry
    //               value={password}
    //               onChangeText={setPassword}
    //             />
    //             <TextInput
    //               style={styles.input}
    //               placeholder="Confirm Password*"
    //               secureTextEntry
    //               value={confirmPassword}
    //               onChangeText={setConfirmPassword}
    //             />
    //           </>
    //         )}
    //   } else {
    //             {accountType === 'individual' ? (
    //           <>
    //             <TextInput
    //               style={[
    //                 styles.input,
    //                 errors.contactPerson && {borderColor: 'red'},
    //               ]}
    //               placeholder="Name*"
    //               value={contactPerson}
    //               onChangeText={setContactPerson}
    //             />
    //             {errors.contactPerson && (
    //               <Text style={styles.errorText}>{errors.contactPerson}</Text>
    //             )}

    //             <TextInput
    //               style={[
    //                 styles.input,
    //                 errors.contactNumber && {borderColor: 'red'},
    //               ]}
    //               placeholder="Phone*"
    //               keyboardType="phone-pad"
    //               value={contactNumber}
    //               onChangeText={setContactNumber}
    //             />
    //             {errors.contactNumber && (
    //               <Text style={styles.errorText}>{errors.contactNumber}</Text>
    //             )}

    //             <TextInput
    //               style={[styles.input, errors.email && {borderColor: 'red'}]}
    //               placeholder="Email*"
    //               keyboardType="email-address"
    //               value={email}
    //               onChangeText={setEmail}
    //             />
    //             {errors.email && (
    //               <Text style={styles.errorText}>{errors.email}</Text>
    //             )}

    //             {profileEdit && Object.keys(profileEdit).length > 0 ? null : (
    //               <>
    //                 <TextInput
    //                   style={[
    //                     styles.input,
    //                     errors.password && {borderColor: 'red'},
    //                   ]}
    //                   placeholder="Password"
    //                   secureTextEntry
    //                   value={password}
    //                   onChangeText={setPassword}
    //                 />
    //                 {errors.password && (
    //                   <Text style={styles.errorText}>{errors.password}</Text>
    //                 )}

    //                 <TextInput
    //                   style={[
    //                     styles.input,
    //                     errors.confirmPassword && {borderColor: 'red'},
    //                   ]}
    //                   placeholder="Confirm Password*"
    //                   secureTextEntry
    //                   value={confirmPassword}
    //                   onChangeText={setConfirmPassword}
    //                 />
    //                 {errors.confirmPassword && (
    //                   <Text style={styles.errorText}>{errors.confirmPassword}</Text>
    //                 )}
    //               </>
    //             )}
    //           </>
    //         ) : (
    //           <>
    //             <View style={{flexDirection: 'row'}}>
    //               <Text style={styles.label}>Do you have a GST number ?</Text>
    //               <View style={styles.radioContainer}>
    //                 <TouchableOpacity
    //                   style={styles.radioButton}
    //                   onPress={() => setGstNumberAvailable(true)}>
    //                   <View style={styles.radioOuter}>
    //                     {gstNumberAvailable && <View style={styles.radioInner} />}
    //                   </View>
    //                   <Text style={styles.radioLabel}>Yes</Text>
    //                 </TouchableOpacity>

    //                 <TouchableOpacity
    //                   style={styles.radioButton}
    //                   onPress={() => setGstNumberAvailable(false)}>
    //                   <View style={styles.radioOuter}>
    //                     {!gstNumberAvailable && <View style={styles.radioInner} />}
    //                   </View>
    //                   <Text style={styles.radioLabel}>No</Text>
    //                 </TouchableOpacity>
    //               </View>
    //             </View>

    //             {gstNumberAvailable && (
    //               <View style={styles.gstInputWrapper}>
    //                 <TextInput
    //                   style={styles.gstInput}
    //                   placeholder="Enter GSTIN"
    //                   value={gstNumber}
    //                   onChangeText={setGstNumber}
    //                   autoCapitalize="characters"
    //                   maxLength={15}
    //                 />
    //                 <TouchableOpacity
    //                   style={styles.verifyButton}
    //                   onPress={handleVerifyGST}>
    //                   <Text style={styles.verifyButtonText}>Verify</Text>
    //                 </TouchableOpacity>
    //               </View>
    //             )}

    //             <TextInput
    //               style={styles.input}
    //               placeholder="Firm Name*"
    //               value={firmName}
    //               onChangeText={setFirmName}
    //             />
    //             <TextInput
    //               style={styles.input}
    //               placeholder="Contact Person*"
    //               value={contactPerson}
    //               onChangeText={setContactPerson}
    //             />
    //             <View style={{marginBottom: 15, zIndex: 1000}}>
    //               <DropDownPicker
    //                 open={open}
    //                 value={value}
    //                 items={items}
    //                 setOpen={setOpen}
    //                 setValue={setValue}
    //                 setItems={setItems}
    //                 placeholder="Business Entity Type*"
    //                 style={{
    //                   borderColor: '#000',
    //                   borderRadius: 10,
    //                 }}
    //                 dropDownContainerStyle={{
    //                   borderColor: '#000',
    //                   borderRadius: 10,
    //                 }}
    //               />
    //             </View>

    //             <TextInput
    //               style={styles.input}
    //               placeholder="Contact Number*"
    //               keyboardType="phone-pad"
    //               value={contactNumber}
    //               onChangeText={setContactNumber}
    //             />
    //             <TextInput
    //               style={styles.input}
    //               placeholder="Email Address*"
    //               keyboardType="email-address"
    //               value={email}
    //               onChangeText={setEmail}
    //             />
    //             <TextInput
    //               style={styles.input}
    //               placeholder="Password"
    //               secureTextEntry
    //               value={password}
    //               onChangeText={setPassword}
    //             />
    //             <TextInput
    //               style={styles.input}
    //               placeholder="Confirm Password*"
    //               secureTextEntry
    //               value={confirmPassword}
    //               onChangeText={setConfirmPassword}
    //             />
    //           </>
    //         )}
    //   }
    // }

    //         <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
    //           <Text style={styles.nextButtonText}>Next</Text>
    //         </TouchableOpacity>
    //       </ScrollView>
    //     </SafeAreaView>

    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.formContainer}>
        {renderForm()}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'space-around',
    paddingBottom: 10,
  },
  tabActive: {
    color: '#2196F3',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderColor: '#2196F3',
    paddingBottom: 5,
  },
  tabInactive: {
    color: '#888',
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontWeight: '600',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusDot: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: '#ccc',
    marginLeft: 10,
  },
  statusDotActive: {
    backgroundColor: 'green',
  },
  gstInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
  },
  gstInput: {
    flex: 1,
    padding: 12,
  },
  verifyButton: {
    backgroundColor: 'green',
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  verifyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 16,
    padding: 12,
    marginBottom: 15,
    fontFamily: 'Source Serif 4',
  },
  nextButton: {
    backgroundColor: '#4BA4D9',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'semibold',
    fontFamily: 'Source Serif 4',
  },
  radioContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    gap: 20,
    marginLeft: 8,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4BA4D9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#4BA4D9',
  },
  radioLabel: {
    fontSize: 14,
    color: '#333',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 13,
    marginLeft: 4,
  },
});

export default RegisterAsDealer;
