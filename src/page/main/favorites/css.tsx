import { StyleSheet, } from "react-native";

export default StyleSheet.create({
    indexWrap: {
        flex: 1,
        position: 'relative',
    },
    headerBg: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 170,
    },
    container: {
        flex: 1,
    },
    fictionScroll: {
        flex: 1,
        paddingLeft: 16,
        paddingRight: 16,
    },
    fictionList: {
        paddingTop: 8,
        paddingBottom: 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#f0f1f2',
        borderBottomWidth: 1,
    },
    bananaCameraImg: {
        width: 66,
        height: 68,
        marginRight: 8,
    },
    fictionListInfo: {
        paddingTop: 5,
        display: 'flex',
        flex: 1,
    },
    title: {
        paddingBottom: 5,
        color: '#33373d',
        fontSize: 16,
    },
    content: {
        color: '#969ba3',
        fontSize: 14,
    },
    label: {
        marginTop: 5,
        display: 'flex',
        flexDirection: 'row',
    },
    author: {
        position: 'relative',
        top: -2,
        color: '#969ba3',
        fontSize: 13,
    },
    user: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center'
    },
    userIcon: {

        marginRight: 5,
    },
});