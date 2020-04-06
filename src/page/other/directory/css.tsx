import { StyleSheet, } from "react-native";

const publicSize = 16;

export default StyleSheet.create({
    directory: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerLeftText: {
        paddingLeft: 15,
        fontSize: publicSize,
    },
    separatedTitle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center',
        height: 55,
        borderBottomColor: 'red',
        borderBottomWidth: 1,
    },
    separatedTitleContent: {
        color: 'red',
        fontSize: publicSize,
    },
    baseInfo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        height: 54,
        paddingLeft: 10,
        paddingRight: 10,
    },
    baseInfoTotalNumber: {
        fontWeight: '700',
        fontSize: publicSize,
    },
    baseInfoTotalSort: {
        fontSize: publicSize,
    },
    contentType: {
        display: 'flex',
        justifyContent: 'center',
        height: 46,
        paddingLeft: 10,
        backgroundColor: '#f6f7f9',
    },
    contentTypeText: {
        fontSize: publicSize,
        color: '#969ba3',
    },
    renderFlatListWap: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    renderFlatListBolck: {
        height: 54,
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
        borderBottomColor: '#f0f1f2',
        borderBottomWidth: 1,
    },
    renderFlatListBolckCount: {
        fontWeight: '500',
        fontSize: publicSize,
        paddingRight: 5,
    },
    renderFlatListBolckTitle: {
        flex: 1,
        fontWeight: '500',
        fontSize: publicSize,
    },
    safeAreaView: {
        flex: 1,
    },
});