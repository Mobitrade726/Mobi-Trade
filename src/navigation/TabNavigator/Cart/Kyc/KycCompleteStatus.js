// // import React, {useEffect, useState} from 'react';
// // import {
// //   View,
// //   Text,
// //   SafeAreaView,
// //   TouchableOpacity,
// //   TextInput,
// //   StyleSheet,
// //   ScrollView,
// //   Alert,
// // } from 'react-native';
// // import Ionicons from 'react-native-vector-icons/Ionicons';
// // import {launchImageLibrary} from 'react-native-image-picker';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import {API_BASE_URL} from '../../../../utils/utils';
// // import {useDispatch, useSelector} from 'react-redux';
// // import {fetchProfile} from '../../../../redux/slices/profileSlice';
// // import Header from '../../../../constants/Header';

// // const KycScreen = ({navigation}) => {
// //   const [documentno, setDocumentno] = useState('');
// //   const [selectedDocType, setSelectedDocType] = useState('aadhaar');
// //   const [showDropdown, setShowDropdown] = useState(false);
// //   const [confirmInfo, setConfirmInfo] = useState(false);
// //   const [agreeTerms, setAgreeTerms] = useState(false);
// //   const [docFront, setdocFront] = useState(null);
// //   const [docBack, setdocBack] = useState(null);
// //   const [gstFile, setGstFile] = useState(null);
// //   const [loading, setLoading] = useState(false);

// //   const dispatch = useDispatch();
// //   const {data, error} = useSelector(state => state.profile);

// //   useEffect(() => {
// //     dispatch(fetchProfile());
// //   }, [dispatch]);

// //   const documentTypes = [
// //     'aadhaar',
// //     'driving_licence',
// //     'voter_id',
// //     'passport',
// //     'pan_number',
// //   ];

// //   // ✅ Universal File Picker Handler (for front, back, gst)
// //   const handleBrowseFile = async type => {
// //     const options = {mediaType: 'photo', selectionLimit: 1};
// //     launchImageLibrary(options, response => {
// //       if (response.didCancel) return;
// //       if (response.errorMessage)
// //         return Alert.alert('Error', response.errorMessage);

// //       const file = response.assets[0];
// //       if (!file) return;

// //       if (type === 'front') setAadhaarFront(file);
// //       else if (type === 'back') setAadhaarBack(file);
// //       else if (type === 'gst') setGstFile(file);
// //     });
// //   };

// //   const handleSubmit = async () => {
// //     if (!documentno || !docFront || !docBack || !confirmInfo || !agreeTerms) {
// //       return Alert.alert('Error', 'Please complete all fields and checkboxes.');
// //     }

// //     if (
// //       data?.vendor_category === 'vendor_dealer' &&
// //       data?.vendor_type === 'Registered' &&
// //       !gstFile
// //     ) {
// //       return Alert.alert('Error', 'Please upload your GST Certificate.');
// //     }

// //     try {
// //       setLoading(true);
// //       const token = await AsyncStorage.getItem('TOKEN');
// //       const user_id = await AsyncStorage.getItem('USERID');
// //       if (!user_id) {
// //         setLoading(false);
// //         return Alert.alert('Error', 'User ID not found.');
// //       }

// //       const formData = new FormData();
// //       formData.append('user_id', user_id);
// //       formData.append('proof_of_identity', selectedDocType);
// //       formData.append('aadhaar_no', documentno);
// //       formData.append('aadhaar_front', {
// //         uri: docFront.uri,
// //         type: docFront.type,
// //         name: docFront.fileName || 'aadhaar_front.jpg',
// //       });
// //       formData.append('aadhaar_back', {
// //         uri: docBack.uri,
// //         type: docBack.type,
// //         name: docBack.fileName || 'aadhaar_back.jpg',
// //       });

// //       if (
// //         data?.vendor_category === 'vendor_dealer' &&
// //         data?.vendor_type === 'Registered' &&
// //         gstFile
// //       ) {
// //         formData.append('gst_certificate', {
// //           uri: gstFile.uri,
// //           type: gstFile.type,
// //           name: gstFile.fileName || 'gst_certificate.jpg',
// //         });
// //       }

// //       const response = await fetch(`${API_BASE_URL}/buyer/documents/store`, {
// //         method: 'POST',
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //         body: formData,
// //       });
// //       const result = await response.json();
// //       setLoading(false);

// //       if (result?.status) {
// //         Alert.alert('Success', 'KYC submitted successfully!');
// //         navigation.navigate('KycConfirmation');
// //       } else {
// //         Alert.alert('Error', result?.message || 'Submission failed.');
// //       }
// //     } catch (error) {
// //       setLoading(false);
// //       Alert.alert('Error', 'Something went wrong. Please try again.');
// //     }
// //   };

// //   const placeholderText =
// //     selectedDocType === 'aadhaar'
// //       ? 'Enter Aadhaar Number'
// //       : selectedDocType === 'pan_number'
// //       ? 'Enter PAN Number'
// //       : selectedDocType === 'driving_licence'
// //       ? 'Enter Driving Licence Number'
// //       : selectedDocType === 'passport'
// //       ? 'Enter Passport Number'
// //       : selectedDocType === 'voter_id'
// //       ? 'Enter Voter ID Number'
// //       : 'Enter Document Number';

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <Header title="search" navigation={navigation} showBack={true} />

// //       <ScrollView contentContainerStyle={{paddingBottom: 40}}>
// //         {/* Header */}

// //         <View style={styles.cardContainer}>
// //           <Text style={styles.sectionTitle}>Document Details</Text>

// //           {/* Dropdown */}
// //           <TouchableOpacity
// //             style={styles.dropdownHeader}
// //             onPress={() => setShowDropdown(!showDropdown)}>
// //             <Text style={styles.selectedText}>{selectedDocType}</Text>
// //             <Ionicons
// //               name={showDropdown ? 'chevron-up' : 'chevron-down'}
// //               size={20}
// //             />
// //           </TouchableOpacity>

// //           <TextInput
// //             style={styles.textInput}
// //             placeholder={placeholderText}
// //             value={documentno}
// //             keyboardType="numeric"
// //             maxLength={12}
// //             onChangeText={setDocumentno}
// //           />

// //           {showDropdown &&
// //             documentTypes.map((item, index) => (
// //               <TouchableOpacity
// //                 key={index}
// //                 style={styles.dropdownItem}
// //                 onPress={() => {
// //                   setSelectedDocType(item);
// //                   setShowDropdown(false);
// //                 }}>
// //                 <Text>{item}</Text>
// //               </TouchableOpacity>
// //             ))}

// //           {/* File Uploads */}
// //           {(data?.vendor_category === 'vendor_customer' &&
// //             data?.vendor_type === 'Unregistered') ||
// //           (data?.vendor_category === 'vendor_dealer' &&
// //             data?.vendor_type === 'Unregistered') ? (
// //             <>
// //               {/* Aadhaar Front */}
// //               <TouchableOpacity
// //                 style={styles.uploadBox}
// //                 onPress={() => handleBrowseFile('front')}>
// //                 <Ionicons name="cloud-upload-outline" size={30} color="#999" />
// //                 <Text style={styles.uploadText}>
// //                   {docFront ? docFront.fileName : 'Upload Aadhaar Front'}
// //                 </Text>
// //               </TouchableOpacity>

// //               {/* Aadhaar Back */}
// //               <TouchableOpacity
// //                 style={styles.uploadBox}
// //                 onPress={() => handleBrowseFile('back')}>
// //                 <Ionicons name="cloud-upload-outline" size={30} color="#999" />
// //                 <Text style={styles.uploadText}>
// //                   {docBack ? docBack.fileName : 'Upload Aadhaar Back'}
// //                 </Text>
// //               </TouchableOpacity>
// //             </>
// //           ) : data?.vendor_category === 'vendor_dealer' &&
// //             data?.vendor_type === 'Registered' ? (
// //             <>
// //               {/* Aadhaar Front */}
// //               <TouchableOpacity
// //                 style={styles.uploadBox}
// //                 onPress={() => handleBrowseFile('front')}>
// //                 <Ionicons name="cloud-upload-outline" size={30} color="#999" />
// //                 <Text style={styles.uploadText}>
// //                   {docFront ? docFront.fileName : 'Upload Aadhaar Front'}
// //                 </Text>
// //               </TouchableOpacity>

// //               {/* Aadhaar Back */}
// //               <TouchableOpacity
// //                 style={styles.uploadBox}
// //                 onPress={() => handleBrowseFile('back')}>
// //                 <Ionicons name="cloud-upload-outline" size={30} color="#999" />
// //                 <Text style={styles.uploadText}>
// //                   {docBack ? docBack.fileName : 'Upload Aadhaar Back'}
// //                 </Text>
// //               </TouchableOpacity>

// //               {/* GST Upload */}
// //               <Text
// //                 style={{fontWeight: '700', fontSize: 16, marginVertical: 12}}>
// //                 GST Certificate
// //               </Text>
// //               <TouchableOpacity
// //                 style={styles.uploadBox}
// //                 onPress={() => handleBrowseFile('gst')}>
// //                 <Ionicons name="cloud-upload-outline" size={30} color="#999" />
// //                 <Text style={styles.uploadText}>
// //                   {gstFile ? gstFile.fileName : 'Upload GST Certificate'}
// //                 </Text>
// //               </TouchableOpacity>
// //             </>
// //           ) : null}

// //           {/* Checkboxes */}
// //           <TouchableOpacity
// //             style={styles.checkboxRow}
// //             onPress={() => setConfirmInfo(!confirmInfo)}>
// //             <Ionicons
// //               name={confirmInfo ? 'checkbox-outline' : 'square-outline'}
// //               size={24}
// //               color="#333"
// //             />
// //             <Text style={styles.checkboxText}>
// //               I confirm that the information provided is accurate and complete.
// //             </Text>
// //           </TouchableOpacity>

// //           <TouchableOpacity
// //             style={styles.checkboxRow}
// //             onPress={() => setAgreeTerms(!agreeTerms)}>
// //             <Ionicons
// //               name={agreeTerms ? 'checkbox-outline' : 'square-outline'}
// //               size={24}
// //               color="#333"
// //             />
// //             <Text style={styles.checkboxText}>
// //               I agree to the terms and conditions of the KYC process.
// //             </Text>
// //           </TouchableOpacity>

// //           {/* Submit Button */}
// //           <TouchableOpacity
// //             style={styles.submitBtn}
// //             onPress={handleSubmit}
// //             disabled={loading}>
// //             <Text style={styles.submitText}>
// //               {loading ? 'Submitting...' : 'Submit'}
// //             </Text>
// //           </TouchableOpacity>
// //         </View>
// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // };

// // export default KycScreen;

// // const styles = StyleSheet.create({
// //   container: {flex: 1, backgroundColor: '#FFF'},
// //   header: {
// //     padding: 15,
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //   },
// //   headerTitle: {fontSize: 16, fontWeight: '600', color: '#000'},
// //   cardContainer: {
// //     backgroundColor: '#fff',
// //     borderRadius: 16,
// //     padding: 16,
// //     marginHorizontal: 10,
// //     marginBottom: 20,
// //     borderWidth: 1,
// //     borderColor: '#e0e0e0',
// //     elevation: 4,
// //   },
// //   sectionTitle: {fontWeight: '700', fontSize: 16, marginBottom: 12},
// //   textInput: {
// //     borderWidth: 1,
// //     borderColor: '#ccc',
// //     borderRadius: 12,
// //     padding: 12,
// //     marginBottom: 16,
// //     fontSize: 14,
// //     color: '#333',
// //   },
// //   dropdownHeader: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     paddingVertical: 12,
// //     borderWidth: 1,
// //     borderColor: '#ccc',
// //     borderRadius: 12,
// //     paddingHorizontal: 12,
// //     marginBottom: 10,
// //   },
// //   selectedText: {fontSize: 14, fontWeight: '500', color: '#000'},
// //   dropdownItem: {
// //     paddingVertical: 10,
// //     paddingHorizontal: 12,
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#DDD',
// //   },
// //   uploadBox: {
// //     height: 60,
// //     borderRadius: 12,
// //     backgroundColor: '#F0F0F0',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     marginVertical: 8,
// //     flexDirection: 'row',
// //     paddingHorizontal: 12,
// //   },
// //   uploadText: {marginLeft: 8, fontSize: 14, color: '#333'},
// //   checkboxRow: {
// //     flexDirection: 'row',
// //     alignItems: 'flex-start',
// //     marginBottom: 14,
// //     marginTop: 12,
// //   },
// //   checkboxText: {marginLeft: 12, fontSize: 14, color: '#333', flex: 1},
// //   submitBtn: {
// //     marginTop: 20,
// //     backgroundColor: '#333333',
// //     paddingVertical: 14,
// //     borderRadius: 12,
// //     alignItems: 'center',
// //   },
// //   submitText: {color: '#fff', fontSize: 16, fontWeight: '600'},
// // });



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
// import Header from '../../../../constants/Header';

// const KycScreen = ({navigation}) => {
//   const [documentno, setDocumentno] = useState('');
//   const [selectedDocType, setSelectedDocType] = useState('aadhaar');
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [confirmInfo, setConfirmInfo] = useState(false);
//   const [agreeTerms, setAgreeTerms] = useState(false);

//   const [docFront, setDocFront] = useState(null);
//   const [docBack, setDocBack] = useState(null);
//   const [gstFile, setGstFile] = useState(null);

//   const [loading, setLoading] = useState(false);

//   const dispatch = useDispatch();
//   const {data} = useSelector(state => state.profile);

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

//   // 📌 Document Types (which require front + back)
//   const doubleSideDocs = ['aadhaar', 'driving_licence', 'voter_id'];

//   // 📌 File Picker
//   const handleBrowseFile = type => {
//     launchImageLibrary({mediaType: 'photo'}, response => {
//       if (response.didCancel || response.errorMessage) return;

//       const file = response.assets[0];
//       if (!file) return;

//       if (type === 'front') setDocFront(file);
//       else if (type === 'back') setDocBack(file);
//       else if (type === 'gst') setGstFile(file);
//     });
//   };

//   // 📌 Placeholder dynamic text
//   const placeholderText =
//     selectedDocType === 'aadhaar'
//       ? 'Enter Aadhaar Number'
//       : selectedDocType === 'pan_number'
//       ? 'Enter PAN Number'
//       : selectedDocType === 'driving_licence'
//       ? 'Enter Driving Licence Number'
//       : selectedDocType === 'passport'
//       ? 'Enter Passport Number'
//       : selectedDocType === 'voter_id'
//       ? 'Enter Voter ID Number'
//       : 'Enter Document Number';

//   // 📌 Dynamic Front Label
//   const getFrontLabel = () => {
//     switch (selectedDocType) {
//       case 'aadhaar':
//         return 'Upload Aadhaar Front';
//       case 'driving_licence':
//         return 'Upload Driving Licence Front';
//       case 'voter_id':
//         return 'Upload Voter ID Front';
//       default:
//         return 'Upload Document Front';
//     }
//   };

//   // 📌 Dynamic Back Label
//   const getBackLabel = () => {
//     switch (selectedDocType) {
//       case 'aadhaar':
//         return 'Upload Aadhaar Back';
//       case 'driving_licence':
//         return 'Upload Driving Licence Back';
//       case 'voter_id':
//         return 'Upload Voter ID Back';
//       default:
//         return 'Upload Document Back';
//     }
//   };

//   // 📌 Single-side Upload Label
//   const getSingleSideLabel = () => {
//     switch (selectedDocType) {
//       case 'pan_number':
//         return 'Upload PAN Card';
//       case 'passport':
//         return 'Upload Passport';
//       default:
//         return 'Upload Document';
//     }
//   };

//   // 📌 Form Submit
//   const handleSubmit = async () => {
//     if (!documentno || !docFront || (!doubleSideDocs.includes(selectedDocType) ? false : !docBack)) {
//       return Alert.alert('Error', 'Please complete all mandatory fields.');
//     }

//     if (!confirmInfo || !agreeTerms)
//       return Alert.alert('Error', 'Please agree to all confirmations.');

//     // GST Required for registered dealer
//     if (
//       data?.vendor_category === 'vendor_dealer' &&
//       data?.vendor_type === 'Registered' &&
//       !gstFile
//     ) {
//       return Alert.alert('Error', 'Please upload your GST Certificate.');
//     }

//     try {
//       setLoading(true);

//       const token = await AsyncStorage.getItem('TOKEN');
//       const user_id = await AsyncStorage.getItem('USERID');

//       const formData = new FormData();
//       formData.append('user_id', user_id);
//       formData.append('proof_of_identity', selectedDocType);
//       formData.append('aadhaar_no', documentno);

//       // Upload Front
//       formData.append('aadhaar_front', {
//         uri: docFront.uri,
//         type: docFront.type,
//         name: docFront.fileName || 'front.jpg',
//       });

//       // Upload Back (only if required)
//       if (doubleSideDocs.includes(selectedDocType)) {
//         formData.append('aadhaar_back', {
//           uri: docBack.uri,
//           type: docBack.type,
//           name: docBack.fileName || 'back.jpg',
//         });
//       }

//       // GST Upload
//       if (gstFile) {
//         formData.append('gst_certificate', {
//           uri: gstFile.uri,
//           type: gstFile.type,
//           name: gstFile.fileName || 'gst_certificate.jpg',
//         });
//       }

//       const response = await fetch(`${API_BASE_URL}/buyer/documents/store`, {
//         method: 'POST',
//         headers: {Authorization: `Bearer ${token}`},
//         body: formData,
//       });
//       console.log('res+++++++++++++++++++++++++++++++++++',response);
//       const result = await response.json();
//       setLoading(false);

//       if (result?.status) {
//         Alert.alert('Success', 'KYC submitted successfully!');
//         navigation.navigate('KycConfirmation');
//       } else {
//         console.log('err++++++++++++++++++++++++', response);
//         Alert.alert('Error', result?.message || 'Submission failed.');
//       }
//     } catch (error) {
//       console.log('err++++++++++++++++++++++++', error?.response);
//       setLoading(false);
//       Alert.alert('Error', 'Something went wrong.');
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Header title="KYC" navigation={navigation} showBack={true} />

//       <ScrollView contentContainerStyle={{paddingBottom: 40}}>
//         <View style={styles.cardContainer}>
//           <Text style={styles.sectionTitle}>Document Details</Text>

//           {/* Document Dropdown */}
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
//                   setDocFront(null);
//                   setDocBack(null);
//                 }}>
//                 <Text>{item}</Text>
//               </TouchableOpacity>
//             ))}

//           {/* Document Number Input */}
//           <TextInput
//             style={styles.textInput}
//             placeholder={placeholderText}
//             value={documentno}
//             onChangeText={setDocumentno}
//           />

//           {/* Upload Boxes */}
//           {doubleSideDocs.includes(selectedDocType) ? (
//             <>
//               {/* FRONT */}
//               <TouchableOpacity
//                 style={styles.uploadBox}
//                 onPress={() => handleBrowseFile('front')}>
//                 <Ionicons name="cloud-upload-outline" size={30} color="#999" />
//                 <Text style={styles.uploadText}>
//                   {docFront ? docFront.fileName : getFrontLabel()}
//                 </Text>
//               </TouchableOpacity>

//               {/* BACK */}
//               <TouchableOpacity
//                 style={styles.uploadBox}
//                 onPress={() => handleBrowseFile('back')}>
//                 <Ionicons name="cloud-upload-outline" size={30} color="#999" />
//                 <Text style={styles.uploadText}>
//                   {docBack ? docBack.fileName : getBackLabel()}
//                 </Text>
//               </TouchableOpacity>
//             </>
//           ) : (
//             <>
//               {/* SINGLE SIDE */}
//               <TouchableOpacity
//                 style={styles.uploadBox}
//                 onPress={() => handleBrowseFile('front')}>
//                 <Ionicons name="cloud-upload-outline" size={30} color="#999" />
//                 <Text style={styles.uploadText}>
//                   {docFront ? docFront.fileName : getSingleSideLabel()}
//                 </Text>
//               </TouchableOpacity>
//             </>
//           )}

//           {/* GST Only for Registered Dealer */}
//           {data?.vendor_category === 'vendor_dealer' &&
//             data?.vendor_type === 'Registered' && (
//               <>
//                 <Text
//                   style={{
//                     fontWeight: '700',
//                     fontSize: 16,
//                     marginVertical: 12,
//                   }}>
//                   GST Certificate
//                 </Text>

//                 <TouchableOpacity
//                   style={styles.uploadBox}
//                   onPress={() => handleBrowseFile('gst')}>
//                   <Ionicons
//                     name="cloud-upload-outline"
//                     size={30}
//                     color="#999"
//                   />
//                   <Text style={styles.uploadText}>
//                     {gstFile ? gstFile.fileName : 'Upload GST Certificate'}
//                   </Text>
//                 </TouchableOpacity>
//               </>
//             )}

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
//               I confirm that all information is accurate.
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
//               I agree to the terms & conditions.
//             </Text>
//           </TouchableOpacity>

//           {/* Submit */}
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

// // -------------------------------------------------------
// // STYLE
// // -------------------------------------------------------

// const styles = StyleSheet.create({
//   container: {flex: 1, backgroundColor: '#FFF'},

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
//     borderBottomWidth: 1,
//     paddingHorizontal: 12,
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

// export default KycScreen;




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
import Header from '../../../../constants/Header';

const KycScreen = ({navigation}) => {
  const [documentNo, setDocumentNo] = useState('');
  const [selectedDocType, setSelectedDocType] = useState('aadhaar');
  const [showDropdown, setShowDropdown] = useState(false);
  const [confirmInfo, setConfirmInfo] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [docFront, setDocFront] = useState(null);
  const [docBack, setDocBack] = useState(null);
  const [gstFile, setGstFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const {data} = useSelector(state => state.profile);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  // All document types
  const documentTypes = [
    'aadhaar',
    'driving_licence',
    'voter_id',
    'passport',
    'pan_number',
  ];

  // Field Mapping for dynamic FormData
  const docFields = {
    aadhaar: {
      numberField: 'aadhaar_no',
      frontField: 'aadhaar_front',
      backField: 'aadhaar_back',
      placeholder: 'Enter Aadhaar Number',
      frontText: 'Upload Aadhaar Front',
      backText: 'Upload Aadhaar Back',
    },
    driving_licence: {
      numberField: 'dl_no',
      frontField: 'dl_front',
      backField: 'dl_back',
      placeholder: 'Enter Driving Licence Number',
      frontText: 'Upload DL Front',
      backText: 'Upload DL Back',
    },
    voter_id: {
      numberField: 'voter_id',
      frontField: 'voter_id_front',
      backField: 'voter_id_back',
      placeholder: 'Enter Voter ID Number',
      frontText: 'Upload Voter ID Front',
      backText: 'Upload Voter ID Back',
    },
    passport: {
      numberField: 'passport_no',
      frontField: 'passport_front',
      backField: 'passport_back',
      placeholder: 'Enter Passport Number',
      frontText: 'Upload Passport Front',
      backText: 'Upload Passport Back',
    },
    pan_number: {
      numberField: 'customer_pan',
      frontField: 'pan_img',
      backField: null,
      placeholder: 'Enter PAN Number',
      frontText: 'Upload PAN',
      backText: null,
    },
  };

  const fields = docFields[selectedDocType];

  // File picker
  const handleBrowseFile = type => {
    launchImageLibrary({mediaType: 'photo', selectionLimit: 1}, response => {
      if (response.didCancel) return;
      if (response.errorMessage) return Alert.alert('Error', response.errorMessage);

      const file = response.assets[0];
      if (!file) return;

      if (type === 'front') setDocFront(file);
      else if (type === 'back') setDocBack(file);
      else if (type === 'gst') setGstFile(file);
    });
  };

  // Submit Handler
  const handleSubmit = async () => {
    if (!documentNo || !docFront || (!docBack && fields.backField) || !confirmInfo || !agreeTerms) {
      return Alert.alert('Error', 'Please complete all fields and checkboxes.');
    }

    if (data?.vendor_category === 'vendor_dealer' &&
        data?.vendor_type === 'Registered' &&
        !gstFile) 
    {
      return Alert.alert('Error', 'Please upload your GST Certificate.');
    }

    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('TOKEN');
      const user_id = await AsyncStorage.getItem('USERID');

      const formData = new FormData();

      formData.append('user_id', user_id);
      formData.append('proof_of_identity', selectedDocType);

      // Dynamic number field
      formData.append(fields.numberField, documentNo);

      // Front
      formData.append(fields.frontField, {
        uri: docFront.uri,
        type: docFront.type,
        name: docFront.fileName || 'front.jpg',
      });

      // Back only if exists
      if (fields.backField && docBack) {
        formData.append(fields.backField, {
          uri: docBack.uri,
          type: docBack.type,
          name: docBack.fileName || 'back.jpg',
        });
      }

      // GST (only dealers)
      if (data?.vendor_category === 'vendor_dealer' &&
          data?.vendor_type === 'Registered' &&
          gstFile) 
      {
        formData.append('gst_certificate', {
          uri: gstFile.uri,
          type: gstFile.type,
          name: gstFile.fileName || 'gst_certificate.jpg',
        });
      }
      console.log('formData------------------------------->',formData);
      const response = await fetch(`${API_BASE_URL}/buyer/documents/store`, {
        method: 'POST',
        headers: {Authorization: `Bearer ${token}`},
        body: formData,
      });
      console.log('res+++++++++++++++++++++++++++++++++++', response);
      const result = await response.json();
      setLoading(false);

      if (result?.status === true) {
        Alert.alert('Success', 'KYC submitted successfully!');
        navigation.navigate('KycConfirmation');
      } else {
        Alert.alert('Error', result?.message || 'Submission failed.');
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Something went wrong. Try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="KYC" navigation={navigation} showBack={true} />

      <ScrollView contentContainerStyle={{paddingBottom: 40}}>
        <View style={styles.cardContainer}>
          <Text style={styles.sectionTitle}>Document Details</Text>

          {/* Dropdown */}
          <TouchableOpacity
            style={styles.dropdownHeader}
            onPress={() => setShowDropdown(!showDropdown)}>
            <Text style={styles.selectedText}>{selectedDocType}</Text>
            <Ionicons name={showDropdown ? "chevron-up" : "chevron-down"} size={20} />
          </TouchableOpacity>

          {showDropdown &&
            documentTypes.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => {
                  setSelectedDocType(item);
                  setShowDropdown(false);
                  setDocFront(null);
                  setDocBack(null);
                }}>
                <Text>{item}</Text>
              </TouchableOpacity>
            ))}

          {/* Dynamic Placeholder */}
          <TextInput
            style={styles.textInput}
            placeholder={fields.placeholder}
            value={documentNo}
            onChangeText={setDocumentNo}
          />

          {/* Upload Front */}
          <TouchableOpacity
            style={styles.uploadBox}
            onPress={() => handleBrowseFile('front')}>
            <Ionicons name="cloud-upload-outline" size={30} color="#999" />
            <Text style={styles.uploadText}>
              {docFront ? docFront.fileName : fields.frontText}
            </Text>
          </TouchableOpacity>

          {/* Upload Back (if exists) */}
          {fields.backField && (
            <TouchableOpacity
              style={styles.uploadBox}
              onPress={() => handleBrowseFile('back')}>
              <Ionicons name="cloud-upload-outline" size={30} color="#999" />
              <Text style={styles.uploadText}>
                {docBack ? docBack.fileName : fields.backText}
              </Text>
            </TouchableOpacity>
          )}

          {/* GST Upload */}
          {data?.vendor_category === 'vendor_dealer' &&
            data?.vendor_type === 'Registered' && (
              <>
                <Text style={{fontSize: 16, fontWeight: '700', marginVertical: 10}}>
                  GST Certificate
                </Text>
                <TouchableOpacity
                  style={styles.uploadBox}
                  onPress={() => handleBrowseFile('gst')}>
                  <Ionicons name="cloud-upload-outline" size={30} color="#999" />
                  <Text style={styles.uploadText}>
                    {gstFile ? gstFile.fileName : "Upload GST Certificate"}
                  </Text>
                </TouchableOpacity>
              </>
            )}

          {/* Checkboxes */}
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setConfirmInfo(!confirmInfo)}>
            <Ionicons
              name={confirmInfo ? "checkbox-outline" : "square-outline"}
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
              name={agreeTerms ? "checkbox-outline" : "square-outline"}
              size={24}
              color="#333"
            />
            <Text style={styles.checkboxText}>
              I agree to the terms & conditions.
            </Text>
          </TouchableOpacity>

          {/* Submit */}
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



/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFF'},
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
  selectedText: {fontSize: 14, fontWeight: '500'},
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
    marginTop: 12,
  },
  checkboxText: {marginLeft: 12, fontSize: 14, flex: 1},
  submitBtn: {
    marginTop: 20,
    backgroundColor: '#333333',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitText: {color: '#fff', fontSize: 16, fontWeight: '600'},
});
