import * as React from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import globalStyles from '../globalStyles';
import FlatButton from '../Components/Button.js';
import LoginSubscribeFooter from '../Components/LoginSubscribeFooter';

const SubscriptionForm = ({ navigation }) => {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={globalStyles.body}>
                    <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                        <TextInput style={globalStyles.input} placeholder="Enter full name" />
                        <TextInput style={globalStyles.input} placeholder="Enter email address" />
                        <TextInput keyboardType='numeric' style={globalStyles.input} placeholder="Enter Phone Number (i.e. 0123-1234567)" />
                        <TextInput style={globalStyles.input} placeholder="Enter password" />
                        <TextInput style={globalStyles.input} placeholder="Retype password" />
                        <Text style={{ marginVertical: 10 }}>By clicking Subscribe button, you agree to our <Text style={globalStyles.forgotPassword}>Terms and Conditions</Text></Text>
                        <FlatButton text='Subscribe' />
                    </View>
                    <LoginSubscribeFooter text1='Already have account?' text2='Login' linkTo='Login' navigation={navigation} />
                </View>
        </TouchableWithoutFeedback>
    )
}

export default SubscriptionForm;