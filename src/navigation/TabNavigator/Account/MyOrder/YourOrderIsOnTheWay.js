import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const YourOrderIsOnTheWay = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Ionicons name="chevron-back" size={22} color="#000" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Order #1514</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{padding: 16}}>
        {/* Track Bar */}
        <TouchableOpacity style={styles.trackBanner}>
          <View style={{flex: 1}}>
            <Text style={styles.trackText}>Your order is on the way</Text>
            <Text style={styles.trackLink}>Click here to track your order</Text>
          </View>
          <Image
            source={require('../../../../../assets/images/Frame.png')}
            style={{width: 60, height: 35}}
          />
        </TouchableOpacity>

        {/* Image Placeholder */}
        <View style={styles.imageBox} />

        {/* Order Info */}
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Order number</Text>
          <Text style={styles.infoValue}>#1514</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Tracking Number</Text>
          <Text style={styles.infoValue}>IK987362341</Text>
        </View>

        {/* Delivery Info */}
        <TouchableOpacity style={styles.grayBox}>
          <Ionicons name="location-outline" size={24} color="#000" />
          <View style={styles.grayBoxContent}>
            <Text style={styles.grayBoxLabel}>Deliver to</Text>
            <Text style={styles.grayBoxText}>123 Main St, Springfield</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.grayBox}>
          <Ionicons name="person-circle-outline" size={24} />
          <View style={styles.grayBoxContent}>
            <Text style={styles.grayBoxLabel}>Instructions</Text>
            <Text style={styles.grayBoxText}>Johnathan Doe</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#000" />
        </TouchableOpacity>

        {/* Bill Details */}
        <Text style={styles.billTitle}>Bill Details</Text>
        {[
          ['Samsung Galaxy S21', '₹74,999'],
          ['OnePlus 9', '₹49,999'],
          ['Google Pixel 5', '₹59,999'],
          ['Xiaomi Mi 11', '₹56,999'],
          ['Realme GT', '₹37,999', true],
        ].map(([label, amount, bold]) => (
          <View key={label} style={styles.billRow}>
            <Text style={[styles.billText, bold && styles.boldText]}>
              {label}
            </Text>
            <Text style={[styles.billText, bold && styles.boldText]}>
              {amount}
            </Text>
          </View>
        ))}

        <View style={styles.divider} />

        {[
          ['GST(18%)', '₹264'],
          ['Platform Fee', '₹999'],
          ['Other Taxes', '₹9'],
        ].map(([label, amount]) => (
          <View key={label} style={styles.billRow}>
            <Text style={styles.billText}>{label}</Text>
            <Text style={styles.billText}>{amount}</Text>
          </View>
        ))}

        <View style={styles.divider} />

        <View style={styles.billRow}>
          <Text style={styles.billText}>Subtotal</Text>
          <Text style={styles.billText}>₹2,64,999</Text>
        </View>
        <View style={styles.billRow}>
          <Text style={styles.billText}>Delivery</Text>
          <Text style={styles.billText}>₹999</Text>
        </View>
        <View style={styles.billRow}>
          <Text style={styles.boldText}>Paid</Text>
          <Text style={styles.boldText}>₹2,64,999</Text>
        </View>

        {/* Buttons */}
        <TouchableOpacity
          onPress={() => navigation.navigate('TrackOrder')}
          style={styles.trackOrderBtn}>
          <Text style={[styles.buttonText, {color: '#28A745'}]}>
            Track Order
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.continueBtn}>
          <Text style={[styles.buttonText, {color: '#fff'}]}>
            Continue shopping
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default YourOrderIsOnTheWay;

const styles = StyleSheet.create({
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
  trackBanner: {
    backgroundColor: '#00AEEF',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  trackText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  trackLink: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  imageBox: {
    height: 200,
    backgroundColor: '#e0e0e0',
    borderRadius: 16,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  infoLabel: {
    color: '#333',
    fontSize: 14,
  },
  infoValue: {
    color: '#333',
    fontSize: 14,
  },
  grayBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
  },
  grayBoxContent: {
    flex: 1,
    marginLeft: 10,
  },
  grayBoxLabel: {
    fontSize: 12,
    color: '#555',
    marginBottom: 2,
  },
  grayBoxText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },

  billTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#000',
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  billText: {
    fontSize: 14,
    color: '#333',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  trackOrderBtn: {
    borderWidth: 1.5,
    borderColor: '#1C9C48',
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 20,
    alignItems: 'center',
  },
  continueBtn: {
    backgroundColor: '#1C9C48',
    borderRadius: 16,
    paddingVertical: 14,
    marginTop: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'semibold',
  },
});
