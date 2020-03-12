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
import { useNavigation, } from '@react-navigation/native';
import { 
    Content, Card, 
    CardItem, Thumbnail, Text,
    Button, Icon, Left, Body, Right 
} from 'native-base';

import Header, {HeaderPropsType,
                } from '@/components/header';
import ShuYuanSdk from '@/common/shuYuanSdk';

import styles from './css'

const ShuYuanSdkObj = ShuYuanSdk.newObj(['快眼看书']);

// banner 轮播
function Banner() {
    const navigation = useNavigation();

    let bannerList =[
        {title: 'fds', pagSrc: 'BookDetails', src: 'https://desk-fd.zol-img.com.cn/t_s1920x1080c5/g5/M00/01/0F/ChMkJlbKwi-IdJtLAAQcbAvaMWcAALGkAM_YpMABByE165.jpg',},
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
// NEW 优质推荐
function NEW() {
    const navigation = useNavigation();

    let bannerList =[
        {title: 'fds', type: 'NEW', pagSrc: 'Bbs', src: 'https://desk-fd.zol-img.com.cn/t_s1920x1080c5/g5/M00/01/0F/ChMkJlbKwi-IdJtLAAQcbAvaMWcAALGkAM_YpMABByE165.jpg',},
        {title: 'cds', type: 'HOT', pagSrc: 'Bibliotheca', src: 'https://desk-fd.zol-img.com.cn/t_s1920x1200c5/g5/M00/01/0F/ChMkJ1bKwi-IZNlnAAXcSmC9yiwAALGkANDfxcABdxi053.jpg',},
        {title: 'dsew', type: 'NEW', pagSrc: 'MyCenter', src: 'https://desk-fd.zol-img.com.cn/t_s1920x1200c5/g5/M00/01/0F/ChMkJlbKwi-IHA_bAAdtkjiuJS8AALGkANJW3kAB22q210.jpg',},
        {title: '3dsew', type: 'HOT', pagSrc: 'Bibliotheca', src: 'https://desk-fd.zol-img.com.cn/t_s1920x1200c5/g5/M00/01/0F/ChMkJlbKwi-IIgUYAAW-dNoy2CsAALGkANQySMABb6M328.jpg',},
        {title: '4dsew', type: 'NEW', pagSrc: 'Bbs', src: 'https://desk-fd.zol-img.com.cn/t_s1920x1200c5/g5/M00/01/0F/ChMkJ1bKwi-IT_bXAA3D8fytBOUAALGkANZB6sADcQJ000.jpg',},
    ]
    const goToPage = function(src: string) {
        console.log('3-----------', src)
        navigation.navigate(src);
    }

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
                renderItem={({ item, index }) => <View style={[
                        styles.bananaCameraItem,
                        (bannerList.length - 1) !== index 
                        && styles.imgContainerMr,
                    ]}>
                        <TouchableWithoutFeedback
                            onPress={() => goToPage(item.pagSrc)}>
                                <View>
                                    <View style={styles.bananaCameraCover}>
                                        <ImageBackground  
                                        source={{uri: item.src}}
                                        resizeMode='cover'
                                        style={styles.bananaCameraImg}/>
                                        <Text style={styles.bananaCameraCoverType}>{item.type}</Text>    
                                        <View style={styles.bananaCameraCoverLinke}>
                                            <Text style={styles.bananaCameraCoverLinkeText} numberOfLines={1}>2600人喜欢</Text>
                                        </View>    
                                    </View> 
                                    <View style={styles.bananaCameraCoverInfo}>
                                        <Text style={styles.bananaCameraCoverTitle} numberOfLines={1}>{item.title}</Text>        
                                        <Text style={styles.bananaCameraCoverSubTitle} numberOfLines={1}>思考社会的终极难题思考社会的终极难题思考社会的终极难题</Text>        
                                    </View>   
                                </View>
                        </TouchableWithoutFeedback>
                </View>}
                keyExtractor={item => item.title}
                />
        </SafeAreaView>
    </View> 
}
// BananaCamera 限时免费
function BananaCamera() {
    const navigation = useNavigation();

    const initBannerList = [
        {title: 'fds', width: 0, height: 0,type: 'NEW', pagSrc: 'Bbs', src: 'https://desk-fd.zol-img.com.cn/t_s1920x1080c5/g5/M00/01/0F/ChMkJlbKwi-IdJtLAAQcbAvaMWcAALGkAM_YpMABByE165.jpg',},
        {title: 'cds', width: 0, height: 0,type: 'HOT', pagSrc: 'Bibliotheca', src: 'https://desk-fd.zol-img.com.cn/t_s1920x1200c5/g5/M00/01/0F/ChMkJ1bKwi-IZNlnAAXcSmC9yiwAALGkANDfxcABdxi053.jpg',},
        {title: 'dsew', width: 0, height: 0,type: 'NEW', pagSrc: 'MyCenter', src: 'https://desk-fd.zol-img.com.cn/t_s1920x1200c5/g5/M00/01/0F/ChMkJlbKwi-IHA_bAAdtkjiuJS8AALGkANJW3kAB22q210.jpg',},
        {title: '3dsew', width: 0, height: 0,type: 'HOT', pagSrc: 'Bibliotheca', src: 'https://desk-fd.zol-img.com.cn/t_s1920x1200c5/g5/M00/01/0F/ChMkJlbKwi-IIgUYAAW-dNoy2CsAALGkANQySMABb6M328.jpg',},
        {title: '4dsew', width: 0, height: 0,type: 'NEW', pagSrc: 'Bbs', src: 'https://desk-fd.zol-img.com.cn/t_s1920x1200c5/g5/M00/01/0F/ChMkJ1bKwi-IT_bXAA3D8fytBOUAALGkANZB6sADcQJ000.jpg',},
        {title: '4dsew3', width: 0, height: 0,type: 'NEW', pagSrc: 'Bbs', src: 'https://desk-fd.zol-img.com.cn/t_s1920x1200c5/g5/M00/01/0F/ChMkJ1bKwi-IT_bXAA3D8fytBOUAALGkANZB6sADcQJ000.jpg',},
    ];
    const [bannerList, setBannerList] = useState(initBannerList);

    const goToPage = function(src: string) {
        console.log('3------------', src)
        navigation.navigate(src);
    }
    const getItemWH = function(item:any, index:number, layout:any,) {
        if(item.width) return;
        initBannerList.splice(index, 1, item);
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
            <Text style={styles.bananaCameraTitle}>限时免费</Text>
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
                                onPress={() => goToPage(item.pagSrc)}>
                                    <View style={styles.bananaCameraItemContainer}>
                                        <View style={styles.bananaCameraCoverOne}>
                                            <ImageBackground  
                                            source={{uri: item.src}}
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
                                            <Text style={styles.bananaCameraCoverSubTitle} numberOfLines={1}>作者：墨鱼</Text>        
                                        </View>  
                                        <View style={styles.bananaCameraCoverBtn}>
                                            <Text style={styles.bananaCameraCoverBtnText}>点击阅读</Text>
                                        </View>     
                                    </View>
                            </TouchableWithoutFeedback>
                    </View>
                </View>}
                keyExtractor={item => item.title}
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
    useEffect(() => {
        console.log('进来了---')
        ShuYuanSdkObj.getHomePageInfo();

    }, []);

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
            {/* NEW 优质推荐 */}
            <View style={styles.cardWrap}>
                <NEW/>
            </View>
            {/* bananaCamera 限时免费 */}
            <View style={styles.cardWrap}>
                <BananaCamera/>
            </View>
            {/* article 文章 */}
            <View style={styles.cardWrap}>
                <Article/>
            </View>
        </ScrollView>
    </View>)
}
Index.navigationOptions = {
    title: 'Home',
};

export default Index;