import { StyleSheet, } from "react-native";

export default StyleSheet.create({
    homeWrap: {
        position: 'relative',
    },
    bgColorContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
    },
    bgColorContainerTop: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 142,
        resizeMode: 'stretch',
    },
    bgColorContainerBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 142,
        resizeMode: 'stretch',
    },
    bgColorContainerMain: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
    },
    readingMainContainer: {
        paddingTop: 10,
    },
    headerRight: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconMore: {
        position: 'relative',
    },
    iconMoreIcon: {
        fontSize: 20,
        color: '#4D4D4D',
    },
    leaveMessage: {
        position: 'relative',
        marginRight: 30,
    },
    leaveMessageNum: {
        position: 'absolute',
        right: -13,
        top: -8,
        fontSize: 9,
        color: '#7B7B7B',
        textAlign: 'right',
    },
    leaveMessageIcon: {
        fontSize: 20,
        color: '#4D4D4D',
    },
    ReadingMainItem: {
        paddingLeft: 16,
        paddingRight: 16,
    },
    ReadingMainItemTitle: {
        textAlign: 'center',
        color: '#262626',
        fontSize: 27,
        marginTop: 27,
        marginBottom: 27,
        fontWeight: '400',
    },
    ReadingMainItemcontent: {
        fontSize: 18,
        lineHeight: 32.4,
        color: '#262626',
    },
});