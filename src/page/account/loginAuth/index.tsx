import React,{useEffect} from "react";
import { View,  StyleSheet, ActivityIndicator, StatusBar, } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
});
// 身份验证
export default function LoginAuthScreen(props:any) {
    const _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('token');

        // props.navigation.navigate(userToken ? 'App' : 'Login');
        props.navigation.navigate('App');
    };

    useEffect(() => {
        _bootstrapAsync();
    }, []);

    // Render any loading content that you like here
    return (
    <View style={styles.container}>
        <ActivityIndicator size="large" color="#D2D2D2" />
        <StatusBar barStyle="default" />
    </View>
    );
}
