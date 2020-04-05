import React,{useContext, useState,
    useLayoutEffect,
    useRef, } from 'react';
import { View, Text, ScrollView,
    SafeAreaView, FlatList, Image,
    ToastAndroid,
    StatusBarIOS,
} from 'react-native';
import { useRoute ,useNavigation,RouteProp, } from '@react-navigation/native';
import { StyleSheet, } from "react-native";

import ShuYuanSdk,{
    DirectoryListType,
    ArticleType,
    AllShuYuanIdsKey,
} from '@/common/shuYuanSdk';
import Header from '@/components/header';
import {IconBtn} from '@/components/icon';
import Ui from '@/utils/ui'

import styles from './css';

type RootStackParamList = {
    Profile: DirectoryListType[0];
  };
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;
// 上下文
type GlobalDataType = {
    pageType: 'default' | 'setting', // 页面类型
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
    },
    isUnshiftOperation: boolean,
    articleList: Array<ArticleType>, // 文章列表
    articleBase: ArticleType, // 文章基础数据
    setArticleList: Function,
    setArticleBase: Function,
    loadArticleHandle: Function,
    setIsUnshiftOperation: Function,
};
const initGlobalDataData:GlobalDataType = {
    pageType: 'default', 
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
    articleBase: { 
        prev: '',
        next: '',
        doc: '',
        title: '',
    },
    isUnshiftOperation: false,
    articleList: [], // 文章列表
    setArticleList: ()=>{},
    setArticleBase: ()=>{},
    loadArticleHandle: ()=>{},
    setIsUnshiftOperation: ()=>{},
};
const GlobalDataContext = React.createContext(initGlobalDataData);
// 文章主体
function ReadingMain(props:any) {
    const flatlistEl = useRef<any>(null);

    const globalDatae = useContext<GlobalDataType>(GlobalDataContext);

    const  loadPrevArticleHandle = function() {
        globalDatae.loadArticleHandle('prev');
        setTimeout(() => {
            // flatlistEl.current?.scrollToIndex({
            //     animated: false,
            //     index: 1,
            // });
        }, 0)

        
    };
    const getItemWH = function(index:number, layout:any) {
        if (index === 0 && globalDatae.isUnshiftOperation) {
            flatlistEl.current?.scrollToOffset({
                offset: layout.height,
                animated: false,
            })
            // console.log('3--------', 3267.047607421875)

            globalDatae.setIsUnshiftOperation(false);
        }
    }

    
    return <SafeAreaView>
                <FlatList
                ref={flatlistEl}
                data={globalDatae.articleList}
                refreshing={false}
                onEndReached={()=>globalDatae.loadArticleHandle('next')}
                onRefresh={loadPrevArticleHandle}
                onEndReachedThreshold={0.5}
                renderItem={({ item, index }) => <View 
                    onLayout={(e)=>getItemWH(index, e.nativeEvent.layout)}
                    style={styles.ReadingMainItem}>
                    <Text style={styles.ReadingMainItemTitle}>{item.title}</Text>    
                    <Text style={styles.ReadingMainItemcontent}>{item.doc}</Text>    
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
    const route = useRoute<ProfileScreenRouteProp>();
    const [urlParams, setUrlParams] = useState<DirectoryListType[0]>();
    const [globalData, setGlobalData] = useState<GlobalDataType>(initGlobalDataData);

    useLayoutEffect(() => {
        initDataHandle();
    }, []);
    const initDataHandle = async function() {
        const params:DirectoryListType[0] = {
            "title":"高深莫测的老板",
            "number":"002",
            "id":"/novel/147649/read_2.html",
            "source":"快眼看书",
        };
        // const params = route.params;
        setUrlParams(params);
        // 获取文章数据
        const data:ArticleType =  await ShuYuanSdk.getArticleInfo(params);
        setArticleBase(data);
        setArticleList([data]);
    }
    const setArticleList = function(articleList:GlobalDataType['articleList']) {
        setGlobalData((data: GlobalDataType) => {
            return {
                ...data,
                articleList,
            }
        });
    };
    const setArticleBase = function(articleBase:ArticleType) {
        setGlobalData((data: GlobalDataType) => {
            return {
                ...data,
                articleBase,
            }
        });
    };
    const loadArticleHandle = async function(type: 'next' | 'prev') {
        if (type === 'next' && !globalData.articleBase.next) {
            Ui.toast({
                title: '已经到底了！',
            });
            return;
        };
        if (type === 'prev' && !globalData.articleBase.prev) {
            Ui.toast({
                title: '已经到顶了！',
                directions: 'TOP',
                offX: 0, 
                offY: 20,
            });
            return;
        };
        let id = '';
        let target:any = {};
        if (type === 'next') {
            target = globalData.articleList[globalData.articleList.length - 1];
        }
        if (type === 'prev') {
            target = globalData.articleList[0];
        }
        id = target[type];
        const params:DirectoryListType[0] = {
            "id": id,
            "source": urlParams?.source as AllShuYuanIdsKey,
        };
        const data:ArticleType =  await ShuYuanSdk.getArticleInfo(params);
        setArticleBase(data);
        if (type === 'next') {
            globalData.articleList.push(data);
        }
        if (type === 'prev') {
            globalData.articleList.unshift(data);
            setIsUnshiftOperation(true);
        }
        setArticleList(globalData.articleList);
    }
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
    const setIsUnshiftOperation = function(isUnshiftOperation: boolean) {
        setGlobalData((data: GlobalDataType) => {
            return {
                ...data,
                isUnshiftOperation,
            }
        });
    }
    const onResponderEndFun = function() {
    }

    return (<View 
            style={[
                styles.homeWrap,
            ]} 
            onStartShouldSetResponder={() => true}
            onMoveShouldSetResponder={() => true}
            onResponderEnd={()=>onResponderEndFun()}>
            <GlobalDataContext.Provider value={{
                ...globalData,
                setArticleList,
                setArticleBase,
                loadArticleHandle,
                setIsUnshiftOperation,
            }}>
                {globalData.pageType === 'setting' ? <Header
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