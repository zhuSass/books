import { StyleSheet, } from "react-native";

export default StyleSheet.create({
    lazyLoadingWrap: {
        flex: 1,
    },
    loadding: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 37,
        paddingBottom: 10,
    },
    errorStatus: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    loaddingIcon: {
    },
    loaddingText: {
    },
    text: {
        fontSize: 14,
        color: 'rgba(000, 000, 000, 0.4)',
    },
    errorStatusLoad: {
        marginTop: 5,
    },
    errorStatusLoadText: {
        color: '#1890ff',
    },
    errorStatusIconWrap: {
    },
    errorStatusIcon: {
        marginBottom: 10,
        fontSize: 32,
        color: 'rgba(000, 000, 000, 0.3)',
    },
});