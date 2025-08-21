import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {toggleWishlist} from '../../redux/slices/homeSlice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/Feather'; // or use MaterialIcons, etc.
import {styles} from './styles'; // adjust path if needed

// ✅ import custom components
import HeroCarousel from './HeroCarousel';
import Section from './Section';
import Header from './Header';

const Home = ({navigation}) => {
  const {
    carouselData,
    categories,
    uri,
    mobileBudget,
    LaptopBudget,
    offers,
    recentlyView, SUPPORT_CARDS,
  } = useSelector(state => state.home);
  const dispatch = useDispatch();

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

  const RecentlyView = ({item}) => (
    <View style={styles.cardD}>
      <View style={styles.imageContainerD}>
        <Image source={{uri: item.image}} style={styles.imageD} />
        {item.refurbished && (
          <Text style={styles.refurbishedLabelD}>(Refurbished)</Text>
        )}
        <TouchableOpacity
          style={styles.heartIconD}
          onPress={() => dispatch(toggleWishlist(item.id))}>
          <Ionicons
            name={item.wishlist ? 'heart' : 'heart-outline'}
            size={20}
            color={item.wishlist ? 'red' : '#333'}
          />
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

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        {/* Carousel */}
        <HeroCarousel data={carouselData} navigation={navigation} />
        <FlatList
          horizontal
          data={categories}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('CategoriesSmartphones')}
              style={styles.categoryCard}>
              <Image source={{uri: item.image}} style={styles.categoryImage} />
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
                uri: uri?.url,
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
        {/* Offers */}
        <Section
          title="Shop by brands"
          onPress={() => navigation.navigate('shopbybrand')}>
          <FlatList
            horizontal
            data={offers}
            renderItem={({item}) => (
              <ImageBackground
                source={{uri: item.image}}
                style={styles.offerCard}
                imageStyle={styles.image}
              />
            )}
            keyExtractor={item => item.id.toString()}
            showsHorizontalScrollIndicator={false}
          />
        </Section>

        <Section title="Shop by budget">
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>Get Macbooks & Windows PC</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('shopbybudgetWindowsMacbook')}>
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

        {/* Recently Viewed */}
        <Section
          title="Recently Viewed"
          onPress={() => navigation.navigate('RecentlyView')}>
          <FlatList
            horizontal
            data={recentlyView}
            renderItem={({item}) => <RecentlyView item={item} />}
            keyExtractor={item => item.id.toString()}
            showsHorizontalScrollIndicator={false}
          />
        </Section>
        <ImageBackground
          style={{
            height: 200,
            width: '100%',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}
          source={require('../../../assets/images/gstrate.png')}></ImageBackground>
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
  );
};

export default Home;
