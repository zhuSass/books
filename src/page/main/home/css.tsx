import {
      Dimensions,
  } from 'react-native';
import { StyleSheet, } from "react-native";

const {width,} = Dimensions.get('window');

const publicPaddingL = 10;
const publicPaddingR = 10;
const marginBottom = 4;

export default StyleSheet.create({
    main: {
    },
    mainBanner: {
        paddingLeft: publicPaddingL,
        paddingRight: publicPaddingR,
        backgroundColor: '#fff',
        paddingTop: 12,
        paddingBottom: 36,
        marginBottom: marginBottom,
    },
    bannerWrap: {
        flex: 1,
        height: 164,
    },
    imgCard: {
        height: 164,
        borderRadius: 5,
        width: width - 56,
        overflow: 'hidden',
        elevation: 12,  //  设置阴影角度，通过这个设置有无阴影（这个是最重要的，决定有没有阴影）
        shadowColor: 'black',  //  阴影颜色
        shadowOffset: { width: 0, height: 0 },  // 阴影偏移
        shadowOpacity: 1,  // 阴影不透明度
        shadowRadius: 5,  // 圆角
    },
    imgContainer: {
        width: width - 56,
        height: 164,
    },
    imgContainerMr: {
        marginRight: 16,
    },
    cardWrap: {
        paddingLeft: publicPaddingL,
        paddingRight: publicPaddingR,
        backgroundColor: '#fff',
        paddingTop: 17,
        paddingBottom: 20,
        marginBottom: marginBottom,
    },
    bananaCameraWrap: {
    },
    bananaCameraWrapHeader: {
        marginBottom: 17,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    bananaCameraWire: {
        marginRight: 4,
        width: 6,
        height: 20,
        backgroundColor: '#51CAF4',
    },
    bananaCameraTitle: {
        fontSize: 18,
        color: '#343434',
    },
    bananaCameraScroll: {
    },
    bananaCameraItem: {
        width: 146,
        marginBottom: 6,
        backgroundColor: '#fff',
        overflow: 'hidden',
        borderRadius: 6,
        elevation: 12,  //  设置阴影角度，通过这个设置有无阴影（这个是最重要的，决定有没有阴影）
        shadowColor: 'black',  //  阴影颜色
        shadowOffset: { width: 0, height: 0 },  // 阴影偏移
        shadowOpacity: 1,  // 阴影不透明度
        shadowRadius: 6,  // 圆角
    },
    bananaCameraCover: {
        height: 184,
        position: 'relative',
    },
    bananaCameraImg: {
        width: 146,
        height: 183,
    },
    bananaCameraCoverType: {
        position: 'absolute',
        top: 7,
        right: 7,
        borderRadius: 7,
        backgroundColor: '#F46B6B',
        paddingStart: 4,
        paddingEnd: 5,
        color: '#fff',
        fontSize: 10,
    },
    bananaCameraCoverLinke: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 20,
        backgroundColor: 'rgba(55,55,55,0.60)',
    },
    bananaCameraCoverLinkeText: {
        fontSize: 10,
        color: '#fff',
    },
    bananaCameraCoverInfo: {
        paddingTop: 14,
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
    },
    bananaCameraCoverTitle: {
        color: '#343434',
        fontSize: 16,
        lineHeight: 16 * 1.2,
    },
    bananaCameraCoverSubTitle: {
        fontSize: 12,
        color: '#999898',
    },
});