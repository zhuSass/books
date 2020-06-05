import React,{useContext, useState,
    useLayoutEffect,
    useImperativeHandle,
    useCallback,
    forwardRef,
    useEffect,
    useMemo,
    useRef, } from 'react';
import { View, Text, ScrollView,
    SafeAreaView, FlatList, Image,
    ToastAndroid,
    StatusBarIOS,
    Dimensions,
    Animated,
    Easing,
    NativeSyntheticEvent,
    NativeScrollEvent,
    GestureResponderEvent,
} from 'react-native';
import { useRoute ,useNavigation,RouteProp, } from '@react-navigation/native';
import { PanGestureHandler,
    PanGestureHandlerGestureEvent,
    PanGestureHandlerStateChangeEvent,
    State,
} from 'react-native-gesture-handler';

import ShuYuanSdk,{
    DirectoryListType,
    ArticleType,
    AllShuYuanIdsKey,
} from '@/common/shuYuanSdk';
import Header from '@/components/header';
import {IconBtn} from '@/components/icon';
import {
    Ui,
    formatChapter,
    timeFormat,
    formatChapterResulteTypes,
    windowDevice,
} from '@/utils/index';

import styles from './css';

type RootStackParamList = {
    Profile: {
        /** 文章标题 **/
        title?: string,
        /** 第几章 **/
        number?: string,
        /** 文章地址 **/
        id: string,
        /** 平台标识 **/
        source: AllShuYuanIdsKey,
        /** 目录id **/
        directoryId?: string,
        /** 收藏id **/
        collectId?: string,
    };
  };
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;
type articleListFormatItemType = {
    [key in string]: ArticleType & {
        list: formatChapterResulteTypes,
    }
};
// 上下文
type GlobalDataType = {
    pageType: 'default' | 'setting', // 页面类型
    readOperation: 'default' | 'upDown' | 'around' | 'center', // default 没有操作；upDown上下；around 左右;center 中部
    readType: 'upAndDown' | 'leftAndRight', // 阅读类型；upAndDown 上下/ leftAndRight
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
    firstInvisible: boolean, // 上下滑动时文章数组第一个元素显示隐藏 
    scrollConfig: {
        x: number,
        y: number,
    },
    articleListFormat: articleListFormatItemType, // 格式化文章列表
    bottomLodding: boolean, // 下拉刷新加载状态
    currentChapter: number, // 当前章节的页数
    setArticleList: Function,
    setArticleBase: Function,
    loadArticleHandle: Function,
    setIsUnshiftOperation: Function,
    setGlobalData: Function,
    setCurrentChapter: Function,
    setArticleListFormat: Function,
};
const initGlobalDataData:GlobalDataType = {
    pageType: 'default', 
    bgColor: '#F6F1E7', 
    readOperation: 'default',
    readType: 'upAndDown',
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
        current: '',
        doc: '',
        title: '',
    },
    isUnshiftOperation: false,
    articleList: [], // 文章列表
    articleListFormat: {}, // 格式化文章列表
    bottomLodding: false, // 下拉刷新加载状态
    currentChapter: 0, // 当前章节的页数
    firstInvisible: false,
    scrollConfig: {
        x: 0,
        y: 0,
    },
    setArticleList: ()=>{},
    setArticleBase: ()=>{},
    loadArticleHandle: ()=>{},
    setIsUnshiftOperation: ()=>{},
    setGlobalData: ()=>{},
    setCurrentChapter: ()=>{},
    setArticleListFormat: ()=>{},
};

const GlobalDataContext = React.createContext(initGlobalDataData);
// 上下分页文章主体
function UpAndDownReading(props:any, ref:any) {
    const ReadingMainEl = useRef<any>(null);

    const globalData = useContext<GlobalDataType>(GlobalDataContext);

    const {
        loadArticleHandle,
        setGlobalData,
        articleListFormat,
    } = globalData;

    const  loadPrevArticleHandle = function() {
        globalData.loadArticleHandle('prev');
    };
    const getItemWH = function(index:number, layout:any) {
        if (index === 0 && globalData.isUnshiftOperation) {
            ReadingMainEl.current?.scrollToOffset({
                offset: layout.height,
                animated: false,
            })
            globalData.setGlobalData((data: GlobalDataType) => {
                return {
                    ...data,
                    firstInvisible: false,
                    bottomLodding: false,
                }
            });

            globalData.setIsUnshiftOperation(false);
        }
    }
    const handleScrollEvent = function(e:NativeSyntheticEvent<NativeScrollEvent>) {
        e.persist();
        globalData.setGlobalData((data: GlobalDataType) => {
            return {
                ...data,
                scrollConfig: e.nativeEvent.contentOffset,
            }
        });
    }
    // 上一页跳跃跳转
    const handleSkip = function(readOperation:GlobalDataType['readOperation']) {
        const {width, height} = windowDevice;
        const ReadingMainTagretEl = ReadingMainEl.current;
        const offsetY = height;

        if (readOperation === 'upDown') {
            let val = Math.floor(globalData.scrollConfig.y - offsetY + 62);
            val = val < 0 ? 0 : val;
            if (globalData.scrollConfig.y !== val) {
                ReadingMainTagretEl.scrollToOffset({
                    offset: val,
                    animated: true,
                });
            }
            if (val === 0) {
                loadArticleHandle('prev');
            } 
        }
        if (readOperation === 'around') {
            let val = Math.floor(globalData.scrollConfig.y  + offsetY - 62);
            if (globalData.scrollConfig.y !== val) {
                ReadingMainTagretEl.scrollToOffset({
                    offset: val,
                    animated: true,
                });
            }
        }
    };
    
    const onResponderEndFun = useCallback(function(e:GestureResponderEvent) {
        e.persist();
        const {pageY, pageX} = e.nativeEvent;
        const {width, height} = windowDevice;
        const resulteHeight = height;
        const areaHeight = resulteHeight / 3;
        const upArea:Array<number> =  [0, areaHeight]; // 手指按上区域部分
        const centerArea =  [areaHeight, areaHeight + areaHeight]; // 手指按中区域部分
        const bottomArea =  [areaHeight * 2, height]; // 手指按下区域部分
        let readOperation:GlobalDataType['readOperation'] = 'default';

        if (upArea[0] < pageY &&  upArea[1] > pageY) {
            readOperation = 'upDown';
            console.log('按上')
        }
        if (centerArea[0] < pageY &&  centerArea[1] > pageY) {
            readOperation = 'center';
            console.log('按中')
        }
        if (bottomArea[0] < pageY &&  bottomArea[1] > pageY) {
            readOperation = 'around';
            console.log('按下')
        }
        setGlobalData((data: GlobalDataType) => {
            return {
                ...data,
                readOperation: readOperation,
            };
        });
        if (readOperation !== 'default') {
            handleSkip(readOperation);
        }
        // console.log('坐标-------', pageY, height)
    }, [globalData]);
    
    return <View style={{
        flex: 1,
        }}
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderRelease={onResponderEndFun}
        >
        {/* 背景区块 */}
        {
            globalData.readingStyle.type === 'default' ?
                <ReadTheBackground/> : null
        }
        <SafeAreaView>
            <FlatList
            ref={ReadingMainEl}
            data={Object.keys(articleListFormat)}
            refreshing={globalData.bottomLodding}
            onEndReached={()=>globalData.loadArticleHandle('next')}
            onRefresh={loadPrevArticleHandle}
            onEndReachedThreshold={0.5}
            onScroll={handleScrollEvent}
            renderItem={({ item, index }) => {
                let obj = articleListFormat[item];
                return <View 
                onLayout={(e)=>getItemWH(index, e.nativeEvent.layout)}
                style={{
                    ...styles.ReadingMainItem,
                    opacity: index == 0 && globalData.firstInvisible ? 0 : 1,
                    }}>
                <Text style={styles.ReadingMainItemTitle}>{obj.title}</Text>
                {obj.list.map((objItem, index) => {
                    return <View key={index} style={styles.ReadingMainItemWrap}>
                            {
                                objItem.map((objItemItem, itemIndex) => {
                                    return <Text key={itemIndex} style={styles.ReadingMainItemcontent}
                                    >{objItemItem}</Text>
                                })
                            }
                    </View>
                })}    
            </View>
            }}
            keyExtractor={item => item}
            />
        </SafeAreaView>
    </View> 
    
    
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
// 左右分页文章主体
function LeftAndRightReading() {
    let readOperation = ''; // 左右方向

    // const currentArticle = useRef({ //当前文章数据
    //     keylistIndex: 1, // 列表索引
    //     key: 'fwerfwer2',
    //     keyIndex: 0, 
    // }); 
    // const afterArticle = useRef({ //之后文章数据
    //     keylistIndex: 1, // 列表索引
    //     key: 'fwerfwer2',
    //     keyIndex: 0, 
    // }); 
    type ArticleType = {
        key: string,
        keyIndex: number, 
        keylistIndex: number, // 列表索引
    };
    const [currentArticle, setCurrentArticle] = useState<ArticleType>({ //当前文章数据
        key: 'fwerfwer2',
        keyIndex: 0, 
        keylistIndex: 1, // 列表索引
    });
    const [afterArticle, setAfterArticle] = useState<ArticleType>({ //之后文章数据
        key: 'fwerfwer2',
        keyIndex: 0, 
        keylistIndex: 1, // 列表索引
    });
    const translateX = useRef(new Animated.Value(0));
    const lastOffset = useRef({ x: 0, }); // 偏移量
    const startX = useRef({ x: 0, }); // 手指刚接触的坐标
    const moveX = useRef({ x: 0, }); // 手指一动的坐标
    const [datas, setDatas] = useState<{
        [key in string]: {title: string, content: string}[]
    }>({
        'fwerfwer2': [
            {
            title: 'fwerfwer2-修仙传1',
            content: `修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传,
            修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传
            修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传
            仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传
            仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传
            仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传，
            仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传`,
            },
            {
                title: 'fwerfwer2-修仙传2',
                content: `修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传,
                修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传
                修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传
                仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传
                仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传
                仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传，
                仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传`,
            },
            {
                title: 'fwerfwer2-修仙传3',
                content: `修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传,
                修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传
                修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传
                仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传
                仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传
                仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传，
                仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传`,
            },
        ],
    });

    const onPanGestureEvent = Animated.event(
        [
          {
            nativeEvent: {
              translationX: translateX.current,
            },
          },
        ],
        { useNativeDriver: true }
    );
    const loadArticleHandle = function(type:string) {
        if (type === 'left') {
            let lists =  [
                    {
                    title: 'fwerfwer1-修仙传1',
                    content: `修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传,
                    修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传
                    修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传
                    仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传
                    仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传
                    仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传，
                    仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传`,
                    },
                    {
                        title: 'fwerfwer1-修仙传2',
                        content: `修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传,
                        修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传
                        修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传
                        仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传
                        仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传
                        仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传，
                        仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传`,
                    },
                    {
                        title: 'fwerfwer1-修仙传3',
                        content: `修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传,
                        修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传
                        修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传
                        仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传
                        仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传
                        仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传，
                        仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传`,
                    },
                ];
            setDatas((data:any):any => {
                return Object.assign({},
                    {fwerfwer1: lists},data);
            });
        } else {
            setDatas((data:any):any => {
                return {
                    ...data,
                    'fwerfwer3': [
                        {
                        title: 'fwerfwer3-修仙传1',
                        content: `修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传,
                        修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传
                        修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传
                        仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传
                        仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传
                        仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传，
                        仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传`,
                        },
                        {
                            title: 'fwerfwer3-修仙传2',
                            content: `修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传,
                            修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传
                            修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传
                            仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传
                            仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传
                            仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传，
                            仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传`,
                        },
                        {
                            title: 'fwerfwer3-修仙传3',
                            content: `修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传,
                            修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传
                            修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传
                            仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传
                            仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传
                            仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传，
                            仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传修仙传`,
                        },
                    ],
                }
            });
        }
    };
    const onHandlerStateChange = function(event: PanGestureHandlerStateChangeEvent) {
        let obj !: ArticleType;
        let nativeInfo = event.nativeEvent;
        lastOffset.current.x += nativeInfo.translationX;
        // console.log('lastOffset.x---', nativeInfo, lastOffset.x)
        // 手指刚start
        if (nativeInfo.oldState === 0) {
            startX.current.x = nativeInfo.x;
        }
        // 手指移动时
        if (nativeInfo.oldState === 2) {
            moveX.current.x = nativeInfo.x;
        }
        // 手指刚点击时oldState状态是1，这个时候移动坐标为0
        if (moveX.current.x === 0) {
            return;
        };
        if ((startX.current.x - moveX.current.x)  > 0) {
            readOperation = 'left';
            if (currentArticle.keyIndex === 0) {
                loadArticleHandle(readOperation);
                currentArticle.keyIndex = 1;
            }
            const datasKeyList = Object.keys(datas);
            if (currentArticle.keylistIndex === 0) {
                let currentKey = datasKeyList[currentArticle.keyIndex - 1];
                obj = {
                    keylistIndex: datas[currentKey].length - 1, 
                    key: currentKey,
                    keyIndex: (currentArticle.keyIndex - 1), 
                };
            } else {
                obj = {
                    keylistIndex: currentArticle.keylistIndex - 1, 
                    key: currentArticle.key,
                    keyIndex: currentArticle.keyIndex, 
                };
            }
        } else {
            readOperation = 'right';
            const oldDatasKeyList = Object.keys(datas);
            if (currentArticle.keyIndex === 0) {
                loadArticleHandle(readOperation);
                currentArticle.keyIndex = 1;
            }
            const datasKeyList = Object.keys(datas);
            if (currentArticle.keylistIndex === 0) {
                obj = {
                    keylistIndex: 0, 
                    key: datasKeyList[currentArticle.keyIndex - 1],
                    keyIndex: (currentArticle.keyIndex - 1), 
                };
            } else {
                obj = {
                    keylistIndex: currentArticle.keylistIndex - 1, 
                    key: currentArticle.key,
                    keyIndex: currentArticle.keyIndex, 
                };
            }
        }
        setAfterArticle(obj);
        console.log('2---------', obj);

        if (event.nativeEvent.oldState === 4) {
            if (readOperation === 'left') {
                Animated.timing(
                    translateX.current,
                    {
                        duration: 260,
                        toValue: -windowDevice.width,
                        useNativeDriver: true,
                    },
                ).start();
            } else {
                Animated.timing(
                    translateX.current,
                    {
                        duration: 260,
                        toValue: windowDevice.width,
                        useNativeDriver: true,
                    },
                ).start();
            }
            setTimeout(() => {
                setCurrentArticle(afterArticle);

                translateX.current.setValue(0);
            }, 60)
        }
    };
    const afterArticleObj = useMemo(() => {
        let defaults = {
            title: '', 
            content: '',
        }
        try {
            return datas[afterArticle.key][afterArticle.keylistIndex] || defaults;
        } catch(e) {
            console.log('产生出错-----', e)
            return defaults;
        }
    }, [ afterArticle]);
    const currentArticleObj = useMemo(() => {
        let defaults = {
            title: '', 
            content: '',
        };
        try {
            let data = datas[currentArticle.key][currentArticle.keylistIndex];
            return  data || defaults;
        } catch(e) {
            console.log('产生出错-----', e)
            return defaults;
        }
    }, [ currentArticle]);


    return <View style={styles.leftAndRightWap}>
        <View style={styles.leftAndRightWapView}>
            <Text>
                {JSON.stringify(afterArticle)}
                {afterArticleObj.title}
                {afterArticleObj.content}
            </Text>
        </View>
        <PanGestureHandler
            onHandlerStateChange={onHandlerStateChange}
            onGestureEvent={onPanGestureEvent}>
            <Animated.View
                style={[
                    {
                    },
                    styles.leftAndRightWapView,
                     {
                        transform: [
                            {
                                translateX: translateX.current,
                            },
                        ]
                     },
            ]}
            >
                <Text>
                    {JSON.stringify(currentArticle)}
                    {currentArticleObj.title}
                    {currentArticleObj.content}
                </Text>
            </Animated.View>
      </PanGestureHandler>
    </View>
}

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
        const data:ArticleType = await ShuYuanSdk.getArticleInfo(params);
        setArticleBase(data);
        setArticleList([data]);
        articleFormat(data);

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
    const setCurrentChapter = function(num: number) {
        setGlobalData((data: GlobalDataType) => {
            return {
                ...data,
                ...{
                    currentChapter: num,
                },
            }
        });
    };
    const articleFormat = function(dataInfo:ArticleType, direction?:string) {
        let _arr = formatChapter(dataInfo.doc, dataInfo.title);
        setGlobalData((data: GlobalDataType) => {
            let resulte = Object.assign({},dataInfo, {
                list: _arr,
            });
            if (!direction) {
                data.articleListFormat[dataInfo.current] = resulte;
            }
            if (direction === 'prev') {
                data.articleListFormat = {
                    [dataInfo.current]: resulte,
                    ...data.articleListFormat,
                };
                console.log('prev-----',
                data.articleListFormat);
            }
            if (direction === 'next') {
                data.articleListFormat = {
                    ...data.articleListFormat,
                    [dataInfo.current]: resulte,
                };
            }

            return {
                ...data,
            }
        });
        console.log('3----------', globalData.articleListFormat)
        console.log('4----------', _arr, dataInfo)
    };
    const loadArticleHandle = async function(type: 'next' | 'prev') {
        if (type === 'next' && !globalData.articleBase.next) {
            Ui.Toast({
                title: '已经到底了！',
            });
            return;
        };
        if (type === 'prev' && !globalData.articleBase.prev) {
            Ui.Toast({
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
            setGlobalData((data: GlobalDataType) => {
                return {
                    ...data,
                    bottomLodding: true,
                }
            });
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
            setGlobalData((data: GlobalDataType) => {
                return {
                    ...data,
                    firstInvisible: true,
                }
            });
        }
        articleFormat(data, type);
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

    return (<View 
            style={[
                styles.homeWrap,
            ]}>
            <GlobalDataContext.Provider value={{
                ...globalData,
                setArticleList,
                setArticleBase,
                loadArticleHandle,
                setIsUnshiftOperation,
                setGlobalData,
            }}>
                {globalData.pageType === 'setting' ? <Header
                    layout='absolute'
                    headerLeft={true}
                    headerRight={rendenHeaderContentEl}
                /> : null}
                {/* 上下分页文章主体 */}
                {globalData.readType === 'upAndDown' ? <View style={styles.readingMainContainer}>
                    <UpAndDownReading/>
                </View>:null}
                {/* 上下分页文章主体 */}
                {globalData.readType === 'leftAndRight' ? <View style={styles.readingMainContainer}>
                    <LeftAndRightReading/>
                </View>:null}
            </GlobalDataContext.Provider>
    </View>)
}

export default Index;