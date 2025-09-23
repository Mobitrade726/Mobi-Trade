// import React from 'react';
// import {
//   View,
//   Text,
//   SafeAreaView,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// const ContactUs = ({navigation}) => {
//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="chevron-back" size={22} color="#000" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Terms & Conditions</Text>
//         <TouchableOpacity onPress={() => navigation.navigate('Search')}>
//           <Ionicons name="search" size={22} color="#000" />
//         </TouchableOpacity>
//       </View>

//       {/* Content */}
//       <View style={styles.content}>
//         {/* Customer Support */}
//         <Text style={styles.sectionTitle}>Customer Support</Text>

//         <View style={styles.contactRow}>
//           <View style={styles.iconBox}>
//             <Ionicons name="call-outline" size={22} color="#000" />
//           </View>
//           <View>
//             <Text style={styles.contactText}>+91 98765 43210</Text>
//             <Text style={styles.subText}>Mon–Sat, 10 AM – 6 PM</Text>
//           </View>
//         </View>

//         <View style={styles.contactRow}>
//           <View style={styles.iconBox}>
//             <Ionicons name="mail-outline" size={22} color="#000" />
//           </View>
//           <Text style={styles.contactText}>support@mobitrade.com</Text>
//         </View>

//         {/* Live Chat */}
//         <Text style={[styles.sectionTitle, {marginTop: 20}]}>Live Chat</Text>
//         <View style={styles.contactRow}>
//           <View style={styles.iconBox}>
//             <Ionicons
//               name="chatbubble-ellipses-outline"
//               size={22}
//               color="#000"
//             />
//           </View>
//           <Text style={styles.contactText}>10 AM – 7 PM</Text>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default ContactUs;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//     justifyContent: 'space-between',
//   },
//   headerTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#000',
//   },
//   content: {
//     padding: 16,
//   },
//   sectionTitle: {
//     fontSize: 15,
//     fontWeight: '700',
//     marginBottom: 12,
//     color: '#000',
//   },
//   contactRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   iconBox: {
//     width: 40,
//     height: 40,
//     borderRadius: 8,
//     backgroundColor: '#f4f4f4',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   contactText: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#000',
//   },
//   subText: {
//     fontSize: 13,
//     color: '#555',
//     marginTop: 2,
//   },
// });



import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const API_URL = 'https://api.mobitrade.in/api/contact_details';

const ContactUs = ({navigation}) => {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response = await axios.get(API_URL);
        if (response.data?.success) {
          setContactData(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching contact details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactDetails();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#000" style={{marginTop: 50}} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Us</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Customer Support */}
        <Text style={styles.sectionTitle}>Customer Support</Text>

        <View style={styles.contactRow}>
          <View style={styles.iconBox}>
            <Ionicons name="call-outline" size={22} color="#000" />
          </View>
          <View>
            <Text style={styles.contactText}>
              {contactData?.phone || 'N/A'}
            </Text>
            <Text style={styles.subText}>Mon–Sat, 10 AM – 6 PM</Text>
          </View>
        </View>

        <View style={styles.contactRow}>
          <View style={styles.iconBox}>
            <Ionicons name="mail-outline" size={22} color="#000" />
          </View>
          <Text style={styles.contactText}>
            {contactData?.email || 'N/A'}
          </Text>
        </View>

        {/* Live Chat */}
        <Text style={[styles.sectionTitle, {marginTop: 20}]}>Live Chat</Text>
        <View style={styles.contactRow}>
          <View style={styles.iconBox}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={22}
              color="#000"
            />
          </View>
          <Text style={styles.contactText}>10 AM – 7 PM</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 12,
    color: '#000',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#f4f4f4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  subText: {
    fontSize: 13,
    color: '#555',
    marginTop: 2,
  },
});
 