import React from 'react'
import { View, TouchableWithoutFeedback, TextInput, ScrollView, Keyboard } from 'react-native'

import { FlatButton } from '../../Components/Button'
import { Dropdown } from '../../Components/Dropdown';
import { CheckBoxContainer } from '../../Components/CheckBoxContainer';

import globalStyles from '../../globalStyles'

export const AddTable = () => {
    const [branch, setBranch] = React.useState('Branch A');

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={globalStyles.body}>
                <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                    <ScrollView>
                        <TextInput style={globalStyles.input} placeholder="Table Name" />
                        <Dropdown value={branch} setValue={setBranch} data={['Branch A', 'Branch B']}/>
                    </ScrollView>
                </View>
                <FlatButton text='Add Table' />
            </View>
        </TouchableWithoutFeedback>
    )
}
