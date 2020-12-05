import React from 'react';

import { Image, ScrollView } from 'react-native'
import { Card, ListItem, Button, Icon, Avatar, Header } from 'react-native-elements'



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

function Profile({navigation}) {
    return (
      <ScrollView>
        <Header
          leftComponent={{ icon: 'home', color: '#fff', onPress:() => navigation.navigate('Home') }}
          centerComponent={{ text: 'Profile', style: { color: '#fff', fontSize: 20,} }}
        />
        <Card>
          <Avatar
          size = "medium"
            rounded
            source={{
              uri:
                'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            }}
          />
          <Card.Title>Welcome {username}!</Card.Title>
          <Card.Divider/>
            {
              owedMoney.map((u, i) => {
                return (
                  <View key={i} style={styles.user}>
                    <View style={styles.inLineContainer}>
                        <Text style={styles.inLineText}>{u.name}</Text>
                        <Icon
                          name='arrow-right-alt' />
                          <View style={styles.inLineContainer}>
                              <Text style={styles.inLineTextCost}>{u.amount}</Text>
                              <Icon
                                name='arrow-right-alt' />
                                <Text style={styles.inLineTextSelf}>{username}</Text>
                          </View>
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
              oweMoney.map((u, i) => {
                return (
                  <View key={i} style={styles.user}>
                    <View style={styles.inLineContainer}>
                        <Text style={styles.inLineTextSelf}>{username}</Text>
                        <Icon
                          name='arrow-right-alt' />
                          <View style={styles.inLineContainer}>
                              <Text style={styles.inLineTextCost}>{u.amount}</Text>
                              <Icon
                                name='arrow-right-alt' />
                                <Text style={styles.inLineText}>{u.name}</Text>
                          </View>
                    </View>
                  </View>
                );
              })
            }
          </Card>

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
      </ScrollView>
    );
}

const username = "Tyler"

const owedMoney = [
 {
    name: 'Alex',
    amount: 25,
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
 },

 {
   name: 'Ben',
   amount: 17,
   avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
 }
 // more users here
]

const oweMoney = [
 {
    name: 'Celia',
    amount: 35,
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
 }
 // more users here
]

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
});
  
export default Profile;
