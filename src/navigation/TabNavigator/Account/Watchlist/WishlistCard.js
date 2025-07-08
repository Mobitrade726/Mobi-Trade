import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const WishlistCard = ({data}) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        {/* Image & Grade */}
        <View style={styles.imageContainer}>
          <Image
            source={{uri: data.image}}
            style={styles.image}
          />
          <View style={styles.gradeTag}>
            <Text style={styles.gradeText}>Grade {data.grade}</Text>
          </View>
        </View>

        {/* Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{data.title}</Text>
            <TouchableOpacity style={styles.heartBtn}>
              <AntDesign name="heart" size={16} color="#E74C3C" />
            </TouchableOpacity>
          </View>
          <Text style={styles.subtitle}>{data.subtitle}</Text>
          <Text style={styles.specs}>{data.specs}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>{data.price}</Text>
            <Text style={styles.originalPrice}>{data.originalPrice}</Text>
          </View>
          <Text style={styles.warranty}>{data.warranty}</Text>

          {/* Compare Button */}
          <TouchableOpacity style={styles.compareBtn}>
            <Ionicons name="swap-horizontal" size={14} color="#333" />
            <Text style={styles.compareText}>Compare</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Move to Cart */}
      <TouchableOpacity style={styles.cartBtn}>
        <Ionicons name="cart-outline" size={16} color="#fff" />
        <Text style={styles.cartText}>Move to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 14,
    marginBottom: 16,
    padding: 10,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  row: {
    flexDirection: 'row',
  },
  imageContainer: {
    width: 140,
    height: 140,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  gradeTag: {
    position: 'absolute',
    bottom: 2,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 7,
    paddingHorizontal: 12,
    paddingVertical: 4,
    elevation: 2,
    width: '98%',
  },
  gradeText: {
    fontWeight: '600',
    fontSize: 12,
    textAlign: 'center',
  },
  detailsContainer: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    flex: 1,
    paddingRight: 20,
  },
  heartBtn: {
    position: 'absolute',
    top: -4,
    right: -10,
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 20,
    elevation: 3,
  },
  subtitle: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
  specs: {
    fontSize: 12,
    marginTop: 6,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  originalPrice: {
    fontSize: 13,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  warranty: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  compareBtn: {
    flexDirection: 'row',
    borderColor: '#666666',
    borderWidth: 2,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginTop: 8,
    gap: 6,
    justifyContent: 'center',
  },
  compareText: {
    fontSize: 12,
    color: '#333',
  },
  cartBtn: {
    marginTop: 12,
    backgroundColor: '#1C1C1C',
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  cartText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default WishlistCard;
