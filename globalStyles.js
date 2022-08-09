import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
    AppTitle: {
        fontSize: 54,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'center',
    },
    body: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor: 'white',
    },
    input: {
      // Also update 'PasswordContainer' in case any change in input object
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'lightgray',
        padding: 5,
        paddingLeft: 15,
        borderRadius: 10,
        fontSize: 14,
        alignSelf: 'stretch',
      },
      PasswordContainer: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'lightgray',
        padding: 5,
        paddingLeft: 15,
        borderRadius: 10,
        fontSize: 14,
        alignSelf: 'stretch',
        flexDirection: 'row', justifyContent: 'space-between', paddingRight: 20 
      },
      forgotPassword: {
        color: 'blue',
        fontSize: 14,
        textDecorationLine: 'underline',
        marginVertical: 15,
        textAlign: 'right',
      },
      AppBar: {
        headerStyle: { backgroundColor: '#0080FF'}, headerTitleStyle: {color: 'white'}, headerTintColor: 'white', headerTitleAlign: 'center'
      },
      Checkbox: {
        marginRight: 15, borderColor: 'lightgray', borderRadius: 5
      },
      CheckedColor: {
        color: '#0080FF',
      },
      UploadImage: {
        width: 100, height: 100, borderRadius: 15, marginTop: 10
      },
      ErrorMessages: {
        color: 'red',
        marginLeft: 15
      }
})

export default globalStyles;