import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';

const Search = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchIcon, setSearchIcon] = useState({
    icon: 'mobile',
    library: 'Fontisto',
  });

  const categories = [
    {name: 'Smartphones', icon: 'mobile', library: 'Fontisto'},
    {name: 'Windows pc', icon: 'laptop-outline', library: 'Ionicons'},
    {name: 'Macbook', icon: 'laptop-outline', library: 'Ionicons'},
    {name: 'Accessories', icon: 'watch-outline', library: 'Ionicons'},
  ];

  const flashsale = [
    {
      id: '1',
      image:
        'https://i.postimg.cc/tJ86hcpd/Whats-App-Image-2025-07-11-at-5-45-27-PM.jpg',
      name: 'Samsung Galaxy S21',
      color: 'Black',
      price: '₹20,999',
      originalPrice: '₹24,999',
      grade: 'A1',
      refurbished: true,
      category: 'Smartphones',
    },
    {
      id: '2',
      image:
        'https://i.postimg.cc/T3pKjD0d/A-sleek-modern-chair-with-a-minimalist-design-placed-in-a-well-lit-room-with-elegant-decor.png',
      name: 'Mac chip A',
      color: 'Midnight',
      price: '₹69,900',
      originalPrice: '₹79,900',
      grade: 'A1',
      refurbished: true,
      category: 'Macbook',
    },
    {
      id: '3',
      image:
        'https://i.postimg.cc/K87GHyG9/xps-13-laptop-500x500-500x500-500x500.webp',
      name: 'Dell pentium',
      color: 'Winter Mist',
      price: '₹44,999',
      originalPrice: '₹49,999',
      grade: 'A1',
      refurbished: true,
      category: 'Windows pc',
    },
    {
      id: '4',
      image:
        'https://i.postimg.cc/x1R3vJ2C/Whats-App-Image-2025-07-11-at-3-38-17-PM-2.jpg',
      name: 'Smart watch',
      color: 'Winter Mist',
      price: '₹44,999',
      originalPrice: '₹49,999',
      grade: 'A1',
      refurbished: true,
      category: 'Accessories',
    },
  ];

  const [filteredData, setFilteredData] = useState(flashsale);

  const ProductMobile = ({item}) => (
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

  const renderIcon = (iconData, size = 22, color = '#333') => {
    if (iconData.library === 'Fontisto') {
      return <Fontisto name={iconData.icon} size={size} color={color} />;
    }
    return <Ionicons name={iconData.icon} size={size} color={color} />;
  };

  const [recentSearches, setRecentSearches] = useState(['Macbook', 'Samsung']);

  const removeItem = itemToRemove => {
    setRecentSearches(recentSearches.filter(item => item !== itemToRemove));
  };

  const clearAll = () => {
    setRecentSearches([]);
  };

  const [filters, setFilters] = useState(['Apple', '₹ 4,499- ₹ 54,499']);
  const [resultsCount, setResultsCount] = useState(152);

  const removeFilter = filter => {
    setFilters(filters.filter(item => item !== filter));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{margin: 10}}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Ionicons name="chevron-back" size={22} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Search</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Search Box */}
          <View style={styles.searchBox}>
            {/* Left mobile/search icon */}
            {renderIcon(searchIcon, 24)}

            {/* Arrow icon next to mobile icon */}
            <TouchableOpacity
              onPress={() => setShowDropdown(prev => !prev)} // toggle dropdown state
              style={{marginLeft: 5}} // small spacing
            >
              <Ionicons
                name={
                  showDropdown ? 'chevron-up-outline' : 'chevron-down-outline'
                }
                size={20}
                color="#000"
              />
            </TouchableOpacity>

            {/* Text input */}
            <TextInput
              style={styles.input}
              placeholder="Search devices..."
              placeholderTextColor="#888"
              value={searchText}
              onChangeText={text => {
                setSearchText(text);
                setShowDropdown(true);

                const match = categories.find(c =>
                  c.name.toLowerCase().includes(text.toLowerCase()),
                );

                if (match) {
                  setSearchIcon({icon: match.icon, library: match.library});
                  const matchedProducts = flashsale.filter(product =>
                    product.category
                      .toLowerCase()
                      .includes(match.name.toLowerCase()),
                  );
                  setFilteredData(matchedProducts);
                } else {
                  setSearchIcon({icon: 'search', library: 'Ionicons'});
                  setFilteredData([]);
                }
              }}
            />

            {/* Mic Icon */}
            <TouchableOpacity>
              <Ionicons name="mic-outline" size={26} color="#11A5D7" />
            </TouchableOpacity>

            {/* Search Icon */}
            <TouchableOpacity>
              <Ionicons
                name="search"
                size={26}
                color="#11A5D7"
                style={{marginLeft: 10}}
              />
            </TouchableOpacity>
          </View>

          {/* Dropdown */}
          {showDropdown && (
            <View style={styles.dropdown}>
              {categories
                .filter(item =>
                  item.name.toLowerCase().includes(searchText.toLowerCase()),
                )
                .map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setSearchText(item.name);
                      setSearchIcon({icon: item.icon, library: item.library});
                      setShowDropdown(false);
                      const matchedProducts = flashsale.filter(product =>
                        product.category
                          .toLowerCase()
                          .includes(item.name.toLowerCase()),
                      );
                      setFilteredData(matchedProducts);
                    }}
                    style={styles.dropdownItem}>
                    {renderIcon(item)}
                    <Text style={{fontSize: 16, color: '#333'}}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>
          )}

          {filteredData?.length > 0 ? (
            <>
              <View style={styles.srow}>
                <View>
                  <Text style={styles.slabel}>Found</Text>
                  <Text style={styles.scount}>{resultsCount} Results</Text>
                </View>
                <TouchableOpacity style={styles.sfilterButton}>
                  <Ionicons name="options-outline" size={16} color="#333" />
                  <Text style={styles.sfilterText}>Filter</Text>
                </TouchableOpacity>
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.stagsRow}>
                  {filters.map((item, index) => (
                    <View key={index} style={styles.sfilterTag}>
                      <Text style={styles.stagText}>{item}</Text>
                      <TouchableOpacity onPress={() => removeFilter(item)}>
                        <Ionicons name="close" size={16} color="#444" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </>
          ) : (
            <>
              <View style={styles.headerRow}>
                <Text style={styles.title_recent}>Recent Searches</Text>
                <TouchableOpacity onPress={clearAll}>
                  <Ionicons name="trash-outline" size={20} color="#444" />
                </TouchableOpacity>
              </View>

              <View style={styles.tagsContainer}>
                {recentSearches.map((item, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{item}</Text>
                    <TouchableOpacity onPress={() => removeItem(item)}>
                      <Ionicons name="close" size={16} color="#555" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </>
          )}

          {/* Products */}
          <FlatList
            data={filteredData}
            renderItem={({item}) => <ProductMobile item={item} />}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            contentContainerStyle={styles.listContainerD}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    position: 'relative',
  },
  backButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
    position: 'absolute',
    left: 0,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  title_recent: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'green',
    borderRadius: 12,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 0,
    marginTop: 5,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: '#000',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: 'green',
    borderTopWidth: 0,
    // borderBottomLeftRadius: 12,
    // borderBottomRightRadius: 12,
    borderRadius:12,
    paddingVertical: 5,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 15,
    gap: 10,
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
    width: 180,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 10,
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
  listContainerD: {
    paddingBottom: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAE6E5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    marginRight: 8,
    color: '#333',
    fontSize: 14,
  },
  srow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop:15,
  },
  slabel: {
    color: '#333',
    fontSize: 14,
    fontWeight: '400',
  },
  scount: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  sfilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    gap: 6,
  },
  sfilterText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  stagsRow: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  sfilterTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAE6E5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  stagText: {
    color: '#333',
    marginRight: 8,
    fontSize: 14,
  },
});
