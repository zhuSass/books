import React,{useEffect} from 'react';
import { View, Text,} from 'react-native';

import styles from './css'

function Index(props:any) {
    console.log('bookDetails--------------',
    props.navigation.state.key)
    return (<View style={styles.homeWrap}>
        <Text>bookDetails</Text>
    </View>)
}

export default Index;