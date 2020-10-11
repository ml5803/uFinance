import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { TextInput } from 'react-native-gesture-handler';

const { width: WIDTH } = Dimensions.get('window')

class Login extends Component {
  render(){
    return (
      <View style={styles.container}>
          <View style={styles.logo}>
              <Text style={styles.logoText}>uFinance</Text>
          </View>
          <View style={styles.form}>
              <View>  
                  <TextInput
                      style={styles.input}
                      placeholder='Email'
                      // remove underline when typing
                      underlineColorAndroid='transparent'
                  />
                  <TextInput
                      style={styles.input}
                      placeholder='Password'
                      underlineColorAndroid='transparent'
                  />
                  <View style={styles.buttonArea}>
                      <TouchableOpacity style={styles.Loginbtn}>
                          <Text style={styles.btntext}>Login</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.btn}
                      onPress={() => this.props.navigation.navigate('register')}>
                          <Text style={styles.btntext}>Sign Up</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.btn}>
                          <Text style={styles.btntext}>Forgot password</Text>
                      </TouchableOpacity>
                  </View>
                  
              </View> 
          </View>
      </View>
    );
  }
  
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  // contains everything
  container: {
    flex: 1,
    backgroundColor: '#0057d4',
  },
  // 1/3 of container 
  logo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText:{
    fontSize: 50,
    color: 'white',
  },  
  // 2/3 of container 
  form: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  input: {
    width: WIDTH-55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    backgroundColor: 'white',
    color: 'black',
    paddingLeft: 45, // text in input move left
    marginHorizontal: 25,
    marginTop: 10,
  },
  buttonArea: {
    marginTop: 20,
  },
  Loginbtn: {
    width: WIDTH-55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    backgroundColor: '#003366',
    color: 'black',
    marginTop: 5,
    marginHorizontal: 25,
    justifyContent: 'center',
  },
  btntext: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
  },
  btn: {
    width: WIDTH-55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    backgroundColor: '#0057d4',
    color: 'black',
    marginTop: 5,
    marginHorizontal: 25,
    justifyContent: 'center',
  },
});

export default Login;