import { StyleSheet } from "react-native";

export default StyleSheet.create({
    indexWrap: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#fff',
    },
    headerBg: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 170,
    },
    HeaderBgContainer: {
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
    cache: {
        display: 'flex',
        paddingLeft: 10,
        fontSize: 12,
        color: '#969ba3',
    },
    fictionList: {
        paddingTop: 10,
        paddingBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#EAEAEA',
        borderBottomWidth: 1,
    },
    bananaCameraImg: {
        width: 70,
        height: 90,
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
    more: {
    },
    modal: {
        width: '100%',
    },
    modalCard: {
        backgroundColor: '#fff',
        borderRadius: 4, 
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    modalCardItem: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
    },
    modalCardItemText: {
        fontSize: 16,
        color: '#857ADA',
    },
});