import React from 'react'
import { View, Text } from 'react-native'
import Checkbox from 'expo-checkbox'

import globalStyles from '../globalStyles'

export const CheckBoxContainer = ({value, setValue, text}) => {
    return(
        <View style={{ flexDirection: 'row', marginTop: 15 }}>
        <Checkbox
            style={globalStyles.Checkbox}
            value={value}
            onValueChange={setValue}
            color={value ? globalStyles.CheckedColor.color : undefined}
        />
        <Text>{text}</Text>
    </View>
    )
}