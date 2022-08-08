import React from 'react'
import { View, TouchableWithoutFeedback, TextInput, ScrollView, Keyboard } from 'react-native'

import { FlatButton } from '../../Components/Button'

import globalStyles from '../../globalStyles'

export const AddBranch = () => {

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={globalStyles.body}>
                <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                    <ScrollView>
                        <TextInput style={globalStyles.input} placeholder="Branch Name" />
                        <TextInput style={globalStyles.input} placeholder="Branch Address" />
                        <TextInput keyboardType='numeric' style={globalStyles.input} placeholder="Phone Number (i.e. 0123-1234567)" />
                    </ScrollView>
                </View>
                <FlatButton text='Add Branch' />
            </View>
        </TouchableWithoutFeedback>
    )
}