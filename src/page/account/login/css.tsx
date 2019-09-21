import { StyleSheet, } from "react-native";
import { arrowFunctionExpression } from "@babel/types";

export default StyleSheet.create({
    loginWrap: {
        position: 'relative',
        display: 'flex',
        flex: 1,
        alignItems: 'center',
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        color: '#4EC2EE',
        paddingTop: 48,
    },
    logoIcon: {
        marginTop: -9,
        fontSize: 80,
        color: '#4EC2EE',
    },
    logoTitle: {
        fontFamily: 'Arial',
        fontSize: 18,
        color: '#4EC2EE',
        fontWeight: 'bold',
    },
    toggleBar: {
        position: 'relative',
        paddingTop: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    toggleBarItem: {

    },
    toggleBarItemText: {
        fontSize: 26,
        color: '#999999',
    },
    toggleBarItemTextAction: {
        color: '#434343',
    },
    toggleBarItemActionStatus: {
        marginLeft: 10,
        marginRight: 10,
        height: 4,
        marginTop: 2,
        backgroundColor: '#434343',
    },
    toggleBarItemTextMr: {
        marginRight: 94,
    },
    toggleMain: {
        marginTop: 36,
        alignItems: 'center',
    },
    toggleMainItem: {
        marginBottom: 18,
        width: 272,
    },
    toggleMainItemLabel: {
        fontSize: 16,
        color: '#999999',
    },
    toggleMainItemCenter: {
        height: 42,
        borderBottomColor: '#CDCDCD',
        fontSize: 16,
        color: '#4E4E4E',
        borderBottomWidth: 2,
    },
    toggleMainItemCenterAction: {
        borderBottomColor: '#000',
    },
});