import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

class RegisterPage2 extends Component{
    render(){
        return(
            <View style={styles.form}>
                    <Text style={styles.formtxt}>Username:</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                        style={styles.input}
                        placeholder='john1232'
                        value={this.props.username}
                        underlineColorAndroid='transparent'
                        onChangeText={text => this.props.usernamehandler(text)}
                        />
                        <Icon name="ios-person-outline" style={styles.inputIcon} size={30} color="#4F8EF7" />
                    </View>

                    <Text style={styles.formtxt}>Password:</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                        style={[styles.input, {borderColor: (this.props.valid) ? 'green' : 'red'}]}
                        placeholder='password'
                        value={this.props.pass1}
                        onChangeText={text => this.props.pass1handler(text)}
                        underlineColorAndroid='transparent'
                        secureTextEntry={true}
                        />
                        <Icon name="ios-lock-closed-outline" style={styles.inputIcon} size={30} color="#4F8EF7" />
                    </View>

                    <Text style={styles.formtxt}>Confirm Password:</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                        style={[styles.input, {borderColor: (this.props.valid) ? 'green' : 'red'}]}
                        placeholder='retype password'
                        value={this.props.pass2}
                        onChangeText={text => this.props.pass2handler(text)}
                        underlineColorAndroid='transparent'
                        secureTextEntry={true}
                        />
                        <Icon name="ios-lock-closed-outline" style={styles.inputIcon} size={30} color="#4F8EF7" />
                    </View>

                    <View style={styles.buttonArea}>
                        <TouchableOpacity style={styles.btn}
                        onPress={this.props.validatehandler}>
                            <Text style={styles.btntext}>Sign Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn}
                        onPress={this.props.nextPagehandler}>
                            <Text style={styles.btntext}>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.Loginbtn}
                        onPress={() => this.props.navigation.navigate('login')}>
                            <Text style={styles.btntext}>Already have an account? Login</Text>
                        </TouchableOpacity>
                  </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    // contains everything
    container: {
        backgroundColor: '#0057d4',
    },
    title: {
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titletxt:{
        color: 'white',
        fontSize: 50,
    },
    errorMsg:{
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: 20,
    },
    form: {
        alignItems: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    formtxt:{
        // paddingLeft: 45,
        justifyContent: 'flex-start',
        color: 'white',
        width: 280,
        marginTop: 10,
        fontSize: 20,
        // backgroundColor: 'red',
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
        borderWidth: 3,
    },
      inputIcon:{
        position: 'absolute',
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
    btn: {
        width: 350,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        backgroundColor: '#003366',
        color: 'black',
        marginTop: 5,
        marginHorizontal: 25,
        justifyContent: 'center',
        // borderWidth: 5,
        // borderColor: 'pink'
    },
    btntext: {
        textAlign: 'center',
        fontSize: 16,
        color: 'white',
    },
    Loginbtn: {
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

export default RegisterPage2