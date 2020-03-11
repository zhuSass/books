/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Config from "react-native-config";

import MinRouter from './router';
import '@/config/index';

const AppContainer = function() {
  console.log('6---------', Config.API_URL);

  return (
    <NavigationContainer>
      <MinRouter/>
    </NavigationContainer>
  )
};

export default AppContainer;
