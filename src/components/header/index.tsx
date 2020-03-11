import React, { ReactNode, useContext,
     useRef,
} from 'react';
import { 
    View, Text,     
} from 'react-native';
import { useNavigation, } from '@react-navigation/native';

import Icon, {IconBtn} from '@/components/icon';
import styles from './css'

enum functionEnum {
    search = 'search', // 搜索
};
export type HeaderPropsType = {
    layout?: 'absolute', // 布局模式
    headerLeft?: ReactNode | Boolean, // 左边显示组件,传组件则代表自定义，Boolean则默认的显示/隐藏
    headerCenter?: ReactNode | string, // 中间显示组件,传组件则代表自定义，Boolean则默认的显示/隐藏
    headerRight?: (() => ReactNode) | ReactNode, // 右边显示组件,传组件则代表自定义
    functionList?: Array< // 功能列表
        functionEnum | ReactNode
    >,
    headerLeftClick?: () => void,
    searchParameter?: { // 搜索组件参数
    },
}
export default function Header(props: HeaderPropsType,) {
    const navigation = useNavigation();
    const haderRef = useRef(null);

    let headerLeftClick = () => {
        navigation.goBack();
    };
    if(props.headerLeftClick) {
        headerLeftClick = props.headerLeftClick
    }

    return (<View ref={haderRef} style={[
                    styles.header,
                    {position: props.layout},
                ]}>
                <View style={styles.headerNavigation}>
                    <View style={styles.headerLfet}>
                        {(props.headerLeft === true) ? <IconBtn 
                            onPress={headerLeftClick}
                            style={styles.headerText}
                            fontFileName='AntDesign'
                            name='left'
                            /> : null}
                        {React.isValidElement(props.headerLeft) ? 
                            props.headerLeft : null}
                    </View>
                    <View>
                        {(typeof props.headerCenter === 'string') ? <Text style={styles.headerText}>
                            {props.headerCenter}</Text> : null}
                        {React.isValidElement(props.headerCenter) ? 
                            props.headerCenter : null}
                    </View>
                    <View style={styles.headerRight}>
                        {React.isValidElement(props.headerRight) ? 
                        props.headerRight : null}
                        {typeof props.headerRight === 'function' && props.headerRight()}
                    </View>
                </View>
                {/* 功能组件 */}
                {props?.functionList?.length ? <View style={styles.headerFun}>
                    {props.functionList.map((item, index) => {
                        // 搜索组件 start
                        if (item === 'search') {
                            return <View key={index} style={styles.headerSearch}>
                                    <Icon 
                                        style={[
                                            styles.headerSearchFont,
                                            styles.headerSearchIcon,
                                        ]}
                                        fontFileName='EvilIcons'
                                        name='search'
                                        />
                                    <View style={styles.headerSearchText}>
                                        <Text style={styles.headerSearchFont}>
                                            搜索书名、作者、出版社
                                        </Text>
                                    </View>
                                </View>
                        }
                        // 自定义组件
                        if (React.isValidElement(item)) {
                            return item;
                        }
                    })}
                </View> : null}
            </View>)
};
Header.defaultProps = {
    headerLeft: true,
    headerCenter: true,
    headerRight: false,
    functionList: [],
}
