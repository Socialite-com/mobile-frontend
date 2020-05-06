/**
 * @format
 */

import React from 'react';
import App from './src/App';
import {Provider} from 'react-redux';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

import configureStore from './src/state/store';

const store = configureStore();

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
