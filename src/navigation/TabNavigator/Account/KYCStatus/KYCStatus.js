import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProfile} from '../../../../redux/slices/profileSlice';
import Header from '../../../../constants/Header';

const KycStatusScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {data} = useSelector(state => state.profile);
  const dateString = data?.vendordocuments?.created_at;
  const formattedDate = dateString ? dateString.split('T')[0] : 'N/A';

  const [kycData, setKycData] = useState({
    status: 'pending', // 'approved' | 'pending' | 'rejected'
    firmName: data?.firm_name,
    accountType: data?.vendor_category,
    aadhaarCard: data?.vendordocuments?.aadhaar_no,
    gstNo: data?.vendordocuments?.gst_number || 'N/A',
    submissionDate: formattedDate,
    documents: [
      {
        name: 'Aadhaar Card',
        status: data?.vendordocuments?.aadhaar_no ? 'Approved' : 'Pending',
      },
      {
        name: 'GST Certificate',
        status: data?.vendordocuments?.gst_certificate ? 'Approved' : 'Pending',
      },
    ],
  });

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (data?.vendordocuments?.aadhaar_no) {
      setKycData(prev => ({...prev, status: 'approved'}));
    } else {
      setKycData(prev => ({...prev, status: 'pending'}));
    }
  }, [data]);

  const getBannerColor = () => {
    switch (kycData.status) {
      case 'approved':
        return '#4CAF50';
      case 'pending':
        return '#F44336';
      default:
        return '#999';
    }
  };

  const getBannerText = () => {
    switch (kycData.status) {
      case 'approved':
        return {
          title: 'KYC Approved',
          sub: 'You can now enjoy all the benefits of a Updated account.',
        };
      case 'pending':
        return {
          title: 'KYC Pending',
          sub: 'You have some unverified documents that need to be uploaded.',
        };
      case 'rejected':
        return {
          title: 'KYC Rejected',
          sub: 'Your KYC verification failed. Please update your documents.',
        };
    }
  };

  const getIconProps = status => {
    switch (status) {
      case 'pending':
        return {name: 'time-outline', color: '#03A9F4'};
      case 'Approved':
        return {name: 'checkmark-circle-outline', color: '#4CAF50'};
      case 'Pending':
        return {name: 'alert-circle-outline', color: '#F44336'};
      default:
        return {name: 'help-circle-outline', color: '#999'};
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Header
          title="KYC Status"
          navigation={navigation}
          showBack={true}
        />
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Banner */}
        <View style={[styles.banner, {backgroundColor: getBannerColor()}]}>
          <View style={{flex: 1}}>
            <Text style={styles.bannerTitle}>{getBannerText().title}</Text>
            <Text style={styles.bannerSub}>{getBannerText().sub}</Text>
          </View>
          <TouchableOpacity style={styles.statusPill}>
            <Text style={styles.statusPillText}>
              {kycData.status.charAt(0).toUpperCase() + kycData.status.slice(1)}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.label}>Firm Name</Text>
          <Text style={styles.value}>{kycData.firmName || 'N/A'}</Text>

          <Text style={styles.label}>Account Type</Text>
          {kycData.accountType === 'Unregistered' ? (
            <Text style={styles.value}>Indivisual</Text>
          ) : (
            <Text style={styles.value}>Dealer</Text>
          )}
          <Text style={styles.label}>Aadhaar Card</Text>
          <Text style={styles.value}>{kycData.aadhaarCard || 'N/A'}</Text>

          <Text style={styles.label}>GST Number</Text>
          <Text style={styles.value}>{kycData.gstNo || 'N/A'}</Text>

          <Text style={styles.label}>Submitted On</Text>
          <Text style={styles.value}>{kycData.submissionDate || 'N/A'}</Text>
        </View>

        {/* Documents Section */}
        <Text style={styles.docsTitle}>Uploaded Documents</Text>
        {kycData.documents.map((doc, index) => {
          const icon = getIconProps(doc.status);
          return (
            <View key={index} style={styles.docCard}>
              <View style={styles.docIconWrapper}>
                <Feather name="file" size={24} color={icon.color} />
              </View>
              <View style={styles.docContent}>
                <Text style={styles.docTitle}>{doc.name}</Text>
                <Text style={styles.docStatus}>
                  {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                </Text>
              </View>
              <Ionicons name={icon.name} size={22} color={icon.color} />
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default KycStatusScreen;

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
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    padding: 16,
  },
  banner: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
    marginHorizontal: 15,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
  },
  bannerSub: {
    fontSize: 14,
    marginTop: 4,
    color: '#fff',
  },
  statusPill: {
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    justifyContent: 'center',
  },
  statusPillText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  infoSection: {
    borderRadius: 10,
    // padding: 16,
    marginBottom: 20,
  },
  label: {
    color: '#000',
    fontSize: 14,
    marginTop: 10,
    fontWeight: 'bold',
  },
  value: {
    color: '#333',
    fontSize: 12,
    marginTop: 2,
  },
  docsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  docCard: {
    backgroundColor: '#f8f8f8',
    padding: 14,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  docIconWrapper: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  docContent: {
    flex: 1,
  },
  docTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
  },
  docStatus: {
    fontSize: 13,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginHorizontal: 16,
    marginTop: 5,
    marginBottom: 0,
    color: '#000',
  },
  placeOrderBtn: {
    backgroundColor: '#333333',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  placeOrderText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
