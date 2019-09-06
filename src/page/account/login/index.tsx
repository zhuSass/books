import React from "react";
import { 
    View, 
    Text,
    TextInput,
    TouchableWithoutFeedback,
 } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

import style from './css'

export default class Index extends React.Component {
    state = {
      name: '',
      password: '',
      toggleActionType: 'login', // 切换选中的类型，login登录，signIn 注册
    }
    handleToggleType(type: string):void {
      if (type !== this.state.toggleActionType) {
        this.setState({
          name: '',
          password: '',
        });
      }
      this.setState({
        toggleActionType: type,
      });
    }
    // 获取是否是选中状态
    getIsActionType(type: string):boolean {
      return this.state.toggleActionType === type;
    }
    render() {
        let {
          name,
          password,
        } = this.state;

        return <View style={style.loginWrap}>
            <View style={style.logo}>
              <Text style={style.logoTitle}>iBook</Text> 
              <Icon name="book-open" style={style.logoIcon}>
              </Icon>
            </View>
            {/* 导航切换栏 */}
            <View style={style.toggleBar}>
              <TouchableWithoutFeedback onPress={()=>this.handleToggleType('login')}>
                <View style={[style.toggleBarItem, style.toggleBarItemTextMr,]}>
                    <Text style={[
                      style.toggleBarItemText,
                      this.getIsActionType('login') &&
                      style.toggleBarItemTextAction,
                    ]}>登录</Text>
                    {this.getIsActionType('login')
                    &&<View style={style.toggleBarItemActionStatus}></View>}
                  </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={()=>this.handleToggleType('signIn')}>
                <View style={style.toggleBarItem}>
                  <Text style={[
                    style.toggleBarItemText,
                    this.getIsActionType('signIn') &&
                    style.toggleBarItemTextAction,
                    ]}>注册</Text>
                  {this.getIsActionType('signIn')
                    &&<View style={style.toggleBarItemActionStatus}></View>}
                </View>
              </TouchableWithoutFeedback>
            </View>
            {/* 导航切换内容主体 */}
            <View style={style.toggleMain}>
                <View style={style.toggleMainItem}>
                  <Text style={style.toggleMainItemLabel}>{
                    this.getIsActionType('login')?'用户名':'邮箱'
                  }</Text>
                  <TextInput 
                    style={style.toggleMainItemCenter}
                    placeholder={`请输入${this.getIsActionType('login')?'用户名':'邮箱'}`}
                    onChangeText={(name) => this.setState({name})}
                    value={name}
                  />
                </View>
                <View style={style.toggleMainItem}>
                  <Text style={style.toggleMainItemLabel}>密码</Text>
                  <TextInput 
                    style={style.toggleMainItemCenter}
                    placeholder="请输入密码"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password})}
                    value={password}
                  />
                </View>
            </View>
        </View> 

    }
}