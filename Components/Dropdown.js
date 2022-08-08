import React from 'react'
import { View } from 'react-native'
import { Picker } from '@react-native-picker/picker';

import globalStyles from '../globalStyles';

export const Dropdown = ({ value, setValue, data }) => {
    return (
        <View style={{ ...globalStyles.input, paddingVertical: 0, }}>
            <Picker
                style={{ marginVertical: -7, marginLeft: -9 }}
                mode='dropdown'
                selectedValue={value}
                onValueChange={(itemValue, itemIndex) =>
                    setValue(itemValue)
                }>
                {
                    data.map((item) => <Picker.Item label={item} value={item} />)
                }
            </Picker>
        </View>
    )
}