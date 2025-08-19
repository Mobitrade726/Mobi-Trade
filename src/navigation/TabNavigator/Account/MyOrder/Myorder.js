import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const orders = [
  {
    id: '1',
    orderNo: '#1524',
    date: '13/05/2021',
    time: '11:25 AM',
    quantity: 2,
    subtotal: '₹8,200',
    status: 'Pending',
  },
  {
    id: '2',
    orderNo: '#1524',
    date: '13/05/2021',
    time: '11:25 AM',
    quantity: 2,
    subtotal: '₹8,200',
    status: 'Shipped',
  },
  {
    id: '3',
    orderNo: '#1524',
    date: '13/05/2021',
    time: '11:25 AM',
    quantity: 2,
    subtotal: '₹8,200',
    status: 'Delivered',
  },
  {
    id: '4',
    orderNo: '#1524',
    date: '13/05/2021',
    time: '11:25 AM',
    quantity: 2,
    subtotal: '₹8,200',
    status: 'Canceled',
  },
];

const statusImages = {
  Pending: require('../../../../../assets/images/pending.png'),
  Shipped: require('../../../../../assets/images/shiped.png'),
  Delivered: require('../../../../../assets/images/delever.png'),
  Canceled: require('../../../../../assets/images/cancle.png'),
};

const statusColors = {
  Pending: '#CF6112',
  Shipped: '#CF6112',
  Delivered: '#28A745',
  Canceled: '#E53935',
};

const tabs = ['All', 'Pending', 'Delivered', 'Canceled'];

const Myorder = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('All');

  const filteredOrders =
    activeTab === 'All'
      ? orders
      : orders.filter(order => order.status === activeTab);

  const renderOrder = ({item}) => (
    <View style={styles.card}>
      <View style={styles.cardTopRow}>
        <View style={{flex: 1}}>
          <Text style={styles.orderTitle}>Order {item.orderNo}</Text>
        </View>
        <View style={styles.statusContainer}>
          <Image source={statusImages[item.status]} style={styles.statusIcon} />
          <Text style={[styles.statusText, {color: statusColors[item.status]}]}>
            {item.status}
          </Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <View style={{flex: 1}}>
          <Text style={styles.subText}>
            {item.date} {item.time}
          </Text>
          <Text style={styles.subText}>Quantity: {item.quantity}</Text>
          <Text style={styles.subText}>
            Subtotal: <Text style={styles.boldText}>{item.subtotal}</Text>
          </Text>

          <View style={styles.actions}>
            {item.status === 'Pending' && (
              <>
                <TouchableOpacity
                  onPress={() => navigation.navigate('YourOrderIsCancle')}
                  style={styles.button}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('YourOrderIsGettingPacked')
                  }
                  style={styles.button}>
                  <Text style={styles.buttonText}>Details</Text>
                </TouchableOpacity>
              </>
            )}
            {item.status === 'Shipped' && (
              <>
                <TouchableOpacity
                  onPress={() => navigation.navigate('YourOrderIsOnTheWay')}
                  style={styles.button}>
                  <Text style={styles.buttonText}>Details</Text>
                </TouchableOpacity>
              </>
            )}
            {item.status === 'Canceled' && (
              <>
                <TouchableOpacity
                  onPress={() => navigation.navigate('YourOrderIsCancle')}
                  style={styles.button}>
                  <Text style={styles.buttonText}>Details</Text>
                </TouchableOpacity>
              </>
            )}
            {item.status === 'Delivered' && (
              <>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ReturnRequest')}
                  style={styles.button}>
                  <Text style={styles.buttonText}>Return</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('YourOrderIsDelever')}
                  style={styles.button}>
                  <Text style={styles.buttonText}>Details</Text>
                </TouchableOpacity>
              </>
            )}
            {/* <TouchableOpacity
              onPress={() => navigation.navigate('YourOrderIsOnTheWay')}
              style={styles.button}>
              <Text style={styles.buttonText}>Details</Text>
            </TouchableOpacity> */}
          </View>
        </View>

        <View style={styles.imageBox} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Ionicons name="chevron-back" size={22} color="#000" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>My Order</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.tabItem, activeTab === tab && styles.activeTabItem]}>
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredOrders}
        keyExtractor={item => item.id}
        renderItem={renderOrder}
        contentContainerStyle={{padding: 16}}
      />
    </SafeAreaView>
  );
};

export default Myorder;

const styles = StyleSheet.create({
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontWeight: 'semibold',
  },
  subText: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
    fontWeight: 'regular',
    marginTop: 8,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
  imageBox: {
    width: 80,
    height: 80,
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
    marginLeft: 10,
  },
  statusIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginRight: 4,
  },
});
