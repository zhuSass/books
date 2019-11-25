import React,{useContext} from 'react';
import { View, Text, ScrollView,} from 'react-native';

import Header from '@/components/header';
import {IconBtn} from '@/components/icon';

import styles from './css';
import { ThemeContext } from 'react-navigation';

type globalDataType = {
    pageType: '' | 'setting',
};
// 上下文
const globalData:globalDataType = {
    pageType: '', // 页面类型
};
const GlobalDataContext = React.createContext(globalData);

// 文章主题
function ReadingMain(props:any) {
    const themglobalDatae = useContext(GlobalDataContext);
    
    console.log('2----------', themglobalDatae)
    return <View>

    </View>
}

function Index(props:any) {
    console.log('rading--------------',
    props.navigation.state.key)

    const headerHaderRight = function() {

    }
    // 头部右边内容显示
    const rendenHeaderContentEl = function() {
        return <View style={styles.headerRight}>
            <View style={styles.leaveMessage}>
                <Text style={styles.leaveMessageNum}>11w</Text>
                <IconBtn 
                    style={styles.leaveMessageIcon}
                    onPress={headerHaderRight}
                    fontFileName='MaterialCommunityIcons'
                    name='message-text-outline'
                    />
            </View>
            <View style={styles.iconMore}>
                <IconBtn 
                    style={styles.iconMoreIcon}
                    onPress={headerHaderRight}
                    fontFileName='Feather'
                    name='more-vertical'
                    />
            </View>
        </View>
    };
    const onResponderEndFun = function() {
        console.log('3-----------')
    }

    return (<View style={styles.homeWrap} 
            onStartShouldSetResponder={() => true}
            onMoveShouldSetResponder={() => true}
            onResponderStart={()=>console.log('34343434')}
            onResponderEnd={()=>onResponderEndFun()}>
            <GlobalDataContext.Provider value={globalData}>
                <Header
                    layout='absolute'
                    headerLeft={true}
                    headerRight={rendenHeaderContentEl}
                />
                <ScrollView>
                    {/* 文章主题 */}
                    <ReadingMain/>
                </ScrollView>
            </GlobalDataContext.Provider>
    </View>)
}

export default Index;