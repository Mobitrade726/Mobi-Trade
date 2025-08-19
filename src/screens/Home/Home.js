import React, {useEffect, useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  FlatList,
  Dimensions,
  BackHandler,
  Alert,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-reanimated-carousel';
import Swiper from 'react-native-swiper';
import {styles} from '../Home/styles';
import Icon from 'react-native-vector-icons/Feather'; // or use MaterialIcons, etc.
import {useFocusEffect} from '@react-navigation/native';
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

const {width} = Dimensions.get('window');

const phoneImages = [
  'https://i.postimg.cc/FKvpsBn8/Vector-2.png',
  'https://i.postimg.cc/KvyVpp04/web-banner-or-horizontal-template-design-with-special-offer-on-mobile-phones-for-advertising-concept.png',
  'https://i.postimg.cc/Hn1SKj4F/realistic-detailed-3d-mobile-phone-big-sale-banner-concept-ad-poster-card-vector.png',
];

const carouselData = [
  {
    id: 1,
    image: 'https://i.postimg.cc/9MMJdTFM/Frame-90.png',
    title: 'Get the finest in Smartphones & Laptops, pre-owned & certified.',
    subtitle: 'Best from Your Favourite Brand ',
    titleColor: '#fff',
    subtitleColor: '#fff',
    subtitleMarginTop: 80,
    marginLeft: 40,
  },
  {
    id: 2,
    image: 'https://i.postimg.cc/DyqHyrWk/Content-1.png',
    title: 'Extra 5% Off"',
    subtitle: '"On All Prepaid Orders',
    titleColor: '#666666',
    subtitleColor: '#333333',
    subtitleMarginTop: 100,
    marginLeft: 40,
    fontSize: 25,
    fontWeight: 'bold',
  },
  {
    id: 3,
    image: 'https://i.postimg.cc/ZKhsgWwf/Frame-36799-1.png',
    title: 'Hurry!\nFree Delivery',
    subtitle: 'On Every Order — No Minimum Spend',
    titleColor: '#000',
    subtitleColor: '#666666',
    subtitleMarginTop: 10,
    titlewidth: '40%',
    marginLeft: 10,
    titleMarginLeft: 250, // 👈 only here
    titleMarginTop: 100, // 👈 only here
    titleFontSize: 20, // 👈 only here
  },
];

const offers = [
  {id: '1', image: 'https://i.postimg.cc/sxhk6FPT/Img-Placeholder.png'},
  {id: '2', image: 'https://i.postimg.cc/bJ2V8xGJ/Img-Placeholder-2.png'},
  {id: '3', image: 'https://i.postimg.cc/rFh1ndmY/Img-Placeholder-3.png'},
  {id: '4', image: 'https://i.postimg.cc/kXx4GLrN/Img-Placeholder-4.png'},
  {id: '5', image: 'https://i.postimg.cc/sxhk6FPT/Img-Placeholder.png'},
  {id: '6', image: 'https://i.postimg.cc/bJ2V8xGJ/Img-Placeholder-2.png'},
  {id: '7', image: 'https://i.postimg.cc/rFh1ndmY/Img-Placeholder-3.png'},
  {id: '8', image: 'https://i.postimg.cc/kXx4GLrN/Img-Placeholder-4.png'},
];

const HomeScreen = ({navigation}) => {
  const products = [
    {
      id: '1',
      image:
        'https://i.postimg.cc/LXhJrGfL/Whats-App-Image-2025-07-11-at-3-38-17-PM.jpg',
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
        'https://i.postimg.cc/jjxvm6XP/Whats-App-Image-2025-07-11-at-3-38-17-PM-1.jpg',
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
        'https://i.postimg.cc/x1R3vJ2C/Whats-App-Image-2025-07-11-at-3-38-17-PM-2.jpg',
      name: 'OnePlus 9',
      color: 'Winter Mist',
      price: '₹44,999',
      originalPrice: '₹49,999',
      grade: 'A1',
      refurbished: true,
    },
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
        'https://i.postimg.cc/7Yg13xJf/Whats-App-Image-2025-07-11-at-5-45-27-PM-2.jpg',
      name: 'OnePlus 9',
      color: 'Winter Mist',
      price: '₹44,999',
      originalPrice: '₹49,999',
      grade: 'A1',
      refurbished: true,
    },
  ];
  const recentlyView = [
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
  ];

  const ProductCard = ({item}) => (
    <View style={styles.cardD}>
      <View style={styles.imageContainerD}>
        <TouchableOpacity onPress={() => navigation.navigate('ProductList')}>
          <Image source={{uri: item.image}} style={styles.imageD} />
          {item.refurbished && (
            <Text style={styles.refurbishedLabelD}>(Refurbished)</Text>
          )}
        </TouchableOpacity>
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
  const RecentlyView = ({item}) => (
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

  const ProductMobile = ({item}) => (
    <View style={styles.cardM}>
      <Image source={{uri: item.image}} style={styles.imageM} />
      <Text style={styles.productNameD}>{item.name}</Text>
      <Text style={styles.colorTextD}>{item.subname}</Text>
    </View>
  );
  const ProductLaptop = ({item}) => (
    <View style={styles.cardM}>
      <Image source={{uri: item.image}} style={styles.imageM} />
      <Text style={styles.productNameD}>{item.name}</Text>
      <Text style={styles.colorTextD}>{item.subname}</Text>
    </View>
  );

  const renderImageItem = ({item}) => (
    <View
      style={{width: width, height: 220, overflow: 'hidden', borderRadius: 12}}>
      <Image
        source={{uri: item}}
        style={{width: '100%', height: '100%'}}
        resizeMode="stretch"
      />
    </View>
  );

  const renderOfferItem = ({item}) => (
    <ImageBackground
      source={{uri: item.image}}
      style={styles.offerCard}
      imageStyle={styles.image}
    />
  );

  const timer = {
    days: 2,
    hours: 12,
    minutes: 34,
    seconds: 56,
  };

  const renderBox = (value, label) => (
    <View style={styles.timeContainer}>
      <View style={styles.timeBox}>
        <Text style={styles.timeValue}>{value}</Text>
      </View>
      <Text style={styles.timeLabel}>{label}</Text>
    </View>
  );

  const bulkOffer = [
    {
      id: '1',
      tag: '#brandsweek',
      title: '50% off',
      subtitle: 'On all iOS devices',
    },
    {
      id: '2',
      tag: 'New user deal',
      title: 'Free shipping & more',
      subtitle: 'Sign up as business account and get exclusive bulk deals',
    },
    {
      id: '3',
      tag: '#newin',
      title: 'NOTE 23',
      subtitle: 'Samsung new drop',
    },
  ];

  const flatListRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = event => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const goToNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < bulkOffer.length) {
      flatListRef.current?.scrollToIndex({index: nextIndex, animated: true});
      setCurrentIndex(nextIndex);
    }
  };

  const renderItem = ({item}) => (
    <View style={{width}}>
      {' '}
      {/* Full screen width */}
      <View style={styles.card_bulk}>
        <View style={styles.cardContent_bulk}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={styles.tag_bulk}>{item.tag}</Text>
              <Text style={styles.title_bulk}>{item.title}</Text>
              <Text style={styles.subtitle_bulk}>{item.subtitle}</Text>
            </View>
            <TouchableOpacity style={styles.iconBtn_bulk} onPress={goToNext}>
              <Ionicons name="chevron-forward" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  const mobileBudget = [
    {
      id: '1',
      image:
        'https://i.postimg.cc/B6HGCYW5/A-sleek-smartphone-with-a-modern-design-resting-on-a-wooden-table-surrounded-by-small-decorative-pla.png',
      name: 'Under ₹10,000',
      subname: 'Great for budget buyers',
    },
    {
      id: '2',
      image:
        'https://i.postimg.cc/B6HGCYW5/A-sleek-smartphone-with-a-modern-design-resting-on-a-wooden-table-surrounded-by-small-decorative-pla.png',
      name: '₹20,000 – ₹30,000',
      subname: 'Ideal for beginners ',
    },
    {
      id: '3',
      image:
        'https://i.postimg.cc/B6HGCYW5/A-sleek-smartphone-with-a-modern-design-resting-on-a-wooden-table-surrounded-by-small-decorative-pla.png',
      name: '₹30,000 – ₹40,000',
      subname: 'Premium selections ',
    },
  ];
  const LaptopBudget = [
    {
      id: '1',
      image:
        'https://i.postimg.cc/T3pKjD0d/A-sleek-modern-chair-with-a-minimalist-design-placed-in-a-well-lit-room-with-elegant-decor.png',
      name: 'Under ₹20,000',
      subname: 'Ideal for savvy students',
    },
    {
      id: '2',
      image:
        'https://i.postimg.cc/nrFzXjMt/A-sleek-smartphone-with-a-modern-design-resting-on-a-wooden-table-surrounded-by-small-decorative-pla.png',
      name: '₹30,000 – ₹40,000',
      subname: 'Premium selections ',
    },
    {
      id: '3',
      image:
        'https://i.postimg.cc/DZgf3v6p/A-sleek-modern-laptop-placed-on-a-wooden-desk-with-a-potted-plant-beside-it.png',
      name: 'Above ₹40,000',
      subname: 'Luxury Macbooks & Windows PC',
    },
  ];
  const AccessoriesBudget = [
    {
      id: '1',
      image:
        'https://i.postimg.cc/6prC4Rp8/A-luxurious-handbag-displayed-on-a-marble-countertop-with-soft-lighting.png',
      name: 'Under ₹10,000',
      subname: 'Perfect Accessories',
    },
    {
      id: '2',
      image:
        'https://i.postimg.cc/ryRjFDxr/A-stylish-electronic-gadget-displayed-on-a-simple-wooden-table-with-a-soft-focus-background.png',
      name: '₹10,000 – ₹20,000',
      subname: 'Premium selections ',
    },
    {
      id: '3',
      image:
        'https://i.postimg.cc/pXGLGLcs/A-stylish-collection-of-mid-range-electronics-and-home-goods-displayed-on-a-wooden-table.png',
      name: 'Above ₹20,000',
      subname: 'Best from us',
    },
  ];

  const SHOWING_DATA = [
    {
      id: '1',
      icon: 'tag',
      title: 'Dealer Volume Discounts',
      description: 'Get better rates when you buy in bulk.',
    },
    {
      id: '2',
      icon: 'message-circle',
      title: 'Request a Quote',
      description: 'You suggest the price. We mediate the deal.',
    },
    {
      id: '3',
      icon: 'shield',
      title: '15-Day Return Window',
      description: 'Test your device. Return if not satisfied.',
    },
    {
      id: '4',
      icon: 'rotate-ccw',
      title: 'Compare Products',
      description: 'Make smarter decisions with side-by-side specs.',
    },
  ];

  const GridCard = ({item}) => (
    <View style={styles.cardSD}>
      <View style={styles.iconCircleSD}>
        <Icon name={item.icon} size={20} color="#fff" />
      </View>
      <Text style={styles.cardTitleSD}>{item.title}</Text>
      <Text style={styles.cardDescriptionSD}>{item.description}</Text>
    </View>
  );

  const SUPPORT_CARDS = [
    {
      id: '1',
      icon: 'refresh-ccw',
      title: 'Video-Backed Returns',
      description: 'Sales return ticketing with secure video proof.',
    },
    {
      id: '2',
      icon: 'map-pin',
      title: 'Track Your Orders',
      description: 'Real-time updates on your deliveries.',
    },
  ];

  const SUPPORT_CARDS_renderItem = ({item}) => (
    <View style={styles.cardSUPPORT_CARDS}>
      <View style={styles.iconCircleSUPPORT_CARDS}>
        <Icon name={item.icon} size={20} color="#fff" />
      </View>
      <Text style={styles.cardTitleSUPPORT_CARDS}>{item.title}</Text>
      <Text style={styles.cardDescriptionSUPPORT_CARDS}>
        {item.description}
      </Text>
    </View>
  );

  const categories = [
    {
      id: '1',
      title: 'Android',
      image: 'https://i.postimg.cc/bvfB5mLG/Product-Image-2x.png',
    },
    {
      id: '2',
      title: 'iOS',
      image: 'https://i.postimg.cc/T1K01bCM/Product-Image-1.png',
    },
    {
      id: '3',
      title: 'Windows OS',
      image: 'https://i.postimg.cc/66419sS7/Product-Image-2.png',
    },
    {
      id: '4',
      title: 'MacOS',
      image: 'https://i.postimg.cc/Jht5PZCy/Product-Image-3.png',
    },
  ];

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header navigation={navigation} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}>
          <HeroCarousel navigation={navigation} />
          {/* <DiscoverBanner navigation={navigation} /> */}
          {/* Categories Row */}
          <FlatList
            horizontal
            data={categories}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('CategoriesSmartphones')}
                style={styles.categoryCard}>
                <Image
                  source={{uri: item.image}}
                  style={styles.categoryImage}
                />
                <Text style={styles.categoryText}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('Recentlyadd')}
            style={{flex: 1, backgroundColor: '#fff', marginHorizontal: 10}}>
            {/* Recently Added Banner */}
            <TouchableOpacity
              style={{marginTop: 16}}
              onPress={() => navigation.navigate('Recentlyadd')}>
              <ImageBackground
                source={{
                  uri: 'https://i.postimg.cc/3wdk2CDW/Banner-Background-1.png',
                }}
                style={styles.banner}
                imageStyle={{borderRadius: 12}}>
                <View style={styles.bannerOverlay}>
                  <Text style={styles.bannerText}>Recently Added</Text>
                  <Ionicons name="chevron-forward" size={20} color="#fff" />
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </TouchableOpacity>

          {/* <Section
          title="Recently Added"
          onPress={() => navigation.navigate('Recentlyadd')}>
          <FlatList
            horizontal
            data={products}
            renderItem={({item}) => <ProductCard item={item} />}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainerD}
            showsHorizontalScrollIndicator={false}
          />
        </Section> */}
          <Section
            title="Shop by brands"
            onPress={() => navigation.navigate('shopbybrand')}>
            <FlatList
              horizontal
              data={offers}
              renderItem={renderOfferItem}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.offerList}
            />
          </Section>
          {/* <Carousel
          loop
          width={width}
          height={220}
          autoPlay
          autoPlayInterval={3000}
          scrollAnimationDuration={1000}
          data={phoneImages}
          renderItem={renderImageItem}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.95,
            parallaxScrollingOffset: 0,
          }}
        /> */}

          {/* <Section
          title="Flash sale"
          onPress={() => navigation.navigate('Flashsale')}>
          <View style={styles.timerWrapper}>
            {renderBox(timer.days, 'Days')}
            {renderBox(timer.hours, 'Hours')}
            {renderBox(timer.minutes, 'Minutes')}
            {renderBox(timer.seconds, 'Seconds')}
          </View>
          <FlatList
            horizontal
            data={flashsale}
            renderItem={({item}) => <ProductCard item={item} />}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainerD}
            showsHorizontalScrollIndicator={false}
          />
          <FlatList
            ref={flatListRef}
            data={bulkOffer}
            renderItem={renderItem}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            onMomentumScrollEnd={handleScroll}
            getItemLayout={(data, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
          />
          <View style={styles.dotsContainer_bulk}>
            {bulkOffer.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot_bulk,
                  currentIndex === index && styles.activeDot_bulk,
                ]}
              />
            ))}
          </View>
        </Section> */}

          <Section title="Shop by budget">
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>Get Smartphones</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('shopbybudgetSmartphones')}>
                <Ionicons name="chevron-forward" size={20} color="#333" />
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal
              data={mobileBudget}
              renderItem={({item}) => <ProductMobile item={item} />}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.listContainerD}
              showsHorizontalScrollIndicator={false}
            />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>Get Macbooks & Windows PC</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('shopbybudgetWindowsMacbook')
                }>
                <Ionicons name="chevron-forward" size={20} color="#333" />
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal
              data={LaptopBudget}
              renderItem={({item}) => <ProductLaptop item={item} />}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.listContainerD}
              showsHorizontalScrollIndicator={false}
            />
            {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>Get Accessories</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('shopbybudgetAccessories')}>
              <Ionicons name="chevron-forward" size={20} color="#333" />
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            data={AccessoriesBudget}
            renderItem={({item}) => <ProductLaptop item={item} />}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainerD}
            showsHorizontalScrollIndicator={false}
          /> */}
          </Section>

          <Section
            title="Recently Viewed"
            onPress={() => navigation.navigate('RecentlyView')}>
            <FlatList
              horizontal
              data={recentlyView}
              renderItem={({item}) => <RecentlyView item={item} />}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.listContainerD}
              showsHorizontalScrollIndicator={false}
            />
            {/* <View style={styles.cardDO}>
            <Image
              source={{
                uri: 'https://i.postimg.cc/Bvkjbnfh/Depth-4-Frame-1-1.png',
              }}
              style={styles.imageDO}
              resizeMode="cover"
            />
            <View style={styles.contentDO}>
              <Text style={styles.titleDO}>Dealer Offer</Text>
              <Text style={styles.subtitleDO}>
                Unlock exclusive deals on bulk orders.{'\n'}
                Perfect for resellers and businesses.
              </Text>
              <TouchableOpacity style={styles.buttonDO}>
                <Text style={styles.buttonTextDO}>Explore Bulk Offers</Text>
              </TouchableOpacity>
            </View>
          </View> */}
            <ImageBackground
              style={{
                height: 200,
                width: '100%',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}
              source={require('../../../assets/images/gstrate.png')}></ImageBackground>

            {/* Grade A1 to A9  */}
          </Section>
          <View
            style={{
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
              source={require('../../../assets/images/mini.png')} // Replace with your image path
              style={styles.imageG}
              resizeMode="contain"
            />
          </View>
          {/* <FlatList
          data={SHOWING_DATA}
          renderItem={({item}) => <GridCard item={item} />}
          keyExtractor={item => item.id}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.gridSD}
          columnWrapperStyle={styles.rowSD}
        /> */}

          <Section title="More Features">
            <FlatList
              data={SUPPORT_CARDS}
              renderItem={SUPPORT_CARDS_renderItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.containerSUPPORT_CARDS}
            />
          </Section>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const Header = ({navigation}) => (
  <View
    style={{
      backgroundColor: '#1ca147',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 16,
      justifyContent: 'space-between',
    }}>
    <Text
      style={{
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 1,
      }}>
      MOBI TRADE
    </Text>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <TouchableOpacity
        style={{
          backgroundColor: '#fff',
          borderRadius: 20,
          paddingHorizontal: 16,
          paddingVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
          marginRight: 12,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.2,
          shadowRadius: 2,
          elevation: 2,
        }}>
        <MaterialCommunityIcons name="cube-outline" size={24} color="#555" />
        <Text
          style={{
            fontSize: 16,
            marginLeft: 8,
            color: '#333',
            fontWeight: '500',
          }}>
          Bulk Deals
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Search')}>
        <EvilIcons name="search" size={45} color="#fff" />
      </TouchableOpacity>
    </View>
  </View>
);

const HeroCarousel = ({navigation}) => (
  <LinearGradient
    colors={['#FFFBFA', '#666666', '#1C9C48', '#EAE6E5']}
    locations={[1, 1, 0.3, 1]}>
    <Swiper
      showsPagination
      dotStyle={styles.dot}
      activeDotStyle={styles.activeDot}
      autoplay
      loop
      style={styles.swiper}>
      {carouselData.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            if (item.id === 1) {
              navigation.navigate('carousel1'); // Replace with your screen name
            } else if (item.id === 2) {
              navigation.navigate('carousel2');
            } else if (item.id === 3) {
              navigation.navigate('carousel3');
            }
          }}>
          <ImageBackground
            source={{uri: item.image}}
            style={styles.card_Top}
            imageStyle={styles.image}>
            <View style={styles.textContainer}>
              {item.subtitle && (
                <Text
                  style={[
                    styles.subtitleT,
                    {
                      color: item.subtitleColor || '#fff',
                      marginTop: item.subtitleMarginTop || 0,
                      marginLeft: item.marginLeft || 0,
                      width: item.width,
                    },
                  ]}>
                  {item.subtitle}
                </Text>
              )}
              <Text
                style={[
                  styles.titleT,
                  {
                    color: item.titleColor,
                    marginLeft: item.titleMarginLeft ?? 40,
                    marginTop: item.titleMarginTop ?? 0,
                    fontSize: item.titleFontSize ?? item.fontSize,
                    width: item.titlewidth ?? item.width,
                    fontWeight: item.fontWeight,
                  },
                ]}>
                {item.title}
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      ))}
    </Swiper>
  </LinearGradient>
);

const DiscoverBanner = ({navigation}) => (
  <View style={{margin: 16}}>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
      }}>
      <Text style={{fontSize: 20, fontWeight: '600', color: '#222'}}>
        Categories
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
        <Ionicons name="chevron-forward" size={20} color="#333" />
      </TouchableOpacity>
    </View>
  </View>
);

const Section = ({title, children, onPress}) => (
  <View style={{marginTop: 15, paddingHorizontal: 16}}>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
      }}>
      <Text style={{fontSize: 20, fontWeight: '600', color: '#222'}}>
        {title}
      </Text>
      {title !== 'More Features' && title !== 'Shop by budget' ? (
        <TouchableOpacity onPress={onPress}>
          <Ionicons name="chevron-forward" size={20} color="#333" />
        </TouchableOpacity>
      ) : null}
    </View>
    {children}
  </View>
);

export default HomeScreen;
