import { ThemeProvider } from '@react-navigation/native';
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
import RegisterPage1 from './RegisterPage1.js'
import RegisterPage2 from './RegisterPage2.js'

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
            venmo_id: '',
            nextPage: false,
        }
        this.updatePage = this.updatePage.bind(this)
        this.validate = this.validate.bind(this)
    }

    updatePass = (pass1) => { this.setState({ pass1 }) }
    updatePass2 = (pass2) => { this.setState({ pass2 }) }
    updateUsername = (username) => { this.setState({ username }) }
    updateFirstName = (fname) => { this.setState({ firstName: fname}) }
    updateLastName = (lname) => { this.setState({ lastName: lname}) }
    updateemail = (email) => { this.setState({ email: email}) }
    updateVenmoId = (venmoID) => { this.setState({venmo_id: venmoID}) }
    updatePage() { 
        if (this.state.nextPage){ this.setState({ nextPage: false}) }
        else{ this.setState({ nextPage: true}) }
    }

    validate(){
        const pass1 = this.state.pass1
        const pass2 = this.state.pass2
        const username = this.state.username
        const email = this.state.email
        const venmo_id = this.state.venmo_id
        let obj = {
            email: email,
            password: pass1,
            username: username,
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            venmo_id: venmo_id,
        }
        if (pass1.length > 3 && username !== '' && email !== '' && venmo_id !== '') {

            if (pass1 === pass2){
                this.setState({errorMsg: ''})
                console.log('good')
                Api.post('register', obj).then(resp => {
                    console.log('resp:', resp)
                    this.setState({dataSource: resp})
                    if (resp['register_status']){
                        this.props.navigation.navigate('login')
                    }
                    else{
                        this.setState({errorMsg: "UserID is taken or email is invalid"})
                    }
                })
            }
            else{
                console.log('incorrect')
                this.setState({errorMsg: "passwords don't match"})
            }
        }
        else{
            console.log('short')
            this.setState({errorMsg: 'Must fill out all fields'})
        }
    }

    render(){
        const pass1 = this.state.pass1
        const pass2 = this.state.pass2
        const firstName = this.state.firstName
        const lastName = this.state.lastName
        const email = this.state.email
        const username =this.state.username
        const venmo_id = this.state.venmo_id
        let registered = this.state.registered
        let valid = false
        if (pass1 === pass2 && pass1.length > 3){ valid = true }
        return(
            <ScrollView style={styles.container}>
                <View style={styles.title}> 
                    <Text style={styles.titletxt}>Register</Text>
                </View>
                <View style={{alignItems:'center'}}> 
                    <Text style={styles.errorMsg}>{this.state.errorMsg}</Text>
                </View>
                <View style={styles.form}>
                    {this.state.nextPage ? 
                        <RegisterPage2 
                            usernamehandler={this.updateUsername}
                            pass1handler={this.updatePass}
                            pass2handler={this.updatePass2}
                            nextPagehandler={this.updatePage}
                            validatehandler={this.validate}
                            navigation={this.props.navigation}
                            valid={valid}
                            pass1={pass1} pass2={pass2} username={username}
                        />
                            :
                        <RegisterPage1 
                            fnamehandler={this.updateFirstName} 
                            lnamehandler={this.updateLastName} 
                            emailhandler={this.updateemail}
                            venmoHandler={this.updateVenmoId}
                            nextPagehandler={this.updatePage}
                            navigation={this.props.navigation}
                            firstName={firstName} lastName={lastName} email={email} venmo_id={venmo_id}
                        />
                    }
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