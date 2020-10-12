import React, {Component} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './login.js'

const stack = createStackNavigator();

class RootScreen extends Component {
  constructor(){
    super()
  }
  render(){
    return (
      <stack.Navigator headerMode='None'>
          <stack.screen name='login' component={Login}/>
          <stack.screen name='register' component={Login}/>
      </stack.Navigator>
    );
  }
  
};

export default RootScreen;