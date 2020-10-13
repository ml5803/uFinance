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

const { width: WIDTH } = Dimensions.get('window')

class HomeScreen extends Component{
  render(){
    return (
      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Profile')}
          style={styles.btn}
        >
          <Text>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Groups')}
          style={styles.btn}
        >
          <Text>Groups</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.changeLogged(false)}
          style={styles.btn}
        >
          <Text>Logout</Text>
        </TouchableOpacity>
  
      </View>
    )
  }
    
}

const styles = StyleSheet.create({
    btnContainer:{
      flex: 1,
      justifyContent:"center",
      // alignItems: "center",
      paddingHorizontal: 10,
    },
    btn:{
      backgroundColor: '#DDDDDD',
      alignItems: 'center',
      width: WIDTH-150,
      height: 45,
      marginTop: 5,
      marginHorizontal: 67,
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

// export default HomeScreen;
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
