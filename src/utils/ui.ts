import { 
    ToastAndroid,
 } from "react-native";

export default {

    toast(
        title:string, 
        time:number = ToastAndroid.LONG, 
        direction:number = ToastAndroid.BOTTOM, 
        offX:number = 25, 
        offY:number = 200,
        ) {
            ToastAndroid.showWithGravityAndOffset(
                title, 
                time, 
                direction,
                offX,
                offY,
                );
    }
};
