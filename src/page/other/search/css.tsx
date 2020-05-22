import { StyleSheet, Dimensions, } from "react-native";

const {height} =  Dimensions.get('window');

export default StyleSheet.create({
    index: {
        flex: 1,
        backgroundColor: '#fff',
    },
    indexWrap: {
        display: 'flex',
        flex: 1,
    },
    header: {
        backgroundColor: '#fff',
    },
    headerSearch: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
    },
    headerInput: {
        position: 'relative',
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#f6f7f9',
        paddingLeft: 32,
        paddingRight: 10,
        borderWidth: 2,
        borderColor: '#f6f7f9',
    },
    headerInputFocus: {
        borderColor: 'rgb(229, 151, 0)',
        borderWidth: 2,
    },
    headerInputIcon: {
        position: 'absolute',
        top: 0,
        left: 10,
        width: 22,
        height: 32,
        lineHeight: 32,
        fontSize: 22,
        color: '#969ba3',
        zIndex: 99,
    },
    headerInputClearIcon: {
        position: 'relative',
        top: 4,
        fontSize: 22,
        color: '#969ba3',
    },
    headerInputTargetView: {
        flex: 1,
        height: 32,
    },
    headerInputTarget: {
        height: 36,
        color: '#000',
        fontSize: 14,
    },
    headerCancel: {
        display: 'flex',
        alignContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 14,
        color: '#000',
    },
    keyWordRecommend: {

    },
    keyWordRecommendTitle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.03)',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
    },
    keyWordRecommendTitleContent: {
        fontSize: 13,
        color: '#969ba3',
    },
    keyWordRecommendTitleClear: {
        display: 'flex',
        flexDirection: 'row',
    },
    keyWordRecommendTitleClearText: {
        marginLeft: 5,
        fontSize: 13,
        color: 'rgb(51, 55, 61)',
    },
    keyWordRecommendTitleClearIcon: {
        fontSize: 16,
        color: 'rgb(51, 55, 61)',
    },
    keyWordRecommendContent: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 10,
    },
    keyWordRecommendContentText: {
        paddingLeft: 10,
        paddingRight: 10,
        marginRight: 8,
        marginBottom: 8,
        height: 27,
        lineHeight: 27,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        borderColor: 'rgb(150, 155, 163)',
        borderWidth: 1,
        borderRadius: 99,
        fontSize: 13,
        color: '#969ba3',
    },
    keyWordRecommendContentNoData: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        paddingTop: 20,
        paddingBottom: 20,
    },
    noDataText: {
        fontSize: 13,
        color: '#969ba3',
    },
    resultListWrap: {
        flex: 1,
    },
    bananaCameraScroll: {
        flex: 1,
        paddingLeft: 16,
        paddingRight: 16,
    },
    bananaCameraItem: {
        width: 160,
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
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
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
    imgContainerMr: {
        marginRight: 16,
    },
});