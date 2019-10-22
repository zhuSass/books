import React, { useState } from "react";
import { 
    View, 
    Text,
    TextInput,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Button,
    Alert,
 } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Loading from 'react-native-loading-spinner-overlay';

import style from './css'


// public interface
interface userInfoFace {
  name?: string,
  password?: string,
}
interface focusStatusFace {
  name?: boolean,
  password?: boolean,
}

export default function Index(props:any) {
    // 用户信息
    const [userInfo, setUserInfo] = useState({
      name: '',
      password: '',
    });
    // 切换主体类型，login登录，signIn 注册
    const [toggleActionType, setToggleActionType] = useState('login');
    // 输入框聚焦样式状态显示
    const [focusStatus, setFocusStatus] = useState({
      name: false,
      password: false,
    });

    const handleToggleType = (type:string):void => {
      if (type !== toggleActionType) {
        setUserInfo({
          name: '',
          password: '',
        });
      } else return;
      setToggleActionType(type);
    }
    // 获取是否是选中状态
    const getIsActionType = (type:string):boolean => 
    (toggleActionType === type);
    // 用户信息单个改变
    const changeUserInfoItem = (obj:userInfoFace):void => {
      setUserInfo(Object.assign({}, userInfo, obj));
    }
    // 输入框聚焦样式状态单个改变
    const changeFocusStatus = (obj:focusStatusFace):void => {
      setFocusStatus(Object.assign({}, focusStatus, obj));
    }
    // handle form submit
    const submitForm = ():void => {
      console.log('3------', userInfo)
    }

    return (<View style={style.loginWrap}>
                <KeyboardAvoidingView behavior="position" enabled>
                  <View style={style.logo}>
                    <Text style={style.logoTitle}>iBook</Text> 
                    <Icon name="book-open" style={style.logoIcon}/>
                  </View>
                  {/* toggle头部切换 */}
                  <View style={style.toggleBar}>
                    <TouchableWithoutFeedback onPress={()=>handleToggleType('login')}>
                      <View style={[style.toggleBarItem, style.toggleBarItemTextMr,]}>
                          <Text style={[
                            style.toggleBarItemText,
                            getIsActionType('login') &&
                            style.toggleBarItemTextAction,
                          ]}>登录</Text>
                          {getIsActionType('login')
                          &&<View style={style.toggleBarItemActionStatus}></View>}
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>handleToggleType('signIn')}>
                      <View style={style.toggleBarItem}>
                        <Text style={[
                          style.toggleBarItemText,
                          getIsActionType('signIn') &&
                          style.toggleBarItemTextAction,
                          ]}>注册</Text>
                        {getIsActionType('signIn')
                          &&<View style={style.toggleBarItemActionStatus}></View>}
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                  {/* toggle切换内容主体 */}
                  <View style={style.toggleMain}>
                      <View style={style.toggleMainItem}>
                        <Text style={style.toggleMainItemLabel}>{
                          getIsActionType('login')?'用户名':'邮箱'
                        }</Text>
                        <TextInput 
                          style={[
                            style.toggleMainItemCenter,
                            focusStatus.name && style.toggleMainItemCenterAction,
                          ]}
                          placeholder={`请输入${getIsActionType('login')?'用户名':'邮箱'}`}
                          onChangeText={(name) => changeUserInfoItem({name})}
                          onFocus={() => changeFocusStatus({name: true})}
                          onBlur={() => changeFocusStatus({name: false})}
                          value={userInfo.name}
                        />
                      </View>
                      <View style={style.toggleMainItem}>
                        <Text style={style.toggleMainItemLabel}>密码</Text>
                        <TextInput 
                          style={[
                            style.toggleMainItemCenter,
                            focusStatus.password && style.toggleMainItemCenterAction,
                          ]}
                          placeholder="请输入密码"
                          secureTextEntry={true}
                          onChangeText={(password) => changeUserInfoItem({password})}
                          onFocus={() => changeFocusStatus({password: true})}
                          onBlur={() => changeFocusStatus({password: false})}
                          value={userInfo.password}
                        />
                      </View>
                  </View>
                  {/* submit button */}
                  <TouchableWithoutFeedback onPress={submitForm}>
                    <View style={style.submit}>
                      <Text style={style.submitText}>登录</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
        </View>)
}