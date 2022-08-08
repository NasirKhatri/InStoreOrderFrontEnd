import React from 'react'
import { View, TouchableWithoutFeedback, TextInput, ScrollView, Keyboard } from 'react-native'

import { FlatButton } from '../../Components/Button'
import { Dropdown } from '../../Components/Dropdown';
import { CheckBoxContainer } from '../../Components/CheckBoxContainer';

import globalStyles from '../../globalStyles'

export const AddRider = () => {
    const [isChecked, setChecked] = React.useState(true);
    const [branch, setBranch] = React.useState('Branch A');

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={globalStyles.body}>
                <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                    <ScrollView>
                        <TextInput style={globalStyles.input} placeholder="Rider Name" />
                        <TextInput style={globalStyles.input} placeholder="License No"/>
                        <TextInput keyboardType='numeric' style={globalStyles.input} placeholder="Phone Number (i.e. 0123-1234567)" />
                        <Dropdown value={branch} setValue={setBranch} data={['Branch A', 'Branch B']}/>
                        <CheckBoxContainer value={isChecked} setValue={setChecked} text="Active"/>
                    </ScrollView>
                </View>
                <FlatButton text='Add Rider' />
            </View>
        </TouchableWithoutFeedback>
    )
}
