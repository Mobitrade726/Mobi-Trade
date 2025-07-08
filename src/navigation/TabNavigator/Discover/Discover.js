import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const Categories = [
  {
    title: 'Mobile Phones',
    color: '#C5E3D0',
    image: require('../../../../assets/images/iphone1.png'), // Update path
    brands: [
      {name: 'Apple', items: '128 Items'},
      {name: 'Samsung', items: '40 Items'},
      {name: 'Xiaomi', items: '36 Items'},
      {name: 'Motorola', items: '36 Items'},
      {name: 'Oppo', items: '36 Items'},
      {name: 'Vivo', items: '12 Items'},
      {name: 'Lava', items: '9 Items'},
    ],
  },
  {
    title: 'Laptop',
    color: '#B9D9E9',
    image: require('../../../../assets/images/dell.png'), // Update path
  },
  {
    title: 'MacBook',
    color: '#D3D3D3',
    image: require('../../../../assets/images/mac.png'), // Update path
  },
  {
    title: 'Accessories',
    color: '#D3D3D3',
    image: require('../../../../assets/images/charger.png'), // Update path
  },
];

const Discover = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const handlePress = index => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Search Section */}
        <View style={styles.search}>
          <Ionicons name="search-outline" size={20} color="#00b894" />
          <TextInput
            style={styles.textInput}
            placeholder="Search devices..."
            placeholderTextColor="#666"
          />
          <Ionicons name="mic-outline" size={20} color="#00b894" />
        </View>

        {/* Categories Section */}
        {Categories.map((item, index) => (
          <View key={index}>
            <TouchableOpacity
              style={{...styles.card, backgroundColor: item.color}}

              onPress={() => handlePress(index)}>
              {/* Title Section */}
              <View style={styles.textWrapper}>
                <Text style={styles.cardText}>{item.title.toUpperCase()}</Text>
              </View>

              {/* Image Section with circles in the background */}
              <View style={styles.imageWrapper}>
                <View style={styles.circleLarge}>
                   <View style={styles.circleSmall}>
                      {/* Your phone/image */}
                      <Image
                        source={item.image}
                        style={styles.cardImage}
                        resizeMode="contain"
                      />
                   </View>
                </View>
              </View>

 
            </TouchableOpacity>

            {/* Brands Section (Visible if expanded) */}
            {expandedIndex === index && (
              <View style={styles.brandList}>
                {item.brands?.map((brand, i) => (
                   <View key={i} style={styles.brand}>
                     <View style={{flexDirection:'row', alignItems:'center', flex:1}}>
                       <Text style={styles.brandName}>{brand.name}</Text>
                     </View>

                     <View style={{flexDirection:'row', alignItems:'center'}}>
                       <Text style={styles.brandItems}>{brand.items}</Text>
                       <SimpleLineIcons name="arrow-right" size={15} color="#666" style={{marginLeft: 10}} />
                     </View>
                   </View>
                 ))}
              </View>
            )}

          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({ 
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    color: '#000',
    fontSize: 16,
  },
  card: {
    borderRadius: 30,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  textWrapper: {
    flex: 1,
  },
  cardText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleLarge: {
    width: 140,
    height: 140,
    borderRadius: 80,
    backgroundColor: 'rgba(0, 128, 0, 0.2)', // Soft green circle
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleSmall: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 128, 0, 0.4)', // Stronger green circle
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    width: '110%',
    height: '110%',
  },
  brandList: {
    paddingLeft: 20,
    paddingBottom: 20,
    marginBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  brand: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor:'rgba(0,0,0,0.1)'
  },
  brandName: {
    color: "#000",
    fontSize: 18,
  },
  brandItems: {
    color: "#666",
    fontSize: 16,
  }
});

export default Discover;
