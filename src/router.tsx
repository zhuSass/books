import * as React from 'react';
import { 
    createStackNavigator,
  } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {tabBarIcon,} from '@/components/icon';
//*************************账户************************************//
import LoginScreen from '@/page/account/login'; // 登录
import LoginAuthScreen from '@/page/account/loginAuth'; // 登录状态验证
//*************************主界面************************************//
import HomeScreen from '@/page/main/home'; // 首页
import BibliothecaScreen from '@/page/main/bibliotheca'; // 书库
import FavoritesScreen from '@/page/main/favorites'; // 收藏夹
import MyCenterScreen from '@/page/main/myCenter'; // 个人中心
//*************************书库模块************************************//
import BookDetailsScreen from '@/page/bibliothecas/bookDetails'; // 小说主页
//*************************其它模块************************************//
import ReadingScreen from '@/page/other/reading'; // 阅读
import BookDirectoryScreen from '@/page/other/directory'; // 小说目录
import searchScreen from '@/page/other/search'; // 小说目录
import ShuYuanSdk,{
  AllShuYuanIdsKey,
} from '@/common/shuYuanSdk';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

// 书库模块
function BibliothecaModel() {
  type listItemType = {
    label: string,
    name: string,
  }
  let list:listItemType[] = [];
  Object.keys(ShuYuanSdk.allShuYuanIds).forEach(key => {
    list.push({
        label: ShuYuanSdk.allShuYuanIds[key as AllShuYuanIdsKey].label,
        name: key,
    })
  });
  // list = [
  //   {label: '神圣天堂', name: '零七中文网'},
  //   {label: '乌托邦', name: '快眼看书'},
  //   {label: '乌托邦', name: '快眼看书'},
  //   {label: '乌托邦', name: '快眼看书'},
  //   {label: '乌托邦', name: '快眼看书'},
  //   {label: '乌托邦', name: '快眼看书'},
  //   {label: '乌托邦', name: '快眼看书'},
  // ]
  
  return (
    <TopTab.Navigator
      initialRouteName="快眼看书"
      tabBarOptions={{
        scrollEnabled: true,
        labelStyle: { fontSize: 16, },
        inactiveTintColor: '#505050',
        activeTintColor: '#484848',
        indicatorStyle: {backgroundColor: '#484848',},
        style: { 
          backgroundColor: '#f4f5f6',
        },
        tabStyle: {
          width: 'auto',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      {list.map((item: listItemType, i:number) => {
        return <TopTab.Screen
                key={i}
                name={item.name}
                component={BibliothecaScreen}
                options={{ tabBarLabel: item.label,tabBarTestID: item.name, }}
              />
      })}
    </TopTab.Navigator>
  );
}
// 其它模块
function OtherModel() {
  return (
    <Stack.Navigator
      initialRouteName="search"
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
      {/* 小说主页 */}
      <Stack.Screen
        name="BookDetails"
        component={BookDetailsScreen}
        options={{
          title: '小说主页',
        }}
      />
      {/* 小说目录 */}
      <Stack.Screen
        name="BookDirectory"
        component={BookDirectoryScreen}
        options={{
          title: '小说目录',
        }}
      />
      {/* 小说搜索 */}
      <Stack.Screen
        name="search"
        component={searchScreen}
        options={{
          title: '小说搜索',
        }}
      />
    </Stack.Navigator>
  );
}
// 主界面
function AppStack() {
  return (
    <Tab.Navigator
      initialRouteName="Favorites"
      tabBarOptions={{
        activeTintColor: '#3F9CD6',
        inactiveTintColor: '#595959',
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
          tabBarLabel: '书库',
          tabBarIcon: ({color}:any) => tabBarIcon('library', 'MaterialCommunityIcons', color),
        }}
       />
       <Tab.Screen 
        name="Favorites" 
        component={FavoritesScreen} 
        options={{
          title: '收藏夹',
          tabBarIcon: ({color}:any) => tabBarIcon('collections-bookmark', 'MaterialIcons', color),
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



