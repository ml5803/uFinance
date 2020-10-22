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
import LinearGradient from 'react-native-linear-gradient';

class HomeScreen extends Component{
  render(){
    return (
      <LinearGradient style={styles.container} colors={['#264d73', '#00cca3']}>
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
      </LinearGradient>
    )
  }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: '#364661',
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
      // backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      width: '50%',
      height: 50,
      marginHorizontal: '25%',
      borderRadius: 25,
      borderColor: 'white',
      borderWidth: 1,
    },
    groupContainer: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    btnText: {
      color: 'white',
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
