import { createRouter } from '@expo/ex-navigation';

import MapScreen from '../screens/MapScreen';
import Friends_ListScreen from '../screens/Friends_ListScreen';
import ProfileScreen from '../screens/ProfileScreen';
import QrcodeScreen from '../screens/QrcodeScreen';
import RootNavigation from './RootNavigation';
import LogInScreen from '../screens/LogInScreen';
import ChatScreen from '../screens/ChatScreen';
import SignInScreen from '../screens/SignInScreen';
import Setting1Screen from '../screens/Setting1Screen';
import Setting2Screen from '../screens/Setting2Screen';

export default createRouter(() => ({
  Map: () => MapScreen,
  Friends_List: () => Friends_ListScreen,
  Chat: () => ChatScreen,
  Profile: () => ProfileScreen,
  Qrcode: () => QrcodeScreen,
  rootNavigation: () => RootNavigation,
  LogIn: () => LogInScreen,
  SignIn: () => SignInScreen,
  Setting1: () => Setting1Screen,
  Setting2: () => Setting2Screen,
}));
