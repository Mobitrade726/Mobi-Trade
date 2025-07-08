import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  SafeAreaView,
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const REASONS = [
  'Defective Product',
  'Wrong Item Received',
  'Damaged During Shipping',
  'Item Not as Described',
  'Missing Parts',
  'Incorrect Size',
  'Function not working',
  'Duplicate Order',
  'Incompatible Device',
  'Other',
];

const ReturnRequest = ({navigation}) => {
  const [showReasons, setShowReasons] = useState(false);
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const toggleReason = reason => {
    setSelectedReasons(prev =>
      prev.includes(reason)
        ? prev.filter(r => r !== reason)
        : [...prev, reason],
    );
  };

  const handleSubmit = () => {
    // Handle submission logic here
    setModalVisible(true); // Show modal
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fffdfd'}}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}>
          <Ionicons name="chevron-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Return request</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Upload Video */}
        <TouchableOpacity style={styles.uploadCard}>
          <View style={{flex: 1}}>
            <Text style={styles.cardTitle}>Upload video</Text>
            <Text style={styles.cardSubtitle}>
              Tap to upload a video of the product to show the issue.
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../../../../../assets/images/videocall.png')}
              style={{width: 70, height: 70, resizeMode: 'contain'}}
            />
            <Text style={styles.videoFormats}>
              Accepted formats:{'\n'}MP4, MOV.
            </Text>
          </View>
        </TouchableOpacity>

        {/* Reason for return */}
        <Text style={styles.sectionTitle}>Reason for return</Text>

        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowReasons(prev => !prev)}>
          <Text style={{color: selectedReasons.length ? '#000' : '#999'}}>
            {selectedReasons.length
              ? selectedReasons.join(', ')
              : 'Select reasons'}
          </Text>
          <Ionicons
            name={showReasons ? 'chevron-up' : 'chevron-down'}
            size={20}
            color="#999"
          />
        </TouchableOpacity>

        <Text style={styles.multiReasonHint}>
          You can select multiple reasons
        </Text>

        {showReasons && (
          <View style={styles.reasonList}>
            {REASONS.map(reason => (
              <TouchableOpacity
                key={reason}
                onPress={() => toggleReason(reason)}
                style={styles.reasonItem}>
                <Text style={styles.reasonText}>{reason}</Text>
                <Ionicons
                  name={
                    selectedReasons.includes(reason)
                      ? 'checkmark-circle'
                      : 'ellipse-outline'
                  }
                  size={20}
                  color={selectedReasons.includes(reason) ? 'green' : '#ccc'}
                />
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TextInput
          placeholder="Additional explanation...."
          multiline
          numberOfLines={5}
          value={additionalInfo}
          onChangeText={setAdditionalInfo}
          style={styles.textArea}
        />
      </ScrollView>

      {/* Submit */}
      <TouchableOpacity style={styles.requestBtn} onPress={handleSubmit}>
        <Ionicons name="send-outline" size={20} color="#000" />
        <Text style={styles.requestText}>Request Return</Text>
      </TouchableOpacity>

      {/* ✅ Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.checkCircle}>
              <Ionicons name="checkmark" size={40} color="green" />
            </View>
            <Text style={styles.modalTitle}>Request Generated</Text>
            <Text style={styles.modalSub}>
              We will get back to you as soon as possible regarding your
              concern.
            </Text>
            <TouchableOpacity
              style={styles.doneBtn}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ReturnRequest;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backBtn: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  content: {
    padding: 16,
    paddingBottom: 30,
  },
  uploadCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  videoFormats: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  multiReasonHint: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    marginBottom: 8,
  },
  reasonList: {
    backgroundColor: '#F9FCFF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  reasonItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  reasonText: {
    fontSize: 14,
    color: '#000',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: '#000',
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  requestBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    borderColor: '#ccc',
    backgroundColor: '#F5FFF5',
    borderWidth: 1,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  requestText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
    color: '#000',
  },

  // ✅ Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: '80%',
  },
  checkCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#e4f8ea',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalSub: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
    marginBottom: 20,
  },
  doneBtn: {
    backgroundColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  doneText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
