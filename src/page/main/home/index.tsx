import React,{
    useEffect, useState, 
    useContext, useRef,
} from 'react';
import { 
    View, Text, 
    ScrollView, ImageBackground,
    SafeAreaView, FlatList,
    TouchableWithoutFeedback,
    NativeSyntheticEvent,
    NativeScrollEvent,
} from 'react-native';
import { NavigationContext,
    NavigationScreenProp, 
    NavigationScreenProps,
} from 'react-navigation';
import { 
     Card, 
    } from 'native-base';

import Header, {HeaderPropsType,
                } from '@/components/header'

import styles from './css'


// banner 轮播
function Banner() {
    const navigation:NavigationScreenProp<{}> = useContext(NavigationContext);

    let bannerList =[
        {title: 'fds', pagSrc: 'Bbs', src: 'https://desk-fd.zol-img.com.cn/t_s1920x1080c5/g5/M00/01/0F/ChMkJlbKwi-IdJtLAAQcbAvaMWcAALGkAM_YpMABByE165.jpg',},
        {title: 'cds', pagSrc: 'Bibliotheca', src: 'https://desk-fd.zol-img.com.cn/t_s1920x1200c5/g5/M00/01/0F/ChMkJ1bKwi-IZNlnAAXcSmC9yiwAALGkANDfxcABdxi053.jpg',},
        {title: 'dsew', pagSrc: 'MyCenter', src: 'https://desk-fd.zol-img.com.cn/t_s1920x1200c5/g5/M00/01/0F/ChMkJlbKwi-IHA_bAAdtkjiuJS8AALGkANJW3kAB22q210.jpg',},
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
// BananaCamera 限时免费
function BananaCamera() {
    const navigation:NavigationScreenProp<{}> = useContext(NavigationContext);

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
                                            <Text style={styles.bananaCameraCoverLinkeText}>2600人喜欢</Text>
                                        </View>    
                                    </View> 
                                    <View style={styles.bananaCameraCoverInfo}>
                                        <Text style={styles.bananaCameraCoverTitle}>{item.title}</Text>        
                                        <Text style={styles.bananaCameraCoverSubTitle}>思考社会的终极难题</Text>        
                                    </View>   
                                </View>
                        </TouchableWithoutFeedback>
                </View>}
                keyExtractor={item => item.title}
                />
        </SafeAreaView>
    </View> 
    
}

function Index(props:NavigationScreenProps) {
    return (<View>
        {/* 头部 */}
        <Header 
            title='阅读空间' 
            headerLeft={false}
            functionList={['search',]}
            />
        <ScrollView
            style={styles.main}>
            {/* banner 轮播 */}
            <View style={styles.mainBanner}>
                <Banner/>
            </View>
            {/* bananaCamera 限时免费 */}
            <View style={styles.cardWrap}>
                <BananaCamera/>
            </View>
            <View style={{width: 1, height: 1000}}></View>
        </ScrollView>
    </View>)
}
Index.navigationOptions = {
    title: 'Home',
};

export default Index;