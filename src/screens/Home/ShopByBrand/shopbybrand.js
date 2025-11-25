import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchBrandList} from '../../../redux/slices/productSlice';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ShopByBrand = ({osName}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {brandList, nextPageUrl, loading} = useSelector(state => state.product);
  const [filteredBrands, setFilteredBrands] = useState([]);

  useEffect(() => {
    setFilteredBrands([]);
    dispatch(fetchBrandList());
  }, [osName, dispatch]);

  useEffect(() => {
    if (!brandList) return;

    const filtered = brandList
      .filter(item => item.operatingsystem?.some(os => os.os_name === osName))
      .filter(
        (brand, index, self) =>
          index === self.findIndex(b => b.id === brand.id),
      );

    setFilteredBrands(filtered);
  }, [brandList, osName]);

  const loadMoreBrands = () => {
    if (nextPageUrl && !loading) {
      dispatch(fetchBrandList(nextPageUrl));
    }
  };

  const renderBrandItem = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('shopbybrandfilter', {brandname: item?.brand_name})
      }
      style={{
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden',
        elevation: 2,
      }}>
      <View style={{alignItems: 'center', padding: 10}}>
        {item.brand_image_url ? (
          <Image
            source={{uri: item.brand_image_url}}
            style={{width: '100%', height: 150, borderRadius: 8}}
            resizeMode="contain"
          />
        ) : (
          <View
            style={{
              width: '100%',
              height: 150,
              backgroundColor: '#eee',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
            }}>
            <Text>No Image</Text>
          </View>
        )}
        <Text style={{marginTop: 8, fontSize: 16, fontWeight: '600'}}>
          {item.brand_name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={filteredBrands}
      keyExtractor={item => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={{
        justifyContent: 'space-between',
        marginHorizontal: 10,
      }}
      renderItem={renderBrandItem}
      onEndReached={loadMoreBrands}
      onEndReachedThreshold={0.3}
      ListEmptyComponent={
        !loading && (
          <View
            style={{
              flex: 1,
              height: 320,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 20,
            }}>
            <Ionicons name="pricetag-outline" size={60} color="#999" />
            <Text
              style={{
                marginTop: 14,
                fontSize: 20,
                fontWeight: '700',
                color: '#333',
              }}>
              No Brands Available
            </Text>
            <Text
              style={{
                marginTop: 6,
                fontSize: 14,
                color: '#777',
                textAlign: 'center',
              }}>
              Try changing OS selection or check back later.
            </Text>
          </View>
        )
      }
      ListFooterComponent={
        loading && (
          <View style={{padding: 16}}>
            <ActivityIndicator size="small" color="#000" />
          </View>
        )
      }
    />
  );
};

export default ShopByBrand;

