import { 
    createStackNavigator,
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
//*************************书库模块************************************//
import BookDetailsScreen from '@/page/bibliothecas/bookDetails'; // 书籍详情
//*************************其它模块************************************//
import ReadingScreen from '@/page/other/reading'; // 阅读

// 书库模块
const BibliothecaModel = createStackNavigator(
  {
    // 主界面-tab
    BibliothecaMain: {
      screen: BibliothecaScreen,
      navigationOptions: ({}) => ({header: null}),
    },
    // 书籍详情
    BookDetails: {
      screen: BookDetailsScreen,
      navigationOptions: ({}) => ({header: null, gesturesEnable: true}),
    },
  },
  {
    initialRouteName: 'BibliothecaMain',
    mode: 'modal',
  },
);
// 其它模块
const OtherModel = createStackNavigator(
  {
    reading: {
      screen: ReadingScreen,
      navigationOptions: ({}) => ({header: null, gesturesEnable: true}),
    }
  },
  {
    initialRouteName: 'reading',
    mode: 'modal',
  },
);
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
      screen: BibliothecaModel,
      navigationOptions: {
        title: '书库',
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
// 入口路由
export default createStackNavigator(
    {
      // 登录验证
      AuthLoading: {
        screen: LoginAuthScreen,
        navigationOptions: ({}) => ({header: null})
      },
      // 主界面-tab
      App: {
        screen: AppStack,
        navigationOptions: ({}) => ({header: null}),
      },
      // 登录
      Login: {
        screen: LoginScreen,
        navigationOptions: ({}) => ({header: null, gesturesEnable: true}),
      },
      // 阅读
      Other: {
        screen: OtherModel,
        navigationOptions: ({}) => ({header: null}),
      },
    },
    {
      initialRouteName: 'Other',
      mode: 'modal',
    },
  )