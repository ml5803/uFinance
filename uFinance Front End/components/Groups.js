import React, {Component} from 'react';
import * as ReactLibraries from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import template1 from '../styles/template1.js'
import LinearGradient from 'react-native-linear-gradient';
import { ListItem, Avatar, Header, SearchBar } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Api from '../API.js'
import { connect } from 'react-redux';
import { updateMembers } from '../store/actions/updateMembers.js';
import { bindActionCreators } from 'redux';

class Group extends Component{
  constructor(){
    super()
    this.state = {
      search:'',
      group_lst: [],
      member_lst: [],
    }
    this.getGroups = this.getGroups.bind(this)
    this.clickGroup = this.clickGroup.bind(this)
  }

  // refresh page every time we are on this component 
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
        this.getGroups()
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  getGroups(){
    let obj ={
      "operation": "get",
      "owner_id": this.props.loginState['userid'],
    }
    Api.post('groups', obj).then(resp =>{
      let group_lst = []
      resp['execution_result'].map((obj, index)=>{
        let new_obj ={
          name: obj['group_name'],
          id: obj['group_id'],
        }
        group_lst.push(new_obj)
      })
      this.setState({group_lst})
    }).catch(function(e){
      console.log('get groups error')
    })
  }

  updateSearch = (search) => {
    this.setState({ search });
  }

  clickGroup(groupID, name){
    console.log('click group name: ', name)
    let obj ={
      "operation": "get",
      "group_id": groupID,
    }
    console.log(groupID)
    Api.post('group', obj).then(resp =>{
      console.log('group:', resp)
      let member_obj = {}
      resp['execution_result'].map((obj, index)=>{
        member_obj[obj.member_id] = 0
      })
      console.log(member_obj)
      this.props.updateMembers(member_obj, groupID)
      console.log(this.props.memberState)
      this.props.navigation.navigate('IndividualGroup', {name} )
      
    })
  }

  render(){
    const { search, group_lst } = this.state;
    // If search === 0 then return whole list
    // else map list and pick the ones with the same words in name
    let new_lst
    if (search === 0){ new_lst = group_lst }
    else{
      new_lst = group_lst.filter(obj => {
        return obj.name.toLowerCase().includes(search.toLowerCase())
      })
    }
    
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start' }}>
        <Header
          leftComponent={{ icon: 'home', color: '#fff', onPress:() => this.props.navigation.navigate('Home') }}
          centerComponent={{ text: 'MY GROUPS', style: { color: '#fff', fontSize: 20,} }}
          // rightComponent={{ icon: 'settings', color: '#fff', onPress:() => this.props.navigation.navigate('IndividualGroupSettings') }}
        />
        <SearchBar
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={search}
        />
        <View>
          {
            new_lst.map((l, i) => (
              <ListItem key={i} bottomDivider 
              // onPress={() => this.props.navigation.navigate('IndividualGroup')}
              onPress={() => this.clickGroup(l.id, l.name)}
              >
                <ListItem.Content>
                  <ListItem.Title>{l.name}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))
          }
        </View>
      </ScrollView>        
    );
  }
}

const styles = StyleSheet.create({
  btnContainer: {
    // flex: 1
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '5%',
    paddingBottom: '10%',
  },
  btn:{
    // backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 50,
    marginHorizontal: '25%',
    borderRadius: 25,
    borderColor: 'white',
    borderWidth: 1,
    marginTop: 10,
  },

});
  
const mapStateToProps = state => ({
  loginState: state.loggedin,
  updateState: state.updated,
  memberState: state.members, 
});
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    updateMembers,
  }, dispatch)
);

// export default Group;
export default connect(mapStateToProps, mapDispatchToProps)(Group);
