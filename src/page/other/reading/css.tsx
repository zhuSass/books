import { StyleSheet, Dimensions, } from "react-native";
import {
    windowDevice,
    screen,
} from '@/utils/index';
import { readonly } from "@nozbe/watermelondb/decorators";

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
        right: 0,
        bottom: 0,
        zIndex: -1,
    },
    bgColorContainerWhite: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
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
        zIndex: 2,
        backgroundColor: '#fff',
    },
    ReadingMainItemWrap: {
        width: screen.width - 32,
    },
    toolbar: {
        width: width,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 2,
        overflow: 'hidden',
    },
    toolbarTop: {
        paddingLeft: 16,
        paddingRight: 16,
        position: 'absolute',
        top: 0,
    },
    toolbarBottom: {
        paddingLeft: 16,
        paddingRight: 16,
        position: 'absolute',
        bottom: 0,
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
    clickCenterWrap: {
        position: 'absolute',
        width: width,
        height: screen.height,
        zIndex: 3,
    },
    clickCenterPublic: {
        position: 'absolute',
        zIndex: 2,
        left: 0,
        width: width,
    },
    clickCenterHeader: {
        top: 0,
    }, 
    clickCenterBottom: {
        bottom: 0,
    },
    clickCenterBottomContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 30,
        paddingBottom: 30,
        backgroundColor: '#fff',
    },
    clickCenterBottomItem: {
        marginRight: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomItemText: {

    },
    bottomItemIcon: {
        marginBottom: 5,
    },
});