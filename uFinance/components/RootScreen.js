import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './login.js'

const stack = createStackNavigator();

const RootScreen = () => {
  return (
    <stack.Navigator headerMode='None'>
        <stack.screen name='login' component={Login}/>
        <stack.screen name='register' component={Login}/>
    </stack.Navigator>
  );
};

export default RootScreen;