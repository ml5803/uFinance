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
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import Api from '../API.js'
import { updateMembers } from '../store/actions/updateMembers.js';
import { bindActionCreators } from 'redux';

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
      newMembers: [],
      toDelete: [0, 0, 0],
      error_msg: '',
    }
  }

  componentDidMount(){
    let members = {...this.props.memberState.members}
    let groupid = this.props.memberState.group_id
    let oldMembers = []
    let toDelete = []
    let error_msg = ''
    let GroupName = ''
    Object.keys(members).map((key, index)=>{
      oldMembers.push(key)
      toDelete.push(0)
    })
    
    this.setState({GroupName, oldMembers, toDelete, error_msg})
  }

  updateGroupName(newName){
    let newlst = this.state.GroupName
    newlst = newName
    this.setState({GroupName: newlst})
  }
  updateNewNames(email, index){
    let newlst = this.state.newMembers
    newlst[index] = email.replace(/\s+/g, '')
    this.setState({newMembers: newlst})
  }
  updateToDelete(index){
    let curr_members = this.state.oldMembers
    if (curr_members[index] === this.props.loggedin.user_id){
      return 
    }
    let newlst = this.state.toDelete
    if (newlst[index] === 1){ newlst[index] = 0 }
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
  submitbtn(){
    let remaining_members = []
    let remove_members = []
    let add_members = this.state.newMembers
    let old_members = this.state.oldMembers
    // remove empty boxes from add_members
    let add_members_filtered = add_members.filter(obj => {
      return obj !== ''
    })
    this.state.toDelete.map((index, i)=>{
      if (index===1){
        remove_members.push(old_members[i])
      }
      else if (index===0){
        remaining_members.push(old_members[i])
      }
    })
    console.log('add_members:', add_members_filtered)
    console.log('remove_members:', remove_members)
    console.log('remaining_members:', remaining_members)

    console.log("Group Name;", this.state.GroupName)
    let obj = {}
    if (this.state.GroupName === ''){
      obj ={
        operation: 'modify',
        group_id: this.props.memberState.group_id,
        add_members: add_members,
        remove_members: [] 
      }
    }
    else{ 
      obj ={
        operation: 'modify',
        group_id: this.props.memberState.group_id,
        add_members: add_members,
        group_name: this.state.GroupName,
        remove_members: [] 
      }
    }
    Api.post('group', obj).then(resp =>{
      if (resp['execution_status']){
        console.log('success', resp)
        this.props.navigation.navigate('Groups')
      }
      else{
        console.log('error', resp)
        this.setState({error_msg: resp['error_message']})
      }
    })
    // update members in redux to reflect changes for this current group 
    let new_obj = {}
    remaining_members.map((name, index)=>{
      new_obj[name] = 0
    })
    console.log(new_obj, '=================')
    // this.props.updateMembers(new_obj, this.state.GroupName)

  }

  render(){
    console.log(this.state.GroupName)
    return (
      <ScrollView>
        {/* <LinearGradient style={template1.container}  colors={['#264d73', '#00cca3']}> */}
          <Header
            leftComponent={{ icon: 'chevron-left', type:'FontAwesome', color: '#fff', onPress:() => this.props.navigation.navigate('IndividualGroup') }}
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
          {/* <Card>
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
          </Card> */}

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

          {this.state.error_msg!==''
            ? <Card><Card.Title>{this.state.error_msg}</Card.Title></Card>
            : null
          }
          {/* Submit Button --- */}
          <View style={styles.boxContainer}>
            <Button 
            title="Submit"
            titleStyle={styles.submitbtn}
            onPress={()=>this.submitbtn()}
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
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 25,
    width: 200,
  }
});

const mapStateToProps = state => ({
  loginState: state.loggedin,
  memberState: state.members, 
});
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    updateMembers,
  }, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(IndividualGroupSettings);