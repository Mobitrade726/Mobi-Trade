import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const UpgradeNow = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Upgrade to Business Account</Text>
      </View>

      <ScrollView
        contentContainerStyle={{paddingBottom: 100}}
        showsVerticalScrollIndicator={false}>
        {/* Description */}
        <Text style={styles.description}>
          Unlock exclusive benefits by upgrading to a dealer account. Gain access
          to dealer pricing, bulk order options, and GST invoicing. Complete KYC
          to get started.
        </Text>

        {/* Benefits */}
        <Text style={styles.sectionTitle}>Benefits</Text>

        <View style={styles.benefitItem}>
          <View style={styles.iconBox}>
            <Feather name="truck" size={20} color="#000" />
          </View>
          <Text style={styles.benefitText}>
            Bulk order pricing (coming soon)
          </Text>
        </View>

        <View style={styles.benefitItem}>
          <View style={styles.iconBox}>
            <Ionicons name="document-text-outline" size={20} color="#000" />
          </View>
          <Text style={styles.benefitText}>GST invoice support</Text>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={()=> navigation.navigate('UpgradeTabAccount')} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UpgradeNow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBFD',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 12,
    color: '#000',
  },
  description: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    paddingHorizontal: 16,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginTop: 20,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  iconBox: {
    backgroundColor: '#EAF1F9',
    padding: 10,
    borderRadius: 12,
    marginRight: 12,
  },
  benefitText: {
    fontSize: 14,
    color: '#000',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    marginBottom:10,
  },
  nextButton: {
    backgroundColor: '#4A9FD6',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
