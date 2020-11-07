import 'react-native-gesture-handler';
import React, {Component} from 'react';
/*import { StyleSheet, View, Alert } from 'react-native'
import { RNCamera } from 'react-native-camera'*/
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { DrawerActions, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();

function HomeStackScreen(){
  return (
    <HomeStack.Navigator headerMode='none'>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="CreateGroup" component={CreateGroup} />
    </HomeStack.Navigator>
  );
}

const GroupStack = createStackNavigator();

function GroupStackScreen(){
  return (
    <GroupStack.Navigator headerMode='none'>
      <GroupStack.Screen name="Groups" component={Group} />
      <GroupStack.Screen name="IndividualGroup" component={IndividualGroup} />
      <GroupStack.Screen name="IndividualGroupSettings" component={IndividualGroupSettings} />
      <GroupStack.Screen name="GroupPayment" component={GroupPayment} />
    </GroupStack.Navigator>
  );
}

class App extends Component {
  render(){
    return (
        <NavigationContainer>
          {this.props.loginState.loggedin ? (

            <Tab.Navigator initialRouteName={HomeScreen}
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Profile') {
                  iconName = focused ? 'person' : 'person-outline';
                }
                else if (route.name === 'Groups') {
                  iconName = focused ? 'people' : 'people-outline';
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'gray',
            }}>
              <Tab.Screen name="Home" component={HomeStackScreen} />
              <Tab.Screen name="Profile" component={Profile} />
              <Tab.Screen name="Groups" component={GroupStackScreen} />
            </Tab.Navigator>

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