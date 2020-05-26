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

import Realms from '@/db/index';
import MinRouter from './router';

const AppContainer = function() {

  useEffect(() => {
    Realms.db.write(() => {
      const myCar = Realms.db.create('Dog', {name: 'Rex'});
    });
    const Dog = Realms.db.objects<{name: string}>('Dog');
    for (let p of Dog) {
      console.log(`  ${p.name}`);
  }
    return () => {
      Realms.close();
    };
  }, []);

  return (<>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{flex: 1, }}> 
              <NavigationContainer>
                <MinRouter/>
              </NavigationContainer>
            </SafeAreaView>
    </>
  )
};

export default AppContainer;
