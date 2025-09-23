import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const LandingPage = () => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState('individual');

  const options = [
    {
      id: 'individual',
      label: 'As Individual account',
      icon: require('../../../assets/images/indivisual.png'),
    },
    {
      id: 'business',
      label: 'As a Business account',
      icon: require('../../../assets/images/business.png'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginHorizontal: 10}}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-outline"
              size={24}
              style={{
                backgroundColor: '#fff',
                borderRadius: 20,
                padding: 6,
                elevation: 2,
              }}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Login or Sign Up as</Text>
        </View>

        {/* Title & Subtitle */}
        <Text style={styles.title}>Login or Sign Up as</Text>
        <Text style={styles.subtitle}>Please select an option</Text>

        {/* Options */}
        {options.map(option => (
          <TouchableOpacity
            key={option.id}
            style={styles.optionContainer}
            onPress={() => setSelectedOption(option.id)}>
            <Image source={option.icon} style={styles.icon} />
            <Text style={styles.optionText}>{option.label}</Text>
            <View style={styles.radioCircle}>
              {selectedOption === option.id && (
                <View style={styles.selectedDot} />
              )}
            </View>
          </TouchableOpacity>
        ))}

        {/* Button */}
        <TouchableOpacity onPress={()=> navigation.navigate('SignUpTab', { accountType: selectedOption })} style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LandingPage;


