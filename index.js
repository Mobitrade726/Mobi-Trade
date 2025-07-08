/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-reanimated'; // 👈 This must be at the top (above react-native-gesture-handler)
import 'react-native-gesture-handler';


AppRegistry.registerComponent(appName, () => App);
