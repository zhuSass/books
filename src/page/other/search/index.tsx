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
import LabelList from '@/components/labelList';
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
const Search = forwardRef(function Search(props: {
    addKeyWords: Function,
    keyword: string,
    setKeyword: Function,
    focusStatus: boolean,
    setFocusStatus: Function,
    searchHandle: Function,
}, ref) {
    const navigation = useNavigation();
    const inputEl = useRef<TextInput>(null);
    const {keyword, focusStatus, setFocusStatus,searchHandle,
         setKeyword, addKeyWords} = props;

    useImperativeHandle(ref, () => ({
        inputDom: inputEl.current,
      }), [inputEl.current]);

    const changeKeyWord = function(str:string) {
        setKeyword(str);
    }
    const toggleInputStatus = function(val: boolean) {
        if (val === false) {
            searchHandle();
        }
        setFocusStatus(val)
    }
    const handleClick = function() {
        inputEl.current?.blur(); 
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
                        onPress={()=>handleClick()}
                        style={styles.headerInputIcon}
                        fontFileName='AntDesign'
                        name='search1'
                        /> 
                    <View style={styles.headerInputTargetView}>
                        <TextInput 
                            ref={inputEl} 
                            autoFocus={true}
                            style={styles.headerInputTarget}
                            placeholder={`请输入书名`}
                            clearButtonMode='while-editing'
                            onChangeText={changeKeyWord}
                            onFocus={() => toggleInputStatus(true)}
                            onBlur={() => toggleInputStatus(false)}
                            value={keyword}
                        />
                    </View>
                    {keyword ? <IconBtn 
                        onPress={()=>clearHandle()}
                        style={styles.headerInputClearIcon}
                        fontFileName='MaterialIcons'
                        name='clear'
                        /> : null}
                </View>
                <TouchableOpacity 
                    onPress={gotoPage}
                    style={styles.keyWordRecommendTitleClear}>
                    <Text style={styles.headerCancel}>取消</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    </View> 
})
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
    const clickAction = function(item:{
        label: string,
        name: string,
    }) {
        props.setActionType(item.name);
    }
    
    return <LabelList
        list={list}
        clickAction={clickAction}
        actionType={props.actionType}
    />
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
    const searchRef = useRef<{
        inputDom: TextInput | any,
    }>({inputDom: null})
    const [ keyword, setKeyword] = useState('');
    const [ focusStatus, setFocusStatus] = useState(false);
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
        if (!focusStatus) {
            searchHandle();
        }
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
        searchRef.current.inputDom.blur(); 
        setKeyword(str);
        addKeyWords(str);
    };
    const searchHandle = async function() {
        if (!keyword) return;
        const params:SearchConditionType = {
            source: actionType,
            keyword: keyword,
        };
        console.log('searchHandle--------', params);
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
    };

    return <View style={styles.index}>
        <View style={styles.indexWrap}>
            {/* 搜索框 */}
            <Search 
                ref={searchRef} 
                keyword={keyword}
                focusStatus={focusStatus}
                searchHandle={searchHandle}
                setFocusStatus={setFocusStatus}
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
               </>:focusStatus ? null :<>
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