import { StyleSheet, } from "react-native";

export default StyleSheet.create({
    header: {
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#fff',
    },
    headerNavigation: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerLfet: {
        position: 'absolute',
        left: 0,
        lineHeight: 44,
    },
    headerText: {
        fontSize: 20,
        color: '#343434',
    },
    headerCenter: {
    },
    headerRight: {
        position: 'absolute',
        right: 0,
        lineHeight: 44,
    },
    headerFun: {
        paddingBottom: 12,
    },
    headerSearch: {
        height: 30,
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 62,
        alignItems: 'center',
        borderRadius: 18,
        backgroundColor: 'rgba(142, 142, 147, 0.12)',
    },
    headerSearchFont: {
        color: '#C0C0C2',
        fontSize: 12,
    },
    headerSearchIcon: {
        fontSize: 18,
    },
    headerSearchText: {
        marginLeft: 5,
    },
});