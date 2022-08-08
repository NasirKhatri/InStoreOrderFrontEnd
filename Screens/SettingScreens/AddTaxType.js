import React from 'react'
import { View, TouchableWithoutFeedback, TextInput, ScrollView, Keyboard } from 'react-native'

import { FlatButton } from '../../Components/Button'
import { Dropdown } from '../../Components/Dropdown';
import { CheckBoxContainer } from '../../Components/CheckBoxContainer';

import globalStyles from '../../globalStyles'

export const AddTaxType = () => {
    const [isChecked, setChecked] = React.useState(true);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={globalStyles.body}>
                <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                    <ScrollView>
                        <TextInput style={globalStyles.input} placeholder="Tax Type Name" />
                        <TextInput keyboardType='numeric' style={globalStyles.input} placeholder="Tax Rate (in %)" />
                        <CheckBoxContainer value={isChecked} setValue={setChecked} text="Calculate Tax Before Discount"/>
                    </ScrollView>
                </View>
                <FlatButton text='Add Tax Type' />
            </View>
        </TouchableWithoutFeedback>
    )
}