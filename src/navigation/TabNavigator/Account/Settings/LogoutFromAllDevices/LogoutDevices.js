import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const devices = [
  {
    id: '1',
    name: 'Android1342',
    location: 'Los Angeles, USA',
    lastActive: '30 minutes ago',
    image: require('../../../../../../assets/images/logouticon.png'), // Replace with your image
  },
  {
    id: '2',
    name: 'iPhone',
    location: 'Los Angeles, USA',
    lastActive: '30 minutes ago',
    image: require('../../../../../../assets/images/logouticon.png'),
  },
  {
    id: '3',
    name: 'Android1345',
    location: 'Los Angeles, USA',
    lastActive: '30 minutes ago',
    image: require('../../../../../../assets/images/logouticon.png'),
  },
];

const LogoutDevices = ({navigation}) => {
  const renderItem = ({item}) => (
    <View style={styles.card}>
      <Image
        source={item.image}
        style={styles.deviceImage}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <Ionicons name="phone-portrait-outline" size={14} color="#555" />
          <Text style={styles.lastActiveText}>
            {' '}
            · Last active: {item.lastActive}
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.deviceName}>{item.name}</Text>
          <TouchableOpacity>
            <SimpleLineIcons name="logout" size={20} color="#000" />
          </TouchableOpacity>
        </View>
        <Text style={styles.deviceLocation}>Location: {item.location}</Text>
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
        <Text style={styles.headerTitle}>Logged-in Devices</Text>
      </View>

      {/* Device List */}
      <FlatList
        data={devices}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{padding: 16}}
      />

      {/* Log Out Button */}
      <TouchableOpacity
        onPress={() => {
          Alert.alert(
            'Are you sure?',
            'You will be logged out of all devices.',
            [
              {
                text: 'No',
                onPress: () => {},
                style: 'cancel',
              },
              {
                text: 'Yes',
                onPress: () => navigation.navigate('LoginScreen'), // make sure 'Login' is in your navigator
              },
            ],
            {cancelable: false},
          );
        }}
        style={styles.logoutAllButton}>
        <SimpleLineIcons name="logout" size={18} color="#fff" />
        <Text style={styles.logoutAllText}> Log out of all devices</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LogoutDevices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderColor: '#ccc',
    position: 'relative',
    height: 50, // optional, to help with alignment
  },
  backButton: {
    position: 'absolute', // ADD THIS
    left: 15,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'medium', // change 'medium' to a valid value
    color: '#000',
    textAlign: 'center',
  },
  card: {
    borderWidth: 1.5,
    borderColor: '#4AB1E8',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  deviceImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  infoContainer: {
    marginVertical: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  lastActiveText: {
    fontSize: 15,
    color: '#666',
    fontWeight: 'semibold',
    fontFamily: 'Source Serif 4',
  },
  deviceName: {
    fontSize: 17,
    fontWeight: 'semibold',
    color: '#000',
    marginBottom: 4,
    fontFamily: 'Source Serif 4',
  },
  deviceLocation: {
    fontSize: 15,
    color: '#444',
    fontWeight: 'regular',
    fontFamily: 'Source Serif 4',
  },
  logoutAllButton: {
    flexDirection: 'row',
    backgroundColor: '#C84040',
    margin: 16,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
  },
  logoutAllText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'medium',
    fontFamily: 'Source Serif 4',
    marginHorizontal: 8,
  },
});
