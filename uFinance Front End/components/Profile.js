import React from 'react';

import { Image } from 'react-native'
import { Card, ListItem, Button, Icon, Avatar } from 'react-native-elements'



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
      <View>

        <Card>
          <Avatar
          size = "medium"
            rounded
            source={{
              uri:
                'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            }}
          />
          <Card.Title>Welcome Tyler!</Card.Title>
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
      </View>
    );
}

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
