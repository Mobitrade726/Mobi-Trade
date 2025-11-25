import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchOrdersAPI,
} from '../../../../redux/slices/orderSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../../../constants/Header';


const Myorder = ({navigation}) => {
  const dispatch = useDispatch();
  const {orderList, loading, error} = useSelector(
    state => state.orders,
  );

  useEffect(() => {
    const loadOrders = async () => {
      const userId = await AsyncStorage.getItem('USERID');
      if (userId) dispatch(fetchOrdersAPI(userId));
    };
    loadOrders();
  }, [dispatch]);

  // 🔹 Show loading & error
  if (loading)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#1C9C48" />
      </View>
    );

  if (error)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: 'red'}}>{error}</Text>
      </View>
    );

  const statusStyles = {
    'Order Placed': {bg: '#D9D9D9', color: '#5A5A5A'},
    'Payment Verified': {bg: '#9BD4F6', color: '#FFFFFF'},
    'Stock-out Requested': {bg: '#E4DCCF', color: '#5A4F3D'},
    'Under Process': {bg: '#C9B79A', color: '#ffffff'},
    Packed: {bg: '#C9B79A', color: '#ffffff'},
    'Ready for dispatch': {bg: '#EED8B8', color: '#6E5B3B'},
    Dispatched: {bg: '#A28F79', color: '#ffffff'},
    Delivered: {bg: '#3FAE49', color: '#ffffff'},
    Returned: {bg: '#E1B040', color: '#ffffff'},
    Cancelled: {bg: '#DD6B6B', color: '#ffffff'},

    // second list
    Confirmed: {bg: '#9BD4F6', color: '#ffffff'},
    'Ready for pick-up': {bg: '#EED8B8', color: '#6E5B3B'},
    'Picked by buyer': {bg: '#3FAE49', color: '#ffffff'},
  };

  // 🔹 Render each order
  const renderOrder = ({item}) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardTopRow}>
          <View style={{flex: 1}}>
            <Text style={styles.orderTitle}>#{item.order_id_Number}</Text>
          </View>
          <View
            style={[
              styles.statusBox,
              {backgroundColor: statusStyles[item.order_status]?.bg || '#ccc'},
            ]}>
            <Text
              style={[
                styles.statusText,
                {color: statusStyles[item.order_status]?.color || '#000'},
              ]}>
              {item.order_status}
            </Text>
          </View>
        </View>

        <View style={styles.cardContent}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flex: 1,
            }}>
            <View style={{}}>
              <Text style={styles.subText}>{item?.order_date_time}</Text>
              <Text style={styles.subText}>
                Quantity: {item.order_quantity || 0}
              </Text>
              <Text style={styles.subText}>
                Subtotal:{' '}
                <Text style={styles.boldText}>₹{item.total_amount}</Text>
              </Text>
              {/* 🔹 Buttons */}
              <View style={styles.actions}>
                {item.order_status === 'Pending' && (
                  <>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('YourOrderIsCancle')}
                      style={styles.button}>
                      <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('MyorderDetails', {
                          order_id: item?.order_id,
                        })
                      }
                      style={styles.button}>
                      <Text style={styles.buttonText}>Details</Text>
                    </TouchableOpacity>
                  </>
                )}

                {item.order_status === 'Delivered' && (
                  <>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('ReturnRequest')}
                      style={styles.button}>
                      <Text style={styles.buttonText}>Return</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('MyorderDetails', {
                          order_id: item?.order_id,
                        })
                      }
                      style={styles.button}>
                      <Text style={styles.buttonText}>Details</Text>
                    </TouchableOpacity>
                  </>
                )}

                 {item.order_status === 'Confirmed' && (
                  <>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('ReturnRequest')}
                      style={styles.button}>
                      <Text style={styles.buttonText}>Return</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('MyorderDetails', {
                          order_id: item?.order_id,
                        })
                      }
                      style={styles.button}>
                      <Text style={styles.buttonText}>Details</Text>
                    </TouchableOpacity>
                  </>
                )}

                {item.order_status === 'Cancelled' && (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('MyorderDetails', {
                        order_id: item?.order_id,
                      })
                    }
                    style={styles.button}>
                    <Text style={styles.buttonText}>Details</Text>
                  </TouchableOpacity>
                )}
                {item.order_status === 'Order Placed' && (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('MyorderDetails', {
                        order_id: item?.order_id,
                        order_id_Number: item?.order_id_Number,
                      })
                    }
                    style={styles.button}>
                    <Text style={styles.buttonText}>Details</Text>
                  </TouchableOpacity>
                )}

                {item.order_status === 'Shipped' && (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('MyorderDetails', {
                        order_id: item?.order_id,
                      })
                    }
                    style={styles.button}>
                    <Text style={styles.buttonText}>Details</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      {/* Header */}
      <Header title="My Orders" navigation={navigation} showBack={true} />

      {/* Order List */}
      <FlatList
        data={orderList}
        keyExtractor={item => item.id}
        renderItem={renderOrder}
        contentContainerStyle={{marginHorizontal: 16}}
        ListEmptyComponent={
          <Text style={{textAlign: 'center', marginTop: 20, color: '#555'}}>
            No orders found
          </Text>
        }
      />
    </SafeAreaView>
  );
};

export default Myorder;

// 🔹 Styles (same as before)
const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tabItem: {
    paddingVertical: 12,
  },
  tabText: {
    fontSize: 15,
    color: '#888',
    fontWeight: 'bold',
  },
  activeTabItem: {
    borderBottomWidth: 2,
    borderColor: 'black',
  },
  activeTabText: {
    color: 'black',
    fontWeight: 'bold',
  },
  card: {
    borderWidth: 1,
    borderColor: '#666666',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  subText: {
    fontSize: 13,
    color: '#555',
    marginTop: 6,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  button: {
    borderWidth: 1,
    borderColor: '#000',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 14,
    color: '#000',
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    flexDirection: 'row',
    marginTop: 12,
  },
  statusIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },

  card_invoice: {
    backgroundColor: '#fff',
    padding: 18,
    marginHorizontal: 0,
    marginTop: 20,
    borderRadius: 16,
    elevation: 4, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 4},
  },
  invoiceBox: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 16,

    // Shadow (iOS)
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 3},

    // Shadow (Android)
    elevation: 5,

    alignSelf: 'flex-end',
  },

  invoiceText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#222',
    textAlign: 'center',
  },

  title: {
    fontSize: 12,
    fontWeight: '700',
    color: '#222',
  },
  statusBox: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 14,
    marginVertical: 4,
  },
});
