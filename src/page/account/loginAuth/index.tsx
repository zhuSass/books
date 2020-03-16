import React,{useEffect} from "react";
import { View,  StyleSheet, ActivityIndicator, StatusBar, } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
});

// 身份验证
export default function LoginAuthScreen(navigationProps:any) {
    const navigation = navigationProps.navigation;

    const _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('token');

        navigation.replace(userToken ? 'App' : 'Login');
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
