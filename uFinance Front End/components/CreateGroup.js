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
import Api from '../API.js'
import { connect } from 'react-redux';

class CreateGroup extends Component {
  constructor(){
    super()
    this.state={
      groupName: '',
      members: [],
      username: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(){


    let obj ={
      "operation": "insert",
      "group_name": this.state.groupName,
      "owner_id": this.props.loginState['userid'],
      "members": this.state.members
    }

    console.log('g:',this.state.groupName)
    console.log('o:',this.state.username)
    console.log('m:',this.state.members)
     Api.post('groups', obj).then(resp=>{
       console.log(resp)
     }).catch((error)=>{
       console.log("Api call error");
    });
  }

  updateNames(email, index){
    let newlst = this.state.members
    console.log('email:', email)
    newlst[index] = email.replace(/\s+/g, '')
    this.setState({members: newlst})
  }

  addBox(){
    this.setState({members: this.state.members.concat('')})
  }
  deleteBox(index){
    let newlst = this.state.members
    newlst.splice(index, 1)
    this.setState({members: newlst})
  }

  render(){
    console.log('name', this.state.groupName)
    console.log(this.state.members)
    console.log('loggedin..:',this.props.loginState)
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
                onChangeText={(text) => this.setState({groupName: text})}
              />
          </Card>
          {/* Add members Section --- */}
          <Card>
            <Card.Title>members</Card.Title>
            <Card.Divider/>
            <View style={styles.boxContainer}>
              {
                this.state.members.map((name, index) => (
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
            onPress={() => this.handleSubmit()}
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

const mapStateToProps = state => ({
  loginState: state.loggedin,
});

// export default CreateGroup;
export default connect(mapStateToProps)(CreateGroup);