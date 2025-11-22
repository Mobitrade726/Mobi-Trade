// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   SafeAreaView,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Header from '../../../../constants/Header';
// import {useDispatch, useSelector} from 'react-redux';
// import {fetchOrderStatusLogsAPI} from '../../../../redux/slices/orderSlice';

// const steps = [
//   {
//     id: '1',
//     title: 'Parcel is successfully delivered',
//     date: '15 May 10:20',
//   },
//   {
//     id: '2',
//     title: 'Parcel is out for delivery',
//     date: '14 May 08:00',
//   },
//   {
//     id: '3',
//     title: 'Parcel is received at delivery Branch',
//     date: '13 May 17:25',
//   },
//   {
//     id: '4',
//     title: 'Parcel is in transit',
//     date: '13 May 07:00',
//   },
//   {
//     id: '5',
//     title: 'Sender has shipped your parcel',
//     date: '12 May 14:25',
//   },
//   {
//     id: '6',
//     title: 'Sender is preparing to ship your order',
//     date: '12 May 10:01',
//   },
// ];

// const TrackOrder = ({navigation, route}) => {
//   const {order_id, order_id_Number} = route.params;
//   console.log(
//     'order_id+++++++++++++++++++++++++++++++++',
//     order_id,
//     order_id_Number,
//   );
//   const [rating, setRating] = useState(0);
//   const dispatch = useDispatch();
//   const {orderStatusLogs, loading} = useSelector(state => state.orders);
//   useEffect(() => {
//     // dispatch(fetchOrderStatusLogsAPI(order_id_Number));
//     dispatch(fetchOrderStatusLogsAPI('ORD-2025-27'));
//   }, [dispatch]);

//   console.log('orderStatusLogs----------------------------------------->',orderStatusLogs);

//   const renderStep = ({item, index}) => (
//     <View style={styles.stepContainer}>
//       <View style={styles.iconColumn}>
//         <Ionicons name="checkmark-circle" size={22} color="#333" />
//         {index !== steps.length - 1 && <View style={styles.verticalLine} />}
//       </View>

//       <View style={styles.contentColumn}>
//         <Text style={styles.stepText}>{item.title}</Text>
//         <Text style={styles.dateText}>{item.date}</Text>
//       </View>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <Header title="Order #1514" navigation={navigation} showBack={true} />

//       {/* Info */}
//       <View style={{paddingHorizontal: 16, paddingBottom: 10}}>
//         <Text style={styles.infoText}>Delivered on 15.05.21</Text>
//         <Text style={styles.infoText}>
//           Tracking Number : <Text style={styles.trackingNo}>IK287368838</Text>
//         </Text>
//       </View>

//       {/* Steps */}
//       <FlatList
//         data={steps}
//         renderItem={renderStep}
//         keyExtractor={item => item.id}
//         contentContainerStyle={{paddingHorizontal: 16}}
//         scrollEnabled={false}
//       />

//       {/* Rating */}
//       {/* <View style={styles.ratingContainer}>
//         <Text style={styles.ratingLabel}>Don’t forget to rate</Text>
//         <View style={styles.starsRow}>
//           {[1, 2, 3, 4, 5].map(i => (
//             <TouchableOpacity key={i} onPress={() => setRating(i)}>
//               <Ionicons
//                 name={i <= rating ? 'star' : 'star-outline'}
//                 size={24}
//                 color={i <= rating ? '#28A745' : '#bbb'}
//               />
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View> */}

//       {/* Button */}
//       <TouchableOpacity onPress={()=> navigation.navigate('BottomNavigator')} style={styles.continueBtn}>
//         <Text style={styles.continueText}>Continue shopping</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// export default TrackOrder;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
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
//   infoText: {
//     fontSize: 13,
//     color: '#444',
//     marginBottom: 4,
//   },
//   trackingNo: {
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   stepContainer: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     marginBottom: 24,
//   },
//   iconColumn: {
//     alignItems: 'center',
//     width: 30,
//   },
//   verticalLine: {
//     width: 2,
//     height: 28,
//     backgroundColor: '#ccc',
//     marginTop: 2,
//   },
//   contentColumn: {
//     flex: 1,
//     paddingLeft: 10,
//   },
//   stepText: {
//     fontSize: 14,
//     color: '#222',
//     fontWeight: '500',
//   },
//   dateText: {
//     fontSize: 12,
//     color: '#888',
//     marginTop: 2,
//   },
//   ratingContainer: {
//     alignItems: 'center',
//     marginTop: 16,
//   },
//   ratingLabel: {
//     fontWeight: '600',
//     fontSize: 13,
//     color: '#222',
//     marginBottom: 6,
//   },
//   starsRow: {
//     flexDirection: 'row',
//     gap: 4,
//   },
//   continueBtn: {
//     marginTop: 20,
//     marginHorizontal: 16,
//     backgroundColor: '#28A745',
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   continueText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });


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

  console.log(
    'orderStatusLogs----------------------------------------->',
    orderStatusLogs,
  );

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
