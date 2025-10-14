import React, {useEffect, useState} from 'react';
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
  Modal,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/Feather';
import RangeSlider from 'rn-range-slider';
import {useDispatch, useSelector} from 'react-redux';
import {toggleWishlist} from '../../../redux/slices/wishlistSlice';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { API_BASE_URL } from '../../../utils/utils';

const {width} = Dimensions.get('window');

const shopbybrandfilter = ({navigation, route, visible, onClose, item}) => {
  const {brandname} = route?.params;
  const [brandsdata, setBrandsData] = useState(true);

  useEffect(() => {
    fetchBrandsDetails();
  }, []);

  const fetchBrandsDetails = async zip => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/productlistbrand/${brandname}`,
      );
      setBrandsData(res?.data?.data);
    } catch (error) {
      Toast.show({
        type: 'error',
        text2: JSON.stringify(error?.response?.data?.message),
      });
    }
  };

  const CATEGORIES = ['Smartphones', 'Laptop'];

  const [activeTab, setActiveTab] = useState('Smartphones');

  // ✅ Filtered data based on active tab
  const getFilteredProducts = () => {
    if (!brandsdata || !Array.isArray(brandsdata)) return [];

    if (activeTab === 'Smartphones') {
      return brandsdata.filter(item => item.category === 'Mobile');
    } else if (activeTab === 'Laptop') {
      return brandsdata.filter(item => item.category === 'Laptop');
    }
    return brandsdata;
  };

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

  const ProductCard = ({item}) => {
    const dispatch = useDispatch();
    const wishlist = useSelector(state => state.wishlist);
    // const isInWishlist = wishlist.some(w => w.id === item.id);

    if (!item) return null; // ✅ safety check

    return (
      <View style={styles.cardD}>
        <View style={styles.imageContainerD}>
          <Image source={{uri: item.feature_image}} style={styles.imageD} />
          {item && <Text style={styles.refurbishedLabelD}>(Refurbished)</Text>}
          <TouchableOpacity
            style={styles.heartIconD}
            onPress={() => dispatch(toggleWishlist(item))}>
            <Ionicons name={'heart'} size={20} color={'#333'} />
          </TouchableOpacity>
        </View>
        <View style={styles.gradeBoxD}>
          <Text style={styles.gradeTextD}>Grade {item.grade_number}</Text>
        </View>
        <Text style={styles.productNameD}>{item.model_name}</Text>
        <Text style={styles.colorTextD}>● {item.color_name}</Text>
        <View style={styles.priceRowD}>
          <Text style={styles.priceD}>{item.price}</Text>
          {/* <Text style={styles.originalPriceD}>{item.originalPrice}</Text> */}
        </View>{' '}
      </View>
    );
  };

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
              <Text style={styles.headerTitle}>{brandname}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <Ionicons name="search" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {renderTabs()}
          {activeTab === 'Smartphones' && (
            <>
              <FlatList
                data={getFilteredProducts()} // ✅ now filtered
                keyExtractor={item => item.id}
                renderItem={({item}) => <ProductCard item={item} />}
                showsHorizontalScrollIndicator={false}
                numColumns={2}
                columnWrapperStyle={styles.row}
              />
            </>
          )}
          {activeTab === 'Laptop' && (
            <>
              <FlatList
                data={getFilteredProducts()} // ✅ now filtered
                keyExtractor={item => item.id}
                renderItem={({item}) => <ProductCard item={item} />}
                showsHorizontalScrollIndicator={false}
                numColumns={2}
                columnWrapperStyle={styles.row}
              />
            </>
          )}
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
    marginVertical: 5,
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
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,
    // backgroundColor: 'rgba(0,0,0,0.4)',
  },
  titler: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  specsr: {
    color: '#ddd',
    fontSize: 12,
    marginTop: 2,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#000',
    paddingBottom: 10,
    borderWidth: 1,
    padding: 10,
    alignSelf: 'center',
    width: 300,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  optionList: {
    marginVertical: 20,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  optionText: {
    fontSize: 15,
    color: '#000',
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    borderColor: '#000',
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#000',
  },
  applyWrapper: {
    bottom: 30,
    alignItems: 'flex-end',
    marginRight: 50,
  },
  applyButton: {
    backgroundColor: '#333',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  applyText: {
    color: '#fff',
    fontWeight: '500',
  },

  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header_panel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#eee',
    marginBottom: 10,
    width: '90%',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  body: {
    flex: 1,
    flexDirection: 'row',
  },
  leftPane: {
    width: 110,
    borderRightWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  tabItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 6,
  },
  tabItemSelected: {
    backgroundColor: '#F0F0F0',
  },
  tabLabel: {
    fontSize: 14,
    color: '#000',
  },
  rightPane: {
    flex: 1,
    padding: 16,
  },
  rightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginLeft: 10,
  },
  rightHeader_cat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  rightTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  selectedCount: {
    fontSize: 14,
    color: '#333',
  },
  brandItem: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  brandItemSelected: {
    backgroundColor: '#222',
  },
  brandText: {
    fontSize: 15,
    color: '#000',
  },
  itemCount: {
    fontSize: 14,
    color: '#888',
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  resetBtn: {
    borderWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  resetText: {
    color: '#000',
    fontWeight: '500',
  },
  applyBtn: {
    backgroundColor: '#000',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  applyText: {
    color: '#fff',
    fontWeight: '500',
  },
  title_cat: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  grid_cat: {
    justifyContent: 'center',
  },
  gridRow_cat: {
    // justifyContent: 'space-between',
    justifyContent: 'space-evenly',
    marginBottom: 16,
  },
  card_cat: {
    width: '38%',
    aspectRatio: 1,
    backgroundColor: '#eee',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardSelected_cat: {
    backgroundColor: '#333',
  },
  label_cat: {
    marginTop: 8,
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  priceLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  price: {
    fontSize: 14,
    color: '#333',
  },
  selectedRange: {
    marginTop: 14,
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  rail: {
    flex: 1,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
  },
  railSelected: {
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#333',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
    elevation: 2,
  },
  label: {
    alignItems: 'center',
    padding: 6,
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  labelText: {
    fontSize: 12,
    color: '#333',
  },

  headerRow_C: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  title_c: {
    fontSize: 16,
    fontWeight: '600',
  },
  selectedCount_c: {
    fontSize: 14,
    color: '#000',
    marginLeft: 150,
    fontWeight: 'bold',
  },
  row_c: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  colorItem_c: {
    alignItems: 'center',
    width: '18%',
    marginHorizontal: 5,
    marginBottom: 15,
  },
  colorCircleWrapper_c: {
    padding: 0,
    borderRadius: 16,
  },
  selectedWrapper_c: {
    backgroundColor: '#F2F2F2',
    borderRadius: 16,
    marginBottom: 15,
    marginHorizontal: 5,
    alignItems: 'center',
    width: '18%',
  },
  colorCircle_c: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorCircleSelected_c: {
    borderColor: '#000',
    borderWidth: 3,
  },
  colorLabel_c: {
    marginTop: 6,
    fontSize: 10,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  gradeButton: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
    paddingVertical: 12,
    marginBottom: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '90%',
  },
  gradeButtonSelected: {
    backgroundColor: '#222',
  },
  gradeText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  gradeTextSelected: {
    color: '#fff',
  },
  discountButton: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
    paddingVertical: 12,
    marginBottom: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '90%',
  },
  discountButtonSelected: {
    backgroundColor: '#222',
  },
  discountTexts: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  discountTextSelected: {
    color: '#fff',
  },
  subHeading: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  optionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 10,
    marginRight: 10,
  },
  selectedButton: {
    backgroundColor: '#333',
  },
  optionText: {
    color: '#000',
    fontWeight: '600',
  },
  selectedText: {
    color: '#fff',
  },

  cardBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 3},
    elevation: 1,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  textContainerBrand: {
    flex: 1,
    marginRight: 15,
  },
  brandNameBrand: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  descriptionBrand: {
    fontSize: 14,
    color: '#6b7280', // Tailwind gray-500 equivalent
    marginTop: 5,
  },
  logoBrand: {
    width: 90,
    height: 70,
    borderRadius: 10,
  },

  containersearch: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  inputsearch: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  iconsearch: {
    marginLeft: 8,
  },
});

export default shopbybrandfilter;
