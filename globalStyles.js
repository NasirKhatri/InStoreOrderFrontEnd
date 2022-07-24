import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
    TopBar: {
        flexDirection: "row",
        justifyContent: 'flex-end',
    },
    NavItem: {
        margin: 16,
        fontSize: 18,
    },
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
    },
    input: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'lightgray',
        padding: 10,
        borderRadius: 10,
        fontSize: 18,
        alignSelf: 'stretch',
      },
      forgotPassword: {
        color: 'blue',
        fontSize: 16,
        textDecorationLine: 'underline',
        marginVertical: 15,
        textAlign: 'right',
      }
})

export default globalStyles;