import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import template1 from '../styles/template1.js'

function Group({navigation}) {
    return (
      <View style={template1.container}>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btn}
          >
            <Text style={template1.btnText}>GroupA</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
          >
            <Text style={template1.btnText}>GroupB</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
          >
            <Text style={template1.btnText}>GroupC</Text>
          </TouchableOpacity>
        </View>        
      </View>
    );
}

const styles = StyleSheet.create({
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn:{
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 50,
    marginHorizontal: '25%',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: '5%',
  },

});
  
export default Group;
