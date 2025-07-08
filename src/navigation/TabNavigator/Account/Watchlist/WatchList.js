import React from 'react';
import {
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import WishlistCard from './WishlistCard'; // make sure to import the component
import Ionicons from 'react-native-vector-icons/Ionicons';


const wishlistData = [
  {
    id: '1',
    title: 'Apple iPhone 14',
    subtitle: '(Refurbished)',
    specs: '8GB 128GB ⚫ Black',
    price: '₹27,799',
    originalPrice: '₹47,799',
    warranty: '15-day warranty',
    grade: 'A1',
    image:
      'https://i.postimg.cc/jSrkm56K/A-sleek-black-smartphone-with-a-large-display-and-a-modern-design-resting-on-a-wooden-table.png',
  },
  {
    id: '2',
    title: 'Samsung Galaxy S22',
    subtitle: '(Refurbished)',
    specs: '12GB 256GB ⚫ Black',
    price: '₹69,999',
    originalPrice: '₹79,999',
    warranty: '15-day warranty',
    grade: 'A+',
    image:
      'https://i.postimg.cc/jSrkm56K/A-sleek-black-smartphone-with-a-large-display-and-a-modern-design-resting-on-a-wooden-table.png',
  },
  {
    id: '3',
    title: 'Google Pixel 7',
    subtitle: '(Refurbished)',
    specs: '8GB 128GB ⚫ Obsidian',
    price: '₹32,999',
    originalPrice: '₹59,999',
    warranty: '15-day warranty',
    grade: 'B',
    image:
      'https://i.postimg.cc/jSrkm56K/A-sleek-black-smartphone-with-a-large-display-and-a-modern-design-resting-on-a-wooden-table.png',
  },
  {
    id: '4',
    title: 'OnePlus 11',
    subtitle: '(Open Box)',
    specs: '8GB 256GB 🟢 Green',
    price: '₹56,999',
    originalPrice: '₹61,999',
    warranty: '15-day warranty',
    grade: 'A',
    image:
      'https://i.postimg.cc/jSrkm56K/A-sleek-black-smartphone-with-a-large-display-and-a-modern-design-resting-on-a-wooden-table.png',
  },
];

const WishlistScreen = ({navigation}) => {
  const renderItem = ({item}) => <WishlistCard data={item} />;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Ionicons name="chevron-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Wishlist</Text>
      </View>{' '}
      <FlatList
        data={wishlistData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity onPress={()=> navigation.navigate('SubWatchList')} style={styles.bottomButton}>
        <Text style={styles.continueText}>Continue Shopping</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight || 10,
  },
 header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderColor: '#ccc',
    position: 'relative',
    height: 50, // optional, to help with alignment
  },
  backButton: {
    position: 'absolute', // ADD THIS
    left: 15,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'medium', // change 'medium' to a valid value
    color: '#000',
    textAlign: 'center',
  },
  bottomButton: {
    backgroundColor: '#1C1C1C',
    paddingVertical: 16,
    margin: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
