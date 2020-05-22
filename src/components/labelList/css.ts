import { StyleSheet, } from "react-native";

export default StyleSheet.create({
    shuYuanList: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 16,
        paddingRight: 16,
    },
    shuYuanListTag: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 13,
        height: 20,
        borderColor: 'transparent',
        borderRadius: 99,
        borderWidth: 1,
        paddingLeft: 10,
        paddingRight: 10,
    },
    shuYuanListTagText: {
        fontSize: 13,
        color: '#969ba3',
    },
    shuYuanListTagAction: {
        borderColor: 'red',
    },
    shuYuanListTagTextAction: {
        color: 'red',
    },
});