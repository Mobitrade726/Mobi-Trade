import React from 'react';
import {
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import WishlistCard from './WishlistCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { removeFromWishlist } from '../../../../redux/removeFromWishlist';

const WishlistScreen = ({ navigation }) => {
  const wishlist = useSelector(state => state.wishlist);
  const dispatch = useDispatch();

  // Remove handler
  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
  };

  const renderItem = ({ item }) => (
    <WishlistCard data={item} onRemove={handleRemove} />
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Ionicons name="chevron-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Wishlist</Text>
      </View>

      {/* If empty */}
      {wishlist.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No items in wishlist</Text>
        </View>
      ) : (
        <FlatList
          data={wishlist}
          renderItem={renderItem}
          keyExtractor={item => item.id?.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}

      {/* Bottom Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('SubWatchList')}
        style={styles.bottomButton}>
        <Text style={styles.continueText}>Continue Shopping</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default WishlistScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight || 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    position: 'relative',
    height: 50,
  },
  backButton: {
    position: 'absolute',
    left: 15,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
  bottomButton: {
    backgroundColor: '#1C1C1C',
    paddingVertical: 16,
    margin: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

