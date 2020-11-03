import React, {Component} from 'react';

import { Image, ScrollView } from 'react-native'
import { Card, ListItem, Button, Icon, ButtonGroup } from 'react-native-elements'
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
        selectedIndex: 0
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

    render () {
      const component1 = () => <Text>Cost Owed</Text>
      const component2 = () => <Text>Add Cost</Text>//<Text onPress={() => this.props.navigation.navigate('IndividualGroupSettings')}>Settings</Text>
      //const buttons = ['Hello', 'World', 'Buttons']
      const buttons = [{ element: component1 }, { element: component2 }]
      const { selectedIndex } = this.state

      return (
        <ScrollView>
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

            <Card>
              <Text>
                  Money Owed
              </Text>
                <BarChart
                    // style={graphStyle}
                    data={barData}
                    width={300}
                    height={220}
                    yAxisLabel={'$'}
                    chartConfig={{
                          backgroundColor: "#e26a00",
                                backgroundGradientFrom: "#fb8c00",
                                backgroundGradientTo: "#ffa726",
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                fillShadowGradientOpacity: 1,
                                style: {
                                  borderRadius: 16
                                },
                                propsForDots: {
                                  r: "6",
                                  strokeWidth: "2",
                                  stroke: "#ffa726"
                                }
                        }}
                />
            </Card>
            {
                this.state.selectedIndex==0 ? <Card>
                  <Card.Title>Table of Payments</Card.Title>
                  <Card.Divider/>
                  {
                    users.map((u, i) => {
                      return (
                        <View key={i} style={styles.user}>
                          <Image
                            style={styles.image}
                            resizeMode="cover"
                            source={{ uri: u.avatar }}
                          />
                          <Text style={styles.name}>{u.name}</Text>
                        </View>
                      );
                    })
                  }
                </Card> : null
            }
            {
                this.state.selectedIndex==1 ? <Card>
                <Button
                  icon={{
                    name: "camera-alt",
                    size: 15,
                    color: "white"
                  }}
                  title="Camera"
                />
                <Text>Item</Text>
                <Input
                  placeholder='BASIC INPUT'
                />
                <Text>Who Paid?</Text>
                <Input
                  placeholder='BASIC INPUT'
                />
                <Text>Cost</Text>
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

const users = [
 {
    name: 'Alex: $25',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
 },

 {
     name: 'Ben: $-45',
     avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
  },

  {
       name: 'Celia: $28',
       avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
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