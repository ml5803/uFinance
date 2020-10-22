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
      <ScrollView>
        <LinearGradient style={template1.container} colors={['#264d73', '#00cca3']}>
          <View style={styles.nameContainer}>
            <Text style={styles.boxText}>Group Name</Text>
            <TextInput
              style={styles.inputBox}
              // placeholder='Amoung Us'
              underlineColorAndroid='transparent'
            />
          </View>
          {/* <View style={styles.boxContainer}>
            <Text style={styles.boxText}>Member's Email</Text>
            {
              this.state.Members.map((name, index) => (
                <View style={styles.InputBoxWithDelete}>
                  <TextInput
                    key={'new'+index}
                    style={styles.input}
                    underlineColorAndroid='transparent'
                    onChangeText={(email) => this.updateNames(email, index)}
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
          </View> */}
          {/* Add Members Section --- */}
          <View style={styles.boxContainer}>
            <Text style={styles.boxText}>Add Members</Text>
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
        </LinearGradient>
        
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
    // backgroundColor: 'white',
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
    backgroundColor: 'white',
  },
  deleteBox: {
    width: '20%',
    height: '100%',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    // backgroundColor: 'black',
  },
  addButton: {
    // marginTop: '5%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    // marginBottom: "5%",
    // backgroundColor: '#193361',
    width: "50%",
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitbtn: {
    marginBottom: "40%",
    backgroundColor: '#2D5CAD',
    height: 100,
    width: 100,
    borderRadius: 200,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
export default CreateGroup;