import { StyleSheet, 
    TextStyle, 
    TouchableWithoutFeedback,
    GestureResponderEvent,
 } from "react-native";
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import React from "react";

type IconListFace = {
    Entypo: typeof Entypo,
    MaterialCommunityIcons: typeof MaterialCommunityIcons,
    AntDesign: typeof AntDesign,
    EvilIcons: typeof EvilIcons,
    FontAwesome5: typeof FontAwesome5,
};
const IconList:IconListFace = {
    Entypo: Entypo,
    MaterialCommunityIcons: MaterialCommunityIcons,
    AntDesign: AntDesign,
    EvilIcons: EvilIcons,
    FontAwesome5: FontAwesome5,
}

export const tabBarIcon = (
        name: string, 
        fontFileName: (keyof typeof IconList),
        styles?: TextStyle,
    ) => ({ tintColor }: { tintColor: string }) => {
    const Icon = IconList[fontFileName];

    return <Icon style={styles && styles} name={name} color={tintColor} size={24} />
};

type iconProps = {
    fontFileName: (keyof typeof IconList),
    name: string,
    styles?: TextStyle,
    color?: string,
    size?: number,
    onPress?: (event: GestureResponderEvent) => void,
    [key: string]: any,
}
export function IconBtn (props: iconProps) {
    const Icon = IconList[props.fontFileName];

    const params = {
        size: 90,
        ...props,
    }

    return <TouchableWithoutFeedback style={{display: 'flex'}} onPress={()=>props.onPress}>
        <Icon {...props} />
    </TouchableWithoutFeedback>
}
export default function Icon (props: iconProps) {
    const Icon = IconList[props.fontFileName];

    const params = {
        size: 90,
        ...props,
    }

    return <Icon {...props} />
}



