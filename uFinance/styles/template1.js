import {
  StyleSheet,
} from 'react-native';

const template1 = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#364661',
    },
    topContainer: {
      flex: 1,
      // backgroundColor: '#f57280',
    },  
    btnContainer:{
      flex: 3,
      justifyContent: 'space-around',
      // alignItems: "center",
      paddingHorizontal: 10,
      // backgroundColor: '#0dc9b6',
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
    },
    groupContainer: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    btnText: {
      fontSize: 20,
    }
    
});

export default template1;