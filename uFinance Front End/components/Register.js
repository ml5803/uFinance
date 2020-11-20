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
import Api from '../API.js'

class Register extends Component{
    constructor(){
        super()
        this.state={
            errorMsg: '',
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            pass1: '',
            pass2: '',
        }
    }

    updatePass = (pass1) => { this.setState({ pass1 }) }
    updatePass2 = (pass2) => { this.setState({ pass2 }) }
    validate = () => {
        const pass1 = this.state.pass1
        const pass2 = this.state.pass2
        let obj = {
            email: this.state.email,
            password: this.state.pass1,
            username: this.state.username,
            first_name: this.state.firstName,
            last_name: this.state.lastName,
        }
        if (pass1.length > 3){
            if (pass1 === pass2){
                this.setState({errorMsg: ''})
                console.log('good')
                Api.post('register', obj).then(resp => {
                    console.log('resp:', resp)
                    this.setState({dataSource: resp})
                })
            }
            else{
                console.log('incorrect')
                this.setState({errorMsg: "passwords don't match"})
            }
        }
        else{
            console.log('short')
            this.setState({errorMsg: 'Password too short'})
        }
        
    }

    render(){
        const pass1 = this.state.pass1
        const pass2 = this.state.pass2
        return(
            <ScrollView style={styles.container}>
                <View style={styles.title}> 
                    <Text style={styles.titletxt}>Register</Text>
                </View>
                <View style={{alignItems:'center'}}> 
                    <Text style={styles.errorMsg}>{this.state.errorMsg}</Text>
                </View>
                <View style={styles.form}>
                    <Text style={styles.formtxt}>Username:</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                        style={styles.input}
                        placeholder='john1232'
                        // remove underline when typing
                        underlineColorAndroid='transparent'
                        onChangeText={text => this.setState({username: text})}
                        />
                        <Icon name="ios-person-outline" style={styles.inputIcon} size={30} color="#4F8EF7" />
                    </View>

                    <Text style={styles.formtxt}>First Name:</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                        style={styles.input}
                        placeholder='John'
                        // remove underline when typing
                        underlineColorAndroid='transparent'
                        onChangeText={text => this.setState({firstName: text})}
                        />
                        <Icon name="ios-person-outline" style={styles.inputIcon} size={30} color="#4F8EF7" />
                    </View>

                    <Text style={styles.formtxt}>Last Name:</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                        style={styles.input}
                        placeholder='Smith'
                        // remove underline when typing
                        underlineColorAndroid='transparent'
                        onChangeText={text => this.setState({lastName: text})}
                        />
                        <Icon name="ios-person-outline" style={styles.inputIcon} size={30} color="#4F8EF7" />
                    </View>

                    <Text style={styles.formtxt}>Email:</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                        style={styles.input}
                        placeholder='you@gmail.com'
                        // remove underline when typing
                        underlineColorAndroid='transparent'
                        onChangeText={text => this.setState({email: text})}
                        />
                        <Icon name="ios-person-outline" style={styles.inputIcon} size={30} color="#4F8EF7" />
                    </View>

                    <Text style={styles.formtxt}>Password:</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                        style={styles.input}
                        placeholder='password'
                        onChangeText={this.updatePass}
                        value={pass1}
                        underlineColorAndroid='transparent'
                        secureTextEntry={true}
                        />
                        <Icon name="ios-lock-closed-outline" style={styles.inputIcon} size={30} color="#4F8EF7" />
                    </View>
                    <Text style={styles.formtxt}>Confirm Password:</Text>
                    <View style={styles.inputContainer}>
                        {/* <Text style={styles.formtxt}>Confirm Password:</Text> */}
                        <TextInput
                        style={styles.input}
                        placeholder='retype password'
                        onChangeText={this.updatePass2}
                        value={pass2}
                        underlineColorAndroid='transparent'
                        secureTextEntry={true}
                        />
                        <Icon name="ios-lock-closed-outline" style={styles.inputIcon} size={30} color="#4F8EF7" />
                    </View>

                    <View style={styles.buttonArea}>
                        <TouchableOpacity style={styles.btn}
                        onPress={this.validate}>
                            <Text style={styles.btntext}>Sign Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.Loginbtn}
                        onPress={() => this.props.navigation.navigate('login')}>
                            <Text style={styles.btntext}>Already have an account? Login</Text>
                        </TouchableOpacity>
                  </View>
                </View>
            </ScrollView>
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

export default Register 