import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const categories = [
  {
    id: '1',
    title: 'Android',
    image: 'https://i.postimg.cc/jSKpxm1r/Product-Image-4.png',
  },
  {
    id: '2',
    title: 'iOS',
    image: 'https://i.postimg.cc/hGZ60jtS/Product-Image-5.png',
  },
  {
    id: '3',
    title: 'Windows OS',
    image: 'https://i.postimg.cc/vZ3NQB9W/Product-Image-7.png',
  },
  {
    id: '4',
    title: 'MacOS',
    image: 'https://i.postimg.cc/wxL41FLx/Product-Image-8.png',
  },
];

const Categories = ({navigation}) => {
  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('CategoriesSmartphones')}
      style={styles.card}>
      <Image
        source={{uri: item.image}}
        style={styles.cardImage}
        resizeMode="contain"
      />
      <Text style={styles.cardTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Ionicons name="chevron-back" size={22} color="#000" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Categories</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Ionicons name="search" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Category Grid */}
        <FlatList
          data={categories}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 0,
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
  list: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardImage: {
    width: 120,
    height: 140,
  },
  cardTitle: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
  },
});

export default Categories;
