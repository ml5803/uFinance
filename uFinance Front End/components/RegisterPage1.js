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

class RegisterPage1 extends Component{
    render(){
        return(
            <View style={styles.form}>
                    <Text style={styles.formtxt}>First Name:</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                        style={styles.input}
                        placeholder='John'
                        value={this.props.firstName}
                        underlineColorAndroid='transparent'
                        onChangeText={text => this.props.fnamehandler(text)}
                        />
                        <Icon name="ios-person-outline" style={styles.inputIcon} size={30} color="#4F8EF7" />
                    </View>

                    <Text style={styles.formtxt}>Last Name:</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                        style={styles.input}
                        placeholder='Smith'
                        value={this.props.lastName}
                        underlineColorAndroid='transparent'
                        onChangeText={text => this.props.lnamehandler(text)}
                        />
                        <Icon name="ios-person-outline" style={styles.inputIcon} size={30} color="#4F8EF7" />
                    </View>

                    <Text style={styles.formtxt}>Email:</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                        style={styles.input}
                        placeholder='you@gmail.com'
                        value={this.props.email}
                        underlineColorAndroid='transparent'
                        onChangeText={text => this.props.emailhandler(text)}
                        />
                        <Icon name="ios-person-outline" style={styles.inputIcon} size={30} color="#4F8EF7" />
                    </View>

                    <Text style={styles.formtxt}>Venmo ID:</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                        style={styles.input}
                        placeholder='venmo-id'
                        value={this.props.venmo_id}
                        underlineColorAndroid='transparent'
                        onChangeText={text => this.props.venmoHandler(text)}
                        />
                        <Icon name="ios-person-outline" style={styles.inputIcon} size={30} color="#4F8EF7" />
                    </View>

                    <View style={styles.buttonArea}>
                        <TouchableOpacity style={styles.btn}
                        onPress={this.props.nextPagehandler}>
                            <Text style={styles.btntext}>Next</Text>
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

export default RegisterPage1 