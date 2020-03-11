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

import MinRouter from './router';

const AppContainer = function() {
  return (
    <NavigationContainer>
      <MinRouter/>
    </NavigationContainer>
  )
};

export default AppContainer;
