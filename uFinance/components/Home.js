import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { changeLogged } from '../store/actions/logged.js';
import { bindActionCreators } from 'redux';

class HomeScreen extends Component{
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}></View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Profile')}
            style={styles.btn}
          >
            <Text style={styles.btnText}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Groups')}
            style={styles.btn}
          >
            <Text style={styles.btnText}>View Group</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('CreateGroup')}
            style={styles.btn}
          >
            <Text style={styles.btnText}>Create Group</Text>
          </TouchableOpacity>


          <TouchableOpacity
            onPress={() => this.props.changeLogged(false)}
            style={styles.btn}
          >
            <Text style={styles.btnText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.groupContainer}>

        </View>
      </View>
    )
  }
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#364661',
    },
    topContainer: {
      flex: 1,
      // backgroundColor: '#f57280',
    },  
    btnContainer:{
      flex: 3,
      justifyContent: 'space-around',
      // alignItems: "center",
      paddingHorizontal: 10,
      // backgroundColor: '#0dc9b6',
    },
    btn:{
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      width: '50%',
      height: 50,
      marginHorizontal: '25%',
      borderRadius: 10,
      borderColor: 'black',
      borderWidth: 1,
    },
    groupContainer: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    btnText: {
      fontSize: 20,
    }
    
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

// export default HomeScreen;
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
