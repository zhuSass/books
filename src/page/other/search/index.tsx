import React,{useContext, useState,
    useLayoutEffect,
    useImperativeHandle,
    useCallback,
    forwardRef,
    useEffect,
    useRef, } from 'react';
import { View, Text, ScrollView,
    SafeAreaView, FlatList, Image,
    ToastAndroid,
    StatusBarIOS,
    TextInput,
    NativeSyntheticEvent,
    NativeScrollEvent,
    TouchableOpacity,
    GestureResponderEvent,
    TouchableWithoutFeedback,
    ImageBackground,
    useWindowDimensions,
} from 'react-native';
import { useRoute ,useNavigation,RouteProp, } from '@react-navigation/native';

import ShuYuanSdk,{
    DirectoryListType,
    ArticleType,
    AllShuYuanIdsKey,
    SearchListType,
    SearchConditionType,
} from '@/common/shuYuanSdk';
import {IconBtn} from '@/components/icon';
import LazyLoading from '@/components/lazyLoading';
import {AsyncStorage} from '@/utils/ui'

import styles from './css';
// 书名推荐
function KeyWordRecommend(props: {
    type: string,
    keyWords: string[],
    delKeyWords?: Function,
    clickKeyWordTags: Function,
}) {
    const {keyWords, delKeyWords, clickKeyWordTags} = props;

    return <View style={styles.keyWordRecommend}>
        <View style={styles.keyWordRecommendTitle}>
            <Text style={styles.keyWordRecommendTitleContent}>{props.type}</Text>
            {props.type === '搜索历史' ? 
                <TouchableOpacity 
                    onPress={()=>delKeyWords && delKeyWords()}
                    style={styles.keyWordRecommendTitleClear}>
                    <IconBtn 
                        style={styles.keyWordRecommendTitleClearIcon}
                        fontFileName='AntDesign'
                        name='delete'
                        /> 
                    <Text style={styles.keyWordRecommendTitleClearText}>清除</Text>
                </TouchableOpacity>
                :null}
        </View>
        {keyWords.length ? <View style={styles.keyWordRecommendContent}>
            {keyWords.map((item: string, index: number) => {
                return  <TouchableWithoutFeedback key={index}
                    onPress={() => {clickKeyWordTags(item)}}>
                    <Text style={styles.keyWordRecommendContentText}
                        key={index}>{item}</Text>
                </TouchableWithoutFeedback> 
            }) }
        </View>: <View style={styles.keyWordRecommendContentNoData}>
                <Text style={styles.noDataText}>~~暂时没有数据~~</Text>
            </View>}
    </View>
}
// 搜索框
function Search(props: {
    addKeyWords: Function,
    keyword: string,
    setKeyword: Function,
}) {
    const navigation = useNavigation();
    const inputEl = useRef<TextInput>(null);
    const {keyword, setKeyword, addKeyWords} = props;
    const [ focusStatus, setFocusStatus] = useState(false);

    useEffect(() => {
        inputEl.current?.focus(); 
    }, [inputEl.current]);

    const changeKeyWord = function(str:string) {
        setKeyword(str);
    }
    const toggleInputStatus = function(val: boolean) {
        setFocusStatus(val)
    }
    const searchHandle = function() {
        addKeyWords(keyword);
    }; 
    const clearHandle = function() {
        setKeyword('');
    }
    const gotoPage = function() {
        navigation.goBack();
    }
    return <View>
        <View style={styles.header}>
            <View style={styles.headerSearch}>
                <View style={[
                    styles.headerInput,
                    focusStatus && styles.headerInputFocus,
                ]}>
                    <IconBtn 
                        onPress={()=>searchHandle()}
                        style={styles.headerInputIcon}
                        fontFileName='AntDesign'
                        name='search1'
                        /> 
                    <View style={styles.headerInputTargetView}>
                        <TextInput 
                            ref={inputEl} 
                            style={styles.headerInputTarget}
                            placeholder={`请输入书名`}
                            clearButtonMode='while-editing'
                            onChangeText={changeKeyWord}
                            onFocus={() => toggleInputStatus(true)}
                            onBlur={() => toggleInputStatus(false)}
                            value={keyword}
                        />
                    </View>
                    <IconBtn 
                        onPress={()=>clearHandle()}
                        style={styles.headerInputClearIcon}
                        fontFileName='MaterialIcons'
                        name='clear'
                        /> 
                </View>
                <TouchableOpacity 
                    onPress={gotoPage}
                    style={styles.keyWordRecommendTitleClear}>
                    <Text style={styles.headerCancel}>取消</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    </View> 
}
// 书源类别
function ShuYuanList(props: {
    actionType: string,
    setActionType: Function,
    searchHandle: Function,
}) {
    const list:{
        label: string,
        name: string,
    }[] = [];
    Object.keys(ShuYuanSdk.allShuYuanIds).forEach(key => {
        list.push({
            label: ShuYuanSdk.allShuYuanIds[key as AllShuYuanIdsKey].label,
            name: key,
        })
    });
    const clickAction = function(item:any) {
        props.setActionType(item.name);
    }
    
    return <View style={styles.shuYuanList}>
        <FlatList
                data={list}
                horizontal={true}
                showsHorizontalScrollIndicator = {false}
                renderItem={(data:{item: any, index: number}) => {
                    return <TouchableOpacity 
                        activeOpacity={1}
                        onPress={() => clickAction(data.item)} 
                        style={[
                            styles.shuYuanListTag,
                            data.item.name === props.actionType && styles.shuYuanListTagAction,
                        ]}>
                        <Text style={[
                            styles.shuYuanListTagText,
                            data.item === props.actionType && styles.shuYuanListTagTextAction,
                        ]}>{data.item.label}</Text>
                    </TouchableOpacity>
                }}
        keyExtractor={item => item.name}
        />
    </View>
};
// 搜索出的数据
function ResultList(props: {
    dataList: SearchListType,
    error: boolean,
    sendStatus: boolean,
    searchHandle: Function,
}) {
    const navigation = useNavigation();
    const window = useWindowDimensions();

    const goToPage = function(item: any) {
        navigation.navigate('Other', { 
            screen: 'BookDirectory', 
            params: {
                id: item.id,
                source: item.source,
                title: item.title,
            },
        });
    };

    const {dataList, error,} = props;
    let data = dataList ? dataList: [];

    const colNum = Math.floor((window.width - 16 * 2 -5) / 165);

    return <View style={styles.resultListWrap}>
        <SafeAreaView style={styles.bananaCameraScroll}>
            <LazyLoading error={props.error} 
                loading={props.sendStatus}
                dataLeng={dataList.length}
                reloadCall={props.searchHandle}
                parentScreen={Index.parentScreen}>
                <FlatList
                data={dataList}
                columnWrapperStyle={{
                    marginBottom: 5,
                    marginLeft: 10,
                    marginRight: 10,
                    justifyContent: 'space-between',
                }}
                numColumns={colNum}
                showsVerticalScrollIndicator={false}
                renderItem={(data:{item: any, index: number}) => {
                    const {item, index} = data;
                    return <View 
                        style={[
                            styles.bananaCameraItem,
                        ]}>
                        <TouchableWithoutFeedback
                            onPress={() => goToPage(item)}>
                                <View>
                                    <View style={styles.bananaCameraCover}>
                                        <ImageBackground  
                                        source={{uri: item.logo}}
                                        resizeMode='cover'
                                        style={styles.bananaCameraImg}/>
                                        <View style={styles.bananaCameraCoverLinke}>
                                            <Text style={styles.bananaCameraCoverLinkeText} numberOfLines={1}>
                                                作者：{item.author}
                                            </Text>
                                        </View>    
                                    </View> 
                                    <View style={styles.bananaCameraCoverInfo}>
                                        <Text style={styles.bananaCameraCoverTitle} numberOfLines={1}>{item.title}</Text>        
                                        <Text style={styles.bananaCameraCoverSubTitle} numberOfLines={2}>{item.newSection || '--'}</Text>        
                                    </View>   
                                </View>
                        </TouchableWithoutFeedback>
                    </View>
                }}
                keyExtractor={item => `${item.source}-${item.id}`}
                />
            </LazyLoading>
        </SafeAreaView>
    </View>
}
export default function Index(props:any) {
    const [ keyword, setKeyword] = useState('');
    const [ actionType, setActionType] = useState<AllShuYuanIdsKey>('快眼看书');
    const [ dataList, setDataList] = useState<SearchListType>([]);
    const [error, setError] = useState(false);
    const [sendStatus, setSendStatus] = useState(false);
    const [keyWords, setKeywords] = useState<string[]>([]);
    // 大家都在搜
    const recommendList = [
        '诡秘之主',
        '圣墟',
        '元尊',
        '龙王传说',
        '飞剑问道',
        '万古神帝',
        '牧神记',
        '剑来',
        '伏天氏',
        '凡人修仙之仙界篇',
    ];

    useEffect(() => {
        AsyncStorage.getItem('searchWrap_keyWords', (error, val) => {
            if (val) {
                const localKeyWords = JSON.parse(val);
                setKeywords(localKeyWords);
            }
        });
    }, []);
    useEffect(() => {
        searchHandle();
    }, [actionType, keyword]);
    const addKeyWords = function(str: string) {
        if (keyWords.indexOf(str) == -1 && str.replace(/\s+/g, '')) {
            setKeywords((old) => {
                return [
                    ...old,
                    str
                ];
            });
            AsyncStorage.setItem('searchWrap_keyWords', JSON.stringify(keyWords));
            searchHandle();
        }
    };
    const delKeyWords = function(str: string) {
        setKeywords([]);
        AsyncStorage.removeItem('searchWrap_keyWords');
    };
    const clickKeyWordTags = function(str: string) {
        setKeyword(str);
        addKeyWords(str);
        console.log('2------------', keyword)
    };
    const searchHandle = async function() {
        const params:SearchConditionType = {
            source: actionType,
            keyword: keyword,
        };
        setError(false);
        setSendStatus(true);
        setDataList([]);
        try {
            const data = await ShuYuanSdk.getSearchInfo(params);
            setDataList(data);
            setError(false);
        } catch(e) {
            setError(true);
        }
        setSendStatus(false);
        console.log('searchHandle--------', params);
    };

    return <View style={styles.index}>
        <View style={styles.indexWrap}>
            {/* 搜索框 */}
            <Search 
                keyword={keyword}
                setKeyword={setKeyword}
                addKeyWords={addKeyWords}/>
               {!keyword ? <>
                    {/* 搜索历史 */}
                    <KeyWordRecommend  type="大家都在搜" 
                        delKeyWords={delKeyWords}
                        clickKeyWordTags={clickKeyWordTags}
                        keyWords={recommendList}/>
                    {/* 搜索历史 */}
                    <KeyWordRecommend  type="搜索历史" 
                        delKeyWords={delKeyWords}
                        clickKeyWordTags={clickKeyWordTags}
                        keyWords={keyWords}/>
               </>:<>
                    {/* 书源类别 */}
                    <ShuYuanList actionType={actionType}
                        searchHandle={searchHandle}
                        setActionType={setActionType}/>
                    {/* 搜索结果 */}
                    <ResultList 
                        error={error}
                        searchHandle={searchHandle}
                        sendStatus={sendStatus}
                        dataList={dataList}/>
               </>} 
        </View>
    </View>
}
Index.parentScreen = 'search';