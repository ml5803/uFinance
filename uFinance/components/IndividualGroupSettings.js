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

class IndividualGroupSettings extends Component {
  constructor(){
    super()
    this.state={
      oldMembers: ['Jerry', 'Bob', 'Calvin'],
      newMembers: ['']
    }
  }

  updateOldNames(email, index){
    let newlst = this.state.oldMembers
    newlst[index] = email
    this.setState({oldMembers: newlst})
  }
  updateNewNames(email, index){
    let newlst = this.state.newMembers
    newlst[index] = email
    this.setState({newMembers: newlst})
  }
  addBoxtoOld(){
    this.setState({oldMembers: this.state.oldMembers.concat('')})
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
    console.log(this.state.oldMembers)
    return (
      <ScrollView style={template1.container}>
        <View style={styles.nameContainer}>
          <Text style={styles.boxText}>Edit Group Name</Text>
          <TextInput
            style={styles.inputBox}
            placeholder='Imposter'
            underlineColorAndroid='transparent'
          />
        </View>
        <View style={styles.boxContainer}>
          <Text style={styles.boxText}>Delete Members</Text>
          {
            this.state.oldMembers.map((name, index) => (
              <TextInput
                key={index}
                style={styles.inputBox}
                underlineColorAndroid='transparent'
                onChangeText={(email) => this.updateOldNames(email, index)}
              ><Text>{name}</Text>
              </TextInput>
              
            ))
          }
          <TouchableOpacity style={styles.addButton}
          onPress={() => this.addBoxtoOld()}>
            <Text style={styles.boxText}>Add Another Member</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.boxContainer}>
          <Text style={styles.boxText}>Add Members</Text>
          {
            this.state.newMembers.map((name, index) => (
              <View style={styles.InputBoxWithDelete}>
                <TextInput
                  key={index}
                  style={styles.input}
                  underlineColorAndroid='transparent'
                  onChangeText={(email) => this.updateNewNames(email, index)}
                > <Text>{name}</Text>
                </TextInput>
                <TouchableOpacity style={styles.deleteBox}
                onPress={() => this.deleteBox(index)}/>
              </View>
            ))
          }
          <TouchableOpacity style={styles.addButton}
          onPress={() => this.addBox()}>
            <Text style={styles.boxText}>Add Another Member</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.boxContainer}>
          <TouchableOpacity style={styles.submitbtn}>
            <Text style={styles.boxText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
    
}

const styles = StyleSheet.create({
  nameContainer: {  
    marginTop: '20%',
    justifyContent:'center',
    alignItems: 'center',
  },
  boxContainer: {  
    marginTop: '10%',
    justifyContent:'center',
    alignItems: 'center',
  },
  boxText: {
    color: 'white',
    fontSize: 20,
  },
  inputBox: {
    backgroundColor: 'white',
    justifyContent: 'center',
    // alignItems: 'center',
    width: '50%',
    height: 50,
    marginHorizontal: '25%',
    borderRadius: 10,
    color: 'black',
    marginBottom: "2%",
  },
  InputBoxWithDelete: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '50%',
    height: 50,
    marginHorizontal: '25%',
    borderRadius: 10,
    color: 'black',
    marginBottom: "2%",
  },
  input: {
    width: "80%",
    height: "100%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  deleteBox: {
    width: '20%',
    height: '100%',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: 'black',
  },
  addButton: {
    // marginTop: '5%',
    borderRadius: 10,
    marginBottom: "5%",
    backgroundColor: '#193361',
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