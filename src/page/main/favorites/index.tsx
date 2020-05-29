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
} from 'react-native';
import withObservables from '@nozbe/with-observables';
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
import post from '@/db/models/post';

import styles from './css';

// 头部背景图
function HeaderBg() {
    return <ImageBackground source={{
                uri: 'https://desk-fd.zol-img.com.cn/t_s960x600c5/g2/M00/05/0E/ChMlWV6P0bSIdHVjAAUE41G4IPcAAOM4wDIEnEABQT7082.jpg',
            }} 
            style={styles.headerBg}>
    </ImageBackground>
}
function ListData() {
    const navigation = useNavigation();
    const [dataListError, setDataListError] = useState(false);
    const [dataListLoad, setDataListLoad] = useState(false);
    const [dataList, setDataList] = useState<FavoritesListType>([]);

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

    return <SafeAreaView style={styles.container}>
    <ScrollView style={styles.fictionScroll}>
        <LazyLoading error={dataListError} 
            loading={dataListLoad}
            dataLeng={dataList.length}
            reloadCall={getFictionList}
            parentScreen={Index.parentScreen}>
                <View>
                {dataList.map((item:FavoritesListType[0], index:number) => {
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
    const [list, setList] = useState<post[]>([]);

    const database = useDatabase();
    const postsCollection = database.collections.get<post>('posts')

    useEffect(() => {
        init();
    }, []);
    const init = async function init() {
        await database.action(async () => {
            const newPost = await postsCollection.create((post) => {
              post.title = 'New post'
              post.body = 'Lorem ipsum...'
            });
            const allPosts = await postsCollection.query().fetch();
            setList(allPosts);
            console.log('3----------', allPosts)
          });
    }

    return (<View style={styles.indexWrap}>
        <HeaderBg/>
        {list.map((item: any, index) => {
            return <Text key={index}>{item.title}---{item.body}</Text>
        })}
        {/* <ListData/> */}
    </View>)
}
Index.parentScreen = 'favorites';

export default Index;