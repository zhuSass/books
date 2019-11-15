/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import { 
  createAppContainer, 
} from "react-navigation";

import Router from './router';
import '@/config/index';

const AppContainer = createAppContainer(Router);

export default AppContainer;
