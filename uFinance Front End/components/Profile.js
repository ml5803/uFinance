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
import { Card, ListItem, Avatar, Header, SearchBar } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Api from '../API.js'
import { connect } from 'react-redux';
import { updateMembers } from '../store/actions/updateMembers.js';
import { bindActionCreators } from 'redux';

class Profile extends Component{
  constructor(){
    super()
    this.state = {
      search:'',
      group_lst: [],
      member_lst: [],
      member_costs: [],
      total_cost: 0,
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
      console.log('lst resp', resp)
      let group_lst = []
      let member_costs = []
      resp['execution_result'].map((obj, index)=>{
        let new_obj ={
          name: obj['group_name'],
          id: obj['group_id'],
          total: 0,
        }
        group_lst.push(new_obj)
        member_costs.push(null)
      })
      this.setState({group_lst, member_costs})
      console.log('group list', this.state)
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
      console.log('member_obj', member_obj)
      this.props.updateMembers(member_obj, groupID)
      console.log(this.props.memberState)

    })
  }
  getCosts(groupID, index){
    console.log('**********************************************************started: ', groupID)
    let obj ={
      "operation": "get",
      "group_id": groupID,
    }

    let member_costs = this.state.member_costs

    Api.post('expense', obj).then(resp => {
      console.log('resp_exe_res:', resp['execution_result'])
      let execution_data = eval(resp['execution_result'])
      console.log(execution_data)
      if (resp["execution_status"]){
        let expense_objects = {}
        let total_cost = 0
        for (let i=0; i < execution_data.length; i++){
          let member_id = execution_data[i].member_id
          let cost = Math.round(parseFloat(execution_data[i].expense_amt)*100)/100
          let expense_id = execution_data[i].expense_id
          expense_objects[expense_id] = {
            member_id: member_id,
            item: execution_data[i].expense_name,
            cost: cost,
            proof: execution_data[i].proof,
            date: execution_data[i].date_entered,
          }
          total_cost += cost
        }

        member_costs[index] = total_cost
        this.setState({member_costs})
        console.log('total of ', groupID, ': ', member_costs)
        console.log('**********************************************************ended: ', groupID)
      }
    }).catch(function(e){
      console.log(e)
    })

  }

  setUser(){
    this.setState({username: this.props.loginState['userid']})
    console.log('user: ', this.state.username)
  }

  render(){
    const { search, group_lst } = this.state;
    // If search === 0 then return whole list
    // else map list and pick the ones with the same words in name
    console.log('***************************************************************')
    console.log('group lst: ', group_lst)

    let lst
    if (search === 0){ lst = group_lst }
    else{
      lst = group_lst.filter(obj => {
        return obj.name.toLowerCase().includes(search.toLowerCase())
      })
    }

    console.log('list: ', lst)



    let new_lst = []
    lst.map((obj, i) =>{
    //set total_cost by calling get Costs
                   console.log('**********************************************************called by: ', obj['id'])
                   let new_obj = {
                     name: obj['name'],
                     id: obj['id'],
                     total: 0,
                   }
                   new_lst.push(new_obj)
                 } )
    //let new_lst = lst

    console.log('new list: ', new_lst)



    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start' }}>
        <Header
          leftComponent={{ icon: 'home', color: '#fff', onPress:() => this.props.navigation.navigate('Home') }}
          centerComponent={{ text: 'MY GROUPS', style: { color: '#fff', fontSize: 20,} }}
          // rightComponent={{ icon: 'settings', color: '#fff', onPress:() => this.props.navigation.navigate('IndividualGroupSettings') }}
        />
        <Card>
          
          <Card.Title>Welcome {this.props.loginState['userid']}!</Card.Title>

        </Card>
        {
          
        }

        <Card>
          <Card.Title>Total Group Costs</Card.Title>
          <Card.Divider/>
          <View>
            {
              new_lst.map((l, i) => (
                <ListItem key={i} bottomDivider
                // onPress={() => this.props.navigation.navigate('IndividualGroup')}
                onPress={() => {
                                this.clickGroup(l.id, l.name);
                                this.getCosts(l.id, i)}}
                >
                  <ListItem.Content>
                    <ListItem.Title>{l.name}: ${this.state.member_costs[i]}</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              ))
            }
          </View>

        </Card>

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
export default connect(mapStateToProps, mapDispatchToProps)(Profile);