import React, { ReactNode, useContext,
    useRef,
} from 'react';
import { 
   View, Text,     
   TouchableWithoutFeedback,
   GestureResponderEvent,
   StyleProp,
   ViewStyle,
} from 'react-native';


export type propsType = {
   children: JSX.Element[] | JSX.Element, 
   onPress?: ((event: GestureResponderEvent) => void) | undefined,
   style?: StyleProp<ViewStyle>
}

export default function TouchView(props: propsType) {

   return <TouchableWithoutFeedback onPress={props.onPress}>
       <View {...props.style}>
           {props.children}
       </View>
   </TouchableWithoutFeedback>
};
