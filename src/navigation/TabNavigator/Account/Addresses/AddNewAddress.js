// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
//   SafeAreaView,
//   Alert,
// } from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const AddNewAddress = ({navigation}) => {
//   const [billing, setBilling] = useState({
//     address: '',
//     zip: '',
//     city: '',
//     state: '',
//   });

//   const [shipping, setShipping] = useState({
//     address: '',
//     zip: '',
//     city: '',
//     state: '',
//   });

//   const [sameAsBilling, setSameAsBilling] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   const handleBillingChange = (key, value) => {
//     setBilling({...billing, [key]: value});
//   };

//   const handleShippingChange = (key, value) => {
//     setShipping({...shipping, [key]: value});
//   };

//   // Auto copy / clear shipping when checkbox toggled
//   useEffect(() => {
//     if (sameAsBilling) {
//       setShipping(billing);
//     } else {
//       setShipping({
//         address: '',
//         zip: '',
//         city: '',
//         state: '',
//       });
//     }
//   }, [billing, sameAsBilling]);

//   // Client-side validation before API call
//   const validate = () => {
//     let newErrors = {};

//     if (!billing.address.trim())
//       newErrors.billingAddress = 'Billing address is required';
//     if (!billing.zip.trim())
//       newErrors.billingZip = 'Billing ZIP Code is required';
//     else if (!/^\d{4,6}$/.test(billing.zip))
//       newErrors.billingZip = 'Enter a valid Billing ZIP Code';
//     if (!billing.city.trim())
//       newErrors.billingCity = 'Billing city is required';
//     if (!billing.state.trim())
//       newErrors.billingState = 'Billing state is required';

//     if (!sameAsBilling) {
//       if (!shipping.address.trim())
//         newErrors.shippingAddress = 'Shipping address is required';
//       if (!shipping.zip.trim())
//         newErrors.shippingZip = 'Shipping ZIP Code is required';
//       else if (!/^\d{4,6}$/.test(shipping.zip))
//         newErrors.shippingZip = 'Enter a valid Shipping ZIP Code';
//       if (!shipping.city.trim())
//         newErrors.shippingCity = 'Shipping city is required';
//       if (!shipping.state.trim())
//         newErrors.shippingState = 'Shipping state is required';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Submit to API
//   const handleSave = async () => {
//     if (!validate()) return;

//     setErrors({});
//     setLoading(true);

//     const token = await AsyncStorage.getItem('TOKEN');
//     const userId = await AsyncStorage.getItem('USERID');

//     try {
//       const response = await axios.post(
//         'https://api.mobitrade.in/api/buyer-address',
//         {
//           billing_Address: billing.address,
//           billing_Zip: billing.zip,
//           billing_City: billing.city,
//           billing_State: billing.state,
//           shipping_Address: shipping.address,
//           shipping_Zip: shipping.zip,
//           shipping_City: shipping.city,
//           shipping_State: shipping.state,
//           vendor_sales_id: userId,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//           },
//         },
//       );

//       setLoading(false);

//       if (response.data?.message) {
//         Alert.alert('✅ Success', response.data.message);
//         navigation.goBack();
//       }
//     } catch (error) {
//       setLoading(false);

//       if (error.response?.data?.errors) {
//         const backendErrors = error.response.data.errors;
//         let mappedErrors = {};

//         if (backendErrors.vendor_sales_id)
//           mappedErrors.vendorSalesId = backendErrors.vendor_sales_id[0];

//         if (backendErrors.billing_Address)
//           mappedErrors.billingAddress = backendErrors.billing_Address[0];
//         if (backendErrors.billing_Zip)
//           mappedErrors.billingZip = backendErrors.billing_Zip[0];
//         if (backendErrors.billing_City)
//           mappedErrors.billingCity = backendErrors.billing_City[0];
//         if (backendErrors.billing_State)
//           mappedErrors.billingState = backendErrors.billing_State[0];

//         if (backendErrors.shipping_Address)
//           mappedErrors.shippingAddress = backendErrors.shipping_Address[0];
//         if (backendErrors.shipping_Zip)
//           mappedErrors.shippingZip = backendErrors.shipping_Zip[0];
//         if (backendErrors.shipping_City)
//           mappedErrors.shippingCity = backendErrors.shipping_City[0];
//         if (backendErrors.shipping_State)
//           mappedErrors.shippingState = backendErrors.shipping_State[0];

//         setErrors(mappedErrors);

//         const allErrors = Object.values(mappedErrors).join('\n');
//         Alert.alert('Validation Errors', allErrors);
//       } else {
//         Alert.alert('❌ Error', JSON.stringify(error?.response?.data));
//       }
//     }
//   };

//   return (
//     <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
//       <ScrollView contentContainerStyle={styles.container}>
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity
//             onPress={() => navigation.goBack()}
//             style={styles.backButton}>
//             <Ionicons name="chevron-back" size={22} color="#000" />
//           </TouchableOpacity>
//           <View>
//             <Text style={styles.headerTitle}>Add Address</Text>
//           </View>
//           <TouchableOpacity onPress={() => navigation.navigate('Search')}>
//             <Ionicons name="search" size={24} color="#333" />
//           </TouchableOpacity>
//         </View>

//         {/* Billing Address */}
//         <Text style={styles.heading}>Billing Address</Text>
//         <View style={styles.underline} />

//         <TextInput
//           style={[
//             styles.input,
//             {height: 80},
//             errors.billingAddress && styles.errorInput,
//           ]}
//           placeholder="Enter your address"
//           value={billing.address}
//           multiline
//           onChangeText={text => handleBillingChange('address', text)}
//         />
//         {errors.billingAddress && (
//           <Text style={styles.errorText}>{errors.billingAddress}</Text>
//         )}

//         <TextInput
//           style={[styles.input, errors.billingZip && styles.errorInput]}
//           placeholder="Enter your postal code"
//           value={billing.zip}
//           keyboardType="numeric"
//           onChangeText={text => handleBillingChange('zip', text)}
//         />
//         {errors.billingZip && (
//           <Text style={styles.errorText}>{errors.billingZip}</Text>
//         )}

//         <TextInput
//           style={[styles.input, errors.billingCity && styles.errorInput]}
//           placeholder="Enter your city"
//           value={billing.city}
//           onChangeText={text => handleBillingChange('city', text)}
//         />
//         {errors.billingCity && (
//           <Text style={styles.errorText}>{errors.billingCity}</Text>
//         )}

//         <TextInput
//           style={[styles.input, errors.billingState && styles.errorInput]}
//           placeholder="Enter your state or province"
//           value={billing.state}
//           onChangeText={text => handleBillingChange('state', text)}
//         />
//         {errors.billingState && (
//           <Text style={styles.errorText}>{errors.billingState}</Text>
//         )}

//         {/* Shipping Address */}
//         <Text style={styles.heading}>Shipping Address</Text>
//         <View style={styles.underline} />

//         <View style={styles.checkboxRow}>
//           <CheckBox value={sameAsBilling} onValueChange={setSameAsBilling} />
//           <Text style={styles.checkboxLabel}>Same as Billing Address</Text>
//         </View>

//         <TextInput
//           style={[
//             styles.input,
//             {height: 80},
//             errors.shippingAddress && styles.errorInput,
//           ]}
//           placeholder="Enter your address"
//           value={shipping.address}
//           multiline
//           editable={!sameAsBilling}
//           onChangeText={text => handleShippingChange('address', text)}
//         />
//         {!sameAsBilling && errors.shippingAddress && (
//           <Text style={styles.errorText}>{errors.shippingAddress}</Text>
//         )}

//         <TextInput
//           style={[styles.input, errors.shippingZip && styles.errorInput]}
//           placeholder="Enter your postal code"
//           value={shipping.zip}
//           keyboardType="numeric"
//           editable={!sameAsBilling}
//           onChangeText={text => handleShippingChange('zip', text)}
//         />
//         {!sameAsBilling && errors.shippingZip && (
//           <Text style={styles.errorText}>{errors.shippingZip}</Text>
//         )}

//         <TextInput
//           style={[styles.input, errors.shippingCity && styles.errorInput]}
//           placeholder="Enter your city"
//           value={shipping.city}
//           editable={!sameAsBilling}
//           onChangeText={text => handleShippingChange('city', text)}
//         />
//         {!sameAsBilling && errors.shippingCity && (
//           <Text style={styles.errorText}>{errors.shippingCity}</Text>
//         )}

//         <TextInput
//           style={[styles.input, errors.shippingState && styles.errorInput]}
//           placeholder="Enter your state or province"
//           value={shipping.state}
//           editable={!sameAsBilling}
//           onChangeText={text => handleShippingChange('state', text)}
//         />
//         {!sameAsBilling && errors.shippingState && (
//           <Text style={styles.errorText}>{errors.shippingState}</Text>
//         )}

//         <TouchableOpacity
//           style={styles.saveBtn}
//           onPress={handleSave}
//           disabled={loading}>
//           <Text style={styles.saveText}>{loading ? 'Saving...' : 'Save'}</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default AddNewAddress;

// const styles = StyleSheet.create({
//   container: {padding: 16, paddingBottom: 30},
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
//     left: 0,
//   },
//   headerTitle: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#000',
//     textAlign: 'center',
//   },
//   heading: {fontSize: 18, fontWeight: '600', marginTop: 20, color: '#000'},
//   underline: {height: 1.5, backgroundColor: '#29A9E0', marginVertical: 8},
//   input: {
//     borderWidth: 1,
//     borderColor: '#888',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//     fontSize: 14,
//     color: '#000',
//     marginTop: 10,
//   },
//   saveBtn: {
//     backgroundColor: '#29A9E0',
//     borderRadius: 8,
//     marginTop: 20,
//     paddingVertical: 12,
//     alignItems: 'center',
//     width: 200,
//     alignSelf: 'flex-end',
//   },
//   saveText: {color: '#fff', fontWeight: '600', fontSize: 16},
//   checkboxRow: {flexDirection: 'row', alignItems: 'center', marginTop: 10},
//   checkboxLabel: {fontSize: 14, marginLeft: 8, color: '#333'},
//   errorText: {color: 'red', fontSize: 12, marginTop: 4},
//   errorInput: {borderColor: 'red'},
// });

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddNewAddress = ({navigation}) => {
  const [billing, setBilling] = useState({
    address: '',
    zip: '',
    city: '',
    state: '',
  });
  const [shipping, setShipping] = useState({
    address: '',
    zip: '',
    city: '',
    state: '',
  });
  const [sameAsBilling, setSameAsBilling] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleBillingChange = (key, value) =>
    setBilling({...billing, [key]: value});
  const handleShippingChange = (key, value) =>
    setShipping({...shipping, [key]: value});

  // Auto copy billing to shipping
  useEffect(() => {
    if (sameAsBilling) setShipping(billing);
  }, [billing, sameAsBilling]);

  // Fetch existing address
  useEffect(() => {
    const fetchAddress = async () => {
      const token = await AsyncStorage.getItem('TOKEN');
      const userId = await AsyncStorage.getItem('USERID');

      try {
        const response = await axios.get(
          `https://api.mobitrade.in/api/buyer-address/${userId}`,
          {headers: {Authorization: `Bearer ${token}`}},
        );

        if (response.data?.data) {
          const addr = response.data.data;
          setBilling({
            address: addr.billing_Address || '',
            zip: addr.billing_Zip || '',
            city: addr.billing_City || '',
            state: addr.billing_State || '',
          });
          setShipping({
            address: addr.shipping_Address || '',
            zip: addr.shipping_Zip || '',
            city: addr.shipping_City || '',
            state: addr.shipping_State || '',
          });
        }
      } catch (error) {
        console.log(
          'Fetch address error:',
          error.response?.data || error.message,
        );
      }
    };

    fetchAddress();
  }, []);

  // Validation
  const validate = () => {
    let newErrors = {};
    if (!billing.address.trim())
      newErrors.billingAddress = 'Billing address required';
    if (!billing.zip.trim()) newErrors.billingZip = 'Billing ZIP required';
    if (!billing.city.trim()) newErrors.billingCity = 'Billing city required';
    if (!billing.state.trim())
      newErrors.billingState = 'Billing state required';

    if (!sameAsBilling) {
      if (!shipping.address.trim())
        newErrors.shippingAddress = 'Shipping address required';
      if (!shipping.zip.trim()) newErrors.shippingZip = 'Shipping ZIP required';
      if (!shipping.city.trim())
        newErrors.shippingCity = 'Shipping city required';
      if (!shipping.state.trim())
        newErrors.shippingState = 'Shipping state required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save/Submit
  const handleSave = async () => {
    if (!validate()) return;

    setLoading(true);
    const token = await AsyncStorage.getItem('TOKEN');
    const userId = await AsyncStorage.getItem('USERID');

    try {
      const response = await axios.post(
        'https://api.mobitrade.in/api/buyer-address',
        {
          billing_Address: billing.address,
          billing_Zip: billing.zip,
          billing_City: billing.city,
          billing_State: billing.state,
          shipping_Address: shipping.address,
          shipping_Zip: shipping.zip,
          shipping_City: shipping.city,
          shipping_State: shipping.state,
          vendor_sales_id: userId,
        },
        {headers: {Authorization: `Bearer ${token}`}},
      );

      setLoading(false);
      Alert.alert('✅ Success', response.data.message);
      navigation.goBack();
    } catch (error) {
      setLoading(false);
      Alert.alert(
        '❌ Error',
        JSON.stringify(error.response?.data || error.message),
      );
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Ionicons name="chevron-back" size={22} color="#000" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Saved Address</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Ionicons name="search" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        <Text style={styles.heading}>Billing Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={billing.address}
          onChangeText={text => handleBillingChange('address', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="ZIP"
          value={billing.zip}
          onChangeText={text => handleBillingChange('zip', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={billing.city}
          onChangeText={text => handleBillingChange('city', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="State"
          value={billing.state}
          onChangeText={text => handleBillingChange('state', text)}
        />

        <View style={styles.checkboxRow}>
          <CheckBox value={sameAsBilling} onValueChange={setSameAsBilling} />
          <Text style={styles.checkboxLabel}>Same as Billing Address</Text>
        </View>

        <Text style={styles.heading}>Shipping Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={shipping.address}
          editable={!sameAsBilling}
          onChangeText={text => handleShippingChange('address', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="ZIP"
          value={shipping.zip}
          editable={!sameAsBilling}
          onChangeText={text => handleShippingChange('zip', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={shipping.city}
          editable={!sameAsBilling}
          onChangeText={text => handleShippingChange('city', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="State"
          value={shipping.state}
          editable={!sameAsBilling}
          onChangeText={text => handleShippingChange('state', text)}
        />

        <TouchableOpacity
          style={styles.saveBtn}
          onPress={handleSave}
          disabled={loading}>
          <Text style={styles.saveText}>{loading ? 'Saving...' : 'Save'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddNewAddress;

const styles = StyleSheet.create({
  container: {padding: 16, paddingBottom: 30},
  heading: {fontSize: 16, fontWeight: '600', marginTop: 20},
  input: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  saveBtn: {
    backgroundColor: '#29A9E0',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
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
  saveText: {color: '#fff', fontWeight: '600'},
  checkboxRow: {flexDirection: 'row', alignItems: 'center', marginTop: 10},
  checkboxLabel: {marginLeft: 8},
});
