import React from 'react'
import { View, TouchableWithoutFeedback, TextInput, ScrollView, Keyboard } from 'react-native'

import { FlatButton } from '../../Components/Button'
import { Dropdown } from '../../Components/Dropdown';
import { CheckBoxContainer } from '../../Components/CheckBoxContainer';

import globalStyles from '../../globalStyles'

export const AddCustomer = () => {
    const [isChecked, setChecked] = React.useState(false);
    const [gender, setGender] = React.useState('Male');
    
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={globalStyles.body}>
                <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                    <ScrollView>
                        <TextInput style={globalStyles.input} placeholder="Customer Name" />
                        <TextInput style={globalStyles.input} placeholder="Customer Gender" />
                        <Dropdown value={gender} setValue={setGender} data={['Male', 'Female']}/>
                        <TextInput style={globalStyles.input} placeholder="Customer Address" />
                        <TextInput keyboardType='numeric' style={globalStyles.input} placeholder="Phone Number (i.e. 0123-1234567)" />
                        <TextInput style={globalStyles.input} placeholder="Customer Email" />
                        <TextInput style={globalStyles.input} placeholder="Date of Birth" />
                        <TextInput style={globalStyles.input} placeholder="Customer CNIC" />
                        <CheckBoxContainer value={isChecked} setValue={setChecked} text="Credit Customer"/>
                    </ScrollView>
                </View>
                <FlatButton text='Add Customer' />
            </View>
        </TouchableWithoutFeedback>
    )
}