import { StyleSheet, } from "react-native";

export default StyleSheet.create({
    indexWrap: {
        paddingTop: 10,
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
    userInfo: {
        height: 170,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 20,
    },
    userInfoHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    userInfoHeaderText: {
        marginRight: 5,
        flex: 1,
        display: 'flex',
    },
    headerTextName: {
        marginBottom: 8,
        fontSize: 20,
        color:'#fff',
    },
    headerTextLevel: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 16,
    },
    headerTextLevelInfo: {
        borderWidth: 1,
        borderColor: '#fff',
        fontSize: 12,
        color: '#fff',
        paddingLeft: 2,
        paddingRight: 2,
    },
    headerTextSignature: {
        fontSize: 14,
        color: '#fff',
    },
    userInfoHeaderImage: {
        width: 48,
        height: 48,
        backgroundColor: '#ffffff',
        borderRadius: 50,
    },
    userInfoList: {
        marginTop: 8,
        display: 'flex',
        flexDirection: 'row',
    },
    userInfoListItem: {
        display: 'flex',
        marginRight: 20,
    },
    userInfoListItemNum: {
        fontSize: 14,
        color: '#fff',
    },
    userInfoListItemText: {
        fontSize: 12,
        color: '#fff',
    },
    scrollView: {
        flex: 1,
    },
    pageCrossroads: {
        flex: 1,
    },
    pageCrossroadsItems: {
        display: 'flex',
        height: 52,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 16,
        paddingRight: 16,
    },
    pageCrossroadsItemsLogo: {
        marginRight: 10,
    },
    pageCrossroadsItemsText: {
        flex: 1,
        fontSize: 16,
        color: '#484848',
    },
    pageCrossroadsItemsIcon: {

    },
});