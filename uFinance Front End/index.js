/**
 * @format
 */
import {AppRegistry} from 'react-native';
import React from 'react';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import configureStore from './store.js';
import { createStore } from 'redux';
import loggedReducer from './store/reducers/loggedReducer.js'

const store = configureStore()
// const store = createStore(loggedReducer);

const RNRedux = () => (
  <Provider store = { store }>
    <App />
  </Provider>
)

// AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(appName, () => RNRedux);
