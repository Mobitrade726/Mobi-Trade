import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PushNotification = ({navigation}) => {
  const [showNotifications, setShowNotifications] = useState(true);
  const [notificationSound, setNotificationSound] = useState(true);
  const [lockScreenNotification, setLockScreenNotification] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      

      <View style={{marginHorizontal: 20}}>
        {/* Setting Items */}
        <View style={styles.item}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Show notifications</Text>
            <Text style={styles.subtitle}>
              Receive push notifications for new messages
            </Text>
          </View>
          <Switch
            value={showNotifications}
            onValueChange={setShowNotifications}
            thumbColor="#fff"
            trackColor={{false: '#ccc', true: '#00AEEF'}}
          />
        </View>

        <View style={styles.item}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Notification sounds</Text>
            <Text style={styles.subtitle}>Play sound for new messages</Text>
          </View>
          <Switch
            value={notificationSound}
            onValueChange={setNotificationSound}
            thumbColor="#fff"
            trackColor={{false: '#ccc', true: '#00AEEF'}}
          />
        </View>

        <View style={styles.item}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Lock screen notifications</Text>
            <Text style={styles.subtitle}>
              Allow notification on the lock screen
            </Text>
          </View>
          <Switch
            value={lockScreenNotification}
            onValueChange={setLockScreenNotification}
            thumbColor="#fff"
            trackColor={{false: '#ccc', true: '#00AEEF'}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PushNotification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F6',
    paddingHorizontal: 20,
  },
   header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderColor: '#ccc',
    position: 'relative',
  },
  backButton: {
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
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
  },
});
