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
} from 'react-native';
import { useRoute ,useNavigation,RouteProp, } from '@react-navigation/native';

import ShuYuanSdk,{
    DirectoryListType,
    ArticleType,
    AllShuYuanIdsKey,
} from '@/common/shuYuanSdk';
import {IconBtn} from '@/components/icon';
import LazyLoading from '@/components/lazyLoading';
import {AsyncStorage} from '@/utils/ui'

import styles from './css';

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

function Search(props: {
    addKeyWords: Function,
    keyword: string,
    setKeyword: Function,
}) {
    const {keyword, setKeyword, addKeyWords} = props;
    const [ focusStatus, setFocusStatus] = useState(false);

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
                <Text style={styles.headerCancel}>取消</Text>
            </View>
            
        </View>
    </View> 
}

function ShuYuanList(props: {
    actionType: string,
    setActionType: Function,
    searchHandle: Function,
}) {
    const list = Object.keys(ShuYuanSdk.allShuYuanIds);
    const clickAction = function(item:string) {
        props.setActionType(item);
        props.searchHandle();
    }
    
    return <View style={styles.shuYuanList}>
        <FlatList
                data={list}
                horizontal={true}
                showsHorizontalScrollIndicator = {false}
                renderItem={(data:{item: string, index: number}) => {
                    return <TouchableOpacity 
                        activeOpacity={1}
                        onPress={() => clickAction(data.item)} 
                        style={[
                            styles.shuYuanListTag,
                            data.item === props.actionType && styles.shuYuanListTagAction,
                        ]}>
                        <Text style={[
                            styles.shuYuanListTagText,
                            data.item === props.actionType && styles.shuYuanListTagTextAction,
                        ]}>{data.item}</Text>
                    </TouchableOpacity>
                }}
        keyExtractor={item => item}
        />
    </View>
};

type DataType = Array<{
    source: AllShuYuanIdsKey,
    id: number,
    author: string,
    title: string,
    newSection?: string,
    logo?: string,
}>;
function ResultList(props: {
    dataList: DataType,
    error: boolean,
}) {
    const navigation = useNavigation();

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
    return <View>
        <SafeAreaView style={styles.bananaCameraScroll}>
            <LazyLoading error={props.error} 
                parentScreen={Index.parentScreen}
                dataLeng={dataList.length}>
                    <FlatList data={dataList}
                    renderItem={(data:{item: any, index: number}) => {
                        return <Text key={data.index}>{data.item.author}</Text>  
                    }}
                    keyExtractor={item => `${item.source}-${item.id}`}
                    />

                {/* <FlatList
                data={dataList}
                style={styles.cc}
                getItemLayout={(data: any, index: number) => (
                    {length: 164, offset: 164 * index, index}
                )}
                renderItem={(data:{item: any, index: number}) => {
                    const {item, index} = data;
                    return <View 
                        key={index}
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
                                        <Text style={styles.bananaCameraCoverSubTitle} numberOfLines={2}>{item.desc || '--'}</Text>        
                                    </View>   
                                </View>
                        </TouchableWithoutFeedback>
                    </View>
                }}
                keyExtractor={item => `${item.source}-${item.id}`}
                /> */}
            </LazyLoading>
        </SafeAreaView>
    </View>
}

export default function Index(props:any) {
    const [ keyword, setKeyword] = useState('诡秘之主');
    const [ actionType, setActionType] = useState('快眼看书');
    const [ dataList, setDataList] = useState<DataType>([
        {
            source: '快眼看书',
            id: 256130,
            author: '公子珏',
            title: '大明尊',
            newSection: '新书发布求一切',
            logo: 'http://www.booksky.cc//public/cover/da/f7/e6/daf7e6d7d575666c4186e8d7d5249457.jpg',
        },
        {
            source: '快眼看书',
            id: 345180,
            author: '公子珏',
            title: '明尊',
            newSection: '新书发布求一切',
            logo: 'http://www.booksky.cc//public/cover/da/f7/e6/daf7e6d7d575666c4186e8d7d5249457.jpg',
        },
        {
            source: '快眼看书',
            id: 345320,
            author: '公子珏',
            title: '明尊',
            newSection: '新书发布求一切',
            logo: 'http://www.booksky.cc//public/cover/da/f7/e6/daf7e6d7d575666c4186e8d7d5249457.jpg',
        },
    ]);
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
    const addKeyWords = useCallback(function(str: string) {
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
    }, [keyWords]);
    const delKeyWords = function(str: string) {
        setKeywords([]);
        AsyncStorage.removeItem('searchWrap_keyWords');
    };
    const clickKeyWordTags = function(str: string) {
        setKeyword(str);
        addKeyWords(str);
    };
    const searchHandle = function() {
        const params = {
            source: actionType,
            keyword: keyword,
        };

    };

    return <View style={styles.index}>
        <View>
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
                        error={false}
                        dataList={dataList}/>
               </>} 
        </View>
    </View>
}
Index.parentScreen = 'search';