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
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'lightgray',
        padding: 5,
        borderRadius: 10,
        fontSize: 14,
        alignSelf: 'stretch',
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
      }
})

export default globalStyles;