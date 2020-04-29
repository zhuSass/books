import React,{
    useEffect, useState, 
    useContext, useRef,
} from 'react';
import { 
    View,
    ScrollView, ImageBackground,
    SafeAreaView, FlatList,
    TouchableWithoutFeedback,
    Image,
    Text,
    NativeScrollEvent,
} from 'react-native';
import useSWR from 'swr';
import { useNavigation,NavigationProp, } from '@react-navigation/native';

import Header from '@/components/header';
import LazyLoading from '@/components/lazyLoading';
import ShuYuanSdk,{HomeList} from '@/common/shuYuanSdk';

import styles from './css'

const ShuYuanSdkObj = ShuYuanSdk.newObj(['快眼看书']);

// banner 轮播
function Banner() {
    const navigation = useNavigation();

    let bannerList =[
        {title: 'fds', pagSrc: 'Other', src: 'https://desk-fd.zol-img.com.cn/t_s1920x1080c5/g5/M00/01/0F/ChMkJlbKwi-IdJtLAAQcbAvaMWcAALGkAM_YpMABByE165.jpg',},
        {title: 'cds', pagSrc: 'Other', src: 'https://desk-fd.zol-img.com.cn/t_s1920x1200c5/g5/M00/01/0F/ChMkJ1bKwi-IZNlnAAXcSmC9yiwAALGkANDfxcABdxi053.jpg',},
        {title: 'dsew', pagSrc: 'Other', src: 'https://desk-fd.zol-img.com.cn/t_s1920x1200c5/g5/M00/01/0F/ChMkJlbKwi-IHA_bAAdtkjiuJS8AALGkANJW3kAB22q210.jpg',},
        {title: '3dsew', pagSrc: 'Bibliotheca', src: 'https://desk-fd.zol-img.com.cn/t_s1920x1200c5/g5/M00/01/0F/ChMkJlbKwi-IIgUYAAW-dNoy2CsAALGkANQySMABb6M328.jpg',},
        {title: '4dsew', pagSrc: 'Bbs', src: 'https://desk-fd.zol-img.com.cn/t_s1920x1200c5/g5/M00/01/0F/ChMkJ1bKwi-IT_bXAA3D8fytBOUAALGkANZB6sADcQJ000.jpg',},
    ]
    const goToPage = function(src: string) {
        navigation.navigate(src);
    }

    return <SafeAreaView style={styles.bannerWrap}>
        <FlatList
        data={bannerList}
        horizontal={true}
        getItemLayout={(data: any, index: number) => (
            {length: 164, offset: 164 * index, index}
        )}
        renderItem={({ item, index }) => <View style={[
                styles.imgCard,
                (bannerList.length - 1) !== index 
                && styles.imgContainerMr,
            ]}>
                <TouchableWithoutFeedback
                    onPress={() => goToPage(item.pagSrc)}>
                    <ImageBackground  
                        source={{uri: item.src}}
                        resizeMode='cover'
                        style={[
                            styles.imgContainer,
                        ]}/>
                </TouchableWithoutFeedback>
        </View>}
        keyExtractor={item => item.title}
        />
  </SafeAreaView>
}
// NEW 本周排行榜
function NEW(props: {
    data:HomeList | undefined,
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
    }

    let dataList:any[] = [];
    if (props.data?.weekRankings) {
        dataList = props.data.weekRankings;
    }

    return <View style={styles.bananaCameraWrap}>
        <View style={styles.bananaCameraWrapHeader}>
            <View style={styles.bananaCameraWire}></View>
            <Text style={styles.bananaCameraTitle}>本周排行榜</Text>
        </View>
        <SafeAreaView style={styles.bananaCameraScroll}>
            <LazyLoading error={props.error} 
                parentScreen={Index.parentScreen}
                dataLeng={dataList.length}>
                <FlatList
                data={dataList}
                horizontal={true}
                getItemLayout={(data: any, index: number) => (
                    {length: 164, offset: 164 * index, index}
                )}
                renderItem={(data:{item: any, index: number}) => {
                    const {item, index} = data;
                    
                    return <View style={[
                        styles.bananaCameraItem,
                        ((dataList as any[]).length - 1) !== index 
                        && styles.imgContainerMr,
                    ]}>
                        <TouchableWithoutFeedback
                            onPress={() => goToPage(item)}>
                                <View>
                                    <View style={styles.bananaCameraCover}>
                                        <ImageBackground  
                                        source={{uri: item.logo}}
                                        resizeMode='cover'
                                        style={styles.bananaCameraImg}/>
                                        <Text style={styles.bananaCameraCoverType}>HOT</Text>    
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
                />
            </LazyLoading>
        </SafeAreaView>
    </View> 
}
// BananaCamera 优质推荐
function BananaCamera(props: {
    data:HomeList | undefined,
    error: boolean,
}) {
    const navigation = useNavigation();
    const [bannerList, setBannerList] = useState<any[]>([]);

    useEffect(() => {
        let list:any[] = [];
        if (props.data) {
            props.data.qualityRecommended.forEach(v => {
                list.push({
                    ...v,
                    type: 'NEW',
                    width: 0, 
                    height: 0,
                })
            });
            setBannerList(list);
        }
    },[props.data]);

    const goToPage = function(item: any) {
        navigation.navigate('Other', { 
            screen: 'BookDirectory', 
            params: {
                id: item.id,
                source: item.source,
                title: item.title,
            },
        });
    }
    const getItemWH = function(item:any, index:number, layout:any,) {
        if(item.width) return;
        setBannerList((perState) => {
            let perVal = perState.slice();
            perVal[index] = {
                ...perVal[index],
                width: layout.width,
                height: layout.height,
            }
            return perVal;
        });
    }

    return <View style={styles.bananaCameraWrap}>
        <View style={styles.bananaCameraWrapHeader}>
            <View style={styles.bananaCameraWire}></View>
            <Text style={styles.bananaCameraTitle}>优质推荐</Text>
        </View>
        <SafeAreaView style={styles.bananaCameraScroll}>
                <LazyLoading error={props.error} 
                        parentScreen={Index.parentScreen}
                        dataLeng={bannerList.length}>
                    <FlatList
                    data={bannerList}
                    horizontal={true}
                    getItemLayout={(data: any, index: number) => (
                        {length: 164, offset: 164 * index, index}
                    )}
                    renderItem={({ item, index }) => <View style={styles.bananaCameraContainer}>
                        <View style={[
                                styles.bananaCameraItem,
                                styles.bananaCameraItemOne,
                                (bannerList.length - 1) !== index 
                                && styles.imgContainerMr,
                            ]}>
                                <TouchableWithoutFeedback
                                    onPress={() => goToPage(item)}>
                                        <View style={styles.bananaCameraItemContainer}>
                                            <View style={styles.bananaCameraCoverOne}>
                                                <ImageBackground  
                                                source={{uri: item.logo}}
                                                resizeMode='cover'
                                                style={styles.bananaCameraImg}/>
                                                <Text
                                                    onLayout={(e)=>getItemWH(item, index, e.nativeEvent.layout)}
                                                    style={[
                                                        styles.bananaCameraCoverType,
                                                        styles.bananaCameraCoverTypeOne,
                                                        {
                                                            transform: [
                                                                {translateX: -item.width/2},
                                                                {translateY: item.height/2},
                                                            ],
                                                        }
                                                    ]}
                                                >{item.type}</Text>
                                            </View> 
                                            <View style={styles.bananaCameraCoverInfo}>
                                                <Text style={styles.bananaCameraCoverTitle} numberOfLines={1}>{item.title}</Text>        
                                                <Text style={styles.bananaCameraCoverSubTitle} numberOfLines={1}>作者：--</Text>        
                                            </View>  
                                            <View style={styles.bananaCameraCoverBtn}>
                                                <Text style={styles.bananaCameraCoverBtnText}>点击阅读</Text>
                                            </View>     
                                        </View>
                                </TouchableWithoutFeedback>
                        </View>
                    </View>}
                    keyExtractor={item => `${item.source}-${item.id}`}
                    />
                </LazyLoading>
        </SafeAreaView>
    </View> 
}
function Index(props:any) {
    const [homeData, setHomeData] = useState<HomeList>({
        qualityRecommended: [],
        weekRankings: [],
    });
    const { data, error } = useSWR(ShuYuanSdk.getHomePageInfoUrl(), async() => {
            return ShuYuanSdkObj.getHomePageInfo();
        });

    return (<View>
        {/* 头部 */}
        <Header 
            headerCenter='阅读空间' 
            headerLeft={false}
            functionList={['search',]}
            />
        <ScrollView
            style={styles.main}>
            {/* banner 轮播 */}
            <View style={styles.mainBanner}>
                <Banner/>
            </View>
            {/* NEW 本周排行榜 */}
            <View style={styles.cardWrap}>
                <NEW data={data} error={error}/>
            </View>
            {/* bananaCamera 优质推荐 */}
            <View style={styles.cardWrap}>
                <BananaCamera data={data} error={error}/>
            </View>
            {/* article 文章 */}
            <View style={styles.cardWrap}>
                {/* <Article/> */}
            </View>
        </ScrollView>
    </View>)
}
Index.navigationOptions = {
    title: 'Home',
};
Index.parentScreen = 'App';

export default Index;