// import React, {useRef, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   SafeAreaView,
//   useWindowDimensions,
//   Platform,
//   StatusBar,
// } from 'react-native';
// import {useNavigation} from '@react-navigation/native';

// const slides = [
//   {
//     id: '1',
//     image: require('../../../assets/images/onboarding1.png'),
//     title: 'Welcome to\nMobi Trade',
//     subtitle: 'Buy certified pre-owned Tech',
//     buttons: ['Skip', 'Get Started'],
//   },
//   {
//     id: '2',
//     image: require('../../../assets/images/onboarding2.png'),
//     title: 'Every device',
//     title2: 'Checked & Certified',
//     subtitle:
//       '• 6 months warranty\n• 52 point quality checks\n• Best prices guaranteed',
//     buttons: ['Skip', 'Next'],
//   },
//   {
//     id: '3',
//     image: require('../../../assets/images/onboarding3.png'),
//     title: 'Happy\nShopping',
//     subtitle: 'Let’s find the right device for you.',
//     buttons: ['Log in / Sign up'],
//   },
// ];

// const OnboardingScreen = () => {
//   const flatListRef = useRef(null);
//   const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
//   const navigation = useNavigation();
//   const {width, height} = useWindowDimensions(); // responsive to orientation

//   const handleNext = () => {
//     if (currentSlideIndex < slides.length - 1) {
//       flatListRef.current.scrollToIndex({index: currentSlideIndex + 1});
//     }
//   };

//   const handleSkip = () => {
//     flatListRef.current.scrollToIndex({index: slides.length - 1});
//   };

//   const renderSlide = ({item}) => (
//     <View style={[styles.slide, {width}]}>
//       <Image
//         source={item.image}
//         style={{
//           width: width * 0.85,
//           height: height * 0.45,
//         }}
//         resizeMode="contain"
//       />

//       <View style={styles.textContainer}>
//         <Text style={styles.title}>{item.title}</Text>
//         {item.id === '2' ? (
//           <Text style={styles.title2}>{item.title2}</Text>
//         ) : null}

//         <Text style={styles.subtitle}>{item.subtitle}</Text>

//         {/* Pagination */}
//         <View style={styles.pagination}>
//           {slides.map((_, index) => (
//             <View
//               key={index}
//               style={[
//                 styles.dot,
//                 currentSlideIndex === index && styles.activeDot,
//               ]}
//             />
//           ))}
//         </View>

//         {/* Buttons */}
//         <View style={styles.buttonRow}>
//           {item.buttons.includes('Skip') && (
//             <TouchableOpacity
//               style={[styles.skipButton, {width: width * 0.4}]}
//               onPress={handleSkip}>
//               <Text style={styles.skipText}>Skip</Text>
//             </TouchableOpacity>
//           )}
//           {item.buttons.includes('Next') && (
//             <TouchableOpacity
//               style={[styles.nextButton, {width: width * 0.4}]}
//               onPress={handleNext}>
//               <Text style={styles.nextText}>Next</Text>
//             </TouchableOpacity>
//           )}
//           {item.buttons.includes('Get Started') && (
//             <TouchableOpacity
//               style={[styles.nextButton, {width: width * 0.4}]}
//               onPress={handleNext}>
//               <Text style={styles.nextText}>Get Started</Text>
//             </TouchableOpacity>
//           )}
//           {item.buttons.includes('Log in / Sign up') && (
//             <TouchableOpacity
//               style={[styles.nextButton, {width: width * 0.8}]}
//               onPress={() => navigation.navigate('LoginScreen')}>
//               <Text style={styles.nextText}>Log in / Sign up</Text>
//             </TouchableOpacity>
//           )}
//         </View>
//       </View>
//     </View>
//   );

//   const updateCurrentSlideIndex = e => {
//     const contentOffsetX = e.nativeEvent.contentOffset.x;
//     const index = Math.round(contentOffsetX / width);
//     setCurrentSlideIndex(index);
//   };

//   return (
//     <>
//       <StatusBar
//         backgroundColor="transparent"
//         translucent={true}
//         barStyle="dark-content"
//       />
//       <SafeAreaView style={styles.container}>
//         <FlatList
//           ref={flatListRef}
//           data={slides}
//           key={width} // force re-render on orientation
//           horizontal
//           pagingEnabled
//           showsHorizontalScrollIndicator={false}
//           onMomentumScrollEnd={updateCurrentSlideIndex}
//           renderItem={renderSlide}
//           keyExtractor={item => item.id}
//           getItemLayout={(_, index) => ({
//             length: width,
//             offset: width * index,
//             index,
//           })}
//         />
//       </SafeAreaView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   slide: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 40,
//   },
//   textContainer: {
//     width: '100%',
//     paddingHorizontal: 20,
//     paddingBottom: 40,
//     marginTop: 10, // ADD THIS
//   },
//   title: {
//     fontSize: 48,
//     fontWeight: 'bold',
//     color: '#1c1c1c',
//     marginBottom: 10,
//   },
//   title2: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#1c1c1c',
//     marginTop: -14,
//     marginBottom: 10,
//   },
//   subtitle: {
//     marginBottom:20,
//     fontSize: 17,
//     color: '#444',
//     fontWeight: 'semibold',
//     lineHeight: 22,
//     fontFamily: 'Source Serif 4',
//   },
//   pagination: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 25,
//     marginBottom: 25,
//   },
//   dot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#ccc',
//     marginHorizontal: 4,
//   },
//   activeDot: {
//     backgroundColor: '#1C9C48',
//     width: 10,
//     height: 10,
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     gap: 15,
//   },
//   skipButton: {
//     borderColor: '#1C9C48',
//     borderWidth: 2,
//     borderRadius: 8,
//     paddingVertical: 12,
//   },
//   skipText: {
//     color: '#1C9C48',
//     fontWeight: '600',
//     textAlign: 'center',
//     fontSize: 16,
//   },
//   nextButton: {
//     backgroundColor: '#1C9C48',
//     borderRadius: 8,
//     paddingVertical: 12,
//   },
//   nextText: {
//     color: '#fff',
//     fontWeight: '600',
//     textAlign: 'center',
//     fontSize: 16,
//   },
// });

// export default OnboardingScreen;































import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  useWindowDimensions,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const slides = [
  {
    id: '1',
    image: require('../../../assets/images/onboarding1.png'),
    title: 'Welcome to\nMobi Trade',
    subtitle: 'Buy certified pre-owned Tech',
    buttons: ['Skip', 'Get Started'],
  },
  {
    id: '2',
    image: require('../../../assets/images/onboarding2.png'),
    title: 'Every device',
    title2: 'Checked & Certified',
    subtitle:
      '• 6 months warranty\n• 52 point quality checks\n• Best prices guaranteed',
    buttons: ['Skip', 'Next'],
  },
  {
    id: '3',
    image: require('../../../assets/images/onboarding3.png'),
    title: 'Happy\nShopping',
    subtitle: 'Let’s find the right device for you.',
    buttons: ['Log in / Sign up'],
  },
];

const OnboardingScreen = () => {
  const flatListRef = useRef(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const navigation = useNavigation();
  const {width, height} = useWindowDimensions();

  const handleNext = () => {
    if (currentSlideIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({index: currentSlideIndex + 1});
    }
  };

  const handleSkip = () => {
    flatListRef.current.scrollToIndex({index: slides.length - 1});
  };

  const renderSlide = ({item}) => (
    <View style={[styles.slide, {width}]}>
      
      {/* IMAGE TOP SECTION */}
      <Image
        source={item.image}
        style={{
          width: width * 0.9,
          height: height * 0.42,
          marginTop: 20,
        }}
        resizeMode="contain"
      />

      {/* TEXT + BUTTON SECTION */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>

        {item.id === '2' && (
          <Text style={styles.title2}>{item.title2}</Text>
        )}

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

        {/* Buttons */}
        <View style={styles.buttonRow}>
          {item.buttons.includes('Skip') && (
            <TouchableOpacity
              style={[styles.skipButton, {width: width * 0.4}]}
              onPress={handleSkip}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          )}

          {item.buttons.includes('Next') && (
            <TouchableOpacity
              style={[styles.nextButton, {width: width * 0.4}]}
              onPress={handleNext}>
              <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>
          )}

          {item.buttons.includes('Get Started') && (
            <TouchableOpacity
              style={[styles.nextButton, {width: width * 0.4}]}
              onPress={handleNext}>
              <Text style={styles.nextText}>Get Started</Text>
            </TouchableOpacity>
          )}

          {item.buttons.includes('Log in / Sign up') && (
            <TouchableOpacity
              style={[styles.nextButton, {width: width * 0.8}]}
              onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={styles.nextText}>Log in / Sign up</Text>
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
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        
        <FlatList
          ref={flatListRef}
          data={slides}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={renderSlide}
          keyExtractor={item => item.id}
          onMomentumScrollEnd={updateCurrentSlideIndex}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
        />

      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', 
    paddingTop: 60,              // Image top look (as screenshot)
  },

  textContainer: {
    width: '100%',
    paddingHorizontal: 28,
    marginTop: 50,               // Proper gap between image and text
  },

  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1c1c1c',
    marginBottom: 5,
  },

  title2: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1c1c1c',
    marginTop: -10,
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 17,
    color: '#444',
    lineHeight: 23,
    fontWeight: '500',
    marginTop: 10,
  },

  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 40,     // Like screenshot
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },

  activeDot: {
    width: 10,
    height: 10,
    backgroundColor: '#1C9C48',
  },

  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 18,
  },

  skipButton: {
    borderWidth: 2,
    borderColor: '#1C9C48',
    paddingVertical: 14,
    borderRadius: 10,
  },

  skipText: {
    textAlign: 'center',
    color: '#1C9C48',
    fontSize: 16,
    fontWeight: '600',
  },

  nextButton: {
    backgroundColor: '#1C9C48',
    paddingVertical: 14,
    borderRadius: 10,
  },

  nextText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OnboardingScreen;
