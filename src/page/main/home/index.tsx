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
    NativeScrollEvent,
} from 'react-native';
import { useNavigation,NavigationProp, } from '@react-navigation/native';
import { 
    Content, Card, 
    CardItem, Thumbnail, Text,
    Button, Icon, Left, Body, Right 
} from 'native-base';

import Header, {HeaderPropsType,
                } from '@/components/header';
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
function NEW(props: {data:HomeList['weekRankings']}) {
    const navigation = useNavigation();

    const goToPage = function(id: number) {
        console.log('3-----------', id)
        navigation.navigate(`sdfdsf?${id}`);
    }

    const dataList = props.data;
    if (!dataList.length) return null;

    return <View style={styles.bananaCameraWrap}>
        <View style={styles.bananaCameraWrapHeader}>
            <View style={styles.bananaCameraWire}></View>
            <Text style={styles.bananaCameraTitle}>本周排行榜</Text>
        </View>
        <SafeAreaView style={styles.bananaCameraScroll}>
                <FlatList
                data={dataList}
                horizontal={true}
                getItemLayout={(data: any, index: number) => (
                    {length: 164, offset: 164 * index, index}
                )}
                renderItem={({ item, index }) => <View style={[
                        styles.bananaCameraItem,
                        (dataList.length - 1) !== index 
                        && styles.imgContainerMr,
                    ]}>
                        <TouchableWithoutFeedback
                            onPress={() => goToPage(item.id)}>
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
                </View>}
                keyExtractor={item => `${item.source}-${item.id}`}
                />
        </SafeAreaView>
    </View> 
}
// BananaCamera 优质推荐
function BananaCamera(props: {data:HomeList['qualityRecommended']}) {
    const navigation = useNavigation();
    const [bannerList, setBannerList] = useState<any[]>([]);

    useEffect(() => {
        let list:any[] = [];
        props.data.forEach(v => {
            list.push({
                ...v,
                type: 'NEW',
                width: 0, 
                height: 0,
            })
        });

        setBannerList(list);
    },[props.data]);

    const goToPage = function(item: any) {
        navigation.navigate('Other', { 
            screen: 'BookDirectory', 
            params: {
                id: item.id,
                source: item.source,
            },
        })
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
    if (!bannerList.length) return null;


    return <View style={styles.bananaCameraWrap}>
        <View style={styles.bananaCameraWrapHeader}>
            <View style={styles.bananaCameraWire}></View>
            <Text style={styles.bananaCameraTitle}>优质推荐</Text>
        </View>
        <SafeAreaView style={styles.bananaCameraScroll}>
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
        </SafeAreaView>
    </View> 
}
// Article 文章
function Article() {
    const navigation = useNavigation();

    let bannerList =[
        {title: 'fds', type: 'NEW', pagSrc: 'Bbs', src: 'https://desk-fd.zol-img.com.cn/t_s1920x1080c5/g5/M00/01/0F/ChMkJlbKwi-IdJtLAAQcbAvaMWcAALGkAM_YpMABByE165.jpg',},
        {title: 'cds', type: 'HOT', pagSrc: 'Bibliotheca', src: 'https://desk-fd.zol-img.com.cn/t_s1920x1200c5/g5/M00/01/0F/ChMkJ1bKwi-IZNlnAAXcSmC9yiwAALGkANDfxcABdxi053.jpg',},
        {title: 'dsew', type: 'NEW', pagSrc: 'MyCenter', src: 'https://desk-fd.zol-img.com.cn/t_s1920x1200c5/g5/M00/01/0F/ChMkJlbKwi-IHA_bAAdtkjiuJS8AALGkANJW3kAB22q210.jpg',},
        {title: '3dsew', type: 'HOT', pagSrc: 'Bibliotheca', src: 'https://desk-fd.zol-img.com.cn/t_s1920x1200c5/g5/M00/01/0F/ChMkJlbKwi-IIgUYAAW-dNoy2CsAALGkANQySMABb6M328.jpg',},
        {title: '4dsew', type: 'NEW', pagSrc: 'Bbs', src: 'https://desk-fd.zol-img.com.cn/t_s1920x1200c5/g5/M00/01/0F/ChMkJ1bKwi-IT_bXAA3D8fytBOUAALGkANZB6sADcQJ000.jpg',},
    ]
    const goToPage = function(src: string) {
        navigation.navigate(src);
    }

    return <View style={styles.bananaCameraWrap}>
        <View style={styles.bananaCameraWrapHeader}>
            <View style={styles.bananaCameraWire}></View>
            <Text style={styles.bananaCameraTitle}>文章</Text>
        </View>
        <View>
            <Content>
                {bannerList.map((item, i) => {
                    return <TouchableWithoutFeedback key={i}
                                onPress={() => {goToPage(item.pagSrc)}}>
                                <Card >
                                    <CardItem>
                                        <Left>
                                            <Thumbnail source={{uri: item.src}} />
                                            <Body>
                                                <Text>{item.title}</Text>
                                                <Text note>GeekyAnts</Text>
                                            </Body>
                                        </Left>
                                        <Right>
                                            <Button style={[
                                                    styles.articleFocus,
                                                ]} 
                                                transparent>
                                                <Text style={styles.articleFocusText}>关注</Text>
                                            </Button>
                                        </Right>
                                    </CardItem>
                                    <CardItem cardBody>
                                        <ImageBackground  
                                            source={{uri: item.src}}
                                            resizeMode='cover'
                                            style={styles.articleMainImg}/>
                                    </CardItem>
                                    <CardItem>
                                        <View style={{width: '100%'}}>
                                            <View style={styles.articleMainTitle}>
                                                <Text style={styles.articleMainTitleTarget} numberOfLines={1}>{item.pagSrc}</Text>
                                            </View>
                                            <View style={styles.articleMainSubTitle}>
                                                <Text style={styles.articleMainSubTitleTarget} numberOfLines={4}>{item.pagSrc}</Text>
                                            </View>
                                        </View>
                                    </CardItem>
                                    <CardItem>
                                        <Left>
                                            <Button style={styles.articleMainIcon} transparent>
                                                <Icon  active name="thumbs-up" />
                                                <Text style={styles.articleMainIconInfo}>12</Text>
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Button style={[
                                                    styles.articleMainIcon,
                                                    styles.articleMainIconCenter,
                                                ]} 
                                                transparent>
                                                <Icon active name="chatbubbles" />
                                                <Text style={styles.articleMainIconInfo}>4</Text>
                                            </Button>
                                        </Body>
                                        <Right>
                                            <Text style={styles.articleMainIconInfo}>11h</Text>
                                        </Right>
                                    </CardItem>
                                </Card>
                    </TouchableWithoutFeedback> 
                })}
            </Content>
        </View>
        <View style={{height: 60, width: 1}}></View>
    </View> 
}
function Index(props:any) {
    const [homeData, setHomeData] = useState<HomeList>({
        qualityRecommended: [],
        weekRankings: [],
    });
    useEffect(() => {
        initDataHandle();
    }, []);
    const initDataHandle = async function() {
        let data:HomeList = await ShuYuanSdkObj.getHomePageInfo();
        setHomeData(data);
    };

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
                <NEW data={homeData.weekRankings} />
            </View>
            {/* bananaCamera 优质推荐 */}
            <View style={styles.cardWrap}>
                <BananaCamera data={homeData.qualityRecommended}/>
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

export default Index;