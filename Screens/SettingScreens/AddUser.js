import React from 'react'
import { View, TouchableWithoutFeedback, TextInput, ScrollView, Keyboard } from 'react-native'

import { FlatButton } from '../../Components/Button'
import { Dropdown } from '../../Components/Dropdown';
import { CheckBoxContainer } from '../../Components/CheckBoxContainer';

import globalStyles from '../../globalStyles'

export const AddUser = () => {
    const [isChecked, setChecked] = React.useState(true);
    const [gender, setGender] = React.useState('Male');
    const [role, setRole] = React.useState('All');

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={globalStyles.body}>
                <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                    <ScrollView>
                        <TextInput style={globalStyles.input} placeholder="User Name" />
                        <Dropdown value={gender} setValue={setGender} data={['Male', 'Female']}/>
                        <Dropdown value={role} setValue={setRole} data={['Admin', 'Cook', 'Cashier', 'Waiter', 'Cook & Cashier', 'Cook & Waiter', 'Waiter & Cashier', 'All']}/>
                        <TextInput style={globalStyles.input} placeholder="User Email" />
                        <TextInput style={globalStyles.input} placeholder="Password"/>
                        <TextInput keyboardType='numeric' style={globalStyles.input} placeholder="Phone Number (i.e. 0123-1234567)" />
                        <TextInput style={globalStyles.input} placeholder="User Address" />
                        <TextInput style={globalStyles.input} placeholder="Date of Birth" />
                        <TextInput style={globalStyles.input} placeholder="User CNIC" />
                        <CheckBoxContainer value={isChecked} setValue={setChecked} text="Active"/>
                    </ScrollView>
                </View>
                <FlatButton text='Add User' />
            </View>
        </TouchableWithoutFeedback>
    )
}
