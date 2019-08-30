import { StyleSheet, } from "react-native";

export default StyleSheet.create({
    loginWrap: {
        position: 'relative',
        display: 'flex',
        flex: 1,
    },
    loginWrapBg: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        resizeMode: 'cover', // or 'stretch'
    },
});