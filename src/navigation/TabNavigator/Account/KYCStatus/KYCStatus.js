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

  console.log('data+++++++++++++++++++++++++++++++++++++++++++++++++++', data);

  // Assuming `data` is your object
  const isIndividual =
    data?.vendor_category === 'vendor_customer' &&
    data?.vendor_type === 'Unregistered';

  const isDealer =
    data?.vendor_category === 'vendor_dealer' &&
    (data?.vendor_type === 'Registered' ||
      data?.vendor_type === 'Unregistered');

  // Then you can get a display value if needed
  const displayType = isIndividual ? 'Individual' : isDealer ? 'Dealer' : 'N/A';

  console.log('displayType----------------------->', displayType);

  // 👉 displayType = 'Individual' or 'Dealer'
  // 👉 data.vendordocuments = backend response

  let documents = [];

  // ---- Common Documents (Individual + Dealer) ---- //
  const commonDocs = [
    {
      label: 'Aadhaar Card',
      key: 'aadhaar_no',
    },
    {
      label: 'PAN Card',
      key: 'customer_pan',
    },
    {
      label: 'Driving Licence',
      key: 'dl_no',
    },
    {
      label: 'Voter ID',
      key: 'voter_id',
    },
    {
      label: 'Passport',
      key: 'passport_no',
    },
  ];

  // ---- Step 1: Add common documents ---- //
  documents = commonDocs.map(doc => ({
    name: doc.label,
    status: data?.vendordocuments?.[doc.key] ? 'Approved' : 'Pending',
  }));

  // ---- Step 2: Add GST only for Dealer ---- //
  if (displayType === 'Dealer') {
    documents.push({
      name: 'GST Certificate',
      status: data?.vendordocuments?.gst_certificate ? 'Approved' : 'Pending',
    });
  }

  // ---- Step 3: KYC Complete Checker (GST को छोड़कर) ---- //
  const isKycComplete = documents
    .filter(doc => doc.name !== 'GST Certificate') // GST को ignore
    .every(doc => doc.status === 'Approved');

  console.log('DOCUMENT LIST:', documents);
  console.log('KYC COMPLETE:', isKycComplete);

  const [kycData, setKycData] = useState({
    status:
      data?.vendordocuments?.proof_of_identity === null
        ? 'Pending'
        : 'Approved',
    firmName: data?.firm_name,
    accountType: data?.vendor_category,
    documentnumber: data?.vendordocuments,
    proof_of_identity: data?.vendordocuments?.proof_of_identity,
    gstNo: data?.vendordocuments?.gst_number || 'N/A',
    submissionDate: formattedDate,
    documents: documents,
  });

  console.log('documentnumber------------------->', kycData?.documentnumber);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const getBannerColor = () => {
    switch (kycData.status) {
      case 'Approved':
        return '#4CAF50';
      case 'Pending':
        return '#F44336';
      default:
        return '#999';
    }
  };

  const getBannerText = () => {
    console.log('kycData.status-------------------->', kycData.status);
    switch (kycData.status) {
      case 'Approved':
        return {
          title: 'KYC Approved',
          sub: 'You can now enjoy all the benefits of a Updated account.',
        };
      case 'Pending':
        return {
          title: 'KYC Pending',
          sub: 'You have some unverified documents that need to be uploaded.',
        };
      case 'Rejected':
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
      <Header title="KYC Status" navigation={navigation} showBack={true} />
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Banner */}
        <View style={[styles.banner, {backgroundColor: getBannerColor()}]}>
          <View style={{flex: 1}}>
            <Text style={styles.bannerTitle}>{getBannerText().title}</Text>
            <Text style={styles.bannerSub}>{getBannerText().sub}</Text>
          </View>
          <View style={styles.statusPill}>
            <Text style={styles.statusPillText}>
              {kycData.status.charAt(0).toUpperCase() + kycData.status.slice(1)}
            </Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.label}>
            {displayType === 'Individual' ? 'Customer Name' : 'Firm Name'}
          </Text>
          <Text style={styles.value}>{kycData.firmName || 'N/A'}</Text>

          <Text style={styles.label}>Account Type</Text>
          <Text style={styles.value}>
            {data?.vendor_category === 'vendor_customer' &&
            data?.vendor_type === 'Unregistered'
              ? 'Individual'
              : data?.vendor_category === 'vendor_dealer' &&
                (data?.vendor_type === 'Registered' ||
                  data?.vendor_type === 'Unregistered')
              ? 'Dealer'
              : 'N/A'}
          </Text>

          <>
            <Text style={styles.label}>
              {kycData?.proof_of_identity || 'N/A'}
            </Text>
            {kycData?.documentnumber?.aadhaarCard ? (
              <Text style={styles.value}>
                {kycData.documentnumber.aadhaarCard}
              </Text>
            ) : null}

            {kycData?.documentnumber?.customer_pan ? (
              <Text style={styles.value}>
                {kycData.documentnumber.customer_pan}
              </Text>
            ) : null}

            {kycData?.documentnumber?.dl_no ? (
              <Text style={styles.value}>{kycData.documentnumber.dl_no}</Text>
            ) : null}

            {kycData?.documentnumber?.voter_id_no ? (
              <Text style={styles.value}>
                {kycData.documentnumber.voter_id_no}
              </Text>
            ) : null}

            {kycData?.documentnumber?.passport_no ? (
              <Text style={styles.value}>
                {kycData.documentnumber.passport_no}
              </Text>
            ) : null}

            {kycData.ask_gst === 'No' ? (
              <>
                <Text style={styles.label}>GST Number</Text>
                <Text style={styles.value}>{kycData.gstNo || 'N/A'}</Text>
              </>
            ) : null}

            <Text style={styles.label}>Submitted On</Text>
            <Text style={styles.value}>{kycData.submissionDate || 'N/A'}</Text>
          </>
        </View>

        {/* Documents Section */}
        <Text style={styles.docsTitle}>Upload Documents</Text>
        {kycData.documents.map((doc, index) => {
          const icon = getIconProps(doc.status);
          const isPending = doc.status === 'Pending';

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.docCard,
                isPending && {borderWidth: 1, borderColor: 'red'},
              ]}
              activeOpacity={0.7}
              disabled={!isPending} // 👉 Approved = disabled, Pending = clickable
              onPress={() => {
                if (isPending) {
                  navigation.navigate('KycCompleteStatus', {
                    documentType: doc.name,
                  });
                }
              }}>
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
            </TouchableOpacity>
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
