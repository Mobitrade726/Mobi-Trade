// import React from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   SafeAreaView,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { styles_addnewaddress } from './styles';

// const AddNewAddress = ({navigation}) => {
//   return (
//     <SafeAreaView style={styles_addnewaddress.container}>
//       {/* Header */}
//       <View style={styles_addnewaddress.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <View style={styles_addnewaddress.backIcon}>
//             <Ionicons name="chevron-back" size={24} color="#333" />
//           </View>
//         </TouchableOpacity>
//         <Text style={styles_addnewaddress.title}>Saved Address</Text>
//         <View style={{width: 24}} /> {/* spacer */}
//       </View>

//       {/* Body Text */}
//       <View style={styles_addnewaddress.body}>
//         <Text style={styles_addnewaddress.message}>No saved addresses yet.</Text>
//       </View>

//       {/* Bottom Button */}
//       <TouchableOpacity style={styles_addnewaddress.button}>
//         <Text style={styles_addnewaddress.buttonText}>Add Your First Address</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// export default AddNewAddress;

import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';

import {styles_addnewaddress} from './styles';

const AddNewAddress = ({navigation}) => {
  const [isBilling, setIsBilling] = useState(false);

  return (
    <SafeAreaView style={styles_addnewaddress.container}>
      {/* Header */}
      <View style={styles_addnewaddress.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles_addnewaddress.backIcon}>
            <Ionicons name="chevron-back" size={24} color="#333" />
          </View>
        </TouchableOpacity>
        <Text style={styles_addnewaddress.title}>Add Address</Text>
        <View style={{width: 24}} /> {/* spacer */}
      </View>

      <ScrollView contentContainerStyle={styles_addnewaddress.form}>
        {/* Input fields */}
        <Text style={styles_addnewaddress.label}>Title *</Text>
        <TextInput
          style={styles_addnewaddress.input}
          placeholder="Eg. Home, Office,etc"
        />

        <Text style={styles_addnewaddress.label}>Full Name *</Text>
        <TextInput
          style={styles_addnewaddress.input}
          placeholder="Enter your full name"
        />

        <Text style={styles_addnewaddress.label}>Email Address *</Text>
        <TextInput
          style={styles_addnewaddress.input}
          placeholder="Enter your email address"
          keyboardType="email-address"
        />

        <Text style={styles_addnewaddress.label}>Phone Number *</Text>
        <TextInput
          style={styles_addnewaddress.input}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
        />

        <Text style={styles_addnewaddress.label}>Address Line</Text>
        <TextInput
          style={styles_addnewaddress.input}
          placeholder="Enter your address"
        />
        <TextInput
          style={styles_addnewaddress.input}
          placeholder="Optional: Enter additional address information"
        />

        <Text style={styles_addnewaddress.label}>City *</Text>
        <TextInput
          style={styles_addnewaddress.input}
          placeholder="Enter your city"
        />

        <Text style={styles_addnewaddress.label}>State/Province *</Text>
        <TextInput
          style={styles_addnewaddress.input}
          placeholder="Enter your state or province"
        />

        <Text style={styles_addnewaddress.label}>Postal Code *</Text>
        <TextInput
          style={styles_addnewaddress.input}
          placeholder="Enter your postal code"
          keyboardType="numeric"
        />

        <Text style={styles_addnewaddress.label}>Country *</Text>
        <TextInput
          style={styles_addnewaddress.input}
          placeholder="Select your country"
        />

        {/* Checkbox */}
        <View style={styles_addnewaddress.checkboxContainer}>
          <CheckBox
            value={isBilling}
            onValueChange={setIsBilling}
            tintColors={{true: '#1C9C48', false: '#ccc'}}
          />

          <View>
            <Text style={styles_addnewaddress.checkboxLabel}>
              Billing Address
            </Text>
            <Text style={styles_addnewaddress.checkboxSubText}>
              Copy address data from Billing
            </Text>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles_addnewaddress.buttonRow}>
          <TouchableOpacity
            style={[styles_addnewaddress.button, {backgroundColor: '#333'}]}>
            <Text style={styles_addnewaddress.buttonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles_addnewaddress.button, {backgroundColor: '#333'}]}>
            <Text style={styles_addnewaddress.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddNewAddress;
