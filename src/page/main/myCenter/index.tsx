import React,{useEffect, useState,} from 'react';
import { 
    View,
    ScrollView, ImageBackground,
    SafeAreaView, FlatList,
    TouchableWithoutFeedback,
    Image,
    Text,
    NativeScrollEvent,
    TouchableOpacity,
    ToastAndroid,
} from 'react-native';
import useSWR from 'swr';
import { useRoute ,useNavigation,
    RouteProp,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import Header from '@/components/header';
import LazyLoading from '@/components/lazyLoading';
import Icon from '@/components/icon';
import ShuYuanSdk,{HomeList} from '@/common/shuYuanSdk';
import {Toast, toastDirection} from '@/utils/ui';

import styles from './css';

// 头部背景图
function HeaderBg() {
    return <ImageBackground source={{
                uri: 'http://img.netbian.com/file/2018/1029/19c413c837d2cf493f19c22a24c63cea.jpg',
            }} 
            style={styles.headerBg}>
    </ImageBackground>
}
// 用户信息
function UserInfo() {
    const navigation = useNavigation();
    const [operationList, setOperationList] = useState([
        {label: '访问总量', num: 0,},
        {label: '关注', num: 0,},
        {label: '粉丝', num: 0,},
        {label: '收赏总量', num: 0,},
    ]);

    const handleUserInfo = async function() {
        const userToken = await AsyncStorage.getItem('token');

        if (userToken) {
            Toast({
                title: '暂未开放，敬请期待！',
                direction: ToastAndroid.CENTER, 
            });
        } else {
            navigation.navigate('Login');
        }
    };
    const clickOperation = async function(item: any) {
        Toast({
            title: `${item.label}暂未开放，敬请期待！`,
            direction: ToastAndroid.CENTER, 
        });
    };
    return <View style={styles.userInfo}>
        <View style={styles.userInfoHeader}>
            <TouchableOpacity 
                onPress={handleUserInfo}
                style={styles.userInfoHeaderText}>
                <Text style={styles.headerTextName}>未登录</Text>
                <View style={styles.headerTextLevel}>
                    <Text style={styles.headerTextLevelInfo}>Lv.0</Text>
                </View>
                <Text style={styles.headerTextSignature} numberOfLines={1}>
                    个人签名我还没想好说什么...
                </Text>
            </TouchableOpacity>
            <View style={styles.userInfoHeaderImage}>
                <Icon fontFileName='FontAwesome'
                    color='#c0ccda'
                    size={48}
                    name='user-circle'/>
            </View>
        </View>
        <View style={styles.userInfoList}>
            {operationList.map((item: any, index) => {
                return <TouchableOpacity 
                    key={index}
                    style={styles.userInfoListItem}
                    onPress={() => clickOperation(item)}>
                    <Text style={styles.userInfoListItemNum}>{item.num}</Text>
                    <Text style={styles.userInfoListItemText}>{item.label}</Text>
                </TouchableOpacity> 
            })}
        </View>
    </View>
}
// 页面入口
function PageCrossroads() {
    const navigation = useNavigation();
    const [list, setList] = useState([
        {fontFileName: 'Entypo', color: '#484848', name: 'open-book', label: '我的书单',},
        {fontFileName: 'Entypo', color: '#484848', name: 'chat', label: '我的书评',},
    ]);
    const clickOperation = function(item:any) {
        // Toast({
        //     title: `暂未开放，敬请期待！`,
        //     direction: ToastAndroid.CENTER, 
        // });
        if (item.label === '我的书单') {
            navigation.navigate('Bbs', { 
                screen: 'App', 
            });
        } else if (item.label === '我的书评') {
            navigation.navigate('Bbs', { 
                screen: 'App', 
            });
        }
    };

    return <View style={styles.pageCrossroads}>
        {list.map((item: any, index) => {
            return <TouchableOpacity key={index}
                onPress={() => clickOperation(item)}
                style={styles.pageCrossroadsItems}>
                <Icon fontFileName={item.fontFileName}
                    color={item.color}
                    size={22}
                    style={styles.pageCrossroadsItemsLogo}
                    name={item.name}/>
                <Text style={styles.pageCrossroadsItemsText}>{item.label}</Text>
                <Icon fontFileName='AntDesign'
                    color={'#848484'}
                    size={22}
                    style={styles.pageCrossroadsItemsIcon}
                    name='right'/>
            </TouchableOpacity>
        })}
    </View>
}

function Index(props:any) {
    return (<View style={styles.indexWrap}>
        <HeaderBg/>
        <UserInfo/>
        <ScrollView style={styles.scrollView}>
            <PageCrossroads/>
        </ScrollView>
    </View>)
}

export default Index;