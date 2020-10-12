import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './components/Home.js'
import Profile from './components/Profile.js'
import Group from './components/Groups.js'
import CreateGroup from './components/CreateGroup.js'
import IndividualGroup from './components/IndividualGroup.js'
import IndividualGroupSettings from './components/IndividualGroupSettings.js'
import GroupPayment from './components/GroupPayment.js'
import Login from './components/login.js'
import Register from './components/Register.js'
import { connect } from 'react-redux';
import { changeLogged } from './store/actions/logged.js';
import { bindActionCreators } from 'redux';

const Stack = createStackNavigator();

class App extends Component {
  // constructor(){
  //   super()
  //   this.state={
  //     loggedin: false,
  //   }
  // }

  render(){
    // let { loginState, actions } = this.props;
    // console.log('loggedin:',this.props.loginState.loggedin)
    // console.log(this.props.loggedin)

    return (
        <NavigationContainer>
          {this.props.loginState.loggedin ? (
            <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen} 
              options={{title:'Dashboard'}}/>
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="Groups" component={Group} />
              <Stack.Screen name="CreateGroup" component={CreateGroup} />
              <Stack.Screen name="IndividualGroup" component={IndividualGroup} />
              <Stack.Screen name="IndividualGroupSettings" component={IndividualGroupSettings} />
              <Stack.Screen name="GroupPayment" component={GroupPayment} />


            </Stack.Navigator>
          ) :
          (
            <Stack.Navigator headerMode='none'>
              <Stack.Screen name='login' component={Login}/>
              <Stack.Screen name='register' component={Register}/>
            </Stack.Navigator>
          )}
        </NavigationContainer>
      );
  }
  
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  btnContainer:{
    flex: 1,
    justifyContent:"center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  btn:{
    backgroundColor: '#DDDDDD',
    alignItems: 'center',
    padding: 10,
    margin: 5,
  },
});

const mapStateToProps = state => ({
  loginState: state.loggedin,
});

// export default App;
export default connect(mapStateToProps)(App);
