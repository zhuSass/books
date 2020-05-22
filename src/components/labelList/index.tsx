import React, { ReactNode, useContext,
    useRef,
} from 'react';
import { 
   View, Text,     
   TouchableOpacity,
   FlatList,
} from 'react-native';

import styles from './css';

export type PropsType = {
    list: {
        label: string,
        name: string,
    }[],
    clickAction: (data: PropsType['list'][0]) => void,
    actionType: string,
}

export default function Index(props: PropsType) {
    const {
        list,
        clickAction,
        actionType,
    } = props;
    return <View style={styles.shuYuanList}>
    <FlatList
            data={list}
            horizontal={true}
            showsHorizontalScrollIndicator = {false}
            renderItem={(data:{item: any, index: number}) => {
                return <TouchableOpacity 
                    activeOpacity={1}
                    onPress={() => clickAction(data.item)} 
                    style={[
                        styles.shuYuanListTag,
                        data.item.name === props.actionType && styles.shuYuanListTagAction,
                    ]}>
                    <Text style={[
                        styles.shuYuanListTagText,
                        data.item === props.actionType && styles.shuYuanListTagTextAction,
                    ]}>{data.item.label}</Text>
                </TouchableOpacity>
            }}
        keyExtractor={item => item.name}
    />
</View>
}
