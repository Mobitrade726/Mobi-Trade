import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
const {width} = Dimensions.get('window');

const slides = [
  {
    id: '1',
    image: require('../../../assets/images/onboarding1.png'),
    title: 'Welcome to Mobi Trade',
    subtitle: 'Buy certified pre-owned Tech',
    buttons: ['Skip', 'Get Started'],
  },
  {
    id: '2',
    image: require('../../../assets/images/onboarding2.png'),
    title: 'Every device',
    subtitle2: 'Checked & Certified',
    subtitle:
      '• 6 months warranty\n• 52 point quality checks\n• Best prices guaranteed',
    buttons: ['Skip', 'Next'],
  },
  {
    id: '3',
    image: require('../../../assets/images/onboarding3.png'),
    title: 'Happy Shopping',
    subtitle: "Let's find the right device for you.",
    buttons: ['Log in / Sign up'],
  },
];

const OnboardingScreen = () => {
  const flatListRef = useRef(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const navigation = useNavigation();

  const handleNext = () => {
    if (currentSlideIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({index: currentSlideIndex + 1});
    }
  };

  const handleSkip = () => {
    flatListRef.current.scrollToIndex({index: slides.length - 1});
  };

  const renderSlide = ({item}) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle2}>{item.subtitle2}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentSlideIndex === index && styles.activeDot,
              ]}
            />
          ))}
        </View>
        <View style={styles.buttonRow}>
          {item.buttons.includes('Skip') && (
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          )}

          {item.buttons.includes('Get Started') && (
            <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
              <Text style={styles.primaryText}>Get Started</Text>
            </TouchableOpacity>
          )}

          {item.buttons.includes('Next') && (
            <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
              <Text style={styles.primaryText}>Next →</Text>
            </TouchableOpacity>
          )}

          {item.buttons.includes('Log in / Sign up') && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('LoginScreen')
              }
              style={[styles.primaryButton, {width: '100%', marginTop: 20}]}>
              <Text style={styles.primaryText}>Log in / Sign up</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        renderItem={renderSlide}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
export default OnboardingScreen;
