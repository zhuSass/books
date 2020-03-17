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
        overflow: 'hidden',
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
        overflow: 'hidden',
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
        shadowOffset: { width: 0, height: 0, },  // 阴影偏移
        shadowOpacity: 1,  // 阴影不透明度
        shadowRadius: 6,  // 圆角
    },
    bananaCameraCover: {
        height: 184,
        position: 'relative',
    },
    bananaCameraContainer: {
        paddingTop: 18, 
        backgroundColor: 'rgba(000,000,000,0)',
    },
    bananaCameraImg: {
        width: '100%',
        height: '100%',
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
        paddingBottom: 16,
        paddingLeft: 10,
        paddingRight: 10,
    },
    bananaCameraCoverTitle: {
        textAlign: 'center',
        color: '#343434',
        fontSize: 16,
        lineHeight: 16 * 1.2,
    },
    bananaCameraCoverSubTitle: {
        fontSize: 12,
        color: '#999898',
        textAlign: 'center',
        lineHeight: 16 * 1.2,
    },
    bananaCameraItemContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bananaCameraCoverOne: {
        width: 84,
        height: 118,
        position: 'relative',
        marginTop: -18,

    },
    bananaCameraItemOne: {
        overflow: 'visible',
    },
    bananaCameraCoverTypeOne: {
        top: 'auto',
        bottom: 0,
        right: 'auto',
        left: '50%',
        paddingEnd: 6,
        paddingStart: 6,
        overflow: 'hidden',
        backgroundColor: '#F2E58C',
    },
    bananaCameraCoverBtn: {
        marginBottom: 18,
        display: 'flex',
        backgroundColor: '#4EC2EE',
        borderRadius: 13,
    },
    bananaCameraCoverBtnText: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 4,
        paddingBottom: 4,
        color: '#FFFFFF',
        fontSize: 12,
    },
    articleMainImg: {
        height: 150,
        width: '100%',
        minHeight: 60,
        marginBottom: 14,
        backgroundColor: '#666',
    },
    articleFocus: {
        display: 'flex',
        width: 'auto',
        height: 'auto',
        paddingTop: 2,
        paddingBottom: 2,
        borderColor: '#4DBFEC',
        borderWidth: 1,
        borderRadius: 12,
    },
    articleFocusText: {
        color: '#4DBFEC',
        fontSize: 14,
    },
    articleMainTitle: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 10,
    },
    articleMainTitleTarget: {
        fontSize: 18,
        color: '#343434',
    },
    articleMainSubTitle: {
    },
    articleMainSubTitleTarget: {
        fontSize: 14,
        color: '#999999',
    },
    articleMainIcon: {
        display: 'flex',
        justifyContent: 'flex-start',
    },
    articleMainIconCenter: {
        display: 'flex',
        paddingLeft: 0,
        paddingRight: 0,
        justifyContent: 'center',
    },
    articleMainIconInfo: {
        paddingLeft: 10,
        paddingRight: 0,
        width: 'auto',
    },
});