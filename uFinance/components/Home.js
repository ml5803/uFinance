import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const HomeScreen = ({navigation}) =>{
    return (
      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={styles.btn}
        >
          <Text>Profile</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          onPress={() => navigation.navigate('Groups')}
          style={styles.btn}
        >
          <Text>Groups</Text>
        </TouchableOpacity>
  
      </View>
    )
}

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
  
export default HomeScreen;
