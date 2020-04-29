import React,{useEffect,useState,
    useCallback,useRef,} from 'react';
import { View, Text,
    SafeAreaView, FlatList,
    FlatListProps,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import useSWR from 'swr';
import { useRoute ,useNavigation,RouteProp, } from '@react-navigation/native';

import ShuYuanSdk,{
    DirectoryListType,
    GetDirectoryPageInfoType,
} from '@/common/shuYuanSdk';
import Header, {HeaderPropsType,
} from '@/components/header';
import Icon from '@/components/icon';
import LazyLoading from '@/components/lazyLoading';

import styles from './css';

type RootStackParamList = {
    Profile: GetDirectoryPageInfoType;
  };
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

type PageInfoType = {
    currentPage: number,
    pageSize: number,
    /** positiveSequence正序;reverseOrder倒序 **/
    sort: 'positiveSequence' | 'reverseOrder', 
}

function Index(props:any) {
    const route = useRoute<ProfileScreenRouteProp>();
    const navigation = useNavigation();
    const flatListEl = useRef<any>(null);
    // const params:GetDirectoryPageInfoType = {
    //     id: "349010", 
    //     source: "快眼看书",
    //     title: '涅瓦',
    // };
    const params = route.params;
    const { data, error } = useSWR(ShuYuanSdk.getDirectoryPageInfoUrl(params), async() => {
        return ShuYuanSdk.getDirectoryPageInfo(params);
    });

    // 所有数据
    const [allDataList, setAllDataList] = useState<DirectoryListType>([]);
    // 基础数据
    const [baseInfo, setBaseInfo] = useState<GetDirectoryPageInfoType>();
    // 当前用户浏览到的数据
    const [dataList, setDataList] = useState<DirectoryListType>([]);
    // 分页信息
    const [pageInfo, setPageInfo] = useState<PageInfoType>({
        currentPage: 1,
        pageSize: 15,
        /** positiveSequence正序;reverseOrder倒序 **/
        sort: 'positiveSequence', 
    });

    useEffect(() => {
        initDataHandle();
    }, [data]);

    const goBack = function() {
        navigation.goBack();
    };
    const initDataHandle = async function() {
        setBaseInfo(params);
        if (data && data?.length) {
            const list:DirectoryListType =  data;
            setAllDataList(list);
            const sliceData = list.slice(
                pageInfo.currentPage - 1,
                pageInfo.pageSize,
                );
            setDataList(sliceData);
        }
    };
    // 加载目录列表
    const loadDataHandle = useCallback((info: any) => {
        setPageInfo((dataInfo:PageInfoType) => {
            return {
                ...dataInfo,
                currentPage: dataInfo.currentPage + 1,
            };
        });
        const start = (pageInfo.currentPage) * pageInfo.pageSize;
        const sliceData = allDataList.slice(
            start,
            start + pageInfo.pageSize,
            );
        const concatArray = dataList.concat(sliceData);
        setDataList(concatArray);

    }, [pageInfo,allDataList,dataList]);
    const goToPage = function(item: DirectoryListType[0]) {
        navigation.navigate('Other', { 
            screen: 'Reading', 
            params: item,
        })
    }
    // 切换章节顺序
    const toggleOrderHandle = useCallback(() => {
        setPageInfo((item: PageInfoType) => {
            return {
                ...item,
                sort: item.sort === 'positiveSequence' ? 'reverseOrder' : 'positiveSequence',
                currentPage: 1,
            }
        });
        flatListEl?.current?.scrollToOffset({
            animated: false, offset: 0,
        });
        const reverseArray = JSON.parse(JSON.stringify(allDataList)).reverse();
        setAllDataList(reverseArray);
        const sliceData = reverseArray.slice(
            0,
            pageInfo.pageSize,
            );
        setDataList(sliceData);
    }, [pageInfo, allDataList]);
    // 渲染目标列表
    const renderFlatList = function(data:{item: any, index: number}) {
        const {item, index} = data;

        return  <TouchableOpacity onPress={() => goToPage(item)}>
                <View style={styles.renderFlatListWap}>
                    <View style={styles.renderFlatListBolck}>
                        {item.number?<Text style={styles.renderFlatListBolckCount}>{item.number}</Text>:null}
                        <Text style={styles.renderFlatListBolckTitle} numberOfLines={1}>{item.title}</Text>
                    </View>
                </View>
        </TouchableOpacity> 
    }

    return (<View style={styles.directory}>
            {/* 头部 */}
            <Header 
                headerLeft={
                    <TouchableOpacity style={styles.btn} onPress={goBack}>
                        <Icon fontFileName='Ionicons'
                            color='#33373d'
                            size={26}
                            name='ios-arrow-back'/>
                        <Text style={styles.headerLeftText}>{baseInfo?.title}</Text>  
                    </TouchableOpacity>
                }
            />
            <View style={styles.separatedTitle}>
                <Text style={styles.separatedTitleContent}>目录</Text>
            </View>
            <LazyLoading error={error} 
                    parentScreen={Index.parentScreen}
                    dataLeng={dataList.length}>
                <View style={styles.baseInfo}>
                    <Text style={styles.baseInfoTotalNumber}>共{allDataList.length}章</Text>
                    <TouchableOpacity style={styles.btn} onPress={toggleOrderHandle}>
                        <Text style={styles.baseInfoTotalSort}>
                            {pageInfo.sort === 'positiveSequence' ? '倒序' : '正序'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.contentType}>
                    <Text style={styles.contentTypeText}>正文卷</Text>
                </View>
                {/* 目录列表 */}
                <SafeAreaView >
                        <FlatList
                            ref={flatListEl}
                            data={dataList}
                            onEndReached={loadDataHandle}
                            onEndReachedThreshold={0.2}
                            renderItem={renderFlatList}
                            keyExtractor={(item:any) => `${item.source}-${item.id}`}
                            />
                </SafeAreaView>
            </LazyLoading>
    </View>)
}
Index.parentScreen = 'Other';

export default Index;