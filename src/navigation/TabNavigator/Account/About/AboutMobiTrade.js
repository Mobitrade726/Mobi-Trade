import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const AboutMobiTrade = ({navigation}) => {
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
          <Text style={styles.headerTitle}>About Mobi Trade</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Body */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.greenCard}>
          <Text style={styles.sectionTitle}>About Mobitrade</Text>
          <View style={styles.divider} />

          <Text style={styles.mainTitle}>
            Empowering the Next Generation{'\n'}with Trusted Technology
          </Text>

          <Text style={styles.bodyText}>
            <Text style={styles.bold}>At Mobi Trade</Text>, we believe that
            great technology should be accessible to everyone — not just the
            newest, but the smartest.{'\n'}
            By giving a second life to high-quality devices, we{' '}
            <Text style={styles.bold}>reduce e-waste</Text>,{' '}
            <Text style={styles.bold}>support sustainability</Text>, and offer{' '}
            <Text style={styles.bold}>reliable tech</Text> that's been tested,
            verified, and backed by warranty.
          </Text>

          <Text style={styles.bodyText}>
            Whether you're a <Text style={styles.bold}>student</Text>, a{' '}
            <Text style={styles.bold}>startup founder</Text>, or simply someone
            looking for <Text style={styles.bold}>dependable tech</Text> at
            honest prices, Mobitrade helps you stay connected without
            compromise. We're building a smarter future — one device at a time.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutMobiTrade;
