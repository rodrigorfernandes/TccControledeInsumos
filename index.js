/**
 * @format
 */

import React from 'react';
import { Provider } from 'react-redux';
import {AppRegistry, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AuthProvider from './src/contexts/auth';

import {name as appName} from './app.json';

import storeConfig from './src/store/storeConfig';
import Routes from './src/routes/'
import axios from 'axios';
console.disableYellowBox = true;

axios.defaults.baseURL = 'https://tcc-de-controle-de-obra.firebaseio.com/'


const store = storeConfig()

const Redux = () => (
    <NavigationContainer>
    <Provider store={store}>
        <AuthProvider>
        <StatusBar backgroundColor="#131313" barStyle="light-content"/>
        <Routes />
        </AuthProvider>
    </Provider>
    </NavigationContainer>
)

AppRegistry.registerComponent(appName, () => Redux)