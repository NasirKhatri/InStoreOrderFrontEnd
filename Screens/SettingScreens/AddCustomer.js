import React from 'react'
import { Text, View, TouchableWithoutFeedback, TextInput, ScrollView, Keyboard } from 'react-native'
import Checkbox from 'expo-checkbox'
import { Picker } from '@react-native-picker/picker';

import { FlatButton } from '../../Components/Button'

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
                        <View style={{ ...globalStyles.input, paddingVertical: 0, }}>
                            <Picker
                                style={{ marginVertical: -7 }}
                                mode='dropdown'
                                selectedValue={gender}
                                onValueChange={(itemValue, itemIndex) =>
                                    setGender(itemValue)
                                }>
                                <Picker.Item label="Male" value="Male" />
                                <Picker.Item label="Female" value="Female" />
                            </Picker>
                        </View>
                        <TextInput style={globalStyles.input} placeholder="Customer Address" />
                        <TextInput keyboardType='numeric' style={globalStyles.input} placeholder="Phone Number (i.e. 0123-1234567)" />
                        <TextInput style={globalStyles.input} placeholder="Customer Email" />
                        <TextInput style={globalStyles.input} placeholder="Date of Birth" />
                        <TextInput style={globalStyles.input} placeholder="Customer CNIC" />
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Checkbox
                                style={globalStyles.Checkbox}
                                value={isChecked}
                                onValueChange={setChecked}
                                color={isChecked ? globalStyles.CheckedColor.color : undefined}
                            />
                            <Text>Credit Customer</Text>
                        </View>
                    </ScrollView>
                </View>
                <FlatButton text='Add Customer' />
            </View>
        </TouchableWithoutFeedback>
    )
}