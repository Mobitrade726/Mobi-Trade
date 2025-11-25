import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import ShopByBrand from './shopbybrand';
import Header from '../../../constants/Header';
// import CatPage from './CatPage';

const Tab = createMaterialTopTabNavigator();

const shopbybrandsTab = ({navigation, route}) => {
  const {initialTab} = route.params || {};
  const {osList} = useSelector(state => state.home);

  // Component for each tab
  const DynamicTabComponent = ({route}) => {
    const {tabId, os_name} = route.params;

    return (
      <View style={styles.tabContent}>
        <ShopByBrand tabId={tabId} osName={os_name} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}

      <Header title="Shop by brands" navigation={navigation} showBack={true} />

      <Tab.Navigator
        initialRouteName={initialTab || osList[0]?.os_name || 'Default'}
        screenOptions={{
          tabBarLabelStyle: {fontSize: 12, fontWeight: '500'},
          tabBarActiveTintColor: '#2E8BFF',
          tabBarInactiveTintColor: '#aaa',
          tabBarIndicatorStyle: {
            backgroundColor: '#2E8BFF',
            height: 2,
          },
          lazy: true,
        }}>
        {osList.map(tab => (
          <Tab.Screen
            key={tab.id}
            name={tab.os_name}
            component={DynamicTabComponent}
            initialParams={{tabId: tab.id, os_name: tab.os_name}}
          />
        ))}
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  backButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    padding: 6,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  tabContent: {flex: 1},
  tabText: {fontSize: 16, color: '#333'},
});

export default shopbybrandsTab;
