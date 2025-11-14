// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   SafeAreaView,
//   TouchableOpacity,
//   TextInput,
//   StyleSheet,
//   ScrollView,
//   Alert,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {launchImageLibrary} from 'react-native-image-picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {API_BASE_URL} from '../../../../utils/utils';
// import {useDispatch, useSelector} from 'react-redux';
// import {fetchProfile} from '../../../../redux/slices/profileSlice';

// const KycScreen = ({navigation}) => {
//   const [aadhaarNo, setAadhaarNo] = useState('');
//   const [selectedDocType, setSelectedDocType] = useState('aadhaar');
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [confirmInfo, setConfirmInfo] = useState(false);
//   const [agreeTerms, setAgreeTerms] = useState(false);
//   const [aadhaarFront, setAadhaarFront] = useState(null);
//   const [aadhaarBack, setAadhaarBack] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();
//   const {data, error} = useSelector(state => state.profile);

//   console.log(
//     'data?.vendordocuments?------------------->',
//     data?.vendor_category,
//   );
//   console.log('data?.vendordocuments?------------------->', data?.vendor_type);

//   useEffect(() => {
//     dispatch(fetchProfile());
//   }, [dispatch]);

//   const documentTypes = [
//     'aadhaar',
//     'driving_licence',
//     'voter_id',
//     'passport',
//     'pan_number',
//   ];

//   const handleBrowseFile = async type => {
//     const options = {mediaType: 'photo', selectionLimit: 1};
//     launchImageLibrary(options, response => {
//       if (response.didCancel) return;
//       if (response.errorMessage)
//         return Alert.alert('Error', response.errorMessage);
//       const file = response.assets[0];
//       if (type === 'front') setAadhaarFront(file);
//       else setAadhaarBack(file);
//     });
//   };

//   const handleSubmit = async () => {
//     if (
//       !aadhaarNo ||
//       !aadhaarFront ||
//       !aadhaarBack ||
//       !confirmInfo ||
//       !agreeTerms
//     ) {
//       return Alert.alert('Error', 'Please complete all fields and checkboxes.');
//     }

//     try {
//       setLoading(true);
//       const token = await AsyncStorage.getItem('TOKEN');
//       const user_id = await AsyncStorage.getItem('USERID');
//       if (!user_id) {
//         setLoading(false);
//         return Alert.alert('Error', 'User ID not found.');
//       }

//       const formData = new FormData();
//       formData.append('user_id', user_id);
//       formData.append('proof_of_identity', selectedDocType);
//       formData.append('aadhaar_no', aadhaarNo);
//       formData.append('aadhaar_front', {
//         uri: aadhaarFront.uri,
//         type: aadhaarFront.type,
//         name: aadhaarFront.fileName || 'aadhaar_front.jpg',
//       });
//       formData.append('aadhaar_back', {
//         uri: aadhaarBack.uri,
//         type: aadhaarBack.type,
//         name: aadhaarBack.fileName || 'aadhaar_back.jpg',
//       });
//       const response = await fetch(`${API_BASE_URL}/buyer/documents/store`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           // ⚠️ DO NOT manually set 'Content-Type' for FormData — let fetch handle it
//         },
//         body: formData,
//       });
//       console.log('response++++++++++++++++++++++++++', response);
//       const result = await response.json();
//       setLoading(false);

//       if (result?.status) {
//         Alert.alert('Success', 'KYC submitted successfully!');
//         navigation.navigate('KycConfirmation');
//       } else {
//         console.log('res++++++++++++', result);
//         // Alert.alert('Error', result?.message || 'Submission failed');
//       }
//     } catch (error) {
//       setLoading(false);
//       console.log('error-------------------->', error);
//       Alert.alert('Error', 'Something went wrong. Please try again.');
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={{paddingBottom: 40}}>
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Ionicons name="chevron-back" size={24} color="#000" />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Complete KYC</Text>
//           <Ionicons name="search" size={20} marginRight={10} color="#000" />
//         </View>

//         {/* Document Details */}
//         <View style={styles.cardContainer}>
//           <Text style={styles.sectionTitle}>Document Details</Text>

//           <TextInput
//             style={styles.textInput}
//             placeholder="Enter Aadhaar Number"
//             value={aadhaarNo}
//             keyboardType="numeric"
//             maxLength={12}
//             onChangeText={setAadhaarNo}
//           />

//           {/* Dropdown */}
//           <TouchableOpacity
//             style={styles.dropdownHeader}
//             onPress={() => setShowDropdown(!showDropdown)}>
//             <Text style={styles.selectedText}>{selectedDocType}</Text>
//             <Ionicons
//               name={showDropdown ? 'chevron-up' : 'chevron-down'}
//               size={20}
//             />
//           </TouchableOpacity>
//           {showDropdown &&
//             documentTypes.map((item, index) => (
//               <TouchableOpacity
//                 key={index}
//                 style={styles.dropdownItem}
//                 onPress={() => {
//                   setSelectedDocType(item);
//                   setShowDropdown(false);
//                 }}>
//                 <Text>{item}</Text>
//               </TouchableOpacity>
//             ))}
//           {(data?.vendor_category === 'vendor_customer' &&
//             data?.vendor_type === 'Unregistered') ||
//           (data?.vendor_category === 'vendor_dealer' &&
//             data?.vendor_type === 'Unregistered') ? (
//             // Aadhaar Only
//             <>
//               {/* Aadhaar Front */}
//               <TouchableOpacity
//                 style={styles.uploadBox}
//                 onPress={() => handleBrowseFile('front')}>
//                 <Ionicons name="cloud-upload-outline" size={30} color="#999" />
//                 <Text style={styles.uploadText}>
//                   {aadhaarFront
//                     ? aadhaarFront.fileName
//                     : 'Upload Aadhaar Front'}
//                 </Text>
//               </TouchableOpacity>

//               {/* Aadhaar Back */}
//               <TouchableOpacity
//                 style={styles.uploadBox}
//                 onPress={() => handleBrowseFile('back')}>
//                 <Ionicons name="cloud-upload-outline" size={30} color="#999" />
//                 <Text style={styles.uploadText}>
//                   {aadhaarBack ? aadhaarBack.fileName : 'Upload Aadhaar Back'}
//                 </Text>
//               </TouchableOpacity>
//             </>
//           ) : data?.vendor_category === 'vendor_dealer' &&
//             data?.vendor_type === 'Registered' ? (
//             // Aadhaar + GST
//             <>
//               {/* Aadhaar Front */}
//               <TouchableOpacity
//                 style={styles.uploadBox}
//                 onPress={() => handleBrowseFile('front')}>
//                 <Ionicons name="cloud-upload-outline" size={30} color="#999" />
//                 <Text style={styles.uploadText}>
//                   {aadhaarFront
//                     ? aadhaarFront.fileName
//                     : 'Upload Aadhaar Front'}
//                 </Text>
//               </TouchableOpacity>

//               {/* Aadhaar Back */}
//               <TouchableOpacity
//                 style={styles.uploadBox}
//                 onPress={() => handleBrowseFile('back')}>
//                 <Ionicons name="cloud-upload-outline" size={30} color="#999" />
//                 <Text style={styles.uploadText}>
//                   {aadhaarBack ? aadhaarBack.fileName : 'Upload Aadhaar Back'}
//                 </Text>
//               </TouchableOpacity>

//               {/* GST Certificate */}
//               <Text
//                 style={{fontWeight: '700', fontSize: 16, marginVertical: 12}}>
//                 GST Certificate
//               </Text>
//               <TouchableOpacity
//                 style={styles.uploadBox}
//                 onPress={() => handleBrowseFile('gst')}>
//                 <Ionicons name="cloud-upload-outline" size={30} color="#999" />
//                 <Text style={styles.uploadText}>
//                   {gstFile ? gstFile.fileName : 'Upload GST Certificate'}
//                 </Text>
//               </TouchableOpacity>
//             </>
//           ) : null}

//           {/* Checkboxes */}
//           <TouchableOpacity
//             style={styles.checkboxRow}
//             onPress={() => setConfirmInfo(!confirmInfo)}>
//             <Ionicons
//               name={confirmInfo ? 'checkbox-outline' : 'square-outline'}
//               size={24}
//               color="#333"
//             />
//             <Text style={styles.checkboxText}>
//               I confirm that the information provided is accurate and complete.
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.checkboxRow}
//             onPress={() => setAgreeTerms(!agreeTerms)}>
//             <Ionicons
//               name={agreeTerms ? 'checkbox-outline' : 'square-outline'}
//               size={24}
//               color="#333"
//             />
//             <Text style={styles.checkboxText}>
//               I agree to the terms and conditions of the KYC process.
//             </Text>
//           </TouchableOpacity>

//           {/* Submit Button */}
//           <TouchableOpacity
//             style={styles.submitBtn}
//             onPress={handleSubmit}
//             disabled={loading}>
//             <Text style={styles.submitText}>
//               {loading ? 'Submitting...' : 'Submit'}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default KycScreen;

// const styles = StyleSheet.create({
//   container: {flex: 1, backgroundColor: '#FFF'},
//   header: {
//     padding: 15,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   headerTitle: {fontSize: 16, fontWeight: '600', color: '#000'},
//   cardContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     padding: 16,
//     marginHorizontal: 10,
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//     elevation: 4,
//   },
//   sectionTitle: {fontWeight: '700', fontSize: 16, marginBottom: 12},
//   textInput: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 12,
//     padding: 12,
//     marginBottom: 16,
//     fontSize: 14,
//     color: '#333',
//   },
//   dropdownHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 12,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     marginBottom: 10,
//   },
//   selectedText: {fontSize: 14, fontWeight: '500', color: '#000'},
//   dropdownItem: {
//     paddingVertical: 10,
//     paddingHorizontal: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#DDD',
//   },
//   uploadBox: {
//     height: 60,
//     borderRadius: 12,
//     backgroundColor: '#F0F0F0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginVertical: 8,
//     flexDirection: 'row',
//     paddingHorizontal: 12,
//   },
//   uploadText: {marginLeft: 8, fontSize: 14, color: '#333'},
//   checkboxRow: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     marginBottom: 14,
//     marginTop: 12,
//   },
//   checkboxText: {marginLeft: 12, fontSize: 14, color: '#333', flex: 1},
//   submitBtn: {
//     marginTop: 20,
//     backgroundColor: '#333333',
//     paddingVertical: 14,
//     borderRadius: 12,
//     alignItems: 'center',
//   },
//   submitText: {color: '#fff', fontSize: 16, fontWeight: '600'},
// });


import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_BASE_URL} from '../../../../utils/utils';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProfile} from '../../../../redux/slices/profileSlice';

const KycScreen = ({navigation}) => {
  const [aadhaarNo, setAadhaarNo] = useState('');
  const [selectedDocType, setSelectedDocType] = useState('aadhaar');
  const [showDropdown, setShowDropdown] = useState(false);
  const [confirmInfo, setConfirmInfo] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [aadhaarFront, setAadhaarFront] = useState(null);
  const [aadhaarBack, setAadhaarBack] = useState(null);
  const [gstFile, setGstFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const {data, error} = useSelector(state => state.profile);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const documentTypes = [
    'aadhaar',
    'driving_licence',
    'voter_id',
    'passport',
    'pan_number',
  ];

  // ✅ Universal File Picker Handler (for front, back, gst)
  const handleBrowseFile = async type => {
    const options = {mediaType: 'photo', selectionLimit: 1};
    launchImageLibrary(options, response => {
      if (response.didCancel) return;
      if (response.errorMessage)
        return Alert.alert('Error', response.errorMessage);

      const file = response.assets[0];
      if (!file) return;

      if (type === 'front') setAadhaarFront(file);
      else if (type === 'back') setAadhaarBack(file);
      else if (type === 'gst') setGstFile(file);
    });
  };

  const handleSubmit = async () => {
    if (
      !aadhaarNo ||
      !aadhaarFront ||
      !aadhaarBack ||
      !confirmInfo ||
      !agreeTerms
    ) {
      return Alert.alert('Error', 'Please complete all fields and checkboxes.');
    }

    if (
      data?.vendor_category === 'vendor_dealer' &&
      data?.vendor_type === 'Registered' &&
      !gstFile
    ) {
      return Alert.alert('Error', 'Please upload your GST Certificate.');
    }

    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('TOKEN');
      const user_id = await AsyncStorage.getItem('USERID');
      if (!user_id) {
        setLoading(false);
        return Alert.alert('Error', 'User ID not found.');
      }

      const formData = new FormData();
      formData.append('user_id', user_id);
      formData.append('proof_of_identity', selectedDocType);
      formData.append('aadhaar_no', aadhaarNo);
      formData.append('aadhaar_front', {
        uri: aadhaarFront.uri,
        type: aadhaarFront.type,
        name: aadhaarFront.fileName || 'aadhaar_front.jpg',
      });
      formData.append('aadhaar_back', {
        uri: aadhaarBack.uri,
        type: aadhaarBack.type,
        name: aadhaarBack.fileName || 'aadhaar_back.jpg',
      });

      if (
        data?.vendor_category === 'vendor_dealer' &&
        data?.vendor_type === 'Registered' &&
        gstFile
      ) {
        formData.append('gst_certificate', {
          uri: gstFile.uri,
          type: gstFile.type,
          name: gstFile.fileName || 'gst_certificate.jpg',
        });
      }

      const response = await fetch(`${API_BASE_URL}/buyer/documents/store`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      setLoading(false);

      if (result?.status) {
        Alert.alert('Success', 'KYC submitted successfully!');
        navigation.navigate('KycConfirmation');
      } else {
        Alert.alert('Error', result?.message || 'Submission failed.');
      }
    } catch (error) {
      setLoading(false);
      console.log('Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{paddingBottom: 40}}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Complete KYC</Text>
          <Ionicons name="search" size={20} marginRight={10} color="#000" />
        </View>

        <View style={styles.cardContainer}>
          <Text style={styles.sectionTitle}>Document Details</Text>

          {/* Aadhaar Input */}
          <TextInput
            style={styles.textInput}
            placeholder="Enter Aadhaar Number"
            value={aadhaarNo}
            keyboardType="numeric"
            maxLength={12}
            onChangeText={setAadhaarNo}
          />

          {/* Dropdown */}
          <TouchableOpacity
            style={styles.dropdownHeader}
            onPress={() => setShowDropdown(!showDropdown)}>
            <Text style={styles.selectedText}>{selectedDocType}</Text>
            <Ionicons
              name={showDropdown ? 'chevron-up' : 'chevron-down'}
              size={20}
            />
          </TouchableOpacity>

          {showDropdown &&
            documentTypes.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => {
                  setSelectedDocType(item);
                  setShowDropdown(false);
                }}>
                <Text>{item}</Text>
              </TouchableOpacity>
            ))}

          {/* File Uploads */}
          {(data?.vendor_category === 'vendor_customer' &&
            data?.vendor_type === 'Unregistered') ||
          (data?.vendor_category === 'vendor_dealer' &&
            data?.vendor_type === 'Unregistered') ? (
            <>
              {/* Aadhaar Front */}
              <TouchableOpacity
                style={styles.uploadBox}
                onPress={() => handleBrowseFile('front')}>
                <Ionicons name="cloud-upload-outline" size={30} color="#999" />
                <Text style={styles.uploadText}>
                  {aadhaarFront
                    ? aadhaarFront.fileName
                    : 'Upload Aadhaar Front'}
                </Text>
              </TouchableOpacity>

              {/* Aadhaar Back */}
              <TouchableOpacity
                style={styles.uploadBox}
                onPress={() => handleBrowseFile('back')}>
                <Ionicons name="cloud-upload-outline" size={30} color="#999" />
                <Text style={styles.uploadText}>
                  {aadhaarBack ? aadhaarBack.fileName : 'Upload Aadhaar Back'}
                </Text>
              </TouchableOpacity>
            </>
          ) : data?.vendor_category === 'vendor_dealer' &&
            data?.vendor_type === 'Registered' ? (
            <>
              {/* Aadhaar Front */}
              <TouchableOpacity
                style={styles.uploadBox}
                onPress={() => handleBrowseFile('front')}>
                <Ionicons name="cloud-upload-outline" size={30} color="#999" />
                <Text style={styles.uploadText}>
                  {aadhaarFront
                    ? aadhaarFront.fileName
                    : 'Upload Aadhaar Front'}
                </Text>
              </TouchableOpacity>

              {/* Aadhaar Back */}
              <TouchableOpacity
                style={styles.uploadBox}
                onPress={() => handleBrowseFile('back')}>
                <Ionicons name="cloud-upload-outline" size={30} color="#999" />
                <Text style={styles.uploadText}>
                  {aadhaarBack ? aadhaarBack.fileName : 'Upload Aadhaar Back'}
                </Text>
              </TouchableOpacity>

              {/* GST Upload */}
              <Text
                style={{fontWeight: '700', fontSize: 16, marginVertical: 12}}>
                GST Certificate
              </Text>
              <TouchableOpacity
                style={styles.uploadBox}
                onPress={() => handleBrowseFile('gst')}>
                <Ionicons name="cloud-upload-outline" size={30} color="#999" />
                <Text style={styles.uploadText}>
                  {gstFile ? gstFile.fileName : 'Upload GST Certificate'}
                </Text>
              </TouchableOpacity>
            </>
          ) : null}

          {/* Checkboxes */}
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setConfirmInfo(!confirmInfo)}>
            <Ionicons
              name={confirmInfo ? 'checkbox-outline' : 'square-outline'}
              size={24}
              color="#333"
            />
            <Text style={styles.checkboxText}>
              I confirm that the information provided is accurate and complete.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setAgreeTerms(!agreeTerms)}>
            <Ionicons
              name={agreeTerms ? 'checkbox-outline' : 'square-outline'}
              size={24}
              color="#333"
            />
            <Text style={styles.checkboxText}>
              I agree to the terms and conditions of the KYC process.
            </Text>
          </TouchableOpacity>

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleSubmit}
            disabled={loading}>
            <Text style={styles.submitText}>
              {loading ? 'Submitting...' : 'Submit'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default KycScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFF'},
  header: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {fontSize: 16, fontWeight: '600', color: '#000'},
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 4,
  },
  sectionTitle: {fontWeight: '700', fontSize: 16, marginBottom: 12},
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    fontSize: 14,
    color: '#333',
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  selectedText: {fontSize: 14, fontWeight: '500', color: '#000'},
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  uploadBox: {
    height: 60,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    flexDirection: 'row',
    paddingHorizontal: 12,
  },
  uploadText: {marginLeft: 8, fontSize: 14, color: '#333'},
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
    marginTop: 12,
  },
  checkboxText: {marginLeft: 12, fontSize: 14, color: '#333', flex: 1},
  submitBtn: {
    marginTop: 20,
    backgroundColor: '#333333',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitText: {color: '#fff', fontSize: 16, fontWeight: '600'},
});
