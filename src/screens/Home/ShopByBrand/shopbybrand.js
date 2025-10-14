import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import axios from 'axios';
import _ from 'lodash';
import { API_BASE_URL } from '../../../utils/utils';

const {width} = Dimensions.get('window');
const LIMIT = 6;

const ShopByBrand = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('Android');
  const [brands, setBrands] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const cancelSource = useRef(null);

  // ✅ Fetch brands
  const fetchBrands = useCallback(
    async (pageNo = 1, query = search) => {
      if (loading || !hasMore) return;
      setLoading(true);

      if (cancelSource.current) {
        cancelSource.current.cancel('Cancelled due to new request');
      }
      cancelSource.current = axios.CancelToken.source();

      try {
        const skip = (pageNo - 1) * LIMIT;
        const response = await axios.get(
          `${API_BASE_URL}/brand?skip=${skip}&limit=${LIMIT}&search=${query}`,
          {
            headers: {Accept: 'application/json'},
            cancelToken: cancelSource.current.token,
          },
        );

        const result = response.data;

        if (result?.status) {
          setBrands(prev =>
            pageNo === 1 ? result.data : [...prev, ...result.data],
          );
          setHasMore(pageNo < result.total_pages);
        } else {
          console.error('❌ API Error:', result?.message);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request cancelled:', error.message);
        } else if (error.response?.status === 429) {
          console.warn('Rate limit hit, retrying in 3s...');
          setTimeout(() => fetchBrands(pageNo, query), 3000);
        } else {
          console.error('❌ Error fetching brands:', error.message);
        }
      } finally {
        setLoading(false);
      }
    },
    [loading, hasMore, search],
  );

  // ✅ Debounced search
  const debouncedSearch = useCallback(
    _.debounce(value => {
      setPage(1);
      fetchBrands(1, value);
    }, 600),
    [],
  );

  useEffect(() => {
    debouncedSearch(search);
  }, [search]);

  useEffect(() => {
    fetchBrands(1, search);
  }, [activeTab]);

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchBrands(nextPage, search);
    }
  };

  // ✅ Map tab → API os_name
  const osMap = {
    Android: 'Android',
    iOS: 'iOS',
    Windows: 'windows',
    Macbook: 'macOS',
  };

  const filteredBrands = brands.filter(item => {
    const matchesTab = item.operatingsystem?.some(
      os => os.os_name?.toLowerCase() === osMap[activeTab]?.toLowerCase(),
    );
    const matchesSearch = item.brand_name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    return matchesTab && matchesSearch;
  });

  console.log("filteredBrands----------------------------->", filteredBrands);

  const renderProduct = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('shopbybrandfilter', {brandname: item.brand_name})}>
      <View style={styles.imageWrapper}>
        <Image
          source={
            item.brand_image_url
              ? {uri: item.brand_image_url}
              : require('../../../../assets/images/empty.jpeg')
          }
          style={styles.cardImage}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.cardLabel}>{item.brand_name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Ionicons name="chevron-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shop by Brands</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {['Android', 'iOS', 'Windows', 'Macbook'].map(category => (
          <TouchableOpacity
            key={category}
            onPress={() => setActiveTab(category)}>
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

      {/* Search */}
      <View style={styles.containersearch}>
        <TextInput
          style={styles.inputsearch}
          placeholder="Search Brands..."
          placeholderTextColor="#777"
          value={search}
          onChangeText={text => setSearch(text)}
        />
        <EvilIcons
          name="search"
          size={22}
          color="#00AEEF"
          style={styles.iconsearch}
        />
      </View>

      {/* List */}
      <FlatList
        data={filteredBrands}
        renderItem={renderProduct}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{paddingBottom: 20}}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading && <ActivityIndicator size="small" color="#00AEEF" />
        }
      />
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
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
  imageWrapper: {
    width: (width - 48) / 2,
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginHorizontal: 8,
    marginBottom: 12,
    marginTop: 10,
  },
  cardImage: {width: '70%', height: '70%'},
  cardLabel: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginTop: 10,
  },
  tabText: {fontWeight: '600', color: 'gray', fontSize: 16},
  activeTabText: {color: 'black', borderBottomWidth: 2, borderColor: 'black'},
  containersearch: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 2,
    margin: 10,
  },
  inputsearch: {flex: 1, fontSize: 14, color: '#333'},
  iconsearch: {marginLeft: 8},
  row: {justifyContent: 'space-between'},
});

export default ShopByBrand;
