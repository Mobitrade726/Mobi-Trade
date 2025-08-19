import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const {width} = Dimensions.get('window');

const shopbybrand = ({navigation}) => {
  const [search, setSearch] = useState('');

  const CATEGORIES = ['Android', 'iOS', 'Windows', 'Macbook'];

  const mobileData = [
    {
      id: '1',
      name: 'Samsung',
      image: 'https://i.postimg.cc/0NLZqrRY/Depth-5-Frame-0-1.png',
    },
    {
      id: '2',
      name: 'OnePlus',
      image: 'https://i.postimg.cc/HnQ77sNC/Depth-5-Frame-0-2.png',
    },
    {
      id: '3',
      name: 'Xiaomi',
      image: 'https://i.postimg.cc/7LfGnNR9/Depth-5-Frame-0-3.png',
    },
    {
      id: '4',
      name: 'Oppo',
      image: 'https://i.postimg.cc/kXzk5Mm5/Depth-5-Frame-0-4.png',
    },
    {
      id: '5',
      name: 'Vivo',
      image: 'https://i.postimg.cc/xTJ4BrzV/Depth-5-Frame-0-6.png',
    },
    {
      id: '6',
      name: 'Realme',
      image: 'https://i.postimg.cc/d0Kp8WDP/Depth-5-Frame-0-5.png',
    },
    {
      id: '7',
      name: 'Motorola',
      image: 'https://i.postimg.cc/QCR0jtTG/Depth-5-Frame-0-8.png',
    },
    {
      id: '8',
      name: 'Google',
      image: 'https://i.postimg.cc/tgXDq8YT/Depth-5-Frame-0-9.png',
    },
  ];

  const [activeTab, setActiveTab] = useState('Android');

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

  const renderProduct = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('shopbybrandfilter')}
      style={styles.cardContainer}>
      <Image
        source={{uri: item.image}}
        style={styles.cardImage}
        resizeMode="contain"
      />
      <Text style={styles.cardLabel}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Scrollable content starts here */}
      <ScrollView>
        <View style={{margin: 10}}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}>
              <Ionicons name="chevron-back" size={22} color="#000" />
            </TouchableOpacity>
            <View>
              <Text style={styles.headerTitle}>Shop by Brands</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <Ionicons name="search" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Tabs Section */}
          {renderTabs()}

          <View style={styles.containersearch}>
            <TextInput
              style={styles.inputsearch}
              placeholder="Search Brands..."
              placeholderTextColor="#777"
              value={search}
              onChangeText={setSearch}
            />
            <EvilIcons
              name="search"
              size={22}
              color="#00AEEF"
              style={styles.iconsearch}
            />
          </View>

          {activeTab === 'Android' && (
            <>
              <FlatList
                data={mobileData}
                renderItem={renderProduct}
                keyExtractor={item => item.id}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={{paddingBottom: 20}}
              />
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
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
    left: 0,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
  cardContainer: {
    width: (width - 48) / 2, // Adjust for 2 cards + margins
    marginBottom: 12,
    marginTop: 10,
    marginHorizontal: 8,
  },

  cardImage: {
    width: '100%',
    aspectRatio: 1, // Square image
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
  },

  cardLabel: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },

  micIcon: {marginLeft: 'auto'},
  imagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#aaa',
  },
  imageIcon: {fontSize: 20},
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginTop: 10,
  },
  tabText: {fontWeight: '600', color: 'gray', fontSize: 16},
  activeTabText: {color: 'black', borderBottomWidth: 2, borderColor: 'black'},
  productList: {padding: 10},
  productCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 5,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  productName: {fontWeight: 'bold', fontSize: 14},
  productPrice: {fontSize: 14, color: 'gray'},

  containersearch: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  inputsearch: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  iconsearch: {
    marginLeft: 8,
  },
});

export default shopbybrand;
