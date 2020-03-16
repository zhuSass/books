import React,{useContext, useState,} from 'react';
import { View, Text, ScrollView,
    SafeAreaView, FlatList, Image,
    StatusBarIOS,
} from 'react-native';
import { StyleSheet, } from "react-native";

import Header from '@/components/header';
import {IconBtn} from '@/components/icon';

import styles from './css';

// 上下文
type globalDataType = {
    pageType: '' | 'setting', // 页面类型
    bgColor: string, // 书面背景色
    readingStyle: { // 阅读样式
        type: 'default', // default 默认；
        titleFontSize: number, // 标题阅读字体大小
        fontSize: number, // 阅读字体大小
        defaultParameter?: { // 类型为default的参数
            imgSrcTop: string, // 放到上面的图片
            imgSrcBottom: string, // 放到下面的图片
            imgSrcMain: string, // 放到主体的图片
        },
    }
};
const globalData:globalDataType = {
    pageType: '', 
    bgColor: '#F6F1E7', 
    readingStyle: {
        type: 'default',
        titleFontSize: 27,
        fontSize: 18,
        defaultParameter: {
            imgSrcTop: 'https://qidian.gtimg.com/qdm/img/skin-default-t.ece62.jpg',
            imgSrcBottom: 'https://qidian.gtimg.com/qdm/img/skin-default-b.79f06.jpg',
            imgSrcMain: 'https://qidian.gtimg.com/qdm/img/skin-default-m.35905.jpg',
        },
    },
};
const GlobalDataContext = React.createContext(globalData);

// 文章主题
function ReadingMain(props:any) {
    let  initArticleList =[
        {title: '第一章', content: `妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        `,},
        {title: '第二章', content: `妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        `,},
        {title: '第三章', content: `妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        `,},
        {title: '第四章', content: `妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        `,},
        {title: '第五章', content: `妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        妮佛节经文儿科无人机哦危机，妮佛节经文儿科无人机哦危机
        `,},
    ]
    const [articleList, setArticleList] = useState(initArticleList);
    
    return <SafeAreaView>
                <FlatList
                data={articleList}
                renderItem={({ item, index }) => <View style={styles.ReadingMainItem}>
                    <Text style={styles.ReadingMainItemTitle}>{item.title}</Text>    
                    <Text style={styles.ReadingMainItemcontent}>{item.content}</Text>    
                </View>}
                keyExtractor={item => item.title}
                />
    </SafeAreaView>
}
// 阅读背景区块
function ReadTheBackground() {
    const themglobalDatae = useContext(GlobalDataContext);

    const { type, defaultParameter } = themglobalDatae.readingStyle;

    return <View style={styles.bgColorContainer}>
        {type === 'default' && <View>
                <Image style={styles.bgColorContainerTop}
                    source={{uri: defaultParameter?.imgSrcTop}}/> 
                <Image style={styles.bgColorContainerBottom}
                    source={{uri: defaultParameter?.imgSrcBottom}}/> 
                <Image style={styles.bgColorContainerMain}
                    source={{uri: defaultParameter?.imgSrcMain}}/> 
            </View>}
    </View>
};

function Index(props:any) {
    console.log('rading--------------')

    const themglobalDatae = useContext(GlobalDataContext);

    const headerHaderRight = function() {
    }
    // 头部右边内容显示
    const rendenHeaderContentEl = function() {
        return <View style={styles.headerRight}>
            <View style={styles.leaveMessage}>
                <Text style={styles.leaveMessageNum}>11w</Text>
                <IconBtn 
                    style={styles.leaveMessageIcon}
                    onPress={headerHaderRight}
                    fontFileName='MaterialCommunityIcons'
                    name='message-text-outline'
                    />
            </View>
            <View style={styles.iconMore}>
                <IconBtn 
                    style={styles.iconMoreIcon}
                    onPress={headerHaderRight}
                    fontFileName='Feather'
                    name='more-vertical'
                    />
            </View>
        </View>
    };
    const onResponderEndFun = function() {
        console.log('3-----------')
    }

    return (<View 
            style={[
                styles.homeWrap,
            ]} 
            onStartShouldSetResponder={() => true}
            onMoveShouldSetResponder={() => true}
            onResponderStart={()=>console.log('34343434')}
            onResponderEnd={()=>onResponderEndFun()}>
            <GlobalDataContext.Provider value={globalData}>
                {themglobalDatae.pageType === 'setting' ? <Header
                    layout='absolute'
                    headerLeft={true}
                    headerRight={rendenHeaderContentEl}
                /> : null}
                {/* 文章主题 */}
                <View style={styles.readingMainContainer}>
                    <ReadingMain/>
                </View>
                {/* 背景区块 */}
                <ReadTheBackground/>
            </GlobalDataContext.Provider>
    </View>)
}

export default Index;