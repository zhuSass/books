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
        {
            title: '佣兵的战争',
            logo: 'http://qidian.qpic.cn/qidian_common/349573/9acf7a1f789604c540e80df89f80bef3/0',
            id: '2234',
            source: '快眼看书',
        },
        {
            title: '网游之大盗贼',
            logo: 'http://qidian.qpic.cn/qidian_common/349573/ad0e5e2954e680ff948b1e62d02b5a74/0',
            id: '6994',
            source: '快眼看书',
        },
        {
            title: '大时代1958',
            logo: 'http://qidian.qpic.cn/qidian_common/349573/40cdb0ab19a6e705cc271e712502b745/0',
            id: '96769',
            source: '快眼看书',
        },
    ]
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
                    onPress={() => goToPage(item)}>
                    <ImageBackground  
                        source={{uri: item.logo}}
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