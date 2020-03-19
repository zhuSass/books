import React,{useEffect} from 'react';
import { View, Text,} from 'react-native';
import { useRoute ,NavigationProp, } from '@react-navigation/native';

import styles from './css'

function Index(props:any) {
    const route = useRoute();

    console.log('3-------', route.params)

    return (<View style={styles.homeWrap}>
        <Text>directory</Text>
    </View>)
}

export default Index;