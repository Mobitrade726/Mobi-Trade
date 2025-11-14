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
import { useNavigation } from '@react-navigation/native';

const ShopByBrand = ({osName}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation(); // ✅ get navigation safely

  const {brandList, nextPageUrl, loading} = useSelector(state => state.product);
  const [filteredBrands, setFilteredBrands] = useState([]);

  // Reset filteredBrands when osName changes
  useEffect(() => {
    setFilteredBrands([]);
    dispatch(fetchBrandList()); // Fetch first page
  }, [osName, dispatch]);

  // Filter brands whenever brandList or osName changes
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

  // Load more brands for pagination
  const loadMoreBrands = () => {
    if (nextPageUrl && !loading) {
      dispatch(fetchBrandList(nextPageUrl));
    }
  };

  console.log('filteredBrands---------------------->', filteredBrands);

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
      }}>
      <View style={{alignItems: 'center', padding: 10}}>
        {item.brand_image_url ? (
          <Image
            source={{uri: item.brand_image_url}}
            style={{width: '100%', height: 150, borderRadius: 8}}
          />
        ) : (
          <View
            style={{
              width: '100%',
              height: 150,
              backgroundColor: '#ddd',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
            }}>
            <Text>No Image</Text>
          </View>
        )}
        <Text style={{marginTop: 8, fontSize: 16, fontWeight: '500'}}>
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
