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

class CreateGroup extends Component {
  constructor(){
    super()
    this.state={
      numMembers: [''],
    }
  }

  updateNames(email, index){
    let newlst = this.state.numMembers
    newlst[index] = email
    this.setState({numMembers: newlst})
  }

  addBox(){
    this.setState({numMembers: this.state.numMembers.concat('')})
  }

  render(){
    console.log(this.state.numMembers)
    return (
      <ScrollView style={template1.container}>
        {/* <View style={template1.topContainer}></View> */}
        <View style={styles.nameContainer}>
          <Text style={styles.boxText}>Group Name</Text>
          <TextInput
            style={styles.inputBox}
            placeholder='Amoung Us'
            underlineColorAndroid='transparent'
          />
        </View>
        <View style={styles.boxContainer}>
          <Text style={styles.boxText}>Member's Email</Text>
          {
            this.state.numMembers.map((name, index) => (
              <TextInput
                key={index}
                style={styles.inputBox}
                underlineColorAndroid='transparent'
                onChangeText={(email) => this.updateNames(email, index)}
              > <Text>{name}</Text>
              </TextInput>
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
    marginTop: '20%',
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
    alignItems: 'center',
    width: '50%',
    height: 50,
    marginHorizontal: '25%',
    borderRadius: 10,
    color: 'black',
    marginBottom: "2%",
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
export default CreateGroup;