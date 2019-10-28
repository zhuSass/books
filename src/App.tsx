/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from "react";
import { View, Text,} from "react-native";
import { createStackNavigator, 
  createAppContainer, 
  createSwitchNavigator,
} from "react-navigation";
//*************************账户************************************//
import LoginScreen from '@/page/account/login'; // 登录
import LoginAuthScreen from '@/page/account/loginAuth'; // 登录状态验证
//*************************首页************************************//
import HomeScreen from '@/page/home'; // 登录状态验证

// import LoginScreen from './page/account/login'; // 登录
// import LoginAuthScreen from './page/account/loginAuth'; // 登录状态验证
// import HomeScreen from './page/home'; // 登录状态验证

// class HomeScreen extends React.Component {
//   static navigationOptions = {
//     header: null,
//   };
//   render() {
//     return (
//       <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//         <Text>Home Screen</Text>
//       </View>
//     );
//   }
// }

const AppStack = createStackNavigator({
  Home:  HomeScreen,
});
const AuthStack = createStackNavigator({ 
  Login:  LoginScreen,
});

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: {
      screen: LoginAuthScreen,
      navigationOptions: ({}) => ({header: null})
    },
    App: {
      screen: AppStack,
    },
    Auth: {
      screen: LoginScreen,
      navigationOptions: ({}) => ({header: null, gesturesEnable: true}),
    },
  },
  {
    initialRouteName: 'AuthLoading',
  },
));

export default AppContainer;
