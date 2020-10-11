import 'react-native-gesture-handler';
import React from 'react';
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
import Login from './components/login.js'
import Register from './components/Register.js'

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none'>
        <Stack.Screen name='login' component={Login}/>
        <Stack.Screen name='register' component={Register}/>
      </Stack.Navigator>
      {/* <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} 
        options={{title:'Dashboard'}}/>
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Groups" component={Group} />
      </Stack.Navigator> */}
    </NavigationContainer>
  );
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

export default App;
