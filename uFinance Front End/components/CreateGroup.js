import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import template1 from '../styles/template1.js'
import LinearGradient from 'react-native-linear-gradient';
import { Card, ListItem, Button, Icon, Header } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons';

class CreateGroup extends Component {
  constructor(){
    super()
    this.state={
      Members: [''],
    }
  }

  updateNames(email, index){
    let newlst = this.state.Members
    newlst[index] = email
    this.setState({Members: newlst})
  }

  addBox(){
    this.setState({Members: this.state.Members.concat('')})
  }
  deleteBox(index){
    let newlst = this.state.Members
    newlst.splice(index, 1)
    this.setState({Members: newlst})
  }

  render(){
    console.log(this.state.Members)
    return (
      <ScrollView >
        {/* <LinearGradient style={template1.container} colors={['#264d73', '#00cca3']}> */}
          <Header
            leftComponent={{ icon: 'home', color: '#fff', onPress:() => this.props.navigation.navigate('Home') }}
            centerComponent={{ text: 'Create Group', style: { color: '#fff', fontSize: 20,} }}
          />
          <Card>
            <Card.Title>Group Name</Card.Title>
            <Card.Divider/>
              <TextInput
                style={styles.inputBox}
                // placeholder='Amoung Us'
                underlineColorAndroid='transparent'
              />
          </Card>
          {/* Add Members Section --- */}
          <Card>
            <Card.Title>Members</Card.Title>
            <Card.Divider/>
            <View style={styles.boxContainer}>
              {
                this.state.Members.map((name, index) => (
                  <View style={styles.InputBoxWithDelete} key={'new'+index}>
                    <TextInput
                      style={styles.input}
                      underlineColorAndroid='transparent'
                      onChangeText={(email) => this.updateNames(email, index)}
                    > <Text>{name}</Text>
                    </TextInput>
                    <TouchableOpacity style={styles.deleteBox}
                    onPress={() => this.deleteBox(index)}>
                      <Ionicons 
                      name="close-circle-outline" 
                      size={32}
                      color={'red'}
                      />
                    </TouchableOpacity>
                  </View>
                ))
              }
              <TouchableOpacity style={styles.addButton}
              onPress={() => this.addBox()}>
                <Text style={styles.boxText}>+</Text>
              </TouchableOpacity>
            </View>
          </Card>
          
          <View style={styles.boxContainer}>
            <Button 
            title="Submit"
            titleStyle={styles.submitbtn}
            />
          </View>
        {/* </LinearGradient> */}
        
      </ScrollView>
    );
  }
    
}

const styles = StyleSheet.create({
  nameContainer: {  
    marginTop: '10%',
    justifyContent:'center',
    alignItems: 'center',
  },
  boxContainer: {  
    marginTop: '10%',
    justifyContent:'center',
    alignItems: 'center',
  },
  boxText: {
    color: 'black',
    fontSize: 20,
  },
  inputBox: {
    backgroundColor: 'white',
    justifyContent: 'center',
    borderWidth: 1,
    // alignItems: 'center',
    width: '50%',
    height: 50,
    marginHorizontal: '25%',
    borderRadius: 10,
    color: 'black',
    marginBottom: "2%",
  },
  InputBoxWithDelete: {
    // backgroundColor: 'white',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '50%',
    height: 50,
    marginHorizontal: '25%',
    borderRadius: 10,
    borderWidth: 1,
    color: 'black',
    marginBottom: "2%",
  },
  input: {
    width: "80%",
    height: "100%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: 'white',
  },
  deleteBox:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    // marginTop: '5%',
    borderRadius: 10,
    borderWidth: 1,
    // borderColor: 'white',
    // marginBottom: "5%",
    // backgroundColor: '#193361',
    width: "50%",
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitbtn: {
    fontSize: 25,
    width: 200,
  }
});
export default CreateGroup;