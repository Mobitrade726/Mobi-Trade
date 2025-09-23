import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Enable LayoutAnimation on Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const faqData = [
  {
    question: 'How do I place an order?',
    answer:
      'Tap on a product → Add to cart → Proceed to checkout → Select payment → Confirm order.',
  },
  {
    question: 'Can I cancel my order?',
    answer: 'Orders can be canceled within 30 minutes of placement from the ‘My Orders’ section.',
  },
  {
    question: 'What is the quality of refurbished products?',
    answer: 'All products are graded (A1–A9) and refurbished by Mobitrade experts',
  },
  {
    question: 'Do you offer bulk discounts?',
    answer: 'Yes, discounts vary by product and quantity. Check the product page for details.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'UPI, Net Banking, Debit/Credit Cards, and Wallet payments.',
  },
];

const FAQsScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const filteredFaqs = faqData.filter(item =>
    item.question.toLowerCase().includes(search.toLowerCase()),
  );

  const renderItem = ({item, index}) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.cardHeader}
        onPress={() => toggleExpand(index)}
        activeOpacity={0.7}>
        <Text style={styles.question}>{item.question}</Text>
        <Ionicons
          name={expandedIndex === index ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#333"
        />
      </TouchableOpacity>
      {expandedIndex === index && (
        <Text style={styles.answer}>{item.answer}</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Ionicons name="chevron-back" size={22} color="#000" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>FAQs</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      <View style={{padding: 16}}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#4CAF50"
            style={{marginRight: 8}}
          />
          <TextInput
            placeholder="Search questions..."
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
            placeholderTextColor="#999"
          />
        </View>

        {/* FAQ List */}
        <FlatList
          data={filteredFaqs}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{paddingBottom: 80}}
        />
      </View>

      {/* See More FAQs Button */}
      <TouchableOpacity style={styles.moreButton}>
        <Text style={styles.moreButtonText}>See more FAQs</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FAQsScreen;

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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAF6EF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  card: {
    backgroundColor: '#F9FDF9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D6EDE4',
    padding: 12,
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
    flex: 1,
    paddingRight: 10,
  },
  answer: {
    marginTop: 8,
    fontSize: 14,
    color: '#4CAF50',
    lineHeight: 20,
  },
  moreButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#F2EFED',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  moreButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
  },
});
