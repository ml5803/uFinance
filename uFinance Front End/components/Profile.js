import React, { Component } from 'react';


import { Image, ScrollView } from 'react-native'
import { Card, ListItem, Button, Icon, Avatar, Header } from 'react-native-elements'
import { connect } from 'react-redux';


import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit'

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

class Profile extends Component {
    constructor(){
      super()
      this.state ={
        username: '',

        language: 'java',

        visible: false,
      }
      this.setUser = this.setUser.bind(this)

    }


    setUser(){
      this.setState({username: this.props.loginState['userid']})
      console.log('user: ', this.state.username)
    }

    render(){
      var data = [["C", "Java", "JavaScript", "PHP"]];
      return (

        <ScrollView>
          <Header
            leftComponent={{ icon: 'home', color: '#fff', onPress:() => this.props.navigation.navigate('Home') }}
            centerComponent={{ text: 'Profile', style: { color: '#fff', fontSize: 20,} }}
          />
          <Card>
            <Avatar
              rounded
              source={{
                uri:
                  'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
              }}
            />
            <Card.Title>Welcome {this.props.loginState['userid']}!</Card.Title>


            </Card>
        </ScrollView>
      );
    }
}

//const username = this.props.loginState['userid']

const styles = StyleSheet.create({
  inLineTextSelf: {
    fontSize: 16,
    color: "blue"
  },
  inLineTextCost: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4bee00"
  },
  inLineText: {
    fontSize: 16,
    color: "#ff1f03"
  },
  inLineContainer: {
    paddingVertical: 1.5,
    paddingHorizontal: 1,
    flexDirection: "row",
    /*justifyContent: "space-between",*/
    alignItems: "center"
  },
  btnContainer:{
    flex: 1,
    justifyContent:"center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  btn:{
    backgroundColor: '#DDDDDD',
    alignItems: 'center',
    padding: 10,
    margin: 5,
  },
});

const mapStateToProps = state => ({
  loginState: state.loggedin,
});

// export default Profile;
export default connect(mapStateToProps)(Profile);
