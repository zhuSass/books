import React,{useEffect} from 'react';
import { View, Text, ScrollView} from 'react-native';

import Icon from '@/components/icon';

import styles from './css'

function Index(props:any) {
    return (<View>
        <View style={styles.header}>
            <View style={styles.headerLeft}>
                <Icon 
                    fontFileName='AntDesign'
                    name='left'
                    />
            </View>
            <View style={styles.headerCenter}>
                <Text>阅读空间</Text>
            </View>
        </View>
        <ScrollView>
        </ScrollView>
    </View>)
}
Index.navigationOptions = {
    title: 'Home',
};

export default Index;