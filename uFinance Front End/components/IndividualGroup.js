import React, {Component} from 'react';

import { Image, ScrollView, Linking } from 'react-native'
import { Card, ListItem, Button, Icon, ButtonGroup, Header, CheckBox } from 'react-native-elements'
import { RNCamera } from 'react-native-camera';
//import Icon from 'react-native-vector-icons/FontAwesome';
import Api from '../API.js'


import { Input } from 'react-native-elements';

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

class IndividualGroup extends Component {
    constructor () {
      super()
      this.state = {
        selectedIndex: 0,
        checked: false,
        groupid: null, 
        total_cost: 1070,
        current_member_id: 0,
        members: {
          0:{
            name: 'ben',
            paid: 110,
            to_pay: 0,
          },
          1:{
            name: 'ben2',
            paid: 100,
            to_pay: 0,
          },
          2:{
            name: 'a1',
            paid: 60,
            to_pay: 0,
          },
          3:{
            name: 'a2',
            paid: 800,
            to_pay: 0,
          }
        },
        summary: [
          {
            name: 'ben',
            item: 'soda',
            cost: 100.00,
            proof: 'http://google.com'
          },
          {
            name: 'ben2',
            item: 'soda',
            cost: 100.00,
            proof: 'http://google.com'
          },
        ],
        data: [ 
          {
          member_id: 0,
          name: 'Alex',
          amount: 25,
          avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
          checked: false,
          },
          
          {
            member_id: 1,
            name: 'Ben',
            amount: 17,
            avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
            checked: false,
          }
        ],
        data2: [
          {
            member_id: 3,
            name: 'Celia',
            amount: 35,
            avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
            checked: false,
         },
        ],
      }
      this.updateIndex = this.updateIndex.bind(this)
      this.deleteItem = this.deleteItem.bind(this)
    }

    // get group expense info 
    componentDidMount(){
      let obj = {
        operation: 'get',
        group_id: 'mikegroup',
      }
      Api.post('expense', obj).then(resp => {
        console.log('resp:', resp)
        // let json = JSON.parse(resp["execution_result"])
        if (resp["execution_status"]){
          let summary_list = resp['execution_result'] 
          let obj_lst = []
          let total_cost = 0
          // for (let i=0; i < summary_list.length; i++){
        //     let new_obj = {
        //       name: summary_list[i][2],
        //       item: summary_list[i][4],
        //       cost: summary_list[i][5],
        //       proof: summary_list[i][6],
        //     }
        //     total_cost += summary_list[i][5]
        //     obj_lst.push(new_obj)
          // }
        //   this.setState({summary: obj_lst, total_cost: total_cost})
        //   console.log(this.state.summary, this.state.total_cost)
        }
      })
    }
    deleteItem(e){
      console.log('handle delete')
      // post to delete
      // update total cost
      // update average cost
    }

    updateIndex (selectedIndex) {
      this.setState({selectedIndex})
    }

    /*function Costs() {
      return ()
    }

    function selectDisplay (selectedIndex) {
      if(selectedIndex == 0){

      }
    }*/

    updateStatus(index){
      let newData = this.state.data
      newData[index].checked = !newData[index].checked
      this.setState({data: newData})
    }
    updateStatus2(index){
      let newData = this.state.data2
      newData[index].checked = !newData[index].checked
      this.setState({data2: newData})
    }

    render () {
      const component1 = () => <Text>Summary</Text>
      const component2 = () => <Text>Amount Owed</Text>
      const component3 = () => <Text>Add Expense</Text>
      
      //<Text onPress={() => this.props.navigation.navigate('IndividualGroupSettings')}>Settings</Text>
      //const buttons = ['Hello', 'World', 'Buttons']
      const buttons = [{ element: component1 }, { element: component2 }, { element: component3 }]
      const { selectedIndex } = this.state

      // seperate members to pay and receive groups
      let members = this.state.members
      let avg_cost = this.state.total_cost/Object.keys(members).length
      let members_to_pay = []
      let members_to_receive = []
      for (let key in members){
        let amt = members[key].paid - avg_cost
        if (amt > 0){
          members_to_receive.push([members[key].name, amt])
        }
        else if(amt < 0){
          amt *= -1
          members_to_pay.push([members[key].name, amt])
        }
      }
      console.log('avg:', avg_cost)
      console.log('m:', members)
      console.log('1:', members_to_pay)
      console.log('2',members_to_receive)
      let payment_list = []
      let index= 0
      let index2 = 0
      // distribute cost 
      while(index < members_to_pay.length || index2 < members_to_receive.length){
        let name1, amt1;
        let name2, amt2;
        [name1, amt1] = [members_to_pay[index][0], members_to_pay[index][1]];
        [name2, amt2] = [members_to_receive[index2][0], members_to_receive[index2][1]];
        console.log('name1:', name1, amt1)
        console.log('name2:', name2, amt2)
        let new_obj = {}
        if (amt1 < amt2){
          members_to_receive[index2][1] -= amt1
          new_obj = {name1: name1, name2: name2, amt: amt1}
          payment_list.push(new_obj)
          index++
        }
        else if (amt1 > amt2){
          members_to_pay[index][1] -= amt2
          new_obj = {name1: name1, name2: name2, amt: amt2}
          payment_list.push(new_obj)
          index2++
        }
        else{
          new_obj = {name1: name1, name2: name2, amt: amt2}
          payment_list.push(new_obj)
          index++
          index2++
        }
      }
      return (
        <ScrollView>
            <Header
              leftComponent={{ icon: 'chevron-left', type:'FontAwesome', color: '#fff', onPress:() => this.props.navigation.navigate('Groups') }}
              centerComponent={{ text: 'Group A', style: { color: '#fff', fontSize: 20,} }}
            />
            <View
              style={{
                flexDirection: "row-reverse",
                height: 100,
                padding: 20
              }}
            >
              <Icon
                reverse
                name='settings'
                type='ionicon'
                color='#517fa4'
                onPress={() => this.props.navigation.navigate('IndividualGroupSettings')}
              />

              <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={selectedIndex}
                buttons={buttons}
                containerStyle={{height: 150}, {width: 250}}
              />

            </View>


            {
              this.state.selectedIndex===0 
              ? 
              <View>
                  <Card>
                    <Card.Title>Total Spendings</Card.Title>
                    <Card.Divider/>
                    <View style={styles.user}>
                        <View style={styles.textBox}>
                            <Text style={{fontSize: 30}}>
                              ${this.state.total_cost}
                            </Text>
                        </View>
                    </View>
                  </Card>
                  {this.state.summary.map((obj, index) => {
                    return(
                      <Card key={'s'+index}>
                        <Card.Title>
                          {obj.item} ({obj.name})
                        </Card.Title>
                        <Card.Divider/>
                        <View style={styles.textBox}>
                          <Text style={{fontSize: 30}}>${obj.cost}</Text>
                          <TouchableOpacity
                          onPress={() => Linking.openURL(obj.proof)}>
                            <Text>{obj.proof}</Text>
                          </TouchableOpacity>
                        </View>     
                        <View style={styles.boxContainer}>
                          <Button 
                            title="Delete"
                            titleStyle={styles.submitbtn}
                            buttonStyle={{backgroundColor: 'red'}}
                            onPress={(e) => this.deleteItem(e)}
                          />
                        </View>              
                      </Card>
                    )
                  })}
              </View> 
              :
              this.state.selectedIndex===1 ? <View>

                <Card>
                  <Card.Title>Payment Expected</Card.Title>
                  <Card.Divider/>
                  {
                    payment_list.map((obj, i) => {
                      return (
                        <View key={i} style={styles.user}>
                          <View style={styles.inLineContainer}>
                              <Text style={styles.inLineTextSelf}>{obj.name1}</Text>
                              <Icon name='arrow-right-alt' />
                              <Text style={styles.inLineTextCost}>${obj.amt}</Text>
                              <Icon name='arrow-right-alt' />
                              <Text style={styles.inLineText}>{obj.name2}</Text>
                          </View>
                        </View>
                      );
                    })
                  }
                </Card>

    
                </View>: null
            }
            {
                this.state.selectedIndex===2 ? <Card>
                <Button
                  icon={{
                    name: "camera-alt",
                    size: 15,
                    color: "white"
                  }}
                  title="Camera"
                  onPress={() => this.props.navigation.navigate('GroupPayment')}
                />
                <Text>Item</Text>
                <Input
                  placeholder='BASIC INPUT'
                />
                <Text>Who Paid?</Text>
                <Input
                  placeholder='BASIC INPUT'
                />
                <Text>Amount</Text>
                <Input
                  placeholder='BASIC INPUT'
                />

                </Card> : null
            }
        </ScrollView>

      )
    }
}

//const component1 = () => <Text>Hello</Text>
//const component2 = () => <Text onPress={() => this.props.navigation.navigate('IndividualGroupSettings')}>Settings</Text>
//const component3 = () => <Text>ButtonGroup</Text>
const username = "Tyler"

let owedMoney = [
 {
    name: 'Alex',
    amount: 25,
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
    checked: false,
 },

 {
   name: 'Ben',
   amount: 17,
   avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
   checked: false,
 }
 // more users here
]

const oweMoney = [
 {
    name: 'Celia',
    amount: 35,
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
    checked: false,
 }
 // more users here
]

const barData = {
      labels: ['Alex', 'Ben', 'Celia'],
      datasets: [
        {
          data: [20, -45, 28],
          strokeWidth: 2, // optional
        },
      ],
    };

/*const styles = StyleSheet.create({
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
});*/



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
  nameContainer: {
    marginTop: '10%',
    justifyContent:'center',
    alignItems: 'center',
  },
  boxContainer: {
    margin: 10,
    justifyContent:'center',
    alignItems: 'center',
  },
  boxText: {
    color: 'white',
    fontSize: 20,
    marginBottom: 10,
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
    borderColor: 'white',
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
    borderColor: 'white',
    // backgroundColor: '#990000',
  },
  addButton: {
    // marginTop: '5%',
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
    // marginBottom: "5%",
    // backgroundColor: '#193361',
    width: "50%",
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitbtn: {
    fontSize: 20,
    width: 200,
  },
  textBox: {
    justifyContent: 'center',
    alignItems: 'center'
  }

});

export default IndividualGroup;