import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { changeLogged } from '../store/actions/logged.js';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Api from '../API.js'

const { width: WIDTH } = Dimensions.get('window')

class Login extends Component {
  constructor() {
    super()
    this.state = {
      text: 'nothing',
      dataSource: false,
      isLoading: false,
      username: '',
      password: '',
      errorMsg: '',
    }
  }

  // refresh page every time we are on this component 
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setState({ errorMsg: '' })
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  updateLogged() {
    let obj = {
      username: this.state.username,
      password: this.state.password,
    }
    Api.post('login', obj).then(resp => {
      console.log('resp:', resp)
      if (resp['login_status']) {
        this.props.changeLogged(true, resp['user_id'])
      }
      else {
        this.setState({ errorMsg: 'Invalid email/password' })
      }
    })
  }

  navigateToSignUp(username, password) {
    username.current.clear();
    password.current.clear();
    this.props.navigation.navigate('register')
  }

  render() {
    // let { loginState, actions } = this.props;
    const username = React.createRef();
    const password = React.createRef();
    let errorMsg = this.state.errorMsg
    return (
      <ScrollView style={styles.container}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>uFinance</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              ref={username}
              placeholder='username'
              underlineColorAndroid='transparent'
              onChangeText={text => this.setState({ username: text })}
            />
            <Icon name="ios-person-outline" style={styles.inputIcon} size={30} color="#4F8EF7" />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              ref={password}
              placeholder='Password'
              underlineColorAndroid='transparent'
              secureTextEntry={true}
              onChangeText={text => this.setState({ password: text })}
            />
            <Icon name="ios-lock-closed-outline" style={styles.inputIcon} size={30} color="#4F8EF7" />
          </View>

          <View style={styles.buttonArea}>
            {errorMsg !== '' ?
              <Text style={{ color: '#F08080' }}>{errorMsg}</Text>
              :
              <Text></Text>
            }
            <TouchableOpacity style={styles.Loginbtn}
              onPress={() => this.updateLogged()}>
              <Text style={styles.btntext}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}
              onPress={() => this.navigateToSignUp(username, password)}>
              <Text style={styles.btntext}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          {/* <Text>{this.state.text}</Text>
                <Text>{this.state.dataSource ? 'true' : 'false'}</Text> */}
        </View>
      </ScrollView>
    );
  }

};

const styles = StyleSheet.create({
  // scrollView: {
  //   backgroundColor: Colors.lighter,
  // },
  // contains everything
  container: {
    backgroundColor: '#0057d4',
  },
  logo: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 50,
    color: 'white',
  },
  // 2/3 of container 
  form: {
    // justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  inputContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'pink',
  },
  input: {
    position: 'relative',
    // zIndex: -1,
    width: 350,
    height: 50,
    borderRadius: 25,
    fontSize: 16,
    backgroundColor: 'white',
    color: 'black',
    paddingLeft: 45, // text in input move left
    // marginHorizontal: 25,
    marginTop: 10,
  },
  inputIcon: {
    position: 'absolute',
    // width: WIDTH-55,
    height: '100%',
    top: 20,
    right: 310,
    // backgroundColor: 'red',
  },
  buttonArea: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  Loginbtn: {
    width: 350,
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
    width: 350,
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

// redux
const mapStateToProps = state => ({
  loginState: state.loggedin,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    changeLogged,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
// export default Login;