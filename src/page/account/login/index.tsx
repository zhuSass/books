import React from "react";
import { 
    View, 
    Text,
    ImageBackground,
 } from "react-native";
// import Icon from 'react-native-vector-icons/FontAwesome';

import style from './css'

export default class Index extends React.Component {
    static navigationOptions = {
        title: 'Please sign in',
      };
    render() {
        return <View style={style.loginWrap}>
                <ImageBackground 
                source={require('./../../../static/images/login_bg.jpg')}
                style={style.loginWrapBg}
                />
              {/* <Icon.Button name="facebook" backgroundColor="#3b5998">
                <Text style={{ fontFamily: 'Arial', fontSize: 15 }}>
                Login with Facebook
                </Text>
              </Icon.Button> */}
        </View> 

    }
}