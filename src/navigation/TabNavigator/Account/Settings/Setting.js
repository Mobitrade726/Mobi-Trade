import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import { useRoute } from '@react-navigation/native';

const Settings = ({navigation}) => {
  const [smsAlerts, setSmsAlerts] = useState(true);
  const route = useRoute();
  const {cat, profileEdit} = route.params;

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
          <Text style={styles.headerTitle}>Settings</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        {/* Settings Items */}

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('SignUpTab', {
              cat: cat,
              profileEdit: profileEdit,
            })
          }
          style={styles.item}>
          <AntDesign name="user" size={22} style={styles.icon} />
          <Text style={styles.text}>Edit Profile</Text>
          <Ionicons name="chevron-forward" size={20} style={styles.arrow} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('PushNotification')}
          style={styles.item}>
          <Ionicons
            name="notifications-outline"
            size={22}
            style={styles.icon}
          />
          <Text style={styles.text}>Push Notifications</Text>
          <Ionicons name="chevron-forward" size={20} style={styles.arrow} />
        </TouchableOpacity>

        <View style={styles.item}>
          <Ionicons
            name="chatbox-ellipses-outline"
            size={22}
            style={styles.icon}
          />
          <Text style={styles.text}>SMS Alerts</Text>
          <Switch
            value={smsAlerts}
            onValueChange={val => setSmsAlerts(val)}
            thumbColor="#fff"
            trackColor={{false: '#ccc', true: '#00AEEF'}}
          />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Language')}
          style={styles.item}>
          <Ionicons name="globe-outline" size={22} style={styles.icon} />
          <Text style={styles.text}>Language</Text>
          <Ionicons name="chevron-forward" size={20} style={styles.arrow} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Privacy')}
          style={styles.item}>
          <Ionicons name="lock-closed-outline" size={22} style={styles.icon} />
          <Text style={styles.text}>Privacy</Text>
          <Ionicons name="chevron-forward" size={20} style={styles.arrow} />
        </TouchableOpacity>

        {/* Section Header */}
        <Text style={styles.sectionTitle}>Account Settings</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('ChangePassword')}
          style={styles.item}>
          <Ionicons name="lock-closed-outline" size={22} style={styles.icon} />
          <Text style={styles.text}>Change Password</Text>
          <Ionicons name="chevron-forward" size={20} style={styles.arrow} />
        </TouchableOpacity>

        <View style={styles.item}>
          <MaterialCommunityIcons
            name="view-grid-outline"
            size={22}
            style={styles.icon}
          />
          <Text style={styles.text}>View Logged-in Devices</Text>
          <Ionicons name="chevron-forward" size={20} style={styles.arrow} />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('DeleteAccount')}
          style={styles.item}>
          <Ionicons name="arrow-undo-outline" size={22} style={styles.icon} />
          <Text style={styles.text}>Delete My Account</Text>
          <Ionicons name="chevron-forward" size={20} style={styles.arrow} />
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate('LogoutDevices')}
          style={styles.logoutButton}>
          <SimpleLineIcons name="logout" size={18} color="#fff" />
          <Text style={styles.logoutText}>Logout from all devices</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
