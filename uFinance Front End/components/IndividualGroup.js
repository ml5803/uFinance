import React, {Component} from 'react';

import { Image, ScrollView, Dimensions, Linking, TeextInput } from 'react-native'
import { Card, ListItem, Button, Icon, ButtonGroup, Header, CheckBox, Input } from 'react-native-elements'
import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux';
import { updateReceipt } from '../store/actions/updateReceipt.js';
import { bindActionCreators } from 'redux';
import Api from '../API.js';

//import Icon from 'react-native-vector-icons/FontAwesome';

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
    constructor (props) {
      super(props)
      this.state = {
        groupName: props.route.params.name,

        item: null,
        person: null,
        amount: null,
        receipt: null,

        selectedIndex: 0,
        checked: false,
        owner_id: null,
        groupid: null,
        total_cost: 0,
        current_member_id: 0,
        members: {},
        summary: [],
        item_to_add: '',
        member_to_add: '',
        amount_to_add: '',
      }
      this.updateIndex = this.updateIndex.bind(this)
      this.deleteItem = this.deleteItem.bind(this)
      this.get_separate_member_groups = this.get_separate_member_groups.bind(this)
      this.handleTextChange = this.handleTextChange.bind(this)
      this.addItem = this.addItem.bind(this)
      // this.getInfo = this.getInfo.bind(this)
    }

    // componentDidMount() {
    //   this._unsubscribe = this.props.navigation.addListener('focus', () => {
    //       this.getInfo()
    //   });
    // }
  
    // componentWillUnmount() {
    //   this._unsubscribe();
    // }
  
    // get group expense info
    componentDidMount(){
      console.log('---------herererer')
      let members = this.props.memberState.members
      let groupid = this.props.memberState.group_id
      this.setState({members: members, groupid: groupid})
      let obj = {
        operation: 'get',
        group_id: this.props.memberState.group_id,
      }
      Api.post('expense', obj).then(resp => {
        console.log('resp_exe_res:', resp['execution_result'])
        let execution_data = eval(resp['execution_result'])
        console.log(execution_data)
        if (resp["execution_status"]){
          let expense_objects = {}
          let total_cost = this.state.total_cost
          for (let i=0; i < execution_data.length; i++){
            let member_id = execution_data[i].member_id
            let cost = parseFloat(execution_data[i].expense_amt)
            let expense_id = execution_data[i].expense_id
            expense_objects[expense_id] = {
              member_id: member_id,
              item: execution_data[i].expense_name,
              cost: cost,
              proof: execution_data[i].proof,
              date: execution_data[i].date_entered,
            }
            total_cost += cost
            if (member_id in members){ members[member_id] += cost }
            else{ members[member_id] = cost}
          }
          this.setState({summary: expense_objects, total_cost: total_cost})
          console.log(this.state.summary, this.state.total_cost)
          console.log('expense:', members)
        }
      }).catch(function(e){
        console.log(e)
      })
    }
    deleteItem(id, member_id){
      console.log('handle delete')
      let members = this.state.members
      let obj = {
        operation: 'delete',
        expense_id: id,
      }
      console.log('id:', id)
      console.log('items:', this.state.item_lst)
      let item_lst = this.state.summary
      let total_cost = this.state.total_cost
      total_cost -= item_lst[id].cost
      members[member_id] -= item_lst[id].cost

      Api.post('expense', obj).then(resp => {
        console.log('delete_resp:', resp)
      }).catch(function(e){
        console.log(e)
      })

      delete item_lst[id]
      this.setState({summary: item_lst, total_cost: total_cost})
    }

    updateIndex (selectedIndex) {
      this.setState({selectedIndex})
    }

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
    get_separate_member_groups(){
      let members = this.state.members
      let avg_cost = parseFloat(this.state.total_cost/Object.keys(members).length).toFixed(5)
      let members_to_pay = []
      let members_to_receive = []
      console.log('avg', avg_cost)
      for (let key in members){
        let amt = parseFloat((members[key] - avg_cost).toFixed(5))
        // let amt = (members[key] - avg_cost)
        console.log('=======amt:', amt)
        if (amt > 0){
          members_to_receive.push([key, amt])
        }
        else if(amt < 0){
          amt *= -1
          members_to_pay.push([key, amt])
        }
      }
      console.log('------', members_to_pay)
      console.log('-----', members_to_receive)
      return [members_to_pay, members_to_receive]
    }
    distribute_cost(members_to_pay, members_to_receive){
      let payment_list = []
      let index= 0
      let index2 = 0
      while(index < members_to_pay.length || index2 < members_to_receive.length){
        let name1, amt1;
        let name2, amt2;
        console.log('index1:', index, ' index2:', index2);
        console.log('members to pay: ', members_to_pay[index][0]);
        [name1, amt1] = [members_to_pay[index][0], members_to_pay[index][1]];
        [name2, amt2] = [members_to_receive[index2][0], members_to_receive[index2][1]];
        console.log('index1:', index, ' index2:', index2)
        console.log('name1:', name1, amt1, parseFloat(amt1).toFixed(2))
        console.log('name2:', name2, amt2, parseFloat(amt2).toFixed(2))
        let rounded_amt1 = parseFloat(amt1).toFixed(2)
        let rounded_amt2 = parseFloat(amt2).toFixed(2)
        /*let rounded_amt1 = Math.round(parseFloat(amt1)*100)/100
        let rounded_amt2 = Math.round(parseFloat(amt2)*100)/100*/
        let new_obj = {}
        if (rounded_amt1 < rounded_amt2){
          members_to_receive[index2][1] = parseFloat(amt2-amt1).toFixed(5)
          new_obj = {name1: name1, name2: name2, amt: rounded_amt1}
          payment_list.push(new_obj)
          index++
        }
        else if (rounded_amt1 > rounded_amt2){
          members_to_pay[index][1] = parseFloat(amt1-amt2).toFixed(5)
          new_obj = {name1: name1, name2: name2, amt: rounded_amt2}
          payment_list.push(new_obj)
          index2++
        }
        else if(rounded_amt1 === rounded_amt2){
          new_obj = {name1: name1, name2: name2, amt: rounded_amt2}
          payment_list.push(new_obj)
          index++
          index2++
        }
      }
      return payment_list
    }
    handleTextChange(text, index){
      if (index===1){
        this.setState({item_to_add: text})
      }
      else if (index===2){
        this.setState({member_to_add: text})
      }
      else{
        this.setState({amount_to_add: text})
      }
      console.log('added', text)
    }

    addItem(){
      console.log('in insert')
      let item = this.state.item_to_add
      let member = this.state.member_to_add
      let amount = parseFloat(this.state.amount_to_add)
      if (!amount){return }
      console.log('amount is good')
      console.log(amount)
      if (item.length !== 0 && member.length !== 0){
        let obj = {
          "operation": "insert",
          "member_id": member,
          "group_id": this.state.groupid,
          "expense_name": item,
          "expense_amt": amount,
          "proof":"somewhereontheweb.com"
        }
        Api.post('expense', obj).then(resp =>{
          console.log('insert resp:', resp)
        }).catch(function(e){
          console.log(e)
        })
      }

    }

    uploadPayment(){
      console.log('state item: ', this.state.item);

      let item = this.state.item ? this.state.item: this.props.receiptState['item']
      let person = this.state.person ? this.state.person: this.props.loginState['userid']
      let amount = this.state.amount ? this.state.amount: this.props.receiptState['cost']
      let receipt = this.state.receipt ? this.state.receipt: this.props.receiptState['receipt']
      console.log('item: ', item, ' person: ', person, ' amount: ', amount, ' receipt: ', receipt);

      let obj = {
        operation: 'insert',
        member_id: person,
        group_id: this.state.groupid,
        expense_name: item,
        expense_amt: amount,
        proof: receipt,
      }
      console.log('*** obj ***', obj);
      Api.post('expense', obj).then(resp => {
        console.log('resp:', resp);
      }).catch(function(e){
        console.log(e)
      })
      this.setState({item: null, person: null, amount: null, receipt: null});
      this.props.updateReceipt('', '', '', '');
    }

    render () {
      console.log('redux stuff: ', this.props.receiptState['receipt'])
      let item = this.props.receiptState['item']
      let person = this.props.loginState['userid']
      let amount = this.props.receiptState['cost']
      let receipt = this.props.receiptState['receipt']

      //this.setState({item: {this.props.receiptState['item']}, {person: this.props.loginState['userid']} , {amount: this.props.receiptState['cost']} , {receipt: this.props.receiptState['url']}});
      const component1 = () => <Text>Summary</Text>
      const component2 = () => <Text>Items</Text>
      const component3 = () => <Text>Add Expense</Text>
      
      //<Text onPress={() => this.props.navigation.navigate('IndividualGroupSettings')}>Settings</Text>
      //const buttons = ['Hello', 'World', 'Buttons']
      const buttons = [{ element: component1 }, { element: component2 }, { element: component3 }]
      const { selectedIndex } = this.state

      const itemInput = React.createRef();
      const personInput = React.createRef();
      const amountInput = React.createRef();
      const receiptInput = React.createRef();
      // seperate members to pay and receive groups
      let members = this.state.members
      let avg_cost = parseFloat(this.state.total_cost/Object.keys(members).length).toFixed(2)
      let members_to_pay, members_to_receive
      [members_to_pay, members_to_receive] = this.get_separate_member_groups()
      let payment_list = []
      if (Object.keys(members).length > 1){
        payment_list = this.distribute_cost(members_to_pay, members_to_receive)
      }
      let item_lst = this.state.summary
      console.log('item:', this.state.item_to_add)
      console.log('redux:--', this.state.members, this.state.groupid)
      return (
        <ScrollView>
            <Header
              leftComponent={{ icon: 'chevron-left', type:'FontAwesome', color: '#fff', onPress:() => this.props.navigation.navigate('Groups') }}
              centerComponent={{ text: this.state.groupName, style: { color: '#fff', fontSize: 20,} }}
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

              </View> 
              :
              this.state.selectedIndex===1 ? <View>
                {Object.keys(item_lst).map((key, index) => {
                  return(
                    <Card key={'s'+index}>
                      <View style={styles.cardTitle}>
                        <Text style={styles.itemName}> {item_lst[key].item} | </Text>
                        <Text style={styles.memberName}>{item_lst[key].member_id} | </Text>
                        <Text style={styles.costLabel}>${item_lst[key].cost} | </Text>
                        <TouchableOpacity
                        onPress={() => Linking.openURL(item_lst[key].proof)}>
                          <Text style={styles.proofLabel}>Proof</Text>
                        </TouchableOpacity>
                        <Text style={styles.dateLabel}> ({item_lst[key].date})</Text>
                      </View>
                      <Card.Divider/>
                      <View style={styles.boxContainer}>
                        <Button
                          title="Delete"
                          titleStyle={styles.submitbtn}
                          buttonStyle={{backgroundColor: 'red'}}
                          onPress={() => this.deleteItem(key, item_lst[key].member_id)}
                        />
                      </View>
                    </Card>
                  )
                })}
              </View>: null
            }
            {
                this.state.selectedIndex==2 ? <Card>
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
                  ref={itemInput}
                  placeholder= {item}
                  onChangeText={value => this.setState({ item: value })}
                />
                <Card.Title>Who Paid?</Card.Title>
                <Input
                  ref={personInput}
                  placeholder= {this.props.loginState['userid']}

                  onChangeText={value => this.setState({ person: value })}
                />
                <Card.Title>Amount</Card.Title>
                <Input
                  ref={amountInput}
                  placeholder={amount}
                  onChangeText={value => this.setState({ amount: value })}
                />
                <Card.Title>Receipt</Card.Title>
                <Input
                  ref={receiptInput}
                  placeholder={receipt}
                  onChangeText={value => this.setState({ receipt: value })}
                />

                <Button
                  title="Submit"
                  onPress={() => {console.log("****************************************************************");
                                  console.log('input: ', this.state.item, this.state.person, this.state.amount, this.state.receipt);
                                  this.uploadPayment();//this.state.item, this.state.person, this.state.amount, this.state.receipt);
                                  itemInput.current.clear();
                                  personInput.current.clear();
                                  amountInput.current.clear();
                                  receiptInput.current.clear()}}
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
    // margin: 10,
    justifyContent:'flex-start',
    alignItems: 'flex-start',
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
    fontSize: 15,
    width: 50,
  },
  textBox: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardTitle:{
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    fontWeight: 'bold'
  }, 
  itemName: {
    fontWeight: 'bold',
    color: '#173F5F',
  },
  memberName: {
    fontWeight: 'bold',
    color: 'black',
  },
  costLabel: {
    fontWeight: 'bold',
    color: '#3CAEA3',
    
  },
  proofLabel: {
    fontWeight: 'bold',
    color: '#20639B',
    textDecorationLine: 'underline',
  },
  dateLabel: {
    fontWeight: 'bold',
    // color: '#ED553B',
    color: 'black',
  },

});

const mapStateToProps = state => ({
  loginState: state.loggedin,
  memberState: state.members,
  receiptState: state.receipt,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    updateReceipt,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(IndividualGroup);