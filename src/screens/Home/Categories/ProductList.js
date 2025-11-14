import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Swiper from 'react-native-swiper';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {addToCartAPI, checkoutAPI} from '../../../redux/slices/cartSlice';
import {useDispatch, useSelector} from 'react-redux';
import {API_BASE_URL} from '../../../utils/utils';
import {
  fetchProductList,
  addRecentlyViewed,
} from '../../../redux/slices/productSlice';
import Header from '../../../constants/Header';

const {width} = Dimensions.get('window');

const InfoItem = ({label, value, working = true}) => (
  <View style={styles.row}>
    <Ionicons
      name={working ? 'checkmark' : 'close'}
      size={16}
      color={working ? 'green' : 'red'}
    />
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const ProductCard = ({item}) => (
  <View style={styles.productCard}>
    <Image source={{uri: item.feature_image}} style={styles.productImage} />
    <Text style={styles.productTitle}>{item.model_name}</Text>
    <Text style={styles.productTitle}>{item.color_name}</Text>
    <Text style={styles.productTitle}>{item.storage}8GB | 256GB</Text>
    <Text style={styles.productTitle}>{item.grade_number}</Text>
    <Text style={styles.productPrice}>{item.price}</Text>
  </View>
);

const suggestions = [
  {
    image: 'https://i.postimg.cc/NfcGsSft/productlist1.png',
    title: 'iPhone 13 Pro',
    color: 'Midnight Black',
    storage: '8GB | 256GB',
    grade: 'Grade A1',
    price: '₹59,999',
  },
  {
    image: 'https://i.postimg.cc/NfcGsSft/productlist1.png',
    title: 'iPhone 13 Pro',
    color: 'White',
    storage: '6GB | 128GB',
    grade: 'Grade A2',
    price: '₹49,999',
  },
  {
    image: 'https://i.postimg.cc/NfcGsSft/productlist1.png',
    title: 'iPhone 13 Pro',
    color: 'Silver Grey',
    storage: '6GB | 128GB',
    grade: 'Grade A3',
    price: '₹59,999',
  },
];

const trustFeatures = [
  {
    id: '1',
    iconType: 'MaterialIcons',
    icon: 'groups',
    text: '100k+ Satisfied Customers',
  },
  {
    id: '2',
    iconType: 'AntDesign',
    icon: 'unlock',
    text: 'Secure Payments',
  },
  {
    id: '3',
    iconType: 'Feather',
    icon: 'headphones',
    text: 'Responsive Customer Support',
  },
  {
    id: '4',
    iconType: 'Entypo',
    icon: 'lab-flask',
    text: 'ISO Certified QC Lab',
  },
  {
    id: '5',
    iconType: 'MaterialIcons',
    icon: 'privacy-tip',
    text: 'Data Privacy Protected',
  },
];

const getIconComponent = type => {
  switch (type) {
    case 'MaterialIcons':
      return MaterialIcons;
    case 'AntDesign':
      return AntDesign;
    case 'Feather':
      return Feather;
    case 'Entypo':
      return Entypo;
    default:
      return MaterialIcons;
  }
};

const InfoCard = ({iconType, icon, text}) => {
  const Icon = getIconComponent(iconType);
  return (
    <View style={styles.infoCardD}>
      <View style={{backgroundColor: '#EAE6E5', padding: 12, borderRadius: 5}}>
        <Icon name={icon} size={20} color="#000" />
      </View>
      <Text style={styles.infoTextD}>{text}</Text>
    </View>
  );
};

const ProductCardD = ({item}) => (
  <View style={styles.productCard}>
    <Image source={{uri: item.feature_image}} style={styles.productImage} />
    <Text style={styles.productTitle}>{item.model_name}</Text>
    <Text style={styles.productTitle}>{item.color_name}</Text>
    <Text style={styles.productTitle}>{item.storage}8GB | 256GB</Text>
    <Text style={styles.productTitle}>{item.grade_number}</Text>
    <Text style={styles.productPrice}>{item.price}</Text>
  </View>
);

const ProductDetail = ({route, iconType, icon, text}) => {
  const navigation = useNavigation();
  const swiperRef = useRef(null);
  const [showSpecs, setShowSpecs] = useState(false); // Toggle state
  const [showSpecs1, setShowSpecs1] = useState(false); // Toggle state
  const {product_barcode_id} = route.params; // 👈 get product
  // const [productData, setProductData] = useState();
  const [loading1, setLoading] = useState(true);
  const [error1, setError] = useState(null);
  const dispatch = useDispatch();
  const {loading, error} = useSelector(state => state.cart);
  const [product, setProduct] = useState('');
  const {productData, addrecentlyview} = useSelector(state => state.product);
  const handleAddToCart = () => {
    dispatch(addToCartAPI({product, navigation})); // ✅ pass an object
  };
  const handleBuyNow = () => {
    dispatch(
      checkoutAPI({
        type: 'single_product',
        barcode_id: product?.barcode?.barcode_id,
        single_product_price: product?.barcode?.purchase_price,
        navigation,
      }),
    );
  };
  let featureImage = product?.feature_images || [];
  let barcodeDetails = product?.barcode || [];
  let modelSpecification = product?.model_specification || [];
  let barcode_id = barcodeDetails?.barcode_id;
  let device_qc_reports = product?.device_qc_reports || [];

  // 🔹 Utility function to safely extract values
  const extractValues = (reports, pathFn) =>
    (reports || []).map(pathFn).filter(Boolean);

  // 🔹 Usage
  const gradeNumbers = extractValues(
    device_qc_reports,
    item => item?.latest_info?.device_report_grade_number?.grade_number,
  );

  const switchings = extractValues(
    device_qc_reports,
    item => item?.latest_info?.device_switched_status,
  );

  const devicelocked = extractValues(
    device_qc_reports,
    item => item?.latest_info?.device_locked_status,
  );
  const deviceage = extractValues(
    device_qc_reports,
    item => item?.latest_info?.device_age,
  );
  const latest_info = extractValues(
    device_qc_reports,
    item => item?.latest_info,
  );

  const details =
    device_qc_reports?.reduce((acc, item) => {
      if (item?.latest_info?.details) {
        acc.push(...item.latest_info.details);
      }
      return acc;
    }, []) || [];

  console.log('details---------->', details);

  const getDeviceAgeLabel = age => {
    switch (
      String(age) // ensure string or number works
    ) {
      case '0':
        return '0-3 Months';
      case '1':
        return '3-6 Months';
      case '2':
        return '6-9 Months';
      case '3':
        return '9-12 Months';
      case '4':
        return 'Out of Warranty';
      default:
        return 'N/A';
    }
  };

  console.log('gradeNumbers----->', gradeNumbers);
  console.log('switchings------->', switchings);
  console.log('devicelocked----->', devicelocked);
  console.log('deviceage----->', deviceage);
  console.log('latest_info----->', latest_info);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${API_BASE_URL}/product_detail/${product_barcode_id}`,
        );
        if (response.data) {
          setProduct(response.data.data);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [product_barcode_id]);

  useEffect(() => {
    dispatch(addRecentlyViewed(product_barcode_id));
    dispatch(fetchProductList());
  }, [dispatch]);

  const iosProductsSimilarProducts = (productData || []).filter(
    item => item.operating_systems && item.operating_systems === 'iOS',
  );
  const iosProductsYouMightLike = (productData || []).filter(
    item =>
      item.operating_systems === 'iOS' &&
      ['A1', 'A2', 'A3'].includes(item.grade_number),
  );

  console.log(
    'iosProductsSimilarProducts--------->',
    iosProductsSimilarProducts,
  );
  console.log('iosProductsYouMightLike--------->', iosProductsYouMightLike);

  // Suppose you already have `product` data from API
  const productSpecs = [
    ['IMEI Number', barcodeDetails?.imei_number],
    ['Model Name', barcodeDetails?.barcode_model?.model_name],
    ['Color', barcodeDetails?.barcode_color?.color_name],
    ['SIM Type', modelSpecification?.sim_type],
    // ['Hybrid Sim Slot', product?.hybrid_sim_slot ? 'Yes' : 'No'],
    ['Touchscreen', modelSpecification?.touchscreen],
    // ['Quick Charging', product?.quick_charging ? 'Yes' : 'No'],
    // ['Sound Enhancements', product?.sound_enhancements],
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header
          title="Product List"
          navigation={navigation}
          showBack={true}
        />

        {/* Main Image Carousel */}
        <View style={styles.carouselWrapper}>
          <Swiper
            ref={swiperRef}
            autoplay
            showsPagination
            dotColor="#ccc"
            activeDotColor="#000"
            loop
            style={styles.swiper}>
            {featureImage.map((imgObj, index) => (
              <Image
                key={index}
                source={
                  imgObj
                    ? {uri: imgObj.url}
                    : require('../../../../assets/images/empty.jpeg') // ✅ fallback image
                }
                style={styles.mainImage}
                resizeMode="cover"
              />
            ))}
          </Swiper>

          {/* Floating Right-side Icons */}
          <View style={styles.iconColumn}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="share-social-outline" size={18} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="heart-outline" size={18} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => swiperRef.current.scrollBy(1)}>
              {' '}
              {/* ➡️ next */}
              <Ionicons name="chevron-forward-outline" size={18} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => swiperRef.current.scrollBy(-1)}>
              {' '}
              {/* ⬅️ prev */}
              <Ionicons name="chevron-back" size={18} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Thumbnails Strip */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.thumbnailStrip}
          contentContainerStyle={{paddingHorizontal: 10}}>
          {featureImage.map((imgObj, index) => (
            // console.log("imgObj------------>", `${BASE_URL}${imgObj?.image}`)
            <Image
              key={index}
              source={
                imgObj
                  ? {uri: imgObj.url}
                  : require('../../../../assets/images/empty.jpeg') // ✅ fallback image
              }
              style={styles.thumbnail}
              resizeMode="cover"
            />
          ))}
        </ScrollView>

        {/* Header */}
        <View style={styles.headerP}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Text style={styles.brandP}>
                {barcodeDetails?.barcode_brand?.brand_name || 'N/A'}
              </Text>
              <Text style={styles.titleP}>
                {barcodeDetails?.barcode_model?.model_name || 'N/A'}
              </Text>
              <Text style={styles.priceP}>
                ₹{barcodeDetails?.purchase_price || 'N/A'}
              </Text>
              <Text style={styles.variant}>
                Size: {barcodeDetails?.barcode_variant?.variant_name || 'N/A'}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.variant}>
                  Color : {barcodeDetails?.barcode_color?.color_name || 'N/A'}
                </Text>
                <View style={{marginBottom: 2, marginLeft: 20}}>
                  <Octicons name="dot-fill" size={22} color="#000" />
                </View>
              </View>
            </View>
            <View style={{marginRight: 20}}>
              <Text style={{fontSize: 48, fontWeight: 'bold'}}>
                {gradeNumbers || 'N/A'}
              </Text>
              <Text style={styles.grade}>Grade</Text>
            </View>
          </View>
          {/* Buttons */}
          <View style={{borderWidth: 0.5, marginTop: 10}}></View>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              // onPress={() =>
              //   navigation.navigate('Cart', {productData: barcodeDetails})
              // }
              onPress={handleAddToCart}
              disabled={loading}
              style={styles.addToCart}>
              <Text style={styles.btnText}>Add to Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleBuyNow()}
              style={styles.buyNow}>
              <Text style={styles.btnTextWhite}>Buy Now</Text>
            </TouchableOpacity>
          </View>
          <View style={{borderWidth: 0.5, marginTop: 0}}></View>
        </View>

        {/* Other Variants */}
        {/* <View style={styles.variantsSection}>
          <Text style={{fontSize: 18, fontWeight: '700', marginBottom: 20}}>
            Other Variants Available
          </Text>
          <View style={styles.variantFilters}>
            <Text style={styles.filterTag}>Size</Text>
            <Text style={styles.filterTag}>Color</Text>
            <Text style={styles.filterTag}>Grade</Text>
          </View>
          <ScrollView horizontal>
            <View style={styles.variantCard}>
              <Image
                source={{
                  uri: 'https://i.postimg.cc/zB3R95wL/Depth-5-Frame-0-10.png',
                }}
                style={styles.variantImage}
              />
              <Text>iPhone 13 Pro</Text>
              <Text>Blue - A1 Grade</Text>
            </View>
            <View style={styles.variantCard}>
              <Image
                source={{
                  uri: 'https://i.postimg.cc/FRqTYhhc/Depth-5-Frame-0-11.png',
                }}
                style={styles.variantImage}
              />
              <Text>iPhone 13 Pro</Text>
              <Text>Green - A3 Grade</Text>
            </View>
            <View style={styles.variantCard}>
              <Image
                source={{
                  uri: 'https://i.postimg.cc/wjH0yfYW/Depth-5-Frame-0-12.png',
                }}
                style={styles.variantImage}
              />
              <Text>iPhone 13 Pro</Text>
              <Text>Green - A3 Grade</Text>
            </View>
          </ScrollView>
        </View> */}

        {/* Specifications & QC Report  */}
        <View style={styles.specSection}>
          <Text style={styles.headlines}>
            {barcodeDetails?.barcode_model?.model_name || 'N/A'} Highlights
          </Text>
          <View style={{}}>
            <View style={{backgroundColor: '#EAE6E5', padding: 12}}>
              <Text>Key Features</Text>
            </View>
            {/* {[
              ['Model Number', 'SM-A546EZKGINS'],
              ['Model Name', 'Galaxy A54 5G'],
              ['Color', 'Graphite'],
              ['SIM Type', 'Dual Sim'],
              ['Hybrid Sim Slot', 'No'],
              ['Touchscreen', 'Yes'],
              ['Quick Charging', 'Yes'],
              ['Sound Enhancements', 'Dolby Atmos'],
            ].map(([label, value], index) => (
              <View
                key={label}
                style={[
                  styles.specRow,
                  {backgroundColor: index % 2 === 0 ? '#FFFBFA' : '#66666680'},
                ]}>
                <Text style={styles.specLabel}>{label}</Text>
                <Text style={styles.specValue}>{value}</Text>
              </View>
            ))} */}
            {productSpecs.map(([label, value], index) => (
              <View
                key={label}
                style={[
                  styles.specRow,
                  {backgroundColor: index % 2 === 0 ? '#FFFBFA' : '#66666680'},
                ]}>
                <Text style={styles.specLabel}>{label}</Text>
                <Text style={styles.specValue}>{value || 'N/A'}</Text>
              </View>
            ))}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              fontSize: 18,
              padding: 10,
            }}>
            <Text style={{fontSize: 14, fontWeight: 'bold'}}>
              View All Specifications
            </Text>
            <TouchableOpacity onPress={() => setShowSpecs(prev => !prev)}>
              <SimpleLineIcons
                name={showSpecs ? 'arrow-up' : 'arrow-down'}
                size={20}
                color="#000"
              />
            </TouchableOpacity>
          </View>

          {showSpecs && (
            <View>
              <Text style={styles.headlines}>OS & Processor Features</Text>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Operating System</Text>
                <Text style={styles.specValue}>
                  {modelSpecification?.operating_system || 'N/A'}
                </Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Processor</Text>
                <Text style={styles.specValue}>
                  {modelSpecification?.processor || 'N/A'}
                </Text>
              </View>

              <Text style={styles.headlines}>Display Features</Text>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Display Size</Text>
                <Text style={styles.specValue}>
                  {modelSpecification?.screen_size || 'N/A'}
                </Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Resolution</Text>
                <Text style={styles.specValue}>
                  {modelSpecification?.resolution || 'N/A'}
                </Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>GPU</Text>
                <Text style={styles.specValue}>
                  {modelSpecification?.graphics || 'N/A'}
                </Text>
              </View>
              {/* <View style={styles.specRow}>
                <Text style={styles.specLabel}>Display Type</Text>
                <Text style={styles.specValue}>
                  Super AMOLED, 120Hz, Corning Gorilla Glass 5
                </Text>
              </View> */}

              <Text style={styles.headlines}>Memory & Storage</Text>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Internal Storage</Text>
                <Text style={styles.specValue}>
                  {barcodeDetails?.barcode_storage || 'N/A'}
                </Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>RAM</Text>
                <Text style={styles.specValue}>
                  {barcodeDetails?.barcode_ram || 'N/A'}
                </Text>
              </View>
              {/* <View style={styles.specRow}>
                <Text style={styles.specLabel}>Expandable Storage</Text>
                <Text style={styles.specValue}>1 TB</Text>
              </View> */}
              {/* <View style={styles.specRow}>
                <Text style={styles.specLabel}>Supported Memory Card </Text>
                <Text style={styles.specValue}>microSD, Hybrid Slot</Text>
              </View> */}
              <Text style={styles.headlines}>Camera Features</Text>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Primary Camera</Text>
                <Text style={styles.specValue}>
                  {modelSpecification?.front_camera || 'N/A'}
                </Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Secondary Camera</Text>
                <Text style={styles.specValue}>
                  {modelSpecification?.no_of_rear_camera || 'N/A'}
                </Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Front Flashs</Text>
                <Text style={styles.specValue}>
                  {modelSpecification?.front_flash || 'N/A'}
                </Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Back Flashs</Text>
                <Text style={styles.specValue}>
                  {modelSpecification?.rear_flash || 'N/A'}
                </Text>
              </View>
              <Text style={styles.headlines}>Other Details</Text>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Sensors</Text>
                <Text style={styles.specValue}>
                  {modelSpecification?.fingerprint_sensor || 'N/A'}
                </Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>GPS Type</Text>
                <Text style={styles.specValue}>
                  {modelSpecification?.gps || 'N/A'}
                </Text>
              </View>
              <Text style={styles.headlines}>Battery & Power</Text>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Battery Capacity</Text>
                <Text style={styles.specValue}>
                  {modelSpecification?.battery_capacity || 'N/A'}
                </Text>
              </View>
              <Text style={styles.headlines}>Dimensions</Text>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Size</Text>
                <Text style={styles.specValue}>
                  {modelSpecification?.dimensions || 'N/A'}
                </Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Weight</Text>
                <Text style={styles.specValue}>
                  {modelSpecification?.weight || 'N/A'}
                </Text>
              </View>
              <Text style={styles.headlines}>Warranty</Text>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Warranty Summary</Text>
                <Text style={styles.specValue}>
                  1 Year Manufacturer Warranty for Device and 6 Months
                  Manufacturer Warranty for In-Box Accessories
                </Text>
              </View>
              {/* <View style={styles.specRow}>
                <Text style={styles.specLabel}>Domestic Warranty</Text>
                <Text style={styles.specValue}>1 Year</Text>
              </View> */}
            </View>
          )}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              fontSize: 18,
              padding: 10,
            }}>
            <Text style={{fontSize: 14, fontWeight: 'bold'}}>QC Report</Text>
            <TouchableOpacity onPress={() => setShowSpecs1(prev => !prev)}>
              <SimpleLineIcons
                name={showSpecs1 ? 'arrow-up' : 'arrow-down'}
                size={20}
                color="#000"
              />
            </TouchableOpacity>
          </View>

          {showSpecs1 && (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 10,
                }}>
                <View style={{}}>
                  <Text style={{marginVertical: 10}}>Switched ON</Text>
                  <Text style={{marginVertical: 10}}>Device Locked</Text>
                  <Text style={{marginVertical: 10}}>Warranty</Text>
                </View>
                <View>
                  <Text style={{marginVertical: 10}}>
                    {switchings || 'N/A'}
                  </Text>
                  <Text style={{marginVertical: 10}}>
                    {devicelocked || 'N/A'}
                  </Text>
                  <Text style={{marginVertical: 10}}>
                    {getDeviceAgeLabel(deviceage) || 'N/A'}
                  </Text>
                </View>
              </View>
              <Text style={styles.headlines}>Accessories</Text>
              <InfoItem label="Box with same IMEI / SN" value="" />
              <InfoItem label="Charging Adapter" value="" />
              <InfoItem label="Charging Cable" value="" />
              <InfoItem label="Earphone" value="" />

              <Text style={styles.headlines}>Body Defects</Text>

              {details
                .filter(d => d.defect_type === 'Body Defects') // only Body Defects
                .map((d, idx) => (
                  <InfoItem
                    key={idx}
                    label={d.parameter?.parameter_name || 'N/A'}
                    value={d.parameter_status?.parameter_status_name || 'N/A'}
                    working={d.parameter_status?.parameter_status_name || 'N/A'}
                  />
                ))}

              <Text style={styles.headlines}>Screen Defects</Text>

              {details
                .filter(d => d.defect_type === 'Screen Defects') // only Body Defects
                .map((d, idx) => (
                  <InfoItem
                    key={idx}
                    label={d.parameter?.parameter_name || 'N/A'}
                    value={d.parameter_status?.parameter_status_name || 'N/A'}
                    working={d.parameter_status?.parameter_status_name || 'N/A'}
                  />
                ))}

              <Text style={styles.headlines}>Functional Defects</Text>
              {details
                .filter(d => d.defect_type === 'Functional Problems') // only Body Defects
                .map((d, idx) => (
                  <InfoItem
                    key={idx}
                    label={d.parameter?.parameter_name || 'N/A'}
                    value={d.parameter_status?.parameter_status_name || 'N/A'}
                    working={d.parameter_status?.parameter_status_name || 'N/A'}
                  />
                ))}

              {/* <InfoItem label="Camera Lens" value="Minor Signs" />
              <InfoItem label="Back Panel" value="Minor Signs" />
              <InfoItem label="Screw" value="Available" />
              <InfoItem label="Frame" value="Excellent" />
              <InfoItem label="Device Bent" value="No Bent" />
              <InfoItem label="Chrome" value="Excellent" />
              <InfoItem label="Sim Tray" value="Excellent" /> */}
              {/* 
              // <Text style={styles.headlines}>Screen Defects</Text>
              <InfoItem label="Display" value="Excellent" />
              <InfoItem label="Front Glass" value="Minor Signs" />
              <InfoItem label="Screen Quality" value="Original" />

              <Text style={styles.headlines}>Functional Defects</Text>
              <InfoItem label="WiFi" value="Not Working" working={false} />
              <InfoItem label="Proximity Sensor" value="Working" />
              <InfoItem label="Bluetooth" value="Working" />
              <InfoItem label="Reciever" value="Working" />
              <InfoItem label="Ringer" value="Working" />
              <InfoItem label="Vibrator" value="Working" />
              <InfoItem label="Mic" value="Working" />
              <InfoItem label="SIM Status" value="Working" />
              <InfoItem label="Front Flash Light" value="Working" />
              <InfoItem label="Back Flash Light" value="Working" />
              <InfoItem label="Fingerprint" value="Working" />
              <InfoItem label="Front Camera" value="Working" />
              <InfoItem label="Back Camera" value="Working" />

              <InfoItem label="Portrait Camera" value="Not Working" />
              <InfoItem label="Charging Jack" value="Working" />
              <InfoItem label="Earphone Jack" value="Working" />
              <InfoItem label="Home Key" value="Working" />
              <InfoItem label="Power Key" value="Working" />
              <InfoItem label="Silent Key " value="Working" />
              <InfoItem label="Volume Key" value="Working" />
              <InfoItem label="Face Lock" value="Working" />
              <InfoItem label="True Tone" value="Working" />
              <InfoItem label="Error Message" value="Working" />
              <InfoItem label="Battery" value="Working" />
              <InfoItem label="Battery Health" value="92%" /> */}
            </>
          )}
        </View>

        {/* Grade A1 to A9  */}
        <View
          style={{
            alignItems: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            marginLeft: 15,
            marginVertical: 15,
            flexDirection: 'row',
          }}>
          <View style={styles.leftContainer}>
            <Text style={styles.heading}>What is A1 to A9?</Text>
            <Text style={styles.subheading}>How Does Our Grading Work?</Text>
            <Text style={styles.description}>
              Grading ranges from A1 (like new) to A9 (heavily used).
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('Grade')}
              style={styles.button}>
              <Text style={styles.buttonText}>Learn More</Text>
            </TouchableOpacity>
          </View>

          {/* Right Image Section */}
          <Image
            source={require('../../../../assets/images/mini.png')} // Replace with your image path
            style={styles.imageG}
            resizeMode="contain"
          />
        </View>

        {/* View Similar Products  */}
        {/* <Text style={styles.headlines}>View Similar Products</Text> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            fontSize: 18,
            padding: 10,
            marginVertical: 10,
          }}>
          <Text style={{fontSize: 14, fontWeight: 'bold'}}>
            View Similar Products
          </Text>
          {/* <TouchableOpacity
            onPress={() => navigation.navigate('SimilarProducts')}>
            <Text>See all</Text>
          </TouchableOpacity> */}
        </View>
        <FlatList
          data={iosProductsSimilarProducts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <ProductCard item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            fontSize: 18,
            padding: 10,
            marginVertical: 10,
          }}>
          <Text style={{fontSize: 14, fontWeight: 'bold'}}>You Might Like</Text>
          {/* <TouchableOpacity onPress={() => navigation.navigate('MightLike')}>
            <Text>See all</Text>
          </TouchableOpacity> */}
        </View>
        <FlatList
          horizontal
          data={iosProductsYouMightLike}
          renderItem={({item}) => <ProductCardD item={item} />}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />

        <Text style={styles.subHeadingD}>Buy Smart. Buy Secure.</Text>
        <View style={styles.featureGridD}>
          <TouchableOpacity style={styles.featureBoxD}>
            <AntDesign name="clockcircleo" size={22} color="#000" />
            <Text style={{width: '90%', marginLeft: 10}}>
              Over a Decade of Service
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.featureBoxD}>
            <Feather name="truck" size={22} color="#000" />
            <Text style={{width: '90%', marginLeft: 10}}>
              Pan-India Delivery
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.featureBoxD}>
            <EvilIcons name="undo" size={30} color="#000" />
            <Text style={{width: '90%', marginLeft: 0}}>
              14-Day Return Policy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.featureBoxD}>
            <MaterialIcons name="security" size={22} color="#000" />
            <Text style={{width: '90%', marginLeft: 10}}>
              7-Day Testing Warranty
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subHeadingD}>Your Trust, Our Commitment</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {trustFeatures.map(item => (
            <InfoCard
              key={item.id}
              iconType={item.iconType}
              icon={item.icon}
              text={item.text}
            />
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
    left: 0,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
  carouselWrapper: {
    position: 'relative',
    height: 320,
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  swiper: {
    borderRadius: 10,
  },
  mainImage: {
    width: '100%',
    height: 320,
    borderRadius: 10,
  },
  iconColumn: {
    position: 'absolute',
    right: 10,
    top: 20,
    zIndex: 10,
  },
  iconButton: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    marginVertical: 6,
    elevation: 3,
  },
  thumbnailStrip: {
    marginTop: 10,
    // alignSelf: 'center',
  },
  thumbnail: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginHorizontal: 5,
  },

  headerP: {padding: 0, marginHorizontal: 16, marginVertical: 5},
  brandP: {color: '#007aff', fontSize: 16},
  titleP: {fontSize: 24, fontWeight: '700', marginVertical: 4},
  priceP: {fontSize: 22, color: '#1C9C48', fontWeight: '700'},
  strikePrice: {
    textDecorationLine: 'line-through',
    color: '#777',
    marginBottom: 6,
  },
  grade: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  variant: {fontSize: 14, color: '#333', marginBottom: 4},
  buttonRow: {flexDirection: 'row', marginVertical: 12, gap: 10},
  addToCart: {
    flex: 1,
    backgroundColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#666666',
  },
  buyNow: {
    flex: 1,
    backgroundColor: '#1C9C48',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: {fontWeight: '600'},
  btnTextWhite: {color: '#fff', fontWeight: '600'},
  bullets: {marginTop: 10},
  bullet: {marginBottom: 4, color: '#555'},
  viewMore: {color: '#007aff', marginTop: 10},

  variantsSection: {padding: 0, marginHorizontal: 15},
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
    padding: 10,
  },
  variantFilters: {flexDirection: 'row', gap: 10, marginBottom: 20},
  filterTag: {
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  variantCard: {
    width: 140,
    marginRight: 16,
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  variantImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },

  specSection: {},
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 0.2,
    borderTopWidth: 0.2,
    borderBottomColor: '#000',
  },
  specLabel: {fontWeight: '500', color: '#666666', marginHorizontal: 10},
  specValue: {
    color: '#555',
    maxWidth: '60%',
    textAlign: 'right',
    marginHorizontal: 10,
  },

  scrollContainer: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  pill: {
    backgroundColor: '#EDEDED',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  pillText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
  headlines: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 10,
    marginLeft: 10,
  },

  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 0.2,
    borderTopWidth: 0.2,
    borderBottomColor: '#000',
    padding: 15,
  },
  label: {
    flex: 1,
    fontSize: 14,
    marginLeft: 8,
  },
  value: {
    fontSize: 14,
    color: 'gray',
  },
  videoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  videoCard: {
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    width: '48%',
  },
  productCard: {
    marginRight: 12,
    width: 100,
    marginLeft: 15,
  },
  productImage: {
    height: 120,
    width: 120,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  productTitle: {
    fontSize: 14,
    marginTop: 3,
  },
  productPrice: {
    fontWeight: 'bold',
    marginTop: 3,
    color: '#666666',
  },

  cardContainerV: {
    width: Dimensions.get('window').width * 0.6,
    marginRight: 16,
    borderWidth: 0.5,
    elevation: 0.5,
    borderColor: '#e0e0e0',
    borderRadius: 8,
  },
  imageWrapperV: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageV: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIconWrapperV: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 50,
    padding: 8,
  },
  labelV: {
    marginTop: 10,
    fontSize: 14,
    marginLeft: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 5,
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
  imageG: {
    width: width * 0.3,
    height: width * 0.3,
  },

  headingD: {fontSize: 18, fontWeight: 'bold', marginVertical: 10},
  subHeadingD: {
    fontSize: 16,
    fontWeight: '600',
    padding: 10,
  },
  cardD: {
    width: width * 0.4,
    marginRight: 12,
    padding: 10,
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
  },
  imageD: {width: '100%', height: 120, resizeMode: 'contain'},
  nameD: {fontWeight: 'bold', marginTop: 8},
  detailsD: {fontSize: 12, color: '#666'},
  priceD: {fontWeight: 'bold', color: '#000', marginTop: 4},
  featureGridD: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 0,
    margin: 10,
  },
  featureBoxD: {
    width: '48%',
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoCardD: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    margin: 10,
    borderWidth: 1,
    height: 70,
  },
  infoTextD: {marginLeft: 6, fontSize: 12},
  cardDe: {
    alignItems: 'center',
    marginHorizontal: 10,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 3,
    width: 160,
  },
  cardTextDe: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
  },
});
