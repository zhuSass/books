import { StyleSheet, TextStyle, } from "react-native";
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React from "react";

type IconListFace = {
    Entypo: typeof Entypo,
    MaterialCommunityIcons: typeof MaterialCommunityIcons,
    AntDesign: typeof AntDesign,
};
const IconList:IconListFace = {
    Entypo: Entypo,
    MaterialCommunityIcons: MaterialCommunityIcons,
    AntDesign: AntDesign,
}

export const tabBarIcon = (
        name: string, 
        fontFileName: (keyof typeof IconList),
        styles?: TextStyle,
    ) => ({ tintColor }: { tintColor: string }) => {
    const Icon = IconList[fontFileName];

    return <Icon style={styles && styles} name={name} color={tintColor} size={24} />
};

StyleSheet.create({
    headerLeft: {

    },
});
export default function Icon (props: {
    fontFileName: (keyof typeof IconList),
    name: string,
    styles?: TextStyle,
    color?: string,
    size?: number,
    [key: string]: any,
}) {
    const Icon = IconList[props.fontFileName];

    const params = {
        size: 90,
        ...props,
    }

    return <Icon {...props} />
}

