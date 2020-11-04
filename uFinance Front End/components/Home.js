import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { changeLogged } from '../store/actions/logged.js';
import { bindActionCreators } from 'redux';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

class HomeScreen extends Component{
  render(){
    return (
      // <LinearGradient style={styles.container} colors={['#264d73', '#00cca3']}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
          {/* <View style={styles.topContainer}></View> */}
          <View style={styles.btnContainer}>
            <Button
              title="Profile"
              type="outline"
              // raised={true}
              titleStyle={styles. btnTitle}
              onPress={() => this.props.navigation.navigate('Profile')}
              buttonStyle={styles.btn}
            />

            <Button
              title="View Groups"
              type="outline"
              titleStyle={styles. btnTitle}
              onPress={() => this.props.navigation.navigate('Groups')}
              buttonStyle={styles.btn}
            />

            <Button
              title="Create Croups"
              type="outline"
              titleStyle={styles. btnTitle}
              onPress={() => this.props.navigation.navigate('CreateGroup')}
              buttonStyle={styles.btn}
            />
            
            <Button
              title="Logout"
              type="outline"
              onPress={() => this.props.changeLogged(false)}
              titleStyle={styles. btnTitle}
              buttonStyle={styles.btn}
            />

            {/* <TouchableOpacity
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
            </TouchableOpacity> */}
          </View>

          {/* <View style={styles.groupContainer}></View> */}

          
        </ScrollView>
      // </LinearGradient>
      
    )
  }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: '#364661',
    },
    topContainer: {
      // flex: 1,
      // backgroundColor: '#f57280',
    },
    btnContainer:{
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: '5%',
      paddingBottom: '10%',
      // alignItems: "center",
      // backgroundColor: '#0dc9b6',
    },
    btn:{
      justifyContent: 'center',
      alignItems: 'center',
      width: 200,
      height: 80,
      margin: 10,
      // width: '50%',
      // height: 50,
      // marginHorizontal: '25%',
      // borderRadius: 25,
      // borderColor: 'black',
      borderWidth: 1,
      // margin: 10,
    },
    btnTitle: {
      fontSize: 25,
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
