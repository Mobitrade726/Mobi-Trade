import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

const Section = ({ title, children, onPress }) => {
  return (
    <View style={{marginTop: 15, paddingHorizontal: 16}}>
       <View
         style={{
           flexDirection: 'row',
           justifyContent: 'space-between',
           alignItems: 'center',
           marginBottom: 10,
         }}>
         <Text style={{fontSize: 20, fontWeight: '600', color: '#222'}}>
           {title}
         </Text>
         {title !== 'More Features' && title !== 'Shop by budget' ? (
           <TouchableOpacity onPress={onPress}>
             <Ionicons name="chevron-forward" size={20} color="#333" />
           </TouchableOpacity>
         ) : null}
       </View>
       {children}
     </View>
  );
};

export default Section;
