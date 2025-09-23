import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Feather';

const {width} = Dimensions.get('window');

const RecentlyView = ({navigation}) => {
  const data = [
    {
      id: '1',
      title: 'iPhone 12',
      specs: '6GB | 128GB',
      grade: 'Grade A1',
      image:
        'https://i.postimg.cc/sXpvhz95/A-sleek-i-Phone-12-with-a-glossy-finish-and-vibrant-display-resting-on-a-minimalist-surface.png',
    },
    {
      id: '2',
      title: 'Samsung Galaxy S21',
      specs: '8GB | 256GB',
      grade: 'Grade A2',
      image:
        'https://i.postimg.cc/7hKP3ZCJ/A-Samsung-Galaxy-S20-smartphone-with-a-sleek-design-and-vibrant-display-resting-on-a-simple-white-su.png',
    },
    {
      id: '3',
      title: 'Samsung Galaxy S21',
      specs: '8GB | 256GB',
      grade: 'Grade A3',
      image:
        'https://i.postimg.cc/7hKP3ZCJ/A-Samsung-Galaxy-S20-smartphone-with-a-sleek-design-and-vibrant-display-resting-on-a-simple-white-su.png',
    },
    // Add more items if needed
  ];
  const RecentlyAdds = ({item}) => (
    <>
      <View>
        <Image
          source={{uri: item.image}}
          style={styles.cardr}
          imageStyle={styles.imager}
        />

        <View style={styles.overlayr}>
          <Text style={styles.titler}>{item.title}</Text>
          <Text style={styles.specsr}>{item.specs}</Text>
          <Text style={styles.specsr}>{item.grade}</Text>
        </View>
      </View>
    </>
  );
  const CATEGORIES = ['New Arrivals', 'Mobile', 'Laptop', 'Macbook'];

  const PRODUCTS = [
    {
      id: '1',
      image:
        'https://i.postimg.cc/FR7g3304/Whats-App-Image-2025-07-11-at-5-45-27-PM-1.jpg',
      name: 'Samsung Galaxy S21',
      color: 'Black',
      price: '₹20,999',
      originalPrice: '₹24,999',
      grade: 'A1',
      refurbished: true,
    },
    {
      id: '2',
      image:
        'https://i.postimg.cc/FR7g3304/Whats-App-Image-2025-07-11-at-5-45-27-PM-1.jpg',
      name: 'Apple iPhone 13',
      color: 'Midnight',
      price: '₹69,900',
      originalPrice: '₹79,900',
      grade: 'A1',
      refurbished: true,
    },
    {
      id: '3',
      image:
        'https://i.postimg.cc/FR7g3304/Whats-App-Image-2025-07-11-at-5-45-27-PM-1.jpg',
      name: 'OnePlus 9',
      color: 'Winter Mist',
      price: '₹44,999',
      originalPrice: '₹49,999',
      grade: 'A1',
      refurbished: true,
    },
    {
      id: '4',
      image:
        'https://i.postimg.cc/FR7g3304/Whats-App-Image-2025-07-11-at-5-45-27-PM-1.jpg',
      name: 'OnePlus 9',
      color: 'Winter Mist',
      price: '₹44,999',
      originalPrice: '₹49,999',
      grade: 'A1',
      refurbished: true,
    },
  ];

  const [activeTab, setActiveTab] = useState('Mobile');

  // Tabs
  const renderTabs = () => (
    <View style={styles.tabContainer}>
      {CATEGORIES.map(category => (
        <TouchableOpacity key={category} onPress={() => setActiveTab(category)}>
          <Text
            style={[
              styles.tabText,
              activeTab === category && styles.activeTabText,
            ]}>
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const ProductCard = ({item}) => (
    <View style={styles.cardD}>
      <View style={styles.imageContainerD}>
        <Image source={{uri: item.image}} style={styles.imageD} />
        {item.refurbished && (
          <Text style={styles.refurbishedLabelD}>(Refurbished)</Text>
        )}
        <TouchableOpacity style={styles.heartIconD}>
          <Ionicons name="heart-outline" size={20} color="#333" />
        </TouchableOpacity>
      </View>
      <View style={styles.gradeBoxD}>
        <Text style={styles.gradeTextD}>Grade {item.grade}</Text>
      </View>
      <Text style={styles.productNameD}>{item.name}</Text>
      <Text style={styles.colorTextD}>● {item.color}</Text>
      <View style={styles.priceRowD}>
        <Text style={styles.priceD}>{item.price}</Text>
        <Text style={styles.originalPriceD}>{item.originalPrice}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Scrollable content starts here */}
      <ScrollView>
        <View style={{margin: 10}}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}>
              <Ionicons name="chevron-back" size={22} color="#000" />
            </TouchableOpacity>
            <View>
              <Text style={styles.headerTitle}>Recently Viewed</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <Ionicons name="search" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          {/* <Text style={{fontWeight: '600', fontSize: 18, marginVertical: 10}}>
            You Might Like
          </Text>

          <FlatList
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({item}) => <RecentlyAdds item={item} />}
            contentContainerStyle={{paddingHorizontal: 16, paddingVertical: 8}}
          /> */}
          <>
            <Text style={{fontWeight: '600', fontSize: 18, marginVertical: 10}}>
              Recently Viewed Products
            </Text>
            <FlatList
              data={PRODUCTS}
              renderItem={({item}) => <ProductCard item={item} />}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
              numColumns={2}
              columnWrapperStyle={styles.row}
            />
          </>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
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
  cardContainer: {
    width: (width - 36) / 2, // 2 cards per row with spacing
    marginBottom: 6,
    marginTop: 10,
  },

  cardImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
  },

  cardLabel: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },

  micIcon: {marginLeft: 'auto'},
  imagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#aaa',
  },
  imageIcon: {fontSize: 20},
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginTop: 10,
  },
  tabText: {fontWeight: '600', color: 'gray', fontSize: 16},
  activeTabText: {color: 'black', borderBottomWidth: 2, borderColor: 'black'},
  productList: {padding: 10},
  productCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 5,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  productName: {fontWeight: 'bold', fontSize: 14},
  productPrice: {fontSize: 14, color: 'gray'},
  timerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  timeContainer: {
    alignItems: 'center',
  },
  timeBox: {
    backgroundColor: '#E8F5E8',
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 12,
    marginBottom: 5,
  },
  timeValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  timeLabel: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },

  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 12,
    marginVertical: 20,
  },
  sortButton: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  filterButton: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sortText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  card_Flash: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    margin: 10,
  },
  leftSection: {
    flex: 1,
    paddingRight: 12,
  },
  discountText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  name_Flash: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  refurbished: {
    fontSize: 13,
    color: '#555',
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
  },
  originalPrice: {
    fontSize: 13,
    color: '#777',
    textDecorationLine: 'line-through',
  },
  grade: {
    fontSize: 13,
    color: '#444',
    marginTop: 2,
  },
  rightSection: {
    width: 100,
    height: 100,
    position: 'relative',
  },
  image_Flash: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  heartIcon: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 20,
    elevation: 2,
  },
  listContainerD: {
    padding: 10,
  },
  cardD: {
    width: 180,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 10,
  },
  cardM: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 0,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainerD: {
    position: 'relative',
    backgroundColor: '#f4f4f4',
  },
  imageD: {
    width: '100%',
    height: 250,
    resizeMode: 'stretch',
  },
  imageM: {
    width: '90%',
    height: 200,
    resizeMode: 'stretch',
  },
  refurbishedLabelD: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 12,
    color: '#000',
    backgroundColor: '#EAE6E5',
    width: '98%',
    textAlign: 'center',
    padding: 5,
  },
  heartIconD: {
    position: 'absolute',
    top: 25,
    right: 6,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    elevation: 2,
  },
  badge: {
    position: 'absolute',
    left: -8,
    top: 10,
    backgroundColor: '#FF3C3C',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeTextD: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  gradeBoxD: {
    paddingVertical: 2,
    position: 'absolute',
    marginTop: 225,
    alignSelf: 'center',
    backgroundColor: '#fff',
    width: '92%',
    borderRadius: 10,
    borderWidth: 0.2,
  },
  gradeTextD: {
    fontSize: 12,
    fontWeight: '500',
    color: '#555',
    textAlign: 'center',
  },
  productNameD: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 6,
    marginHorizontal: 10,
    color: '#000',
  },
  colorTextD: {
    fontSize: 13,
    color: '#000',
    marginHorizontal: 10,
    marginTop: 2,
  },
  priceRowD: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 4,
    marginBottom: 10,
  },
  priceD: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 6,
  },
  originalPriceD: {
    fontSize: 13,
    color: '#888',
    textDecorationLine: 'line-through',
  },

  cardr: {
    width: width * 0.4,
    height: 180,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  imager: {
    borderRadius: 16,
  },
  overlayr: {
    // position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,
    // backgroundColor: 'rgba(0,0,0,0.4)',
  },
  titler: {
    color: '#000',
    fontSize: 15,
    fontWeight: '600',
  },
  specsr: {
    color: '#000',
    fontSize: 12,
    marginTop: 2,
  },
});

export default RecentlyView;
