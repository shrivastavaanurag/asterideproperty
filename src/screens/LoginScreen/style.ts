import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      justifyContent: 'center',
      backgroundColor: '#fff'
    },
    modalContainer: {
      flex: 1,
      padding: 16,
      justifyContent: 'center',
      backgroundColor: '#fff'
    },
    modalContent: {
      flex: 1,
      justifyContent: 'center',
    },
    label: {
      fontSize: 18,
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 12,
      marginBottom: 16,
    },
    button: {
      backgroundColor: '#84d0ff', justifyContent: 'center', alignItems: 'center', borderRadius: 5, width: '80%', alignSelf: 'center'
    },
    transparentbutton: {
      backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', borderRadius: 5, width: '80%', alignSelf: 'center', marginTop: 10 
    }
  });

  export default styles;