import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../../../constants/Header';
import {useDispatch, useSelector} from 'react-redux';
import {fetchOrderStatusLogsAPI} from '../../../../redux/slices/orderSlice';

const TrackOrder = ({navigation, route}) => {
  const {order_id_Number} = route.params;

  const dispatch = useDispatch();

  const {orderStatusLogs} = useSelector(state => state.orders);

  useEffect(() => {
    dispatch(fetchOrderStatusLogsAPI(order_id_Number));
  }, [dispatch]);

  const renderStep = ({item, index}) => (
    <View style={styles.stepContainer}>
      {/* Left column: Icon + Line */}
      <View style={styles.iconColumn}>
        <Ionicons name="checkmark-circle" size={22} color="#28A745" />

        {index !== orderStatusLogs.length - 1 && (
          <View style={styles.verticalLine} />
        )}
      </View>

      {/* Right column: Text */}
      <View style={styles.contentColumn}>
        <Text style={styles.stepText}>{item.status_name}</Text>
        <Text style={styles.dateText}>{item.date_time}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={`#${order_id_Number}`}
        navigation={navigation}
        showBack={true}
      />

      {/* Info */}
      <View style={{paddingHorizontal: 16, paddingBottom: 10}}>
        <Text style={styles.infoText}>Delivered on – {orderStatusLogs?.delivery_date || '-'}</Text>
        <Text style={styles.infoText}>
          Tracking Number :
          <Text style={styles.trackingNo}>{orderStatusLogs?.awb_details || '-'}</Text>
        </Text>
      </View>

      {/* Steps from API */}
      <FlatList
        data={orderStatusLogs?.logs}
        renderItem={renderStep}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{paddingHorizontal: 16}}
        scrollEnabled={true}
      />

      {/* Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('BottomNavigator')}
        style={styles.continueBtn}>
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

  infoText: {
    fontSize: 13,
    color: '#444',
    marginBottom: 4,
  },
  trackingNo: {
    fontWeight: 'bold',
    color: '#000',
  },

  // Timeline Styles
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 0,
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

  continueBtn: {
    marginTop: 20,
    marginHorizontal: 16,
    backgroundColor: '#28A745',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
