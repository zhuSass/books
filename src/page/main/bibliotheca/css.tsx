import { StyleSheet, } from "react-native";

export default StyleSheet.create({
    IndexWrap: {
        flex: 1,
        backgroundColor: '#fff',
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
        width: 76,
        height: 78,
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
        fontSize: 17,
        fontWeight: 'bold',
    },
    content: {
        color: '#969ba3',
        fontSize: 12,
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
        fontSize: 12,
    },
    user: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center'
    },
    userIcon: {
        marginRight: 5,
    }
});