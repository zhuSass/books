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
    Button,
} from 'react-native';
import withObservables from '@nozbe/with-observables';
import { Q } from '@nozbe/watermelondb'
import { useDatabase } from '@nozbe/watermelondb/hooks';
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider';
import useSWR from 'swr';
import { useRoute ,useNavigation,
    RouteProp,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import Header from '@/components/header';
import LazyLoading from '@/components/lazyLoading';
import Icon from '@/components/icon';
import ShuYuanSdk,{FavoritesListType} from '@/common/shuYuanSdk';
import {Toast} from '@/utils/ui';
import Collect from '@/db/models/book/collect';

import styles from './css';

// 头部背景图
function HeaderBg() {
    return <ImageBackground source={{
                uri: 'https://desk-fd.zol-img.com.cn/t_s960x600c5/g2/M00/05/0E/ChMlWV6P0bSIdHVjAAUE41G4IPcAAOM4wDIEnEABQT7082.jpg',
            }} 
            style={styles.headerBg}>
    </ImageBackground>
}

type ListDataTypes = {
    dataList: Collect[],
    dataListError: boolean,
    dataListLoad: boolean,
}
function ListData(props: ListDataTypes) {
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
    const getFictionList = function() {

    };
    const {
        dataList,
        dataListError,
        dataListLoad,
    } = props;

    return <SafeAreaView style={styles.container}>
    <ScrollView style={styles.fictionScroll}>
        <LazyLoading error={dataListError} 
            loading={dataListLoad}
            dataLeng={dataList.length}
            reloadCall={getFictionList}
            parentScreen={Index.parentScreen}>
                <View>
                {dataList.map((item:Collect, index:number) => {
                    return <TouchableOpacity 
                            key={index} style={styles.fictionList}
                            onPress={() => goToPage(item)} >
                            <ImageBackground  
                                source={{uri: item.logo}}
                                resizeMode='cover'
                                style={styles.bananaCameraImg}/>
                            <View style={styles.fictionListInfo}>
                                <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                                <View style={styles.label}>
                                    <View style={styles.user}>
                                        <Icon fontFileName='AntDesign'
                                            color='#969ba3'
                                            size={13}
                                            style={styles.userIcon}
                                            name='user'/>
                                        <Text style={styles.author}>{item.author}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                })}
                </View>
                
        </LazyLoading>
    </ScrollView>
</SafeAreaView>
}

function Index(props:any) {
    const [list, setList] = useState<Collect[]>([]);
    const [dataListError, setDataListError] = useState(false);
    const [dataListLoad, setDataListLoad] = useState(false);

    const database = useDatabase();
    const collectCollection = database.collections.get<Collect>('collects');

    useEffect(() => {
        init();
    }, []);
    const init = async function init() {
        setDataListError(false);
        setList([]);
        setDataListLoad(false);
        database.action(async () => {
            try {
                const all = await collectCollection.query().fetch();
                setList(all);
            } catch(e) {
                setDataListError(true);
            }
        });
    }
    const addPosts = function() {
        database.action(async () => {
            const newPost = await collectCollection.create((Collect) => {
                Collect.title = '魔法种族大穿越';
                Collect.logo = 'http://www.booksky.cc/headimgs/223/223512/s223512.jpg';
                Collect.source = '快眼看书';
                Collect.author = '西红柿';
                Collect.catalogueUrl = '223512';
                Collect.latestChapterTitle = '第1968章 广寒月宫姑射仙子今夜加入太阴战场进行狩猎！';
                Collect.latestChapterUrl = '/novel/223512/read_2045.html';
                Collect.haveReadTitle = '第12章 目标王百科';
                Collect.haveReadUrl = '/novel/223512/read_12.html';
                Collect.isCache = false;
            });
            init();
        });
    };
    const handleDelete = async function(id?:number) {
        await database.action(async () => {
            if (id) {
                await collectCollection.query(
                    Q.where('collect_id', id)
                ).destroyAllPermanently();
            } else {
                await collectCollection.query().destroyAllPermanently();
            }
        });
        init();
    };

    return (<View style={styles.indexWrap}>
        <View style={styles.HeaderBgContainer}>
            <HeaderBg/>
            <Button onPress={addPosts} title="添加"></Button>
            <Button onPress={()=>handleDelete()} title="删除所有"></Button>
        </View>
        <ListData dataList={list}
            dataListError={dataListError}
            dataListLoad={dataListLoad}
        />
    </View>)
}
Index.parentScreen = 'favorites';

export default Index;