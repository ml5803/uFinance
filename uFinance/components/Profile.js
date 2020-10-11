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

function Profile({navigation}) {
    return (
      <View style={styles.btnContainer}>
        <Text>Profile</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.btn}>
            <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btn}>
            <Text>Prev</Text>
        </TouchableOpacity>
      </View>
    );
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
  
export default Profile;
