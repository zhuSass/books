import React,{useEffect} from 'react';
import { View, Text,} from 'react-native';

import styles from './css'

function Index(props:any) {
    console.log('myCenter--------------',
    props.navigation.state.key)
    return (<View style={styles.homeWrap}>
        <Text>My Center</Text>
    </View>)
}

export default Index;