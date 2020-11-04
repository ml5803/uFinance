import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  Image,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import template1 from '../styles/template1.js'
import LinearGradient from 'react-native-linear-gradient';
import { Card, ListItem, Button, Icon, Header } from 'react-native-elements'

const users = [
  {
     name: 'brynn',
     avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
  },
 ]

class IndividualGroupSettings extends Component {
  constructor(){
    super()
    this.state={
      GroupName: '',
      oldMembers: ['Jerry', 'Bob', 'Calvin'],
      newMembers: [''],
      toDelete: [0, 0, 0]
    }
  }

  updateGroupName(newName){
    let newlst = this.state.GroupName
    newlst = newName
    this.setState({GroupName: newlst})
  }
  updateNewNames(email, index){
    let newlst = this.state.newMembers
    newlst[index] = email
    this.setState({newMembers: newlst})
  }
  updateToDelete(index){
    let newlst = this.state.toDelete
    if (newlst[index] == 1){ newlst[index] = 0 }
    else{ newlst[index] = 1 } 
    console.log(newlst, '-----', index)
    this.setState({toDelete: newlst})
  }
  addBox(){
    this.setState({newMembers: this.state.newMembers.concat('')})
  }
  deleteBox(index){
    let newlst = this.state.newMembers
    newlst.splice(index, 1)
    this.setState({newMembers: newlst})
  }

  render(){
    console.log(this.state.GroupName)
    return (
      <ScrollView>
        {/* <LinearGradient style={template1.container}  colors={['#264d73', '#00cca3']}> */}
          <Header
            centerComponent={{ text: 'Group Settings', style: { color: '#fff', fontSize: 20,} }}
          />
          {/* Edit Group Section ---- */}
          <Card>
            <Card.Title>Edit Group Name</Card.Title>
            <Card.Divider/>
              <TextInput
                style={styles.inputBox}
                // placeholder='Imposter'
                underlineColorAndroid='transparent'
                onChangeText={(newName) => this.updateGroupName(newName)}
              />
            
          </Card>

          {/* Delete Members Section --- */}
          <Card>
            <Card.Title>Delete Members</Card.Title>
            <Card.Divider/>
            <View>
              {
              this.state.oldMembers.map((name, index) => (
                  <TouchableHighlight
                    key={'old'+index}
                    style={[styles.memberBox, {backgroundColor: this.state.toDelete[index] ? '#dddddd' : 'transparent'}]}
                    underlayColor={'white'}
                    onPress={() => this.updateToDelete(index)}
                  ><Text 
                    style={[template1.btnText, {color: 'black'}]}
                    underlayColor={'white'}>
                      {name}
                    </Text>
                  </TouchableHighlight>
                ))
              }
            </View>
          </Card>

          {/* Add Members Section --- */}
          <Card>
            <Card.Title>Add members</Card.Title>
            <Card.Divider/>
            <View style={styles.boxContainer}>
              {
                this.state.newMembers.map((name, index) => (
                  <View style={styles.InputBoxWithDelete} key={'new'+index}>
                    <TextInput
                      style={styles.input}
                      underlineColorAndroid='transparent'
                      onChangeText={(email) => this.updateNewNames(email, index)}
                    > <Text>{name}</Text>
                    </TextInput>
                    <TouchableOpacity style={styles.deleteBox}
                    onPress={() => this.deleteBox(index)}>
                      <Text style={styles.boxText}>-</Text>
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

          {/* Submit Button --- */}
          <View style={styles.boxContainer}>
            <TouchableOpacity style={styles.submitbtn}>
              <Text style={styles.boxText}>Submit</Text>
            </TouchableOpacity>
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
    marginBottom: 10,
  },
  inputBox: {
    // backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 50,
    marginHorizontal: '25%',
    borderWidth: 1,
    borderRadius: 10,
    color: 'black',
    // marginBottom: "2%",
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
  memberBox:{
    // backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '50%',
    height: 50,
    marginHorizontal: '25%',
    borderRadius: 10,
    color: 'black',
    marginBottom: "2%",
    borderRadius: 10,
    // borderColor: 'white',
    borderWidth: 1,
  },
  input: {
    width: "80%",
    height: "100%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: 'white',
  },
  deleteBox: {
    width: '20%',
    height: '100%',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    // borderColor: 'white',
    // backgroundColor: '#990000',
  },
  addButton: {
    // marginTop: '5%',
    borderRadius: 10,
    // borderColor: 'white',
    borderWidth: 1,
    // marginBottom: "5%",
    // backgroundColor: '#193361',
    width: "50%",
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitbtn: {
    marginBottom: "5%",
    backgroundColor: '#2D5CAD',
    height: 100,
    width: 100,
    borderRadius: 200,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default IndividualGroupSettings;