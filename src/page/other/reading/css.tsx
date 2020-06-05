import { StyleSheet, Dimensions, } from "react-native";
import {
    windowDevice,
} from '@/utils/index';

const {height, width} =  windowDevice;

export default StyleSheet.create({
    homeWrap: {
        position: 'relative',
        flex: 1,
    },
    bgColorContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: height + 20,
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
        flex: 1,
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
        // backgroundColor: 'red',
        // marginBottom: 5,
    },
    ReadingMainItemTitle: {
        textAlign: 'center',
        color: '#262626',
        fontSize: 20,
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    ReadingMainItemcontent: {
        fontSize: 18,
        color: '#262626',
        backgroundColor: 'red',
    },
    leftAndRightWap: {
        position: 'relative',
    },
    leftAndRightWapView: {
        position: 'absolute',
        width: width,
        height: height,
        backgroundColor: '#fff',
    },
    ReadingMainItemWrap: {
        width: width - 32,
        height: height,
    },
});