import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const { width: WIDTH } = Dimensions.get('window')

class Register extends Component{
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.title}> 
                    <Text style={styles.titletxt}>Register</Text>
                </View>
                <View style={styles.form}>
                    <Text style={styles.formtxt}>Email:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='you@gmail.com'
                        // remove underline when typing
                        underlineColorAndroid='transparent'
                    />
                    <Text style={styles.formtxt}>Password:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Password'
                        underlineColorAndroid='transparent'
                        secureTextEntry={true}
                    />
                    <Text style={styles.formtxt}>Confirm Password:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Password'
                        underlineColorAndroid='transparent'
                        secureTextEntry={true}
                    />
                    <View style={styles.buttonArea}>
                        <TouchableOpacity style={styles.btn}>
                            <Text style={styles.btntext}>Sign Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.Loginbtn}
                        onPress={() => this.props.navigation.navigate('login')}>
                            <Text style={styles.btntext}>Already have an account? Login</Text>
                        </TouchableOpacity>
                  </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    // contains everything
    container: {
        flex: 1,
        backgroundColor: '#0057d4',
    },
    // 1/3 of container 
    title: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titletxt:{
        color: 'white',
        fontSize: 50,
    },
    // 2/3 of container 
    form: {
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    formtxt:{
        paddingLeft: 45,
        color: 'white',
        marginTop: 10,
        fontSize: 20,
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
    },
    buttonArea: {
        marginTop: 20,
    },
    btn: {
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
    Loginbtn: {
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

export default Register 