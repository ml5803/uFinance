/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TouchableOpacity,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import styles from './styles/styles.js'


const HomeScreen = ({navigation}) =>{
  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        style={styles.btn}
      >
        <Text>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Groups')}
        style={styles.btn}
      >
        <Text>Groups</Text>
      </TouchableOpacity>

    </View>
  )
}
function Profile({navigation}) {
  return (
    <View style={styles.btnContainer}>
      <Text>Profile</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.btn}>
          <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btn}>
          <Text>Prev</Text>
      </TouchableOpacity>
    </View>
  );
}
function Group({navigation}) {
  return (
    <View style={styles.btnContainer}>
      <Text>Profile</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()} >
          <Text>Prev</Text>
      </TouchableOpacity>
    </View>
  );
}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} 
        options={{title:'Dashboard'}}/>
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Groups" component={Group} />
      </Stack.Navigator>
      {/* <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Details" component={DetailsScreen} />
      </Drawer.Navigator> */}
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
