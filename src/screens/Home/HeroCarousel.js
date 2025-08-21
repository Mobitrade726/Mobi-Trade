import React from 'react';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
import {useSelector} from 'react-redux';

const HeroCarousel = ({data = [], navigation}) => {
  // Get carouselData from Redux
  const carouselData = useSelector(state => state.home.carouselData);

  if (!data || data.length === 0) {
    return (
      <View
        style={{height: 200, justifyContent: 'center', alignItems: 'center'}}>
        <Text>No Carousel Data</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#FFFBFA', '#666666', '#1C9C48', '#EAE6E5']}
      locations={[1, 1, 0.3, 1]}>
      <Swiper
        showsPagination
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        autoplay
        loop
        style={styles.swiper}>
        {carouselData.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              if (item.id === 1) {
                navigation.navigate('carousel1'); // Replace with your screen name
              } else if (item.id === 2) {
                navigation.navigate('carousel2');
              } else if (item.id === 3) {
                navigation.navigate('carousel3');
              }
            }}>
            <ImageBackground
              source={{uri: item.image}}
              style={styles.card_Top}
              imageStyle={styles.image}>
              <View style={styles.textContainer}>
                {item.subtitle && (
                  <Text
                    style={[
                      styles.subtitleT,
                      {
                        color: item.subtitleColor || '#fff',
                        marginTop: item.subtitleMarginTop || 0,
                        marginLeft: item.marginLeft || 0,
                        width: item.width,
                      },
                    ]}>
                    {item.subtitle}
                  </Text>
                )}
                <Text
                  style={[
                    styles.titleT,
                    {
                      color: item.titleColor,
                      marginLeft: item.titleMarginLeft ?? 40,
                      marginTop: item.titleMarginTop ?? 0,
                      fontSize: item.titleFontSize ?? item.fontSize,
                      width: item.titlewidth ?? item.width,
                      fontWeight: item.fontWeight,
                    },
                  ]}>
                  {item.title}
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </Swiper>
    </LinearGradient>
  );
};

export default HeroCarousel;
