import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
//import Auth from './src/screens/Auth';
import Navigator from './src/navigator'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Navigator);
