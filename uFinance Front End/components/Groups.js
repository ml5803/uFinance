import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import template1 from '../styles/template1.js'
import LinearGradient from 'react-native-linear-gradient';

function Group({navigation}) {
    return (
      <LinearGradient style={template1.container} colors={['#264d73', '#00cca3']}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
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

            <TouchableOpacity
              onPress={() => navigation.navigate('IndividualGroupSettings')}
              style={styles.btn}
            >
              <Text style={template1.btnText}>Settings</Text>
            </TouchableOpacity>
          </View>
          
        </ScrollView>        
      </LinearGradient>
    );
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
