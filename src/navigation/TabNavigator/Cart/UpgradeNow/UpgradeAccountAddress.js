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
  useColorScheme,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../../../utils/utils';


const UpgradeAccountAddress = ({navigation}) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
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
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (name, value) => {
    setForm({...form, [name]: value});
  };

  const handleRegister = async () => {
    setSubmitted(true);
    const isValid = validateInputs();

    if (!isValid) return;

    const vendorCode = profileEdit?.profileEdit?.vendor_code;
    console.log('vendorCode--------->', vendorCode);
    const url = vendorCode
      ? API_BASE_URL + `buyerUpdate/${vendorCode}`
      : API_BASE_URL + 'buyer/register';
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

  // ✅ Validation logic reused
  const validateInputs = (
    billingAddress = form.billingAddress,
    billingZip = form.billingZip,
    billingCity = form.billingCity,
    billingState = form.billingState,
    shippingAddress = form.shippingAddress,
    shippingZip = form.shippingZip,
    shippingCity = form.shippingCity,
    shippingState = form.shippingState,
  ) => {
    const newErrors = {};
    if (!billingAddress.trim())
      newErrors.billingAddress = 'Address is required';
    if (!billingZip.trim()) newErrors.billingZip = 'ZIP is required';
    if (!billingCity.trim()) newErrors.billingCity = 'City is required';
    if (!billingState.trim()) newErrors.billingState = 'State is required';

    if (!isBilling) {
      if (!shippingAddress.trim())
        newErrors.shippingAddress = 'Address is required';
      if (!shippingZip.trim()) newErrors.shippingZip = 'ZIP is required';
      if (!shippingCity.trim())
        newErrors.shippingCity = 'City is required';
      if (!shippingState.trim())
        newErrors.shippingState = 'State is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Real-time validation if form was submitted
  useEffect(() => {
    if (submitted) {
      validateInputs();
    }
  }, [form]);

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
        setZipLoading(false);
        Toast.show({
          type: 'error',
          text2: JSON.stringify(error?.response?.data?.message),
        });
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
          placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
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
          placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
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
          placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
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
          placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
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
              placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
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
              placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
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
              placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
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
              placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
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
          // disabled={Object.keys(errors).length > 0}
        >
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

export default UpgradeAccountAddress;

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
