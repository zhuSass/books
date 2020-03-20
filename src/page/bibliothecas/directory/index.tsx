import React,{useEffect,useState,} from 'react';
import { View, Text,
    SafeAreaView, FlatList,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import { useRoute ,useNavigation, } from '@react-navigation/native';
import { Button, } from 'native-base';

import ShuYuanSdk,{
    DirectoryListType,
    GetDirectoryPageInfoType,
} from '@/common/shuYuanSdk';
import Header, {HeaderPropsType,
} from '@/components/header';
import Icon from '@/components/icon';

import styles from './css'

type PageInfoType = {
    currentPage: number,
    pageSize: number,
    /** positiveSequence正序;reverseOrder倒序 **/
    sort: 'positiveSequence' | 'reverseOrder', 
}

function Index(props:any) {
    const route = useRoute();
    const navigation = useNavigation();
    // 所有数据
    const [allDataList, setAllDataList] = useState<DirectoryListType>([]);
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
    }, []);

    const goBack = function() {
        navigation.goBack();
    };
    const initDataHandle = async function() {
        const params:GetDirectoryPageInfoType = {
            id: "349010", 
            source: "快眼看书",
        };
        const list:DirectoryListType =  await ShuYuanSdk.getDirectoryPageInfo(params);
        setAllDataList(list);
        const sliceData = list.slice(
            pageInfo.currentPage - 1,
            pageInfo.pageSize,
            );
        setDataList(sliceData);
    };
    // 加载目录列表
    const loadDataHandle = function(info: any) {
        setPageInfo((dataInfo:PageInfoType) => {
            return {
                ...dataInfo,
                currentPage: dataInfo.currentPage + 1,
            };
        });
        const sliceData = allDataList.slice(
            (pageInfo.currentPage - 1) * pageInfo.pageSize,
            pageInfo.pageSize,
            );
        const concatArray = dataList.concat(sliceData);
        setDataList(concatArray);
        setTimeout

        console.log('当前页码----------', pageInfo.currentPage)
    }

    const goToPage = function(item: any) {
        navigation.navigate('Other', { 
            screen: 'BookDirectory', 
            params: {
                id: item.id,
                source: item.source,
            },
        })
    }
    // 渲染目标列表
    const renderFlatList = function(data:{item: any, index: number}) {
        const {item, index} = data;


        return  <TouchableOpacity onPress={() => goToPage(item)}>
                <View style={styles.renderFlatListWap}>
                    <View style={styles.renderFlatListBolck}>
                        <Text style={styles.renderFlatListBolckCount}>第{item.number}章</Text>
                        <Text style={styles.renderFlatListBolckTitle}>{item.title}</Text>
                    </View>
                </View>
        </TouchableOpacity> 
    }
    if (!allDataList.length) return null;

    return (<View style={styles.directory}>
            {/* 头部 */}
            <Header 
                headerLeft={
                    <Button transparent onPress={goBack}>
                        <Icon fontFileName='Ionicons'
                            color='#33373d'
                            size={26}
                            name='ios-arrow-back'/>
                        <Text style={styles.headerLeftText}>斗破苍穹</Text>  
                </Button>
                }
            />
            <View style={styles.separatedTitle}>
                <Text style={styles.separatedTitleContent}>目录</Text>
            </View>
            <View style={styles.baseInfo}>
                <Text style={styles.baseInfoTotalNumber}>共600章</Text>
                <Text style={styles.baseInfoTotalSort}>正序</Text>
            </View>
            <View style={styles.contentType}>
                <Text style={styles.contentTypeText}>正文卷</Text>
            </View>
            {/* 目录列表 */}
            <SafeAreaView style={styles.safeAreaView}>
                <FlatList
                    data={dataList}
                    getItemLayout={(data: any, index: number) => (
                        {length: 164, offset: 164 * index, index}
                    )}
                    onEndReached={loadDataHandle}
                    onEndReachedThreshold={0.1}
                    renderItem={renderFlatList}
                    keyExtractor={item => `${item.source}-${item.id}`}
                    />
            </SafeAreaView>
    </View>)
}

export default Index;