import React,{useEffect} from 'react';
import { View, Text,} from 'react-native';

import styles from './css'

function Index(props:any) {
    console.log('bbs--------------',
    props.navigation.state.key)
    return (<View style={styles.homeWrap}>
        <Text>bbs</Text>
    </View>)
}

export default Index;