import React, {Component} from 'react';

import { Image, ScrollView, Dimensions } from 'react-native'
import { Card, ListItem, Button, Icon, ButtonGroup, Header, CheckBox } from 'react-native-elements'
import { RNCamera } from 'react-native-camera';
import Api from '../API.js';

//import Icon from 'react-native-vector-icons/FontAwesome';


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
        item: null,
        person: null,
        amount: null,
        receipt: null,

        selectedIndex: 0,
        checked: false,
        data: [ 
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
        ],
        data2: [
          {
            name: 'Celia',
            amount: 35,
            avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
            checked: false,
         },
        ],
      }
      this.updateIndex = this.updateIndex.bind(this)
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

    uploadPayment(item, person, amount, receipt){
      let obj = {
        operation: 'insert',
        member_id: person,
        group_id: 'mikegroup',
        expense_name: item,
        expense_amt: amount,
        proof: receipt,
      }
      console.log('*** obj ***', obj);
      Api.post('expense', obj).then(resp => {
        console.log('resp:', resp);
      })
    }

    render () {
      const component1 = () => <Text>Amount Owed</Text>
      const component2 = () => <Text>Add Expense</Text>//<Text onPress={() => this.props.navigation.navigate('IndividualGroupSettings')}>Settings</Text>
      //const buttons = ['Hello', 'World', 'Buttons']
      const buttons = [{ element: component1 }, { element: component2 }]
      const { selectedIndex } = this.state

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
                this.state.selectedIndex==0 ? <View>

                <Card>
                  <Card.Title>Payment Expected</Card.Title>
                  <Card.Divider/>
                  {
                    this.state.data.map((u, i) => {
                      return (
                        <View key={i} style={styles.user}>
                          <View style={styles.inLineContainer}>
                              <Text style={styles.inLineTextSelf}>{username}</Text>
                              <Icon name='arrow-right-alt' />
                              <Text style={styles.inLineTextCost}>{u.amount}</Text>
                              <Icon name='arrow-right-alt' />
                              <Text style={styles.inLineText}>{u.name}</Text>
                              <CheckBox
                                title={u.checked ? 'Paid' : 'Pay'}
                                iconType='material'
                                checkedIcon='clear'
                                uncheckedIcon='add'
                                checked={u.checked}
                                onPress={() => this.updateStatus(i)}
                                containerStyle={{backgroundColor: u.checked ? '#00FA9A' : '#DC143C'}}
                              />
                          </View>
                        </View>
                      );
                    })
                  }
                </Card>

                <Card>
                  <Card.Title>Payment Owed</Card.Title>
                  <Card.Divider/>
                  {
                    this.state.data2.map((u, i) => {
                      return (
                        <View key={i} style={styles.user}>
                          <View style={styles.inLineContainer}>
                              <Text style={styles.inLineTextSelf}>{username}</Text>
                              <Icon name='arrow-right-alt' />
                              <Text style={styles.inLineTextCost}>{u.amount}</Text>
                              <Icon name='arrow-right-alt' />
                              <Text style={styles.inLineText}>{u.name}</Text>
                              <CheckBox
                                title={u.checked ? 'Paid' : 'Pay'}
                                iconType='material'
                                checkedIcon='clear'
                                uncheckedIcon='add'
                                checked={u.checked}
                                onPress={() => this.updateStatus2(i)}
                                containerStyle={{backgroundColor: u.checked ? '#00FA9A' : '#DC143C'}}
                              />
                          </View>
                        </View>
                      );
                    })
                  }
                </Card>
                </View>: null
            }
            {
                this.state.selectedIndex==1 ? <Card>
                <View style={styles.buttonContainer}>
                  <Button
                    icon={{
                      name: "camera-alt",
                      size: 15,
                      color: "white"
                    }}
                    title="Camera"
                    onPress={() => this.props.navigation.navigate('GroupPayment')}
                  />
                </View>
                <Card.Title>Item</Card.Title>
                <Input
                  placeholder='Required'
                  onChangeText={value => this.setState({ item: value })}
                />
                <Card.Title>Who Paid?</Card.Title>
                <Input
                  placeholder='Required'
                  onChangeText={value => this.setState({ person: value })}
                />
                <Card.Title>Amount</Card.Title>
                <Input
                  placeholder='Required'
                  onChangeText={value => this.setState({ amount: value })}
                />
                <Card.Title>Receipt</Card.Title>
                <Input
                  placeholder='Optional'
                  onChangeText={value => this.setState({ receipt: value })}
                />

                <Button
                  title="Submit"
                  onPress={() => this.uploadPayment(this.state.item, this.state.person, this.state.amount, this.state.receipt)}
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
  buttonContainer: {
    marginBottom: 10
  },

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
    marginTop: '10%',
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
    marginBottom: "5%",
    backgroundColor: '#2D5CAD',
    height: 100,
    width: 100,
    borderRadius: 200,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default IndividualGroup;