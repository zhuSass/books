/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React, {
  useEffect,
} from 'react';
import 'react-native-gesture-handler';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider'
import { Alert } from 'react-native';
import {database} from '@/db/index';

import MinRouter from './router';

const AppContainer = function() {
  useEffect(() => {

  }, []);

  return (<DatabaseProvider database={database}>
    <>
        <StatusBar translucent 
          barStyle="light-content"
          backgroundColor="rgba(0, 0, 0, 0)"/>
        <SafeAreaView style={{flex: 1, }}> 
          <NavigationContainer>
            <MinRouter/>
          </NavigationContainer>
        </SafeAreaView>
    </>
    </DatabaseProvider>
  )
};

export default AppContainer;
