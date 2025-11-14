// // src/components/Header.js
// import React from 'react';
// import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// const Header = ({
//   title,
//   navigation,
//   showSearch = false,
//   onSearchPress,
//   showBack = true,
// }) => {
//   return (
//     <View style={[styles.header]}>
//       {showBack ? (
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={styles.backButton}>
//           <Ionicons name="chevron-back" size={22} color="#000" />
//         </TouchableOpacity>
//       ) : (
//         <View style={{width: 40}} />
//       )}

//       <Text style={styles.headerTitle}>{title}</Text>

//       {showSearch ? (
//         <TouchableOpacity onPress={onSearchPress}>
//           <Ionicons name="search" size={24} color="#000" />
//         </TouchableOpacity>
//       ) : (
//         <View style={{width: 40}} />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: 10,
//     marginTop:12,
//     paddingHorizontal: 10,
//     backgroundColor: '#fff',
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#000',
//   },
//   backButton: {
//     padding: 5,
//     backgroundColor: '#f5f5f5',
//     borderRadius: 20,
//   },
// });

// export default Header;

import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = ({title, navigation, showSearch = true}) => {
  return (
    <View style={styles.header}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Ionicons name="chevron-back" size={22} color="#000" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.headerTitle}>{title}</Text>

      {/* Search Button (only if showSearch = true) */}
      {showSearch ? (
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={24} color="#333" />
        </TouchableOpacity>
      ) : (
        <View style={{width: 24}} /> // Placeholder to keep layout balanced
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginTop: 12,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 5,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
});

export default Header;
