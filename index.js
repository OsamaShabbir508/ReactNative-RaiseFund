// 
/**
 * @format
 */
 import 'react-native-gesture-handler';
 import {AppRegistry} from 'react-native';
 import React from 'react';
 import App from './App';
 import {name as appName} from './app.json';
 import {View, Text} from 'react-native';
 import {Provider} from 'react-redux';
 import {store,persistor} from './src/redux/reducer';
 import { PersistGate } from 'redux-persist/integration/react'
 
 const MainApp = () => {
   return (
     <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
       <App />
       </PersistGate>
     </Provider>
   );
 };
 
 AppRegistry.registerComponent(appName, () => MainApp);
 