import { StyleSheet, Dimensions, } from "react-native";
import {
    windowDevice,
    screen,
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
    },
    ReadingMainItemTitle: {
        textAlign: 'center',
        color: '#262626',
        paddingTop: 10,
        paddingBottom: 10,
    },
    ReadingMainItemcontent: {
        color: '#262626',
    },
    leftAndRightWap: {
        position: 'relative',
        flex: 1,
    },
    leftAndRightWapView: {
        position: 'absolute',
        width: screen.width,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: '#fff',
    },
    ReadingMainItemWrap: {
        width: screen.width - 32,
    },
    toolbar: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    toolbarBottom: {
        position: 'absolute',
        bottom: 0,
        left: 16,
    },
    toolbarLeft: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
    },
    toolbarRight: {
        display: 'flex',
        justifyContent: 'center',
    },
    toolbarText: {
        fontSize: 14,
        color: '#898989',
    },
});