import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../screens/Splash/Splash';
import Signup from '../screens/SignupScreen/Signup';
import ForgetPassword from '../screens/ForgetPassword/ForgetPassword';
import BottomNavigator from './TabNavigator/BottomNavigator';
import ConfirmSignup from '../screens/SignupScreen/ConfirmSignup';
import LandingPage from '../screens/Landing/LandingPage';
import ForgetOTP from '../screens/ForgetPassword/ForgetOTP';
import SetPassword from '../screens/ForgetPassword/setPassword';
import Discover from './TabNavigator/Discover/Discover';
import LoginScreen from '../screens/Login/LoginScreen';
import OnboardingScreen from '../screens/Onboarding/OnboardingScreen';
import AboutMobiTrade from './TabNavigator/Account/About/AboutMobiTrade';
import Addresses from './TabNavigator/Account/Addresses/Addresses';
import AddNewAddress from './TabNavigator/Account/Addresses/AddNewAddress';
import Settings from './TabNavigator/Account/Settings/Setting';
import Signup_Address from '../screens/SignupScreen/Signup_Address';
import SignUpTab from '../screens/SignupScreen/SignUpTab';
import PushNotification from './TabNavigator/Account/Settings/PuchNotification/PushNotification';
import Language from './TabNavigator/Account/Settings/Languages/Language';
import ChangePassword from './TabNavigator/Account/Settings/ChangePassword/ChangePassword';
import LogoutDevices from './TabNavigator/Account/Settings/LogoutFromAllDevices/LogoutDevices';
import Privacy from './TabNavigator/Account/Settings/Privacy/Privacy';
import DeleteAccount from './TabNavigator/Account/Settings/DeleteMyAccount/DeleteAccount';
import ChatSupport from './TabNavigator/Account/ChatSupport/ChatSupport';
import Warranty from './TabNavigator/Account/WarrantyTracking/Warranty';
import HelpSupport from './TabNavigator/Account/HelpSupport/HelpSupport';
import WatchList from './TabNavigator/Account/Watchlist/WatchList';
import SubWatchList from './TabNavigator/Account/Watchlist/SubWatchList';
import Myorder from './TabNavigator/Account/MyOrder/Myorder';
import YourOrderIsOnTheWay from './TabNavigator/Account/MyOrder/YourOrderIsOnTheWay';
import YourOrderIsDelever from './TabNavigator/Account/MyOrder/YourOrderIsDelever';
import YourOrderIsCancle from './TabNavigator/Account/MyOrder/YourOrderIsCancle';
import TrackOrder from './TabNavigator/Account/MyOrder/TrackOrder';
import ReturnRequest from './TabNavigator/Account/MyOrder/ReturnRequest';
import Cart from './TabNavigator/Cart/Cart';
import Search from '../screens/Home/Search';
import shopbybrand from '../screens/Home/ShopByBrand/shopbybrand';
import Flashsale from '../screens/Home/FlashSale/Flashsale';
import Recentlyadd from '../screens/Home/RecentlyAdd/Recentlyadd';
import RecentlyView from '../screens/Home/RecentlyView/RecentlyView';
import ProductList from '../screens/Home/Categories/ProductList';
import SimilarProducts from '../screens/Home/RecentlyAdd/SimilarProducts';
import MightLike from '../screens/Home/RecentlyAdd/MightLike';
import Categories from '../screens/Home/Categories/Categories';
import CategoriesSmartphones from '../screens/Home/Categories/CategoriesTab';
import BestOfAndroid from '../screens/Home/Categories/BestOfAndroid';
import TopIosDevices from '../screens/Home/Categories/TopIosDevices';
import shopbybudgetSmartphones from '../screens/Home/ShopByBudget/shopbybudgetSmartphones';
import shopbybudgetAccessories from '../screens/Home/ShopByBudget/shopbybudgetAccessories';
import shopbybudgetWindowsMacbook from '../screens/Home/ShopByBudget/shopbybudgetWindowsMacbook';
import Checkout from './TabNavigator/Cart/StorePickUp/Checkout';
import KYCStatus from './TabNavigator/Account/KYCStatus/KYCStatus';
import PaymentMethod from './TabNavigator/Cart/StorePickUp/PaymentMethod';
import ProcessToPay from './TabNavigator/Cart/StorePickUp/ProcessToPay';
import KycCompleteStatus from './TabNavigator/Cart/Kyc/KycCompleteStatus';
import KycConfirmation from './TabNavigator/Cart/Kyc/KycConfirmation';
import UpgradeBusinessAccount from './TabNavigator/Cart/UpgradeNow/UpgradeBusinessAccount';
import UpgradeAccount from './TabNavigator/Cart/UpgradeNow/UpgradeTabAccount';
import UpgradeTabAccount from './TabNavigator/Cart/UpgradeNow/UpgradeTabAccount';
import UpgradeAccountAddress from './TabNavigator/Cart/UpgradeNow/UpgradeAccountAddress';
import WishlistScreen from './TabNavigator/Account/Watchlist/WatchList';
import shopbybrandfilter from '../screens/Home/ShopByBrand/shopbybrandfilter';
import SelectAddress from './TabNavigator/Cart/StorePickUp/SelectAddress';
import Wallet from './TabNavigator/Cart/Wallet/Wallet';
import WalletTransactions from './TabNavigator/Cart/Wallet/WalletTransactions';
import WalletAddMoney from './TabNavigator/Cart/Wallet/WalletAddMoney';
import Withdraw from './TabNavigator/Cart/Wallet/Withdraw';
import Grade from '../screens/Home/Grade/Grade';
import Android from '../screens/Home/Categories/Android';
import iOS from '../screens/Home/Categories/iOS';
import WindowsOS from '../screens/Home/Categories/WindowsOS';
import MacOS from '../screens/Home/Categories/MacOS';
import TopWindowLaptop from '../screens/Home/Categories/TopWindowLaptop';
import TopMacbooks from '../screens/Home/Categories/TopMacbooks';
import Accessories from '../screens/Home/Categories/Accessories';
import AccessoriesTopDevices from '../screens/Home/Categories/AccessoriesTopDevices';
import carousel1 from '../screens/Home/carousel/carousel1';
import carousel2 from '../screens/Home/carousel/carousel2';
import carousel3 from '../screens/Home/carousel/carousel3';
import YourOrderIsGettingPacked from './TabNavigator/Account/MyOrder/YourOrderIsGettingPacked';
import UpgradeNow from './TabNavigator/Cart/UpgradeNow/UpgradeNow';

const Stack = createNativeStackNavigator();

const StackNavigator = () => (
  <>
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
      <Stack.Screen name="ConfirmSignup" component={ConfirmSignup} />
      <Stack.Screen name="LandingPage" component={LandingPage} />
      <Stack.Screen name="ForgetOTP" component={ForgetOTP} />
      <Stack.Screen name="setPassword" component={SetPassword} />
      <Stack.Screen name="Discover" component={Discover} />
      <Stack.Screen name="AboutMobiTrade" component={AboutMobiTrade} />
      <Stack.Screen name="Addresses" component={Addresses} />
      <Stack.Screen name="AddNewAddress" component={AddNewAddress} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Signup_Address" component={Signup_Address} />
      <Stack.Screen name="SignUpTab" component={SignUpTab} />
      <Stack.Screen name="PushNotification" component={PushNotification} />
      <Stack.Screen name="Language" component={Language} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="LogoutDevices" component={LogoutDevices} />
      <Stack.Screen name="Privacy" component={Privacy} />
      <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
      <Stack.Screen name="ChatSupport" component={ChatSupport} />
      <Stack.Screen name="Warranty" component={Warranty} />
      <Stack.Screen name="HelpSupport" component={HelpSupport} />
      <Stack.Screen name="WatchList" component={WatchList} />
      <Stack.Screen name="SubWatchList" component={SubWatchList} />
      <Stack.Screen name="Myorder" component={Myorder} />
      <Stack.Screen
        name="YourOrderIsOnTheWay"
        component={YourOrderIsOnTheWay}
      />
      <Stack.Screen name="YourOrderIsDelever" component={YourOrderIsDelever} />
      <Stack.Screen name="YourOrderIsCancle" component={YourOrderIsCancle} />
      <Stack.Screen name="TrackOrder" component={TrackOrder} />
      <Stack.Screen name="ReturnRequest" component={ReturnRequest} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="shopbybrand" component={shopbybrand} />
      <Stack.Screen name="Flashsale" component={Flashsale} />
      <Stack.Screen name="Recentlyadd" component={Recentlyadd} />
      <Stack.Screen name="RecentlyView" component={RecentlyView} />
      <Stack.Screen name="ProductList" component={ProductList} />
      <Stack.Screen name="SimilarProducts" component={SimilarProducts} />
      <Stack.Screen name="MightLike" component={MightLike} />
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen
        name="CategoriesSmartphones"
        component={CategoriesSmartphones}
      />
      <Stack.Screen name="BestOfAndroid" component={BestOfAndroid} />
      <Stack.Screen name="TopIosDevices" component={TopIosDevices} />
      <Stack.Screen
        name="shopbybudgetSmartphones"
        component={shopbybudgetSmartphones}
      />
      <Stack.Screen
        name="shopbybudgetWindowsMacbook"
        component={shopbybudgetWindowsMacbook}
      />
      <Stack.Screen
        name="shopbybudgetAccessories"
        component={shopbybudgetAccessories}
      />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="KYCStatus" component={KYCStatus} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
      <Stack.Screen name="ProcessToPay" component={ProcessToPay} />
      <Stack.Screen name="KycCompleteStatus" component={KycCompleteStatus} />
      <Stack.Screen name="KycConfirmation" component={KycConfirmation} />
      <Stack.Screen
        name="UpgradeBusinessAccount"
        component={UpgradeBusinessAccount}
      />
      <Stack.Screen name="UpgradeTabAccount" component={UpgradeTabAccount} />
      <Stack.Screen name="UpgradeAccount" component={UpgradeAccount} />
      <Stack.Screen
        name="UpgradeAccountAddress"
        component={UpgradeAccountAddress}
      />
      <Stack.Screen name="WishlistScreen" component={WishlistScreen} />
      <Stack.Screen name="shopbybrandfilter" component={shopbybrandfilter} />
      <Stack.Screen name="SelectAddress" component={SelectAddress} />
      <Stack.Screen name="Wallet" component={Wallet} />
      <Stack.Screen name="WalletTransactions" component={WalletTransactions} />
      <Stack.Screen name="WalletAddMoney" component={WalletAddMoney} />
      <Stack.Screen name="Withdraw" component={Withdraw} />
      <Stack.Screen name="Grade" component={Grade} />
      <Stack.Screen name="Android" component={Android} />
      <Stack.Screen name="iOS" component={iOS} />
      <Stack.Screen name="WindowsOS" component={WindowsOS} />
      <Stack.Screen name="MacOS" component={MacOS} />
      <Stack.Screen name="TopWindowLaptop" component={TopWindowLaptop} />
      <Stack.Screen name="TopMacbooks" component={TopMacbooks} />
      <Stack.Screen name="Accessories" component={Accessories} />
      <Stack.Screen
        name="AccessoriesTopDevices"
        component={AccessoriesTopDevices}
      />
      <Stack.Screen name="carousel1" component={carousel1} />
      <Stack.Screen name="carousel2" component={carousel2} />
      <Stack.Screen name="carousel3" component={carousel3} />
      <Stack.Screen name="YourOrderIsGettingPacked" component={YourOrderIsGettingPacked} />
      <Stack.Screen name="UpgradeNow" component={UpgradeNow} />
    </Stack.Navigator>
  </>
);

export default StackNavigator;
