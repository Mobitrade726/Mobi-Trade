
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const steps = [
  {
    id: '1',
    title: 'Parcel is successfully delivered',
    date: '15 May 10:20',
  },
  {
    id: '2',
    title: 'Parcel is out for delivery',
    date: '14 May 08:00',
  },
  {
    id: '3',
    title: 'Parcel is received at delivery Branch',
    date: '13 May 17:25',
  },
  {
    id: '4',
    title: 'Parcel is in transit',
    date: '13 May 07:00',
  },
  {
    id: '5',
    title: 'Sender has shipped your parcel',
    date: '12 May 14:25',
  },
  {
    id: '6',
    title: 'Sender is preparing to ship your order',
    date: '12 May 10:01',
  },
];

const TrackOrder = ({ navigation }) => {
  const [rating, setRating] = useState(0);

  const renderStep = ({ item, index }) => (
    <View style={styles.stepContainer}>
      <View style={styles.iconColumn}>
        <Ionicons name="checkmark-circle" size={22} color="#333" />
        {index !== steps.length - 1 && (
          <View style={styles.verticalLine} />
        )}
      </View>

      <View style={styles.contentColumn}>
        <Text style={styles.stepText}>{item.title}</Text>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
    </View>
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
        <View>
          <Text style={styles.headerTitle}>Order #1514</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Info */}
      <View style={{ paddingHorizontal: 16, paddingBottom: 10 }}>
        <Text style={styles.infoText}>Delivered on 15.05.21</Text>
        <Text style={styles.infoText}>
          Tracking Number :{' '}
          <Text style={styles.trackingNo}>IK287368838</Text>
        </Text>
      </View>

      {/* Steps */}
      <FlatList
        data={steps}
        renderItem={renderStep}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        scrollEnabled={false}
      />

      {/* Rating */}
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingLabel}>Don’t forget to rate</Text>
        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map(i => (
            <TouchableOpacity key={i} onPress={() => setRating(i)}>
              <Ionicons
                name={i <= rating ? 'star' : 'star-outline'}
                size={24}
                color={i <= rating ? '#28A745' : '#bbb'}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.continueBtn}>
        <Text style={styles.continueText}>Continue shopping</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TrackOrder;

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
  infoText: {
    fontSize: 13,
    color: '#444',
    marginBottom: 4,
  },
  trackingNo: {
    fontWeight: 'bold',
    color: '#000',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  iconColumn: {
    alignItems: 'center',
    width: 30,
  },
  verticalLine: {
    width: 2,
    height: 28,
    backgroundColor: '#ccc',
    marginTop: 2,
  },
  contentColumn: {
    flex: 1,
    paddingLeft: 10,
  },
  stepText: {
    fontSize: 14,
    color: '#222',
    fontWeight: '500',
  },
  dateText: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  ratingContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  ratingLabel: {
    fontWeight: '600',
    fontSize: 13,
    color: '#222',
    marginBottom: 6,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 4,
  },
  continueBtn: {
    marginTop: 20,
    marginHorizontal: 16,
    backgroundColor: '#28A745',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
