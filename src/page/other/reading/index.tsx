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
    LayoutChangeEvent,
    GestureResponderEvent,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StatusBar,
    ViewToken,
} from 'react-native';
import rnTextSize, { TSFontSpecs } from 'react-native-text-size';
import { 
    hideNavigationBar,
    showNavigationBar,
 } from 'react-native-navigation-bar-color';
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
import TouchView from '@/components/touchView';
import Header from '@/components/header';
import {IconBtn} from '@/components/icon';
import LazyLoading from '@/components/lazyLoading';
import {
    Ui,
    formatChapter,
    timeFormat,
    windowDevice,
    formatChapterResulteTypes,
    screen,
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
type currentArticleType = {
    key: string,
    keyIndex: number, 
    keylistIndex: number, // 列表索引
};
// 上下文
type GlobalDataType = {
    pageType: 'default' | 'setting', // 页面类型
    readOperation: 'default' | 'upDown' | 'around' | 'center', // default 没有操作；upDown上下；around 左右;center 中部
    readType: 'upAndDown' | 'leftAndRight', // 阅读类型；upAndDown 上下/ leftAndRight
    bgColor: string, // 书面背景色
    readingStyle: { // 阅读样式
        type: 'default' | 'white', // default 默认；white 白色
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
    currentArticle: currentArticleType,
    articleListFormat: articleListFormatItemType, // 格式化文章列表
    titleStyle: TSFontSpecs, // 文章标题样式
    contentStyle: TSFontSpecs, // 文章内容样式
    bottomLodding: boolean, // 下拉刷新加载状态
    contentLoadding: boolean, // 内容加载状态
    currentChapter: number, // 当前章节的页数
    windowDeviceHeight: number, // 当前页面高度
    toolbarHeight: number, // 文章内容上下边的信息栏高度
    setArticleList: Function,
    setArticleBase: Function,
    loadArticleHandle: Function,
    setIsUnshiftOperation: Function,
    setGlobalData: Function,
    setArticleListFormat: Function,
};
const initGlobalDataData:GlobalDataType = {
    pageType: 'default', 
    bgColor: '#F6F1E7', 
    readOperation: 'default',
    readType: 'upAndDown',
    readingStyle: {
        type: 'white',
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
    currentArticle: {
        keylistIndex: 0, // 列表索引
        key: '',
        keyIndex: 0, 
    },
    isUnshiftOperation: false,
    articleList: [], // 文章列表
    articleListFormat: {}, // 格式化文章列表
    bottomLodding: false, // 下拉刷新加载状态
    contentLoadding: false, // 内容加载状态
    currentChapter: 0, // 当前章节的页数
    windowDeviceHeight: Math.floor(screen.height), // 当前页面高度,28=系统菜单栏
    toolbarHeight: 42, // 文章内容上下边的信息栏高度
    firstInvisible: false,
    scrollConfig: {
        x: 0,
        y: 0,
    },
    titleStyle: { // 文章标题样式
        fontSize: 22,
        fontWeight: 'bold',
    }, 
    contentStyle: { // 文章内容样式
        fontSize: 18,
    },
    setArticleList: ()=>{},
    setArticleBase: ()=>{},
    loadArticleHandle: ()=>{},
    setIsUnshiftOperation: ()=>{},
    setGlobalData: ()=>{},
    setArticleListFormat: ()=>{},
};

const GlobalDataContext = React.createContext(initGlobalDataData);
// 上下分页文章主体
function UpAndDownReading(props:any, ref:any) {
    const ReadingMainEl = useRef<any>(null);
    const [textHeight, setTextHeight] = useState(0);

    const globalData = useContext<GlobalDataType>(GlobalDataContext);

    const {
        loadArticleHandle,
        setGlobalData,
        articleListFormat,
        windowDeviceHeight,
        titleStyle,
        contentStyle,
        currentArticle,
    } = globalData;

    useEffect(() => {
        console.log('b------', articleListFormat[currentArticle.key],
        currentArticle.keyIndex, articleListFormat)

        // ReadingMainEl.current.scrollToItem({
        //     animated: false,
        //     item: articleListFormat[currentArticle.keyIndex - 1],
        // });

    }, []);
    const  loadPrevArticleHandle = function(direction:string) {
        if (direction === 'prev' && !globalData.articleBase.prev) {
            Ui.Toast({
                title: '已经到顶了！',
            });
            return;
        }
        if (direction === 'next' && !globalData.articleBase.next) {
            Ui.Toast({
                title: '已经到底了！',
            });
            return;
        }
        globalData.loadArticleHandle(direction);
    };
    const changeCurrentArticle = function(key:any, index: number) {
        let keyIndex = Object.keys(articleListFormat).findIndex(i => i === key);

        setGlobalData((oldData:any) => {
            return {
                ...oldData,
                ...{
                    currentArticle: {
                        keylistIndex: index, 
                        key: key,
                        keyIndex: keyIndex, 
                    },
                }
            }
        });
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
                pageType: 'default',
            }
        });
    }
    // 上一页跳跃跳转
    const handleSkip = function(readOperation:GlobalDataType['readOperation']) {
        const {width, height} = screen;
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
                loadPrevArticleHandle('prev');
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
        const {width, height} = screen;
        const resulteHeight = height;
        const areaHeight = resulteHeight / 3;
        const upArea:Array<number> =  [0, areaHeight]; // 手指按上区域部分
        const centerArea =  [areaHeight, areaHeight + areaHeight]; // 手指按中区域部分
        const bottomArea =  [areaHeight * 2, height]; // 手指按下区域部分
        let readOperation:GlobalDataType['readOperation'] = 'default';

        if (upArea[0] < pageY &&  upArea[1] > pageY) {
            readOperation = 'upDown';
        }
        if (centerArea[0] < pageY &&  centerArea[1] > pageY) {
            readOperation = 'center';
            setGlobalData((data: GlobalDataType) => {
                return {
                    ...data,
                    ...{
                        pageType: (data.pageType === 'setting' ? 
                            'default' : 'setting'),
                    },
                }
            });
        } else {
            setGlobalData((data: GlobalDataType) => {
                return {
                    ...data,
                    ...{
                        pageType: 'default',
                    },
                }
            });
        }
        if (bottomArea[0] < pageY &&  bottomArea[1] > pageY) {
            readOperation = 'around';
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
    const currentArticleObj = useMemo(() => {
        let defaults = {
            title: '', 
            list: [[]],
        };
        try {
            let data = articleListFormat[currentArticle.key] || defaults;
            return  data || defaults;
        } catch(e) {
            console.log('产生出错-----', e)
            return defaults;
        }
    }, [ globalData]);
    
    return <View style={{
        flex: 1,
        paddingTop: globalData.toolbarHeight,
        position: 'relative',
        }}
        >
        {/* 文章内容上下边的信息栏 */}
        <View style={[styles.toolbar, styles.toolbarTop]}>
            <ReadTheBackground/> 
            <View style={[
                styles.toolbarLeft,
                {
                    height: globalData.toolbarHeight,
                }
                ]}>
                <Text style={styles.toolbarText}>
                    {currentArticleObj.title}
                </Text>
            </View>
            <View style={[
                styles.toolbarRight,
                {
                    height: globalData.toolbarHeight,
                }
                ]}>
            </View>
        </View>
        <View style={[
            styles.toolbar,
            styles.toolbarBottom,
            ]}>
            <ReadTheBackground/> 
            <View style={[
                styles.toolbarLeft,
                {
                    height: globalData.toolbarHeight,
                }]}>
            </View>
            <View style={[
                styles.toolbarRight,
                {
                    height: globalData.toolbarHeight,
                }
            ]}>
                <Text style={styles.toolbarText}>
                    {
                        `${currentArticle.keylistIndex + 1}/${
                            currentArticleObj.list.length
                        }`
                    }
                </Text>
            </View>
        </View>
        <SafeAreaView style={{
            flex: 1,
        }}>
            <FlatList
            ref={ReadingMainEl}
            initialScrollIndex={currentArticle.keyIndex}
            data={Object.keys(articleListFormat)}
            refreshing={globalData.bottomLodding}
            onEndReached={()=>loadPrevArticleHandle('next')}
            onRefresh={()=>loadPrevArticleHandle('prev')}
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
  
                {obj.list.map((objItem, index) => {    
                    return <View 
                    key={index} 
                    onStartShouldSetResponder={() => true}
                    onMoveShouldSetResponder={() => true}
                    onResponderGrant={() => changeCurrentArticle(item, index)}
                    onResponderRelease={onResponderEndFun}
                    style={{
                        ...styles.ReadingMainItemWrap,
                        ...{
                        }
                        }}>
                            {index === 0 ? <Text 
                                onLayout={((event: LayoutChangeEvent) => {
                                    let val = event.nativeEvent.layout.height;
                                    setTextHeight(val);
                                })}
                                style={{
                                    ...styles.ReadingMainItemTitle,
                                    ...titleStyle,
                                    }}>{obj.title}</Text>:null}
                                {
                                    objItem.map((objItemItem, itemIndex) => {
                                        return <Text key={itemIndex} style={{
                                            ...styles.ReadingMainItemcontent,
                                            ...contentStyle,
                                        }}
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
        {type === 'white' && <View style={styles.bgColorContainerWhite}>
        </View>}
    </View>
};
// 点击阅读页中部显示出来的内容
function ClickCenter() {
    const globalData = useContext<GlobalDataType>(GlobalDataContext);

    const {
        loadArticleHandle,
        setGlobalData,
        articleListFormat,
        windowDeviceHeight,
        titleStyle,
        contentStyle,
        currentArticle,
        readType,
        readingStyle,
    } = globalData;

    const headerHaderRight = function() {
        console.log('weizhi')
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
    const pressHide = function(e:GestureResponderEvent) {
        e.stopPropagation();
        setTimeout(() => {
            hide();
        }, 700);
    }
    const hide = function() {
        globalData.setGlobalData((data: GlobalDataType) => {
            return {
                ...data,
                pageType: 'default',
            }
        });
    };
    const handleOperation = function(type:string) {
        let obj = {};
        if (type === 'readType') {
            obj = {
                readType: (readType === 'upAndDown' ? 'leftAndRight' : 'upAndDown'),
            }
        }
        if (type === 'readingStyle') {
            obj = {
                readingStyle: {
                    ...readingStyle,
                    type: readingStyle.type=== 'default' ? 'white' : 'default'
                },
            }
        }
        setGlobalData((data: GlobalDataType) => {
            return {
                ...data,
                ...obj,
            }
        });
        hide();
    };
    return <TouchableOpacity 
            style={styles.clickCenterWrap}
            onPress={pressHide}
            >
            <View style={[styles.clickCenterPublic,styles.clickCenterHeader]}>
                <Header
                    headerLeft={true}
                    headerRight={rendenHeaderContentEl}
                    />
            </View>
            <View style={[styles.clickCenterPublic,styles.clickCenterBottom]}>
                <View style={styles.clickCenterBottomContainer}>
                    <TouchView 
                        onPress={()=>handleOperation('readType')}
                        style={styles.clickCenterBottomItem}>
                        <View style={styles.bottomItemIcon}>
                            <IconBtn 
                            onPress={()=>handleOperation('readType')}
                            style={styles.leaveMessageIcon}
                            fontFileName='FontAwesome5'
                            name='hand-middle-finger'
                            />
                        </View>
                        <Text style={styles.bottomItemText}>{
                            readType === 'upAndDown' ? '滑动' : '上下'
                        }阅读</Text>
                    </TouchView>
                    <TouchView 
                        onPress={()=>handleOperation('readingStyle')}
                        style={styles.clickCenterBottomItem}>
                        <View style={styles.bottomItemIcon}>
                            <IconBtn 
                            onPress={()=>handleOperation('readingStyle')}
                            style={styles.leaveMessageIcon}
                            fontFileName='Foundation'
                            name='background-color'
                            />
                        </View>
                        <Text style={styles.bottomItemText}>{
                            readingStyle.type === 'default' ? '白色': '仿真' 
                        }背景</Text>
                    </TouchView>
                </View>

            </View>
    </TouchableOpacity>
};
// 左右分页文章主体
function LeftAndRightReading() {
    const readOperation = useRef(''); // 左右方向
    const startAndMove = useRef({ // 开始移动的坐标
        startX: 0,
        moveX: 0,
    }); 
 
    const [afterArticle, setAfterArticle] = useState<currentArticleType>({ //之后文章数据
        key: '',
        keyIndex: 0, 
        keylistIndex: 0, // 列表索引
    });
    const translateX = useRef(new Animated.Value(0));
    const lastOffset = useRef({ x: 0, }); // 偏移量
    const startX = useRef({ x: 0, }); // 手指刚接触的坐标
    const moveX = useRef({ x: 0, }); // 手指一动的坐标
    const globalData = useContext<GlobalDataType>(GlobalDataContext);
    const {
        loadArticleHandle,
        setGlobalData,
        articleListFormat,
        windowDeviceHeight,
        titleStyle,
        contentStyle,
        currentArticle,
        contentLoadding,
    } = globalData;

    useEffect(() => {
        updateRequestList();
    }, []);

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
    const updateRequestList = function() {
        if (currentArticle.keyIndex === (Object.keys(articleListFormat).length - 1)) {
            globalData.loadArticleHandle('next');
        }
        if (currentArticle.keyIndex === 0) {
            if (globalData.articleBase.prev) {
                globalData.loadArticleHandle('prev');
            }; 
        }
    }
    // 验证手指按下是否居中
    const checkPressCenter = function(event: PanGestureHandlerStateChangeEvent) {
        const {absoluteX} = event.nativeEvent;
        const {width, height} = screen;
        const resulteWidth = width;
        const areaWidth = resulteWidth / 3;
        const upArea:Array<number> =  [0, areaWidth]; // 手指按上区域部分
        const centerArea =  [areaWidth, areaWidth + areaWidth]; // 手指按中区域部分
        if (centerArea[0] < absoluteX &&  centerArea[1] > absoluteX) {
            setGlobalData((data: GlobalDataType) => {
                return {
                    ...data,
                    ...{
                        pageType: (data.pageType === 'setting' ? 
                            'default' : 'setting'),
                    },
                }
            });
        }
    };
    const onHandlerStateChange = async function(event: PanGestureHandlerStateChangeEvent) {
        let obj !: currentArticleType;
        let nativeInfo = event.nativeEvent;
        lastOffset.current.x += nativeInfo.translationX;
        // 手指刚start
        if (nativeInfo.oldState === 0) {
            startX.current.x = nativeInfo.x;
            startAndMove.current.startX = nativeInfo.absoluteX;
        }
        // 手指移动时
        if (nativeInfo.oldState === 2) {
            startAndMove.current.moveX = nativeInfo.absoluteX;
            moveX.current.x = nativeInfo.x;
            if (startAndMove.current.startX === startAndMove.current.moveX) {
                checkPressCenter(event);
            } else {
                setGlobalData((data: GlobalDataType) => {
                    return {
                        ...data,
                        ...{
                            pageType: 'default',
                        },
                    }
                });
            }
        }

        // 手指刚点击时oldState状态是1，这个时候移动坐标为0
        if (moveX.current.x === 0) {
            return;
        };
        const oldCurrentArrayLeng = (articleListFormat[currentArticle.key].list.length - 1);
        if ((startX.current.x - moveX.current.x)  > 0) {
            readOperation.current = 'left';
        } else {
            readOperation.current = 'right';
        }
        
        if (readOperation.current === 'left' && !globalData.articleBase.next  
             && currentArticle.keyIndex === (Object.keys(articleListFormat).length - 1)
             && currentArticle.keylistIndex === oldCurrentArrayLeng) {
                Ui.Toast({
                    title: '已经到底了！',
                });
                translateX.current.setValue(0);
                return;
        }
        if (readOperation.current === 'right' && !globalData.articleBase.prev
            && currentArticle.keyIndex === 0
            && currentArticle.keylistIndex === 0) {
                Ui.Toast({
                    title: '已经到顶了！',
                });
                translateX.current.setValue(0);
                return;
        }
        updateRequestList();
        if (readOperation.current === 'left') {
            const datasKeyList = Object.keys(articleListFormat);
            const currentArrayLeng = (articleListFormat[currentArticle.key].list.length - 1);

            if (currentArticle.keylistIndex === currentArrayLeng) {
                let currentKey = datasKeyList[currentArticle.keyIndex + 1];
                obj = {
                    keylistIndex: 0, 
                    key: currentKey,
                    keyIndex: (currentArticle.keyIndex + 1), 
                };
                console.log('到尾部了0-----', obj)
            } else {
                obj = {
                    keylistIndex: currentArticle.keylistIndex + 1, 
                    key: currentArticle.key,
                    keyIndex: currentArticle.keyIndex, 
                };
            }
        } else {
            const datasKeyList = Object.keys(articleListFormat);
            if (currentArticle.keylistIndex === 0) {
                let key = datasKeyList[currentArticle.keyIndex - 1];
                const currentArrayLeng = (articleListFormat[key].list.length - 1);
                obj = {
                    keylistIndex: currentArrayLeng, 
                    key: key,
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

        if (event.nativeEvent.oldState === 4) {
            if (readOperation.current === 'left') {
                Animated.timing(
                    translateX.current,
                    {
                        duration: 260,
                        toValue: -screen.width,
                        useNativeDriver: true,
                    },
                ).start();
            } else {
                Animated.timing(
                    translateX.current,
                    {
                        duration: 260,
                        toValue: screen.width,
                        useNativeDriver: true,
                    },
                ).start();
            }
            setTimeout(() => {
                setGlobalData((oldData:any) => {
                    return {
                        ...oldData,
                        ...{
                            currentArticle: afterArticle,
                        }
                    }
                });
                translateX.current.setValue(0);
            }, 60)
        }
    };
    const afterArticleObj = useMemo(() => {
        let defaults = {
            title: '', 
            list: [[]],
        };
        try {
            return articleListFormat[afterArticle.key] || defaults;
        } catch(e) {
            console.log('产生出错-----', e)
            return defaults;
        }
    }, [ afterArticle]);
    const currentArticleObj = useMemo(() => {
        let defaults = {
            title: '', 
            list: [[]],
        };
        try {
            let data = articleListFormat[currentArticle.key] || defaults;
            return  data || defaults;
        } catch(e) {
            console.log('产生出错-----', e)
            return defaults;
        }
    }, [ globalData]);

    let height = windowDeviceHeight;

    return <View style={styles.leftAndRightWap}>
        <View style={[
            styles.leftAndRightWapView,
            {
                height,
            }
        ]}>
            <ReadTheBackground/> 
            <View style={[
                styles.toolbar,
                styles.toolbarTop,
                ]}>
                <ReadTheBackground/> 
                <View style={[
                    styles.toolbarLeft,
                    {
                        height: globalData.toolbarHeight,
                    }
                    ]}>
                    <Text style={styles.toolbarText}>
                        {afterArticleObj.title}
                    </Text>
                </View>
                <View style={[
                    styles.toolbarRight,
                    {
                        height: globalData.toolbarHeight,
                    }
                    ]}>
                </View>
            </View>
            <View style={{
                paddingTop: globalData.toolbarHeight,
            }}>
                {afterArticle.keylistIndex === 0 ? <Text 
                            style={{
                                ...styles.ReadingMainItemTitle,
                                ...titleStyle,
                                }}>{afterArticleObj.title}</Text>:null}
                {
                    afterArticleObj.list[afterArticle.keylistIndex].map((objItemItem, itemIndex) => {
                        return <Text key={itemIndex} style={{
                            ...styles.ReadingMainItemcontent,
                            ...contentStyle,
                        }}
                        >{objItemItem}</Text>
                    })
                }
            </View>
            <View style={[styles.toolbar,styles.toolbarBottom,]}>
                <ReadTheBackground/> 
                <View style={[
                    styles.toolbarLeft,
                    {
                        height: globalData.toolbarHeight,
                    }
                    ]}>
                </View>
                <View style={[
                    styles.toolbarRight,
                    {
                        height: globalData.toolbarHeight,
                    }
                    ]}>
                    <Text style={styles.toolbarText}>
                        {
                            `${afterArticle.keylistIndex + 1}/${
                                afterArticleObj.list.length
                            }`
                        }
                    </Text>
                </View>
            </View>
        </View>
        <PanGestureHandler
            onHandlerStateChange={onHandlerStateChange}
            onGestureEvent={onPanGestureEvent}>
            <Animated.View
                style={[
                    styles.leftAndRightWapView,
                     {
                        transform: [
                            {
                                translateX: translateX.current,
                            },
                        ],
                        height,
                     },
            ]}
            >
            <ReadTheBackground/> 
            <View style={[styles.toolbar, styles.toolbarTop,]}>
                <ReadTheBackground/> 
                <View style={[
                    styles.toolbarLeft,
                    {
                        height: globalData.toolbarHeight,
                    }
                    ]}>
                    <Text style={styles.toolbarText}>
                        {currentArticleObj.title}
                    </Text>
                </View>
                <View style={[
                    styles.toolbarRight,
                    {
                        height: globalData.toolbarHeight,
                    }
                    ]}>
                </View> 
            </View>
            <View style={{
                paddingTop: globalData.toolbarHeight,
            }}>
                {currentArticle.keylistIndex === 0 ? <Text 
                            style={{
                                ...styles.ReadingMainItemTitle,
                                ...titleStyle,
                                }}>{currentArticleObj.title}</Text>:null}
                {
                    currentArticleObj.list[currentArticle.keylistIndex].map((objItemItem, itemIndex) => {
                        return <Text key={itemIndex} style={{
                            ...styles.ReadingMainItemcontent,
                            ...contentStyle,
                        }}
                        >{objItemItem}</Text>
                    })
                }
            </View>    
            <View style={[
                styles.toolbar,
                styles.toolbarBottom,
                ]}>
                <ReadTheBackground/> 
                <View style={[
                    styles.toolbarLeft,
                    {
                        height: globalData.toolbarHeight,
                    }]}>
                </View>
                <View style={[
                    styles.toolbarRight,
                    {
                        height: globalData.toolbarHeight,
                    }
                ]}>
                    <Text style={styles.toolbarText}>
                        {
                            `${currentArticle.keylistIndex + 1}/${
                                currentArticleObj.list.length
                            }`
                        }
                    </Text>
                </View>
            </View>
            </Animated.View>
      </PanGestureHandler>
    </View>
}
function Index(props:any) {
    const route = useRoute<ProfileScreenRouteProp>();
    const [urlParams, setUrlParams] = useState<DirectoryListType[0]>();
    const [error, setError] = useState(false);
    const [globalData, setGlobalData] = useState<GlobalDataType>(initGlobalDataData);

    useEffect(() => {
        StatusBar.setHidden(true);
        hideNavigationBar();
        return () => {
            showNavigationBar();
            StatusBar.setHidden(false);
        };
    }, []);
    useLayoutEffect(() => {
        initDataHandle();
    }, []);
    const initDataHandle = async function() {
        // const params:DirectoryListType[0] = {
        //     "title":"高深莫测的老板",
        //     "number":"002",
        //     "id":"/novel/147649/read_2.html",
        //     "source":"快眼看书",
        // };
        const params = route.params;
        setUrlParams(params);
        try {
            // 获取文章数据
            const data:ArticleType = await ShuYuanSdk.getArticleInfo(params);
            setArticleBase({
                ...globalData.articleBase,
                ...data,
            });
            setGlobalData((oldData) => {
                return {
                    ...oldData,
                    ...{
                        currentArticle: {
                            key: data.current,
                            keyIndex: 0, 
                            keylistIndex: 0, // 列表索引
                        },
                    }
                }
            });
            setArticleList([data]);
            articleFormat(data);
        } catch {
            setError(true);
        }
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
    const articleFormat = async function(dataInfo:ArticleType, direction?:string) {
        const titleSize = await rnTextSize.measure({
            text: dataInfo.title,             
            width: windowDevice.width - 32,   
            ...globalData.titleStyle,     // RN font specification
            })
        const titleInfo = await rnTextSize.fontFromSpecs(globalData.titleStyle);
        const contentInfo = await rnTextSize.fontFromSpecs(globalData.contentStyle);
        const titleHeight = titleSize.height + (titleSize.lineCount - 1) * (titleInfo.bottom || 0) + 20;
        let _arr = formatChapter({
            content: dataInfo.doc,
            title: dataInfo.title,
            width: windowDevice.width, 
            height: (globalData.windowDeviceHeight - globalData.toolbarHeight * 2), // 文章内容上下边的信息栏高度需要减去才是内容高度
            titleHeight,
            contentInfo,
        });

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
    };
    const loadArticleHandle = async function(type: 'next' | 'prev') {
        return new Promise(async (resolve) => {
            if (type === 'next' && !globalData.articleBase.next) {
                return;
            };
            if (type === 'prev' && !globalData.articleBase.prev) {
                return;
            };
            if (globalData.contentLoadding) {
                return;
            } else {
                setGlobalData((data: GlobalDataType) => {
                    return {
                        ...data,
                        contentLoadding: true,
                    }
                });
            }
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
            console.log('发出请求------', type);
            const data:ArticleType =  await ShuYuanSdk.getArticleInfo(params);
            if (type === 'next') {
                globalData.articleList.push(data);
                setArticleBase({
                    ...globalData.articleBase,
                    ...{
                        next: data.next,
                    },
                });
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
                setArticleBase({
                    ...globalData.articleBase,
                    ...{
                        prev: data.prev,
                    },
                });
            }
            articleFormat(data, type);
            setArticleList(globalData.articleList);
            if (type === 'prev') {
                setGlobalData((data: GlobalDataType) => {
                    return {
                        ...data,
                        currentArticle: {
                            ...globalData.currentArticle,
                            keyIndex: globalData.currentArticle.keyIndex + 1,
                        },
                    }
                });
            }
            setGlobalData((data: GlobalDataType) => {
                return {
                    ...data,
                    contentLoadding: false,
                }
            });
            resolve();
        });
    }

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
                <ReadTheBackground/> 
                {globalData.pageType === 'setting' ? <ClickCenter/> : null}
                <LazyLoading error={error} 
                    parentScreen={Index.parentScreen}
                    dataLeng={globalData.articleList.length}
                    loading={!!!globalData.articleList.length}>
                    {/* 上下分页文章主体 */}
                    {globalData.readType === 'upAndDown' ? <View style={styles.readingMainContainer}>
                        <UpAndDownReading/>
                    </View>:null}
                    {/* 左右分页文章主体 */}
                    {globalData.readType === 'leftAndRight' ? <View style={styles.readingMainContainer}>
                        <LeftAndRightReading/>
                    </View>:null}
                </LazyLoading> 

            </GlobalDataContext.Provider>
    </View>)
}
Index.parentScreen = 'reading';

export default Index;