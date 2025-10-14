import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {useRoute} from '@react-navigation/native';
import {API_BASE_URL} from '../../../utils/utils';

const budgetOptions = [
  {id: 1, label: 'Under ₹10,000'},
  {id: 2, label: '₹10,000 - ₹20,000'},
  {id: 3, label: '₹20,000 - ₹30,000'},
  {id: 4, label: 'Above ₹30,000'},
];

const ShopByBudget = ({navigation}) => {
  const [productData, setProductData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selected, setSelected] = useState('Under ₹10,000');

  const route = useRoute();
  const {budget, osname, arrayosname, priceId} = route.params || {};

  console.log('priceId---------->', osname);
  console.log('arrayosname---------->', arrayosname);
  console.log('priceId---------->', priceId);

  useEffect(() => {
    if (priceId) {
      const selectedBudget = budgetOptions.find(item => item.id === priceId);
      if (selectedBudget) {
        setSelected(selectedBudget.label);
      }
    }
  }, [priceId]);

  // fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/product/list`);
      setProductData(res?.data?.data || []);
    } catch (error) {
      Toast.show({
        type: 'error',
        text2: error?.response?.data?.message || 'Something went wrong',
      });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const products = useMemo(() => {
    if (!productData || productData.length === 0) return [];

    if (arrayosname && Array.isArray(arrayosname) && arrayosname.length > 0) {
      return productData.filter(item =>
        arrayosname.some(
          os =>
            item.operating_systems &&
            String(item.operating_systems).toLowerCase() ===
              String(os).toLowerCase(),
        ),
      );
    }
    if (osname) {
      return productData.filter(
        item =>
          item.operating_systems &&
          String(item.operating_systems).toLowerCase() ===
            String(osname).toLowerCase(),
      );
    }

    return productData;
  }, [productData, osname, arrayosname]);

  // set default selected budget from route param
  useEffect(() => {
    if (budget) {
      setSelected(budget);
    }
  }, [budget]);

  // filter by price range safely
  useEffect(() => {
    if (!products || products.length === 0) {
      setFilteredProducts([]);
      return;
    }

    let filtered = [];
    if (selected === 'Under ₹10,000') {
      filtered = products.filter(item => parseFloat(item.price) < 10000);
    } else if (selected === '₹10,000 - ₹20,000') {
      filtered = products.filter(
        item =>
          parseFloat(item.price) >= 10000 && parseFloat(item.price) <= 20000,
      );
    } else if (selected === '₹20,000 - ₹30,000') {
      filtered = products.filter(
        item =>
          parseFloat(item.price) > 20000 && parseFloat(item.price) <= 30000,
      );
    } else if (selected === 'Above ₹30,000') {
      filtered = products.filter(item => parseFloat(item.price) > 30000);
    }

    setFilteredProducts(filtered);
  }, [selected, products]);

  const ProductCardFilter = ({item}) => (
    <View style={styles.cardD}>
      <View style={styles.imageContainerD}>
        <Image source={{uri: item.feature_image}} style={styles.imageD} />
        <Text style={styles.refurbishedLabelD}>(Refurbished)</Text>
        <TouchableOpacity style={styles.heartIconD}>
          <Ionicons name="heart-outline" size={20} color="#333" />
        </TouchableOpacity>
      </View>
      <View style={styles.gradeBoxD}>
        <Text style={styles.gradeTextD}>Grade {item.grade_number}</Text>
      </View>
      <Text style={styles.productNameD}>{item.model_name}</Text>
      <Text style={styles.colorTextD}>● {item.color_name}</Text>
      <View style={styles.priceRowD}>
        <Text style={styles.priceD}>₹ {item.price}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Ionicons name="chevron-back" size={22} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Shop by Budget</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Ionicons name="search" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <Text style={{fontWeight: 'bold', marginBottom: 10, marginLeft: 15}}>
          {osname}
        </Text>

        {/* Price Range Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.container_shop}>
          {budgetOptions.map((range, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.pill_shop,
                selected === range.label
                  ? styles.pillSelected_shop
                  : styles.pillUnselected_shop,
              ]}
              onPress={() => setSelected(range.label)}>
              <Text
                style={[
                  styles.pillText_shop,
                  selected === range.label
                    ? styles.textSelected_shop
                    : styles.textUnselected_shop,
                ]}>
                {range.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Product List */}
        {filteredProducts.length > 0 ? (
          <FlatList
            data={filteredProducts}
            renderItem={({item}) => <ProductCardFilter item={item} />}
            keyExtractor={item => item.id?.toString()}
            numColumns={2}
            contentContainerStyle={{paddingBottom: 80}}
          />
        ) : (
          <View style={{alignItems: 'center', marginTop: 60}}>
            <Ionicons name="alert-circle-outline" size={50} color="#777" />
            <Text style={{fontSize: 16, color: '#777', marginTop: 10}}>
              No products available in this range.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: '#fff', flex: 1},
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
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
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
  cardD: {
    width: 190,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowRadius: 4,
    marginHorizontal: 5,
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
  heartIconD: {
    position: 'absolute',
    top: 25,
    right: 6,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    elevation: 2,
  },
  container_shop: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  pill_shop: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
  },
  pillSelected_shop: {
    backgroundColor: '#4B4B4B',
  },
  pillUnselected_shop: {
    backgroundColor: '#EFECEC',
  },
  pillText_shop: {
    fontSize: 14,
    fontWeight: '600',
  },
  textSelected_shop: {
    color: 'white',
  },
  textUnselected_shop: {
    color: '#222',
  },
});

export default ShopByBudget;
