import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DocumentPicker from 'react-native-document-picker';

const KycScreen = ({navigation}) => {
  const [documentName, setDocumentName] = useState('');
  const [selectedDocType, setSelectedDocType] = useState('Aadhar Card');
  const [showDropdown, setShowDropdown] = useState(false);
  const [confirmInfo, setConfirmInfo] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const documentTypes = [
    'Aadhar Card',
    'Driver’s Licence',
    'Voter Id',
    'Passport',
    'Pan Card',
  ];

  const handleBrowseFile = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });
      setSelectedFile(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled file picker');
      } else {
        console.error('File Picker Error:', err);
      }
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
          {/* Upload Box */}
          <TouchableOpacity style={styles.uploadBox} onPress={handleBrowseFile}>
            <Ionicons name="cloud-upload-outline" size={30} color="#999" />
            <Text style={styles.uploadText}>Browse document</Text>
            <Text style={styles.uploadSubText}>
              upload in pdf, jpg, jpeg format
            </Text>
            {selectedFile && (
              <Text style={styles.fileName}>{selectedFile.name}</Text>
            )}
          </TouchableOpacity>

          {/* Document Details */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Document Details</Text>

            <View style={styles.inputWrapper}>
              <Ionicons name="document-outline" size={18} color="#888" />
              <TextInput
                style={styles.textInput}
                placeholder="Document Name"
                placeholderTextColor="#888"
                value={documentName}
                onChangeText={setDocumentName}
              />
            </View>

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

            {/* Dropdown Options */}
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

            <Text style={styles.uploadNote}>Upload Selected Document</Text>
          </View>
        </View>
        <View style={styles.cardContainer}>
          {/* Upload Box */}
          <TouchableOpacity style={styles.uploadBox1} onPress={handleBrowseFile}>
            <Ionicons name="cloud-upload-outline" size={30} color="#999" />
            <Text style={styles.uploadText}>Browse document</Text>
            <Text style={styles.uploadSubText}>
              upload in pdf, jpg, jpeg format
            </Text>
            {selectedFile && (
              <Text style={styles.fileName}>{selectedFile.name}</Text>
            )}
          </TouchableOpacity>

          {/* Document Details */}
          <View style={styles.formSection}>
            {/* Dropdown */}
            <TouchableOpacity style={{}}>
              <Text style={{fontSize: 16, fontWeight: '600', color: '#000'}}>
                GST Certificate
              </Text>
              <Text style={{marginTop: 6, fontSize: 14, color: '#555'}}>
                Upload Selected Document
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{marginHorizontal: 12}}>
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
        </View>
      </ScrollView>
      {/* Submit Button */}
      <TouchableOpacity
        style={styles.submitBtn}
        onPress={() => navigation.navigate('KycConfirmation')
        //   {
        //   if (!selectedFile || !documentName || !confirmInfo || !agreeTerms) {
        //     alert('Please complete all fields and checkboxes.');
        //   } else {
        //     alert('KYC Submitted Successfully');
        //     // You can handle API submission here
        //   }
        // }
        }>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default KycScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4, // for Android shadow
  },
  uploadBox: {
    height: 160,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadBox1: {
    height: 160,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
  },
  uploadText: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
  },
  uploadSubText: {
    fontSize: 12,
    color: '#777',
  },
  fileName: {
    fontSize: 12,
    marginTop: 8,
    color: '#444',
  },
  formSection: {
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 0,
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#AAA',
    marginBottom: 12,
    paddingVertical: 4,
  },
  textInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  selectedText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  dropdownItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  uploadNote: {
    marginTop: 16,
    fontSize: 14,
    color: '#555',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  checkboxText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#333',
    flex: 1,
    flexWrap: 'wrap',
  },
  submitBtn: {
    marginTop: 10,
    backgroundColor: '#333333',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 5,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
