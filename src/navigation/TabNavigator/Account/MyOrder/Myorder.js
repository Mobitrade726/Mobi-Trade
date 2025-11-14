// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   ActivityIndicator,
// } from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {useDispatch, useSelector} from 'react-redux';
// import {fetchOrdersAPI} from '../../../../redux/slices/orderSlice';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const orders = [
//   {
//     id: '1',
//     orderNo: '#1524',
//     date: '13/05/2021',
//     time: '11:25 AM',
//     quantity: 2,
//     subtotal: '₹8,200',
//     status: 'Pending',
//   },
//   {
//     id: '2',
//     orderNo: '#1524',
//     date: '13/05/2021',
//     time: '11:25 AM',
//     quantity: 2,
//     subtotal: '₹8,200',
//     status: 'Shipped',
//   },
//   {
//     id: '3',
//     orderNo: '#1524',
//     date: '13/05/2021',
//     time: '11:25 AM',
//     quantity: 2,
//     subtotal: '₹8,200',
//     status: 'Delivered',
//   },
//   {
//     id: '4',
//     orderNo: '#1524',
//     date: '13/05/2021',
//     time: '11:25 AM',
//     quantity: 2,
//     subtotal: '₹8,200',
//     status: 'Canceled',
//   },
// ];

// const statusImages = {
//   Pending: require('../../../../../assets/images/pending.png'),
//   Shipped: require('../../../../../assets/images/shiped.png'),
//   Delivered: require('../../../../../assets/images/delever.png'),
//   Canceled: require('../../../../../assets/images/cancle.png'),
// };

// const statusColors = {
//   Pending: '#CF6112',
//   Shipped: '#CF6112',
//   Delivered: '#28A745',
//   Canceled: '#E53935',
// };

// const tabs = ['All', 'Pending', 'Delivered', 'Canceled'];

// const Myorder = ({navigation}) => {
//   const [activeTab, setActiveTab] = useState('All');
//   const dispatch = useDispatch();
//   const {orderList, loading, error} = useSelector(state => state.orders);

//   useEffect(() => {
//     const loadOrders = async () => {
//       const userId = await AsyncStorage.getItem('USERID');
//       if (userId) dispatch(fetchOrdersAPI(userId));
//     };
//     loadOrders();
//   }, [dispatch]);

//   if (loading) return <ActivityIndicator size="large" color="#1C9C48" />;
//   if (error) return <Text style={{color: 'red'}}>{error}</Text>;

//   const filteredOrders =
//     activeTab === 'All'
//       ? orders
//       : orders.filter(order => order.status === activeTab);

//   const renderOrder = ({item}) => (
//     <View style={styles.card}>
//       <View style={styles.cardTopRow}>
//         <View style={{flex: 1}}>
//           <Text style={styles.orderTitle}>Order {item.orderNo}</Text>
//         </View>
//         <View style={styles.statusContainer}>
//           <Image source={statusImages[item.status]} style={styles.statusIcon} />
//           <Text style={[styles.statusText, {color: statusColors[item.status]}]}>
//             {item.order_status}
//           </Text>
//         </View>
//       </View>

//       <View style={styles.cardContent}>
//         <View style={{flex: 1}}>
//           <Text style={styles.subText}>
//             {item.date} {item.order_date_time}
//           </Text>
//           <Text style={styles.subText}>Quantity: {item.order_quantity}</Text>
//           <Text style={styles.subText}>
//             Subtotal: <Text style={styles.boldText}>{item.total_amount}</Text>
//           </Text>

//           <View style={styles.actions}>
//             {item.status === 'Pending' && (
//               <>
//                 <TouchableOpacity
//                   onPress={() => navigation.navigate('YourOrderIsCancle')}
//                   style={styles.button}>
//                   <Text style={styles.buttonText}>Cancel</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   onPress={() =>
//                     navigation.navigate('YourOrderIsGettingPacked')
//                   }
//                   style={styles.button}>
//                   <Text style={styles.buttonText}>Details</Text>
//                 </TouchableOpacity>
//               </>
//             )}
//             {item.status === 'Shipped' && (
//               <>
//                 <TouchableOpacity
//                   onPress={() => navigation.navigate('YourOrderIsOnTheWay')}
//                   style={styles.button}>
//                   <Text style={styles.buttonText}>Details</Text>
//                 </TouchableOpacity>
//               </>
//             )}
//             {item.status === 'Canceled' && (
//               <>
//                 <TouchableOpacity
//                   onPress={() => navigation.navigate('YourOrderIsCancle')}
//                   style={styles.button}>
//                   <Text style={styles.buttonText}>Details</Text>
//                 </TouchableOpacity>
//               </>
//             )}
//             {item.status === 'Delivered' && (
//               <>
//                 <TouchableOpacity
//                   onPress={() => navigation.navigate('ReturnRequest')}
//                   style={styles.button}>
//                   <Text style={styles.buttonText}>Return</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   onPress={() => navigation.navigate('YourOrderIsDelever')}
//                   style={styles.button}>
//                   <Text style={styles.buttonText}>Details</Text>
//                 </TouchableOpacity>
//               </>
//             )}
//             {/* <TouchableOpacity
//               onPress={() => navigation.navigate('YourOrderIsOnTheWay')}
//               style={styles.button}>
//               <Text style={styles.buttonText}>Details</Text>
//             </TouchableOpacity> */}
//           </View>
//         </View>

//         <View style={styles.imageBox} />
//       </View>
//     </View>
//   );

//   console.log("orderList------------------------------------>", orderList);

//   return (
//     <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={styles.backButton}>
//           <Ionicons name="chevron-back" size={22} color="#000" />
//         </TouchableOpacity>
//         <View>
//           <Text style={styles.headerTitle}>My Order</Text>
//         </View>
//         <TouchableOpacity onPress={() => navigation.navigate('Search')}>
//           <Ionicons name="search" size={24} color="#333" />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.tabs}>
//         {tabs.map(tab => (
//           <TouchableOpacity
//             key={tab}
//             onPress={() => setActiveTab(tab)}
//             style={[styles.tabItem, activeTab === tab && styles.activeTabItem]}>
//             <Text
//               style={[
//                 styles.tabText,
//                 activeTab === tab && styles.activeTabText,
//               ]}>
//               {tab}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       <FlatList
//         data={orderList}
//         keyExtractor={item => item.id}
//         renderItem={renderOrder}
//         contentContainerStyle={{padding: 16}}
//       />
//     </SafeAreaView>
//   );
// };

// export default Myorder;

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 10,
//     justifyContent: 'space-between',
//     marginHorizontal: 10,
//   },
//   backButton: {
//     backgroundColor: '#f5f5f5',
//     borderRadius: 20,
//     padding: 6,
//     left: 0,
//   },
//   headerTitle: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#000',
//     textAlign: 'center',
//   },
//   tabs: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     borderBottomWidth: 1,
//     borderColor: '#ccc',
//   },
//   tabItem: {
//     paddingVertical: 12,
//   },
//   tabText: {
//     fontSize: 15,
//     color: '#888',
//     fontWeight: 'bold',
//   },
//   activeTabItem: {
//     borderBottomWidth: 2,
//     borderColor: 'black',
//   },
//   activeTabText: {
//     color: 'black',
//     fontWeight: 'bold',
//   },
//   card: {
//     borderWidth: 1,
//     borderColor: '#666666',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 16,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   orderTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   statusContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 4,
//   },
//   statusText: {
//     fontSize: 14,
//     fontWeight: 'semibold',
//   },
//   subText: {
//     fontSize: 12,
//     color: '#555',
//     marginTop: 4,
//     fontWeight: 'regular',
//     marginTop: 8,
//   },
//   boldText: {
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   actions: {
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     gap: 10,
//     marginTop: 12,
//   },
//   button: {
//     borderWidth: 1,
//     borderColor: '#000',
//     paddingVertical: 6,
//     paddingHorizontal: 14,
//     borderRadius: 20,
//   },
//   buttonText: {
//     fontSize: 14,
//     color: '#000',
//   },
//   cardTopRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   cardContent: {
//     flexDirection: 'row',
//     marginTop: 12,
//   },
//   imageBox: {
//     width: 80,
//     height: 80,
//     backgroundColor: '#e0e0e0',
//     borderRadius: 12,
//     marginLeft: 10,
//   },
//   statusIcon: {
//     width: 18,
//     height: 18,
//     resizeMode: 'contain',
//     marginRight: 4,
//   },
// });

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {fetchOrdersAPI} from '../../../../redux/slices/orderSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../../../constants/Header';

// 🔹 Images for each order status
const statusImages = {
  Pending: require('../../../../../assets/images/pending.png'),
  Shipped: require('../../../../../assets/images/shiped.png'),
  Delivered: require('../../../../../assets/images/delever.png'),
  Confirmed: require('../../../../../assets/images/delever.png'),
  Canceled: require('../../../../../assets/images/cancle.png'),
};

// 🔹 Status color mapping
const statusColors = {
  Pending: '#CF6112',
  Shipped: '#CF6112',
  Delivered: '#28A745',
  Confirmed: '#28A745',
  Canceled: '#E53935',
};

const Myorder = ({navigation}) => {
  const dispatch = useDispatch();
  const {orderList, loading, error} = useSelector(state => state.orders);

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

  // 🔹 Render each order
  const renderOrder = ({item}) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardTopRow}>
          <View style={{flex: 1}}>
            <Text style={styles.orderTitle}>Order #{item.order_id}</Text>
          </View>
          <View style={styles.statusContainer}>
            {statusImages[item.order_status] && (
              <Image
                source={statusImages[item.order_status]}
                style={styles.statusIcon}
              />
            )}
            <Text
              style={[
                styles.statusText,
                {color: statusColors[item.order_status]},
              ]}>
              {item.order_status}
            </Text>
          </View>
        </View>

        <View style={styles.cardContent}>
          <View style={{flex: 1}}>
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
              // {item.order_status === 'Confirmed' && (
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

              {item.order_status === 'Canceled' && (
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
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      {/* Header */}
       <Header
        title='My Orders'
        navigation={navigation}
        showBack={true}
      />

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
});
