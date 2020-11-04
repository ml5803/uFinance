import React, {Component} from 'react';
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

const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Jack Johns',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Apple',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Peaches',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Blueberry',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Watermellon',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Mellon',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
]

class Group extends Component{
  constructor(){
    super()
    this.state = {
      search:'',
    }
  }

  updateSearch = (search) => {
    this.setState({ search });
  }

  render(){
    const { search } = this.state;
    // If search === 0 then return whole list
    // else map list and pick the ones with the same words in name
    return (
      // <LinearGradient style={template1.container} colors={['#264d73', '#00cca3']}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start' }}>
          <Header
            leftComponent={{ icon: 'home', color: '#fff', onPress:() => this.props.navigation.navigate('Home') }}
            centerComponent={{ text: 'MY GROUPS', style: { color: '#fff', fontSize: 20,} }}
            rightComponent={{ icon: 'settings', color: '#fff', onPress:() => this.props.navigation.navigate('IndividualGroupSettings') }}
          />
          <SearchBar
            placeholder="Type Here..."
            onChangeText={this.updateSearch}
            value={search}
          />
          <View>
            {
              list.map((l, i) => (
                <ListItem key={i} bottomDivider>
                  <Avatar source={{uri: l.avatar_url}} />
                  <ListItem.Content>
                    <ListItem.Title>{l.name}</ListItem.Title>
                    <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              ))
            }
          </View>
          {/* <View style={styles.btnContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('IndividualGroup')}
              style={styles.btn}
            >
              <Text style={template1.btnText}>GroupA</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('IndividualGroup')}
              style={styles.btn}
            >
              <Text style={template1.btnText}>GroupB</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('IndividualGroup')}
              style={styles.btn}
            >
              <Text style={template1.btnText}>GroupC</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('IndividualGroupSettings')}
              style={styles.btn}
            >
              <Text style={template1.btnText}>Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.btn}
            >
              <Text style={template1.btnText}>Back</Text>
            </TouchableOpacity>
          </View> */}

        </ScrollView>        
      // </LinearGradient>
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
  
export default Group;
