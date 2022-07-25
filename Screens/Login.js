import * as React from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import globalStyles from '../globalStyles';
import {FlatButton} from '../Components/Button.js';
import LoginSubscribeFooter from '../Components/LoginSubscribeFooter';

const LoginScreen = ({ navigation }) => {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={globalStyles.body}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={globalStyles.AppTitle}>Dine In</Text>
                    <TextInput style={globalStyles.input} placeholder="Enter your email address" />
                    <TextInput style={globalStyles.input} placeholder="Enter your password" />
                    <Text style={globalStyles.forgotPassword}>Forgot Password?</Text>
                    <FlatButton text='Login' />
                </View>
                <LoginSubscribeFooter text1='Do not have account?' text2='Subscribe' linkTo='Packages' navigation={navigation} />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default LoginScreen;