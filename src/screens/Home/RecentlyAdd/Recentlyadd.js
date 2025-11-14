import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  addToWishlistAPI,
  removeFromWishlistAPI,
} from '../../../redux/slices/wishlistSlice';
import {
  fetchProductList,
  fetchFilterData,
  addRecentlyViewed,
  fetchProductLatestStock,
} from '../../../redux/slices/productSlice';

const {width} = Dimensions.get('window');

const Recentlyadd = ({osName}) => {
  const navigation = useNavigation(); // ✅ make sure navigation is available
  const dispatch = useDispatch();
  const {lateststock, filterdata, loading} = useSelector(
    state => state.product,
  );

  console.log('filterdata----------->', filterdata);

  // state
  // const [lateststock, setProductData] = useState();
  const [applyselectedfilters, ApplyselectedFilters] = useState();
  const [filteredProduct, setFilteredProducts] = useState([]);
  // const [filterdata, setFilterData] = useState();
  const [showSortModal, setShowSortModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState('lowToHigh');
  const [showFilterModal, setFilterSortModal] = useState(false);
  const [selectedRam, setSelectedRam] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [selectedTab, setSelectedTab] = useState('brands');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState(null);

  useEffect(() => {
    dispatch(fetchProductList());
    dispatch(fetchProductLatestStock());
    dispatch(fetchFilterData());
    dispatch(addRecentlyViewed());
  }, [dispatch]);

  // Apply filters
  useEffect(() => {
    if (!lateststock) return;

    if (!applyselectedfilters) {
      setFilteredProducts(
        lateststock.filter(item => item.operating_systems === osName),
      );
      return;
    }

    const filtered = lateststock.filter(item => {
      // OS filter
      if (item.operating_systems !== osName) return false;

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
    // Apply sorting
    if (selectedOption === 'lowToHigh') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (selectedOption === 'highToLow') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (selectedOption === 'grade') {
      filtered.sort((a, b) => a.grade_number.localeCompare(b.grade_number));
    }
    setFilteredProducts(filtered);
  }, [applyselectedfilters, lateststock, osName]);

  // Filter products based on osName
  const filteredProducts = (lateststock || []).filter(
    item => item.operating_systems && item.operating_systems === osName,
  );
  console.log('filteredProducts--------->', filteredProducts);
  const budgetOptions = [
    {
      id: 1,
      label: 'Under ₹10,000',
      image: 'https://i.postimg.cc/Pf3MBSK6/Category-Card-01-1.png',
    },
    {
      id: 2,
      label: '₹10,000 - ₹20,000',
      image: 'https://i.postimg.cc/0NRJJB0y/Category-Card-02.png',
    },
    {
      id: 3,
      label: '₹20,000 - ₹30,000',
      image:
        'https://i.postimg.cc/zvBLrZ80/create-an-image-with-multiple-smartphones-that-are-under-10000-20000-rupees.png',
    },
    {
      id: 4,
      label: 'Above ₹30,000',
      image: 'https://i.postimg.cc/Ls3hg6sx/Category-Card-4.png',
    },
  ];

  // Filter & Wishlist
  let BRANDS = filterdata?.brands;
  let grades = filterdata?.grades;
  let COLORS = filterdata?.colors;
  let ramOptions = filterdata?.rams;
  let storageOptions = filterdata?.roms;

  const sortOptions = [
    {key: 'lowToHigh', label: 'Price (Low to High)'},
    {key: 'highToLow', label: 'Price (High to Low)'},
    {key: 'grade', label: 'Grade (A1–A9)'},
  ];

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

  const ProductCard = ({item}) => {
    const wishlistItems = useSelector(state => state.wishlist.items);
    // ✅ check product already in wishlist
    const isInWishlist = wishlistItems.some(
      w => w.barcode_id == item.barcode_id,
    );
    console.log('wishlistItems--------->', isInWishlist);
    const handleWishlistToggle = () => {
      if (isInWishlist) {
        dispatch(removeFromWishlistAPI(item));
      } else {
        dispatch(addToWishlistAPI(item));
      }
    };

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProductList', {
            product_barcode_id: item?.barcode_id,
          })
        }
        style={styles.cardD}>
        {/* Image + Heart */}
        <View style={styles.imageContainerD}>
          <Image source={{uri: item.feature_image}} style={styles.imageD} />
          {item && <Text style={styles.refurbishedLabelD}>(Refurbished)</Text>}

          {/* ❤️ Wishlist Button */}
          <TouchableOpacity
            style={styles.heartIconD}
            onPress={() => handleWishlistToggle()}>
            <AntDesign
              name={isInWishlist ? 'heart' : 'hearto'}
              size={20}
              color={isInWishlist ? '#E74C3C' : '#999'}
            />
          </TouchableOpacity>
        </View>

        {/* Grade Box */}
        <View style={styles.gradeBoxD}>
          <Text style={styles.gradeTextD}>Grade {item.grade_number}</Text>
        </View>

        {/* Product Info */}
        <Text style={styles.productNameD}>{item.model_name}</Text>
        <Text style={styles.colorTextD}>● {item.color_name}</Text>
        <View style={styles.priceRowD}>
          <Text style={styles.priceD}>₹ {item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Top android Devices */}
       
            <View style={styles.headerButtons}>
              <TouchableOpacity
                onPress={() => setShowSortModal(true)}
                style={styles.sortButton}>
                <Icon name="grid" size={16} color="#000" />
                <Text style={styles.sortText}>Sort By</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setFilterSortModal(true)}
                style={styles.filterButton}>
                <Icon name="sliders" size={16} color="#000" />
                <Text style={styles.sortText}>Filter</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
              }}>
              <FlatList
                data={filteredProduct}
                renderItem={({item}) => <ProductCard item={item} />}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                numColumns={2}
                ListEmptyComponent={
                  !loading && (
                    <>
                      <Image
                        source={require('../../../../assets/images/emptyproduct.png')} // Update path to your image
                      />
                      <Text
                        style={{
                          textAlign: 'center',
                          marginTop: 10,
                          fontSize: 18,
                          fontWeight: 'bold',
                          color: '#000',
                        }}>
                        Oops
                      </Text>
                      <Text
                        style={{
                          textAlign: 'center',
                          marginTop: 10,
                          color: '#000',
                          fontSize: 18,
                        }}>
                        Can’t find what you’re looking for?
                      </Text>
                      <Text
                        style={{
                          textAlign: 'center',
                          marginTop: 10,
                          color: '#777',
                        }}>
                        Try adjusting your filters or browsing all products.
                      </Text>
                    </>
                  )
                }
              />
            </View>
       

        {/* Sort Modal */}
        <Modal visible={showSortModal} transparent animationType="slide">
          <SafeAreaView style={styles.modalContainer}>
            <View style={{margin: 20, flex: 1}}>
              {/* Modal Header */}
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setShowSortModal(false)}>
                  <Ionicons name="close" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Sort by</Text>
                <Ionicons name="grid-outline" size={20} color="#000" />
              </View>

              {/* Sort Options */}
              <View style={styles.optionList}>
                {sortOptions.map(option => (
                  <TouchableOpacity
                    key={option.key}
                    style={styles.optionRow}
                    onPress={() => setSelectedOption(option.key)}>
                    <Text style={styles.optionText}>{option.label}</Text>
                    <View
                      style={[
                        styles.radioOuter,
                        selectedOption === option.key &&
                          styles.radioOuterSelected,
                      ]}>
                      {selectedOption === option.key && (
                        <View style={styles.radioInner} />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            {/* Apply Button */}
            <View style={styles.applyWrapper}>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={handleApply}>
                <Text style={styles.applyText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>

        {/* Filter Modal */}
        <Modal visible={showFilterModal} animationType="slide" transparent>
          <SafeAreaView style={styles.modalContainer}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity onPress={() => setFilterSortModal(false)}>
                <Ionicons name="close" size={24} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Filter</Text>
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: '#fff', flex: 1},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
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
  bannerImage: {width: '100%', height: 240, resizeMode: 'stretch'},
  bannerTextContainer: {
    position: 'absolute',
    bottom: 20,
    left: 12,
  },
  bannerTitle: {fontSize: 20, fontWeight: 'bold', color: '#fff'},
  seeAllBtn: {
    marginTop: 6,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    width: '60%',
  },
  seeAllText: {fontWeight: 'bold', textAlign: 'center'},
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 20,
    marginLeft: 12,
    marginBottom: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  budgetCard: {
    width: width / 2.3,
    marginBottom: 10,
    alignItems: 'center',
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: 100, // or whatever height you need
    borderRadius: 10,
    overflow: 'hidden',
  },

  budgetImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  budgetLabel: {
    position: 'absolute',
    bottom: 8,
    left: 10,
    color: 'white',
    fontSize: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: 12,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 10,
    margin: 10,
    width: width / 2.2,
    position: 'relative',
  },
  cardImage: {width: '100%', height: 120, resizeMode: 'contain'},
  refurbished: {
    position: 'absolute',
    top: 8,
    left: 8,
    fontSize: 11,
    color: '#777',
  },
  heart: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
    padding: 5,
  },
  grade: {
    fontSize: 12,
    color: '#888',
    marginVertical: 4,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  color: {fontSize: 12, marginVertical: 2},
  price: {fontWeight: 'bold'},
  oldPrice: {
    textDecorationLine: 'line-through',
    color: '#888',
    fontSize: 12,
    marginLeft: 4,
  },
  gradeInfo: {
    flexDirection: 'row',
    padding: 12,
    margin: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    alignItems: 'center',
  },
  gradeBadge: {width: 60, height: 60, marginRight: 12},
  gradeTitle: {fontWeight: 'bold', fontSize: 14},
  gradeDesc: {fontSize: 12, color: '#444'},
  learnMoreBtn: {
    backgroundColor: '#fff',
    padding: 6,
    marginTop: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  learnMoreText: {fontWeight: 'bold'},
  rowBtns: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 20,
  },
  actionText: {marginLeft: 6},
  badgeTextD: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
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
  imageContainerD: {
    position: 'relative',
    backgroundColor: '#f4f4f4',
  },
  imageD: {
    width: '100%',
    height: 250,
    resizeMode: 'stretch',
  },
  listContainerD: {
    padding: 10,
  },
  cardD: {
    width: 190,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowRadius: 4,
    marginHorizontal: 5,
  },

  leftContainer: {
    flex: 1,
    paddingRight: 10,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  subheading: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#7E7E7E',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#EAE8E8',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  buttonL: {
    backgroundColor: '#EAE8E8',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginHorizontal: 10,
  },
  buttonTextL: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
    textAlign: 'center',
  },
  imageG: {
    width: width * 0.3,
    height: width * 0.3,
  },

  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 12,
    marginLeft: 15,
    marginVertical: 10,
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
  header_panel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#eee',
    marginBottom: 10,
    width: '90%',
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
});

export default Recentlyadd;
