import {
  StyleSheet,
} from 'react-native';

const template1 = StyleSheet.create({
    container: {
      // height: '100%',
      flex: 1,
      backgroundColor: '#364661',
    },
    topContainer: {
      // backgroundColor: '#f57280',
    },  
    btnContainer:{
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
      borderRadius: 25,
      borderColor: 'white',
      borderWidth: 1,
    },
    groupContainer: {
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    btnText: {
      color: 'white',
      fontSize: 20,
    }
    
});

export default template1;