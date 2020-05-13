import { 
    ToastAndroid,
 } from "react-native";
 import asyncStorage from '@react-native-community/async-storage';

type ConstKey = 'SHORT' | 'LONG' | 'TOP' | 'BOTTOM' | 'CENTER'
type ParamsType = {
    title:string, 
    time?:number, 
    directions?:ConstKey, 
    direction?:number,
    offX?:number, 
    offY?:number,
}
export function Toast(params: ParamsType) {
    if (params.directions) {
        params.direction = ToastAndroid[params.directions];
    }
    
    const defaultParams = {
        title: '', 
        time: ToastAndroid.LONG, 
        direction: ToastAndroid.BOTTOM, 
        offX: 25, 
        offY: 200,
    }
    const merge = Object.assign({}, defaultParams, params);
    ToastAndroid.showWithGravityAndOffset(
        merge.title, 
        merge.time, 
        merge.direction, 
        merge.offY, 
        merge.offY,
    );
}
export const AsyncStorage = asyncStorage;

