import React, { ReactNode, useContext,
     useRef,
} from 'react';
import { 
    View, Text,     
    ActivityIndicator,TouchableOpacity,
} from 'react-native';
import { useNavigation,StackActions,useRoute, } from '@react-navigation/native';

import Icon, {IconBtn} from '@/components/icon';
import styles from './css';

export type propsType = {
    fallback?: JSX.Element, // 加载中组件
    errorLazy?: JSX.Element, // 加载失败组件
    children: JSX.Element[] | JSX.Element, 
    error: boolean, // 错误状态
    dataLeng: number, // 数据长度
    parentScreen: string, // 所属父级屏幕名字
}

function Loadding() {
    return <View style={styles.loadding}>
        <View style={styles.loaddingIcon}>
            <ActivityIndicator 
                size="large" color="rgba(24, 144, 255, 0.6)" />
        </View>
        <Text style={[styles.text,styles.loaddingText]}>加载中...</Text>
    </View>
}
function ErrorStatus(props:propsType) {
    const navigation = useNavigation();
    const route = useRoute();

    const goToPage = function() {
        navigation.dispatch(StackActions.replace(props.parentScreen,
        {
            screen: route.name,
            initial: false,
            params:route.params
        }));
        
    };
    return <View style={styles.errorStatus}>
        <View style={styles.errorStatusIconWrap}>
            <Icon 
                style={styles.errorStatusIcon}
                fontFileName='AntDesign'
                name='frown'
                />
        </View>
        <Text style={styles.text}>似乎出了点问题...</Text>
        <TouchableOpacity style={styles.errorStatusLoad} onPress={() => goToPage()}>
            <Text style={styles.errorStatusLoadText}>重新加载</Text>
        </TouchableOpacity>
    </View>
}

export default function LazyLoading(props: propsType) {
    const {fallback, errorLazy, error, dataLeng, children} = props;

    const LoaddingLazy = fallback !== undefined && React.isValidElement(fallback) ?
        <View>{fallback}</View>:<Loadding/>;    
    const ErrorStatusLazy = errorLazy !== undefined && React.isValidElement(errorLazy) ?
        <View>{errorLazy}</View>:<ErrorStatus {...props}/>;    
    const DataLazy = dataLeng ? children : LoaddingLazy;

    return <View style={styles.lazyLoadingWrap}>
        {error ? ErrorStatusLazy : DataLazy}
    </View>

};
