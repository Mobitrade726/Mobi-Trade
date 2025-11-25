import React, {useEffect, useRef, useState} from 'react';
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
  Modal,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchProductList,
  fetchFilterData,
} from '../../redux/slices/productSlice';
import {
  addToWishlistAPI,
  removeFromWishlistAPI,
} from '../../redux/slices/wishlistSlice';
import {fetchOsList} from '../../redux/slices/homeSlice';
import Icon from 'react-native-vector-icons/Feather';
import Header from '../../constants/Header';

const Search = ({navigation}) => {
  const dispatch = useDispatch();
  const {productData, filterdata, loading} = useSelector(
    state => state.product,
  );
  const {osList} = useSelector(state => state.home);
  const [searchText, setSearchText] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchIcon, setSearchIcon] = useState({
    icon: 'mobile',
    library: 'Fontisto',
  });
  const [filteredData, setFilteredData] = useState([]);
  const searchInputRef = useRef(null);
  const [applyselectedfilters, ApplyselectedFilters] = useState();
  const [filteredProduct, setFilteredProducts] = useState([]);
  const [showSortModal, setShowSortModal] = useState(false);
  const [showFilterModal, setFilterSortModal] = useState(false);
  const [selectedRam, setSelectedRam] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [selectedTab, setSelectedTab] = useState('brands');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState(null);

  useEffect(() => {
    dispatch(fetchProductList());
    dispatch(fetchFilterData());
    dispatch(fetchOsList());
  }, [dispatch]);

  useEffect(() => {
    if (productData && productData.length > 0) {
      setFilteredData(productData);
    }
  }, [productData]);

  const filterByCategory = value => {
    if (!value) {
      setFilteredData(productData);
      return;
    }

    const matchedProducts = productData.filter(product => {
      const categoryMatch = (product.category || '')
        .toLowerCase()
        .includes(value.toLowerCase());
      const osMatch = (product.operating_systems || '')
        .toLowerCase()
        .includes(value.toLowerCase());
      return categoryMatch || osMatch;
    });

    setFilteredData(matchedProducts);
  };

  // 🔹 Handle search input
  const handleSearch = text => {
    setSearchText(text);
    setShowDropdown(true);

    const matchCategory = osList.find(c =>
      c.os_name.toLowerCase().includes(text.toLowerCase()),
    );

    let matchedProducts = [];
    if (matchCategory) {
      setSearchIcon({icon: matchCategory.icon, library: matchCategory.library});
      matchedProducts = productData.filter(
        product =>
          (product.category || '').toLowerCase().trim() ===
          matchCategory.os_name.toLowerCase().trim(),
      );
    } else {
      setSearchIcon({icon: 'search', library: 'Ionicons'});
      matchedProducts = productData.filter(
        product =>
          (product.model_name &&
            product.model_name.toLowerCase().includes(text.toLowerCase())) ||
          (product.category || '').toLowerCase().includes(text.toLowerCase()),
      );
    }
    setFilteredData(matchedProducts);
  };

  // Apply filters
  useEffect(() => {
    if (!productData) return;

    // If no filters applied → show all products
    if (!applyselectedfilters) {
      setFilteredProducts(productData);
      return;
    }

    const filtered = productData.filter(item => {
      // Brand filter
      if (
        applyselectedfilters.brands &&
        applyselectedfilters.brands.length > 0 &&
        !applyselectedfilters.brands.includes(item.brand_name)
      )
        return false;

      // Color filter
      if (
        applyselectedfilters.colors &&
        applyselectedfilters.colors.length > 0 &&
        !applyselectedfilters.colors.includes(item.color_name)
      )
        return false;

      // Grade filter
      if (
        applyselectedfilters.grade &&
        item.grade_number !== applyselectedfilters.grade.grade
      )
        return false;

      // RAM filter
      if (
        applyselectedfilters.ram &&
        item.ram_id !== applyselectedfilters.ram.id
      )
        return false;

      // Storage filter
      if (
        applyselectedfilters.storage &&
        item.rom_id !== applyselectedfilters.storage.id
      )
        return false;

      return true;
    });

    setFilteredProducts(filtered);
  }, [applyselectedfilters, productData]);

  // Filter & Wishlist
  let BRANDS = filterdata?.brands;
  let grades = filterdata?.grades;
  let COLORS = filterdata?.colors;
  let ramOptions = filterdata?.rams;
  let storageOptions = filterdata?.roms;

  const FILTER_TABS = [
    {key: 'brands', label: 'Brands', icon: 'pricetags-outline'},
    {key: 'color', label: 'Color', icon: 'color-palette-outline'},
    {key: 'grade', label: 'Grade', icon: 'shield-checkmark-outline'},
    {key: 'specs', label: 'Specific', icon: 'document-text-outline'},
  ];

  const getTotalSelected = () => {
    return [selectedRam, selectedStorage].filter(Boolean).length;
  };

  const renderRamOption = (item, selectedItem, setSelectedItem) => (
    <TouchableOpacity
      key={item}
      style={[
        styles.optionButton,
        selectedItem === item && styles.selectedButton,
      ]}
      onPress={() => setSelectedItem(item)}>
      <Text
        style={[
          styles.optionText,
          selectedItem === item && styles.selectedText,
        ]}>
        {item?.ram_name}
      </Text>
    </TouchableOpacity>
  );
  const renderStorageOption = (item, selectedItem, setSelectedItem) => (
    <TouchableOpacity
      key={item}
      style={[
        styles.optionButton,
        selectedItem === item && styles.selectedButton,
      ]}
      onPress={() => setSelectedItem(item)}>
      <Text
        style={[
          styles.optionText,
          selectedItem === item && styles.selectedText,
        ]}>
        {item?.rom_name}
      </Text>
    </TouchableOpacity>
  );

  const handleApply = () => {
    setShowSortModal(false);
    setFilterSortModal(false);
    // Combine all selected filters into an object
    const selectedFilters = {
      brands: selectedBrands,
      colors: selectedColors,
      grade: selectedGrade,
      ram: selectedRam,
      storage: selectedStorage,
    };
    ApplyselectedFilters(selectedFilters);
  };
  const handleReset = () => {
    setSelectedBrands([]);
    setSelectedColors([]);
    setSelectedGrade(null);
    setSelectedRam(null);
    setSelectedStorage(null);
    ApplyselectedFilters(null);
  };

  // Apply filters
  useEffect(() => {
    if (!productData) return;

    // If no filters applied → show all products
    if (!applyselectedfilters) {
      setFilteredProducts(productData);
      return;
    }

    const filtered = productData.filter(item => {
      if (
        applyselectedfilters.brands?.length &&
        !applyselectedfilters.brands.includes(item.brand_name)
      )
        return false;

      if (
        applyselectedfilters.colors?.length &&
        !applyselectedfilters.colors.includes(item.color_name)
      )
        return false;

      if (
        applyselectedfilters.grade &&
        item.grade_number !== applyselectedfilters.grade.grade
      )
        return false;

      if (
        applyselectedfilters.ram &&
        item.ram_id !== applyselectedfilters.ram.id
      )
        return false;

      if (
        applyselectedfilters.storage &&
        item.rom_id !== applyselectedfilters.storage.id
      )
        return false;

      return true;
    });

    setFilteredProducts(filtered);
  }, [applyselectedfilters, productData]);

  const toggleBrand = brand => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand],
    );
  };
  const toggleColor = colorName => {
    setSelectedColors(prev =>
      prev.includes(colorName)
        ? prev.filter(c => c !== colorName)
        : [...prev, colorName],
    );
  };
  const renderItemColor = ({item}) => {
    const isSelected = selectedColors.includes(item.color_name);
    return (
      <TouchableOpacity
        onPress={() => toggleColor(item.color_name)}
        style={[styles.colorItem_c, isSelected && styles.selectedWrapper_c]}>
        <View style={styles.colorCircleWrapper_c}>
          <View
            style={[
              styles.colorCircle_c,
              {backgroundColor: item.hex},
              isSelected && styles.colorCircleSelected_c,
            ]}
          />
        </View>
        <Text
          style={[styles.colorLabel_c, {color: isSelected ? '#000' : '#555'}]}>
          {item.color_name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderRightPane = () => {
    switch (selectedTab) {
      case 'brands':
        return (
          <View style={styles.rightPane}>
            <View style={styles.rightHeader}>
              <Text style={styles.rightTitle}>Brands</Text>
              <Text style={styles.selectedCount}>
                {selectedBrands.length} selected
              </Text>
            </View>
            <FlatList
              key={`cat-brands`}
              data={BRANDS}
              keyExtractor={item => item.name}
              renderItem={({item}) => {
                const selected = selectedBrands.includes(item.brand_name);
                return (
                  <TouchableOpacity
                    onPress={() => toggleBrand(item.brand_name)}
                    style={[
                      styles.brandItem,
                      selected && styles.brandItemSelected,
                    ]}>
                    <Text
                      style={[styles.brandText, selected && {color: '#fff'}]}>
                      {item.brand_name}
                    </Text>
                    {/* <Text
                        style={[styles.itemCount, selected && {color: '#fff'}]}>
                        {item.count} Items
                      </Text> */}
                  </TouchableOpacity>
                );
              }}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        );

      case 'color':
        return (
          <View>
            <View style={styles.headerRow_C}>
              <Text style={styles.title_c}>Color</Text>
              <Text style={styles.selectedCount_c}>
                {selectedColors.length} selected
              </Text>
            </View>

            <FlatList
              key={`cat-color`}
              data={COLORS}
              keyExtractor={item => item.name}
              numColumns={4}
              columnWrapperStyle={styles.row}
              contentContainerStyle={{paddingTop: 10}}
              renderItem={renderItemColor}
            />
          </View>
        );

      case 'grade':
        return (
          <View style={styles.rightPane}>
            <View style={styles.header_panel}>
              <Text style={styles.title_c}>Grade</Text>
              <Text style={styles.title_c}>
                {selectedGrade ? '1 selected' : 'None selected'}
              </Text>
            </View>
            <FlatList
              key={`cat-grade`}
              data={grades}
              keyExtractor={item => item}
              renderItem={renderItemGrade}
              contentContainerStyle={styles.listContainer}
            />
          </View>
        );

      case 'specs':
        return (
          <View style={styles.rightPane}>
            <View style={styles.header_panel}>
              <Text style={styles.title_c}>Specification</Text>
              <Text style={styles.title_c}>{getTotalSelected()} selected</Text>
            </View>

            <Text style={styles.subHeading}>RAM</Text>
            <View style={styles.optionContainer}>
              {ramOptions.map(item =>
                renderRamOption(item, selectedRam, setSelectedRam),
              )}
            </View>

            <Text style={styles.subHeading}>Storage</Text>
            <View style={styles.optionContainer}>
              {storageOptions.map(item =>
                renderStorageOption(item, selectedStorage, setSelectedStorage),
              )}
            </View>
          </View>
        );

      default:
        return (
          <View style={styles.rightPane}>
            <Text>No filter selected</Text>
          </View>
        );
    }
  };

  const handleSelect = grade => {
    setSelectedGrade(grade === selectedGrade ? null : grade);
  };

  const renderItemGrade = ({item}) => {
    const isSelected = selectedGrade === item;
    return (
      <TouchableOpacity
        onPress={() => handleSelect(item)}
        style={[styles.gradeButton, isSelected && styles.gradeButtonSelected]}>
        <Text
          style={[styles.gradeText, isSelected && styles.gradeTextSelected]}>
          {item?.grade}
        </Text>
      </TouchableOpacity>
    );
  };

  // 🔹 Product Card Component
  const Products = ({item}) => {
    const wishlistItems = useSelector(state => state.wishlist.items);
    const isInWishlist = wishlistItems.some(
      w => w.barcode_id === item.barcode_id,
    );

    const handleWishlistToggle = () => {
      if (isInWishlist) dispatch(removeFromWishlistAPI(item));
      else dispatch(addToWishlistAPI(item));
    };

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProductList', {
            product_barcode_id: item.barcode_id,
          })
        }
        style={styles.cardD}>
        <View style={styles.imageContainerD}>
          <Image source={{uri: item.feature_image}} style={styles.imageD} />
          {item && <Text style={styles.refurbishedLabelD}>(Refurbished)</Text>}
          <TouchableOpacity
            style={styles.heartIconD}
            onPress={handleWishlistToggle}>
            <AntDesign
              name={isInWishlist ? 'heart' : 'hearto'}
              size={20}
              color={isInWishlist ? '#E74C3C' : '#999'}
            />
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
      </TouchableOpacity>
    );
  };

  // 🔹 Render icons dynamically
  const renderIcon = (iconData, size = 22, color = '#333') => {
    return iconData.library === 'Fontisto' ? (
      <Fontisto name={iconData.icon} size={size} color={color} />
    ) : (
      <Ionicons name={iconData.icon} size={size} color={color} />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Search"
        navigation={navigation}
        showBack={true}
        showSearch={false}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 🔍 Search Box */}
        <View style={{marginHorizontal: 10}}>
          <View
            style={[
              styles.searchBox,
              showDropdown && {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              },
            ]}>
            {renderIcon(searchIcon, 24)}
            <TouchableOpacity
              onPress={() => setShowDropdown(prev => !prev)}
              style={{marginLeft: 5}}>
              <Ionicons
                name={
                  showDropdown ? 'chevron-up-outline' : 'chevron-down-outline'
                }
                size={20}
                color="#000"
              />
            </TouchableOpacity>
            <TextInput
              ref={searchInputRef}
              style={styles.input}
              placeholder="Search devices..."
              placeholderTextColor="#888"
              value={searchText}
              onChangeText={handleSearch}
            />
            <TouchableOpacity>
              <Ionicons name="mic-outline" size={26} color="#11A5D7" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => searchInputRef.current?.focus()}>
              <Ionicons
                name="search"
                size={26}
                color="#11A5D7"
                style={{marginLeft: 10}}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* 🧭 Dropdown */}
        {showDropdown && (
          <View style={styles.dropdown}>
            {osList
              .filter(item =>
                item.os_name.toLowerCase().includes(searchText.toLowerCase()),
              )
              .map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setSearchText(item.os_name);
                    setSearchIcon({icon: item.icon, library: item.library});
                    setShowDropdown(false);
                    filterByCategory(item.os_name);
                  }}
                  style={styles.dropdownItem}>
                  {renderIcon(item)}
                  <Text style={{fontSize: 16, color: '#333'}}>
                    {item.os_name}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        )}

        {/* 🛍️ Product List */}

        <TouchableOpacity
          onPress={() => setFilterSortModal(true)}
          style={styles.filterButton}>
          <Icon name="sliders" size={16} color="#000" />
          <Text style={styles.sortText}>Filter</Text>
        </TouchableOpacity>

        {/* Filter Modal */}
        <Modal visible={showFilterModal} animationType="slide" transparent>
          <SafeAreaView style={styles.modalContainer}>
            {/* Header */}
            <View style={styles.header1}>
              <TouchableOpacity onPress={() => setFilterSortModal(false)}>
                <Ionicons name="close" size={24} />
              </TouchableOpacity>
              <Text style={styles.headerTitle1}>Filter</Text>
              <Ionicons name="options-outline" size={20} />
            </View>

            <View style={styles.body}>
              <View style={styles.leftPane}>
                {FILTER_TABS.map(tab => (
                  <TouchableOpacity
                    key={tab.key}
                    style={[
                      styles.tabItem,
                      selectedTab === tab.key && styles.tabItemSelected,
                    ]}
                    onPress={() => setSelectedTab(tab.key)}>
                    <Ionicons
                      name={tab.icon}
                      size={18}
                      color={selectedTab === tab.key ? '#000' : '#555'}
                    />
                    <Text
                      style={[
                        styles.tabLabel,
                        selectedTab === tab.key && {fontWeight: '600'},
                      ]}>
                      {tab.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Right Pane */}
              {renderRightPane()}
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
                <Text style={styles.resetText}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
                <Text style={styles.applyText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>
        {loading ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 50,
            }}>
            <ActivityIndicator size="large" color="#11A5D7" />
            <Text style={{marginTop: 10, color: '#555'}}>
              Loading products...
            </Text>
          </View>
        ) : (
          <FlatList
            data={
              applyselectedfilters
                ? filteredProduct // if filters applied
                : filteredData // else show search results
            }
            renderItem={({item}) => <Products item={item} />}
            keyExtractor={item => item.id?.toString()}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              marginHorizontal: 5,
            }}
            contentContainerStyle={styles.listContainerD}
            ListEmptyComponent={
              !loading && (
                <>
                  <Image
                    source={require('../../../assets/images/emptyproduct.png')} // Update path to your image
                  />
                  <Text
                    style={{textAlign: 'center', marginTop: 10, fontSize:18, fontWeight:"bold", color:"#000"}}>
                    Oops
                  </Text>
                  <Text
                    style={{textAlign: 'center', marginTop: 10, color: '#000', fontSize:18}}>
                    Can’t find what you’re looking for?
                  </Text>
                  <Text
                    style={{textAlign: 'center', marginTop: 10, color: '#777'}}>
                    Try adjusting your filters or browsing all products.
                  </Text>
                </>
              )
            }
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  // Search box
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'green',
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  input: {flex: 1, padding: 10, fontSize: 16, color: '#000'},
  dropdown: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: 'green',
    borderTopWidth: 0,
    paddingVertical: 5,
    width: '95%',
    alignSelf: 'center',
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 15,
    gap: 10,
  },

  // Product card
  cardD: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 0,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 10,
  },
  imageContainerD: {position: 'relative', backgroundColor: '#f4f4f4'},
  imageD: {width: '100%', height: 250, resizeMode: 'contain'},
  refurbishedLabelD: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 12,
    color: '#000',
    backgroundColor: '#EAE6E5',
    width: '100%',
    textAlign: 'center',
    padding: 5,
  },
  heartIconD: {
    position: 'absolute',
    top: 30,
    right: 6,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    elevation: 2,
  },
  gradeBoxD: {
    paddingVertical: 2,
    position: 'absolute',
    marginTop: 230,
    alignSelf: 'center',
    backgroundColor: '#fff',
    width: '100%',
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
  colorTextD: {fontSize: 13, color: '#000', marginHorizontal: 10, marginTop: 2},
  priceRowD: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 4,
    marginBottom: 10,
  },
  priceD: {fontSize: 14, fontWeight: 'bold', color: '#000', marginRight: 6},
  listContainerD: {paddingBottom: 20},

  // Tags
  tagsContainer: {flexDirection: 'row', flexWrap: 'wrap', gap: 8},
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
  tagText: {marginRight: 8, color: '#333', fontSize: 14},

  // Filter button
  filterButton: {
    borderWidth: 2,
    borderColor: '#bbb',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    width: '25%',
    marginTop: 10,
    alignSelf: 'flex-end',
    marginRight: 10,
  },

  // Modal
  modalContainer: {flex: 1, backgroundColor: '#fff'},
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
  modalTitle: {fontSize: 16, fontWeight: '500'},

  // Option rows
  optionList: {marginVertical: 20},
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  optionText: {fontSize: 15, color: '#000'},
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {borderColor: '#000'},
  radioInner: {height: 10, width: 10, borderRadius: 5, backgroundColor: '#000'},

  // Apply / Reset
  applyWrapper: {bottom: 30, alignItems: 'flex-end', marginRight: 50},
  applyButton: {
    backgroundColor: '#333',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  applyText: {color: '#fff', fontWeight: '500'},
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
  resetText: {color: '#000', fontWeight: '500'},
  applyBtn: {
    backgroundColor: '#000',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  applyTextFooter: {color: '#fff', fontWeight: '500'},

  // Filter panes
  body: {flex: 1, flexDirection: 'row'},
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
  tabItemSelected: {backgroundColor: '#F0F0F0'},
  tabLabel: {fontSize: 14, color: '#000'},
  rightPane: {flex: 1, padding: 16},
  rightTitle: {fontSize: 16, fontWeight: '500', marginBottom: 5},
  selectedCount: {fontSize: 14, color: '#333'},
  brandItem: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  brandItemSelected: {backgroundColor: '#222'},
  brandText: {fontSize: 15, color: '#000'},
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
  gradeButtonSelected: {backgroundColor: '#222'},
  gradeText: {fontSize: 16, color: '#000', fontWeight: '500'},
  gradeTextSelected: {color: '#fff'},
  colorItem_c: {
    alignItems: 'center',
    width: '18%',
    marginHorizontal: 5,
    marginBottom: 15,
  },
  colorCircleWrapper_c: {padding: 0, borderRadius: 16},
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
  colorCircleSelected_c: {borderColor: '#000', borderWidth: 3},
  colorLabel_c: {
    marginTop: 6,
    fontSize: 10,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },

  // Options
  optionContainer: {flexDirection: 'row', flexWrap: 'wrap', gap: 10},
  optionButton: {
    borderWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 10,
    marginRight: 10,
  },
  selectedButton: {backgroundColor: '#333'},
  optionTextStyle: {color: '#000', fontWeight: '600'},
  selectedTextStyle: {color: '#fff'},
  selectedText: {color: '#fff'},
});
