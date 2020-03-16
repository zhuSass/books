import * as React from 'react';
import { 
    createStackNavigator,
  } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

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

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

// 书库模块
function BibliothecaModel() {
  return (
    <Stack.Navigator
      initialRouteName="BibliothecaMain"
      headerMode="none"
    >
      {/* 主界面-tab */}
      <Stack.Screen
        name="BibliothecaMain"
        component={BibliothecaScreen}
        options={{
          title: '主界面-tab',
        }}
      />
      {/* 书籍详情 */}
      <Stack.Screen
        name="BookDetails"
        component={BookDetailsScreen}
        options={{
          title: '书籍详情',
        }}
      />
    </Stack.Navigator>
  );
}
// 其它模块
function OtherModel() {
  return (
    <Stack.Navigator
      initialRouteName="Reading"
      headerMode="none"
    >
      {/* 文章详情 */}
      <Stack.Screen
        name="Reading"
        component={ReadingScreen}
        options={{
          title: '文章详情',
          gestureEnabled: true,
        }}
      />
    </Stack.Navigator>
  );
}
// 主界面
function AppStack() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#3F9CD6"
      inactiveColor="#D2D2D2"
      barStyle={{
        backgroundColor: '#FFFFFF',
        borderTopColor: '#EDEDED',
        borderTopWidth: 1,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          title: '主页',
          tabBarIcon: ({color}:any) => tabBarIcon('home', 'Entypo', color),
        }}
       />
       <Tab.Screen 
        name="Bibliotheca" 
        component={BibliothecaModel} 
        options={{
          title: '书库',
          tabBarIcon: ({color}:any) => tabBarIcon('library', 'MaterialCommunityIcons', color),
        }}
       />
       <Tab.Screen 
        name="Bbs" 
        component={BbsScreen} 
        options={{
          title: '社区',
          tabBarIcon: ({color}:any) => tabBarIcon('message1', 'AntDesign', color),
        }}
       />
       <Tab.Screen 
        name="MyCenter" 
        component={MyCenterScreen} 
        options={{
          title: '个人中心',
          tabBarIcon: ({color}:any) => tabBarIcon('user', 'Entypo', color),
        }}
       />
    </Tab.Navigator>
  );
}
// 入口路由
export default function MinRouter() {
  return (
    <Stack.Navigator
      initialRouteName="App"
      headerMode="none"
    >
       {/* 登录验证 */}
      <Stack.Screen
        name="AuthLoading"
        component={LoginAuthScreen}
        options={{
          title: '登录验证',
        }}
      />
      {/* 主界面-tab */}
      <Stack.Screen
        name="App"
        component={AppStack}
        options={{
          title: '主界面-tab',
        }}
      />
      {/* 登录 */}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: '登录',
          gestureEnabled: true,
        }}
      />
      {/* 其它 */}
      <Stack.Screen
        name="Other"
        component={OtherModel}
        options={{
          title: '其它',
        }}
      />
    </Stack.Navigator>
  );
};



