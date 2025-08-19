import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const orderItems = [
  {
    id: '1',
    title: 'iPhone 13 Pro Max 256GB',
    grade: 'Grade A2',
    price: '₹44,999',
    originalPrice: '₹49,999',
    image: 'https://i.postimg.cc/FssvR7Tt/iphone.png', // Replace with actual image
  },
  {
    id: '2',
    title: 'Samsung Galaxy S22 Ultra 512GB',
    grade: 'Grade A1',
    price: '₹44,999',
    originalPrice: '₹49,999',
    image: 'https://i.postimg.cc/NM6yg5p9/samsung.png', // Replace
  },
  {
    id: '3',
    title: 'iPad Pro 12.9-inch (5th Gen) 256GB',
    grade: 'Grade A2',
    price: '₹44,999',
    originalPrice: '₹49,999',
    image: 'https://i.postimg.cc/T1mX8D9F/Depth-4-Frame-1-11.png', // Replace
  },
];

const ProcessToPay = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{paddingBottom: 20}}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Ionicons name="chevron-back" size={22} color="#000" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Order Confirmed!</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Ionicons name="search" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        {/* Top Green Confirmation Block */}
        <View style={styles.confirmContainer}>
          <Text style={styles.confirmTitle}>Order</Text>
          <Text style={styles.confirmTitle}>Confirmed!</Text>
          <TouchableOpacity style={styles.viewDetailsButton}>
            <Text style={styles.viewDetailsText}>View Details</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.whiteSection}>
          {/* Order ID */}
          <Text style={styles.orderId}>Order ID: #123456789</Text>
          <View style={styles.separator} />

          {/* Clock Icon */}
          <View style={styles.iconContainer}>
            <Image
              source={require('../../../../../assets/images/timer.png')} // Your custom clock image
              style={{width: 100, height: 100, resizeMode: 'contain'}}
            />
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={()=> navigation.navigate('TrackOrder')} style={styles.blackButton}>
              <Text style={styles.buttonText}>Track Order</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> navigation.navigate('YourOrderIsOnTheWay')} style={styles.blackButton}>
              <Text style={styles.buttonText}>View Order</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.separator} />

          {/* Order Summary */}
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {orderItems.map(item => (
            <View key={item.id} style={styles.productItem}>
              <View style={{flex: 1}}>
                <Text style={styles.gradeText}>{item.grade}</Text>
                <Text style={styles.productTitle}>{item.title}</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.price}>{item.price}</Text>
                  <Text style={styles.originalPrice}>{item.originalPrice}</Text>
                </View>
              </View>
              <Image
                source={{uri: item.image}}
                style={styles.productImage}
                resizeMode="contain"
              />
            </View>
          ))}

          {/* Total Price */}
          <View style={styles.totalRow}>
            <Text style={styles.sectionTitle}>Cart Total</Text>
            <Text style={styles.sectionTitle}>₹xxxx9</Text>
          </View>

          {/* Delivery Time */}
          <View style={styles.deliveryContainer}>
            <View>
              <Text style={styles.deliveryTitle}>Estimated Delivery Time</Text>
              <Text style={styles.deliveryDate}>Arriving by Oct 25, 2025</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.deliveryDays}>3-7</Text>
              <Text style={styles.deliverySubText}>Working Days</Text>
            </View>
          </View>

          {/* Continue Shopping */}
          <TouchableOpacity style={styles.greenButton}>
            <Text style={styles.greenButtonText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProcessToPay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
  confirmContainer: {
    backgroundColor: '#2E9B4F',
    padding: 24,
  },
  confirmTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  viewDetailsButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 12,
    width: '33%',
  },
  viewDetailsText: {
    fontWeight: '600',
    color: '#000',
  },
  whiteSection: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  orderId: {
    fontWeight: '500',
    textAlign: 'right',
    fontSize: 14,
    color: '#333',
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: '#000',
    marginVertical: 10,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  blackButton: {
    backgroundColor: '#222',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 5,
    color: '#000',
  },
  productItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
  },
  gradeText: {
    fontSize: 12,
    color: '#777',
  },
  productTitle: {
    fontWeight: '500',
    marginTop: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  price: {
    fontWeight: '600',
    color: '#000',
    marginRight: 10,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  productImage: {
    width: 100,
    height: 100,
    marginLeft: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  deliveryContainer: {
    backgroundColor: '#F5FDF9',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deliveryTitle: {
    fontWeight: '500',
    fontSize: 16,
    color: '#222',
  },
  deliveryDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  deliveryDays: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#11A5D7',
  },
  deliverySubText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },
  greenButton: {
    backgroundColor: '#2E9B4F',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  greenButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
