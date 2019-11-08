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
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import {tabBarIcon,} from '@/components/icon';
//*************************账户************************************//
import LoginScreen from '@/page/account/login'; // 登录
import LoginAuthScreen from '@/page/account/loginAuth'; // 登录状态验证
//*************************主界面************************************//
import HomeScreen from '@/page/main/home'; // 首页
import BibliothecaScreen from '@/page/main/bibliotheca'; // 书库
import BbsScreen from '@/page/main/bbs'; // 社区中心
import MyCenterScreen from '@/page/main/myCenter'; // 个人中心

// 主界面
const AppStack = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: '主页',
        tabBarIcon: tabBarIcon('home', 'Entypo'),
      }
    },
    Bibliotheca: {
      screen: BibliothecaScreen,
      navigationOptions: {
        title: '书籍',
        tabBarIcon: tabBarIcon('library', 'MaterialCommunityIcons'),
      }
    },
    Bbs: {
      screen: BbsScreen,
      navigationOptions: {
        title: '社区',
        tabBarIcon: tabBarIcon('message1', 'AntDesign'),
      }
    },
    MyCenter: {
      screen: MyCenterScreen,
      navigationOptions: {
        title: '个人中心',
        tabBarIcon: tabBarIcon('user', 'Entypo'),
      }
    },
  },
  {
    initialRouteName: 'Home',
    activeColor: '#3F9CD6',
    inactiveColor: '#D2D2D2',
    barStyle: { 
      backgroundColor: '#FFFFFF',
      borderTopColor: '#EDEDED',
      borderTopWidth: 1,
    },
  },
);

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    // 登录验证
    AuthLoading: {
      screen: LoginAuthScreen,
      navigationOptions: ({}) => ({header: null})
    },
    // 主界面-tab
    App: {
      screen: AppStack,
    },
    // 登录
    Login: {
      screen: LoginScreen,
      navigationOptions: ({}) => ({header: null, gesturesEnable: true}),
    },
  },
  {
    initialRouteName: 'AuthLoading',
  },
));

export default AppContainer;
