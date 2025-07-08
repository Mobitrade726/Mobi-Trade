import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-reanimated-carousel';
import MaskedView from '@react-native-masked-view/masked-view';
import {styles, stylesSupport} from '../Home/styles';

const reviews = [
  {
    id: '1',
    title: 'Great Service!',
    message: 'I had a wonderful experience with Mobitrade.',
    name: 'Aurelia Nightshade',
    date: '2 days ago',
    rating: 5,
  },
  {
    id: '2',
    title: 'Outstanding Experience!',
    message:
      'I had an exceptional interaction with Mobitrade, their support team was incredibly responsive.',
    name: 'Jasper Greenfield',
    date: '1 day ago',
    rating: 5,
  },
  {
    id: '3',
    title: 'Exceptional Support!',
    message: 'The team was extremely helpful and resolved my issues quickly.',
    name: "Liam O'Reilly",
    date: '1 week ago',
    rating: 4,
  },
];

const RatingStars = ({rating}) => (
  <View style={{flexDirection: 'row', alignItems: 'center'}}>
    {[...Array(5)].map((_, i) => (
      <Ionicons
        key={i}
        name={i < rating ? 'star' : 'star-outline'}
        size={24}
        color="#22c55e"
      />
    ))}
  </View>
);

const TestimonialCard = ({item}) => {
  const cardBackground = item.id === '3' ? '#fff' : '#ecfeff';

  return (
    <View style={[styles.card_r, {backgroundColor: cardBackground}]}>
      <View style={styles.cardHeader_r}>
        <Text style={styles.cardTitle_r}>{item.title}</Text>
        <Text style={styles.ratingText_r}>⭐ {item.rating} stars</Text>
      </View>
      <Text style={styles.message_r}>{item.message}</Text>
      <View style={styles.userInfo_r}>
        <Ionicons name="person-circle-outline" size={18} />
        <Text style={styles.userText_r}>{`${item.name} • ${item.date}`}</Text>
      </View>
    </View>
  );
};

const TestimonialSection = () => (
  <View style={{padding: 15}}>
    <View style={styles.headerRow_r}>
      <Text style={styles.header_r}>What Our Users Say</Text>
      <Text style={styles.link_r}>See All Reviews</Text>
    </View>
    <View style={styles.ratingRow_r}>
      <Text style={styles.rating_r}>4.0</Text>
      <View>
        <RatingStars rating={4} />
        <Text style={styles.totalReviews_r}>1,234</Text>
      </View>
    </View>

    <FlatList
      data={reviews}
      keyExtractor={item => item.id}
      renderItem={({item}) => <TestimonialCard item={item} />}
    />
  </View>
);

const SupportMenu = () => {
  const [open, setOpen] = useState(false);

  const menuItems = [
    'Help and Support',
    'Chat Support',
    'Explore',
    'View Wallet',
    'View Orders',
  ];

  return (
    <View style={stylesSupport.container}>
      {open && (
        <View style={stylesSupport.menu}>
          {menuItems.map((item, index) => (
            <Text key={index} style={stylesSupport.menuItem}>
              {item}
            </Text>
          ))}
        </View>
      )}

      <TouchableOpacity
        onPress={() => setOpen(!open)}
        style={stylesSupport.floatingButton}>
        <Ionicons name="chatbubble-ellipses-outline" size={30} color="#fff" />
        <View style={stylesSupport.badge}>
          <Text style={stylesSupport.badgeText}>16</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const {width} = Dimensions.get('window');

const phoneImages = [
  'https://i.postimg.cc/FKvpsBn8/Vector-2.png',
  'https://i.postimg.cc/KvyVpp04/web-banner-or-horizontal-template-design-with-special-offer-on-mobile-phones-for-advertising-concept.png',
  'https://i.postimg.cc/Hn1SKj4F/realistic-detailed-3d-mobile-phone-big-sale-banner-concept-ad-poster-card-vector.png',
];

const offers = [
  {
    id: '1',
    title: 'Summer Sale',
    subtitle: 'Up to 50% off',
  },
  {
    id: '2',
    title: 'Exclusive Deals',
    subtitle: 'Members only',
  },
  {
    id: '3',
    title: 'HR Deals',
    subtitle: 'Members',
  },
];

const HomeScreen = ({navigation}) => {
  // Categories, products, etc.
  const Categories = [
    {id: '1', title: 'Buy Now', desc: 'Latest Laptops'},
    {id: '2', title: 'Trending', desc: 'Smartphones'},
    {id: '3', title: 'Offers', desc: 'Accessories'},
    {id: '4', title: 'New Arrivals', desc: 'Tablets'},
  ];

  const CATEGORIES = ['New Arrivals', 'Mobile', 'Laptop', 'Macbook'];

  const [searchText, setSearchText] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchIcon, setSearchIcon] = useState('phone-portrait-outline');

  const categories = [
    {name: 'Smartphones', icon: 'phone-portrait-outline'},
    {name: 'Windows pc', icon: 'laptop-outline'},
    {name: 'Macbook', icon: 'laptop-outline'},
    {name: 'Accessories', icon: 'watch-outline'},
  ];

  const CATEGORIES_GRADE = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7'];

  const mobileData = [
    {id: '1', name: 'Galaxy Z Fold 5', price: '₹1,49,999', image: ''},
    {id: '2', name: 'Xiaomi 13 Pro', price: '₹99,999', image: ''},
  ];
  const mobileData_Grade = [
    {
      id: '1',
      name: 'Redmi 13 5G',
      image: 'https://i.postimg.cc/VL2jJkfS/81-Q9jp-YOFd-L-2x.png',
    },
    {
      id: '2',
      name: 'Redmi 13 5G',
      image: 'https://i.postimg.cc/VL2jJkfS/81-Q9jp-YOFd-L-2x.png',
    },
    {
      id: '3',
      name: 'Redmi 13 5G',
      image: 'https://i.postimg.cc/VL2jJkfS/81-Q9jp-YOFd-L-2x.png',
    },
    {
      id: '4',
      name: 'Redmi 13 5G',
      image: 'https://i.postimg.cc/VL2jJkfS/81-Q9jp-YOFd-L-2x.png',
    },
  ];

  const featuredProducts = [
    {id: '1', name: 'Apple iPhone 14', storage: '128GB', price: '₹30,799'},
    {id: '2', name: 'Samsung Galaxy S23', storage: '256GB', price: '₹30,799'},
    {id: '3', name: 'Google Pixel 7', storage: '128GB', price: '₹30,799'},
    {id: '4', name: 'OnePlus 11', storage: '256GB', price: '₹30,799'},
    {id: '5', name: 'Microsoft Pro 9', storage: '512GB', price: '₹30,799'},
    {id: '6', name: 'Microsoft Pro 10', storage: '512GB', price: '₹30,799'},
  ];

  const [activeTab, setActiveTab] = useState('Mobile');
  const [quantities, setQuantities] = useState(
    Object.fromEntries(featuredProducts.map(item => [item.id, 1])),
  );

  const increment = id => {
    setQuantities(prev => ({...prev, [id]: prev[id] + 1}));
  };

  const decrement = id => {
    setQuantities(prev => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  // Categories
  const renderCategory = ({item}) => (
    <>
      <View style={{marginBottom: 10}}>
        <View style={styles.card}>
          <Text style={styles.imageIcon}>🖼️</Text>
        </View>
        <View style={{marginHorizontal: 10}}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 15,
                fontFamily: 'Source Serif 4',
                marginBottom: 2,
                marginTop: 5,
              }}>
              {item?.title}
            </Text>
          </View>
          <Text
            style={{
              fontWeight: 'regular',
              fontSize: 13,
              fontFamily: 'Source Serif 4',
            }}>
            {item?.desc}
          </Text>
        </View>
      </View>
    </>
  );

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
  //Grade Tabs
  const renderTabs_Grade = () => (
    <View style={styles.tabContainer}>
      {CATEGORIES_GRADE.map(category => (
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

  // Product Card
  const renderProduct = ({item}) => (
    <View style={{marginBottom: 10, marginTop: 15}}>
      <View style={styles.card}>
        <Text style={styles.imageIcon}>🖼️</Text>
      </View>
      <View style={{marginHorizontal: 10}}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 15,
              fontFamily: 'Source Serif 4',
              marginBottom: 2,
              marginTop: 5,
            }}>
            {item?.name}
          </Text>
        </View>
        <Text
          style={{
            fontWeight: 'regular',
            fontSize: 13,
            fontFamily: 'Source Serif 4',
          }}>
          {item?.price}
        </Text>
      </View>
    </View>
  );

  // Featured Product Card
  const renderProductFeature = ({item}) => (
    <View style={styles.productCard}>
      <View style={styles.imagePlaceholder}>
        <Text style={styles.imageIcon}>🖼️</Text>
      </View>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.storage}>{item.storage}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>

      {/* Quantity Selector */}
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => decrement(item.id)}>
          <Text style={styles.quantityText}>−</Text>
        </TouchableOpacity>
        <View style={styles.quantityBox}>
          <Text style={styles.quantityNumber}>{quantities[item.id]}</Text>
        </View>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => increment(item.id)}>
          <Text style={styles.quantityText}>＋</Text>
        </TouchableOpacity>
      </View>

      {/* Buy Now Button */}
      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyButtonText}>Buy Now</Text>
      </TouchableOpacity>
    </View>
  );

  const renderProduct_Grade = ({item}) => (
    <View style={styles.cardWrapper_g}>
      <View style={styles.card_g}>
        <ImageBackground
          source={{uri: item.image}}
          style={styles.imageBackground_g}
          imageStyle={{borderTopLeftRadius: 20, borderTopRightRadius: 20}}
          resizeMode="stretch">
          <LinearGradient
            colors={['#d2f7d1', '#22c55e']}
            style={styles.gradientBox_g}>
            <Text style={styles.productName_g}>{item.name}</Text>
          </LinearGradient>
        </ImageBackground>
      </View>
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
      source={{uri: 'https://i.postimg.cc/j2TZPRYT/whiteimage.jpg'}} // Background image
      style={styles.offerCard}
      imageStyle={styles.offerImageBackground}>
      <Text style={styles.offerTitle}>{item.title}</Text>
      <Text style={styles.offerSubtitle}>{item.subtitle}</Text>
    </ImageBackground>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        {/* Menu icon */}
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.avatar}>
          <Ionicons name="menu-outline" size={30} color="#42A5D5" />
        </TouchableOpacity>

        {/* Company logo */}
        <Image
          source={require('../../../assets/images/Logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Profile icon */}
        <Ionicons name="person-circle" size={40} color="#42A5D5" />
      </View>

      {/* Scrollable content starts here */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        {/* Hero Section */}
        <ImageBackground
          source={require('../../../assets/images/homeboard.png')}
          style={styles.hero}>
          <View style={{margin: 15}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 2,
                borderColor: 'green',
                borderRadius: 12,
                paddingHorizontal: 10,
                backgroundColor: '#fff',
              }}>
              {/* 🔄 Icon that changes */}
              <Ionicons name={searchIcon} size={24} color="#333" />

              <TextInput
                style={{flex: 1, padding: 10, fontSize: 16}}
                placeholder="Search devices..."
                placeholderTextColor="#888"
                value={searchText}
                onChangeText={text => {
                  setSearchText(text);
                  setShowDropdown(true);

                  // Dynamically update icon based on match
                  const match = categories.find(c =>
                    c.name.toLowerCase().includes(text.toLowerCase()),
                  );
                  if (match) {
                    setSearchIcon(match.icon);
                  } else {
                    setSearchIcon('search'); // fallback icon
                  }
                }}
              />

              <TouchableOpacity onPress={() => {}}>
                <Ionicons name="mic-outline" size={26} color="#11A5D7" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Ionicons
                  name="search"
                  size={26}
                  color="#11A5D7"
                  style={{marginLeft: 10}}
                />
              </TouchableOpacity>
            </View>

            {/* Dropdown suggestions */}
            {showDropdown && (
              <View
                style={{
                  backgroundColor: '#fff',
                  borderWidth: 2,
                  borderColor: 'green',
                  borderTopWidth: 0,
                  borderBottomLeftRadius: 12,
                  borderBottomRightRadius: 12,
                  paddingVertical: 5,
                }}>
                {categories
                  .filter(item =>
                    item.name.toLowerCase().includes(searchText.toLowerCase()),
                  )
                  .map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setSearchText(item.name);
                        setSearchIcon(item.icon);
                        setShowDropdown(false);
                      }}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 10,
                        paddingLeft: 15,
                        gap: 10,
                      }}>
                      <Ionicons name={item.icon} size={22} color="#333" />
                      <Text style={{fontSize: 16, color: '#333'}}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </View>
            )}
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              marginLeft: 15,
              marginTop: 150,
            }}>
            <MaskedView
              maskElement={
                <Text
                  style={[styles.subtitle, {backgroundColor: 'transparent'}]}>
                  Explore the latest in tech
                </Text>
              }>
              <LinearGradient
                colors={['#11A5D7', '#1C9C48']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <Text style={[styles.subtitle, {opacity: 0}]}>
                  Explore the latest in tech
                </Text>
              </LinearGradient>
            </MaskedView>
            <MaskedView
              maskElement={
                <Text style={[styles.title, {backgroundColor: 'transparent'}]}>
                  Welcome to{'\n'}
                  Mobi Trade
                </Text>
              }>
              <LinearGradient
                colors={['#11A5D7', '#1C9C48']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <Text style={[styles.title, {opacity: 0}]}>
                  Welcome to{'\n'}
                  Mobi Trade
                </Text>
              </LinearGradient>
            </MaskedView>
            <TouchableOpacity style={styles.shopBtn}>
              <LinearGradient
                colors={['#11A5D7', '#1C9C48']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={{borderRadius: 16, height: 40}}>
                <Text style={styles.shopBtnText}>Shop</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {/* Categories Section */}
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={Categories}
          renderItem={renderCategory}
          horizontal
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
        {/* Tabs Section */}
        {renderTabs()}
        {activeTab === 'Mobile' && (
          <>
            <FlatList
              data={mobileData}
              renderItem={renderProduct}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
            <Text style={styles.seeMore}>See more ...</Text>
          </>
        )}

        <ImageBackground
          style={{
            height: 200,
            width: '100%',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}
          source={require('../../../assets/images/gradebyimage.png')}>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 22, fontWeight: 'bold', color: '#FFFBFA'}}>
              Get Products
            </Text>
            {/* adding some space manually with margin */}
            <View style={{width: 40}} />
            <Text style={{fontSize: 22, fontWeight: 'bold', color: '#FFFBFA'}}>
              by Grade
            </Text>
          </View>
        </ImageBackground>

        {renderTabs_Grade()}
        {activeTab === 'A1' && (
          <>
            <FlatList
              data={mobileData_Grade}
              renderItem={renderProduct_Grade}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </>
        )}

        <ImageBackground
          style={{
            height: 200,
            width: '100%',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            marginVertical: 10,
          }}
          source={require('../../../assets/images/gstrate.png')}></ImageBackground>

        {/* Featured Section */}
        <View style={{marginHorizontal: 2}}>
          <View style={styles.header1}>
            <Text style={styles.title1}>Featured Products</Text>
            <Text style={styles.arrow1}>&gt;</Text>
          </View>
          <FlatList
            data={featuredProducts}
            keyExtractor={item => item?.id}
            renderItem={renderProductFeature}
            numColumns={2}
            contentContainerStyle={styles.productList1}
          />
        </View>
        {/* Phone Promo Banner Carousel */}
        <Carousel
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
        />
        <View style={{marginHorizontal: 10}}>
          {/* Offer FlatList */}
          <FlatList
            data={offers}
            keyExtractor={item => item.id}
            renderItem={renderOfferItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.offerList}
          />

          {/* CTA Buttons */}
          <TouchableOpacity style={styles.greenButton}>
            <Text style={styles.greenButtonText}>Shop more Phones</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.darkButton}>
            <Text style={styles.darkButtonText}>
              Shop more Laptops & Macbooks
            </Text>
          </TouchableOpacity>
        </View>

        <TestimonialSection />
        <SupportMenu />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
