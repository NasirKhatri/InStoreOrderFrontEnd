import React from 'react'
import { Text, View, Image, TextInput, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native'
import Checkbox from 'expo-checkbox'
import { UploadImage } from '../../SharedFunctions.js/UploadImage';

import { FlatButton, POSButton1 } from '../../Components/Button';

import globalStyles from '../../globalStyles';

export const AddItem = () => {
    const [itemInPos, setItemInPos] = React.useState(true);
    const [imageInPos, setImageInPos] = React.useState(false);
    const [image, setImage] = React.useState(null);
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={globalStyles.body}>
                <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'flex-start' }}>
                    <TextInput style={globalStyles.input} placeholder="Item Name" />
                    <TextInput style={globalStyles.input} placeholder="Unit"/>
                    <TextInput style={globalStyles.input} placeholder='Purchase Rate'/>
                    <TextInput style={globalStyles.input} placeholder='Sales Rate (Exc. Taxes and Discount)'/>
                    <TextInput style={globalStyles.input} placeholder='Discount (In %)'/>
                    <TextInput style={globalStyles.input} placeholder="Tax Type"/>
                    <TextInput style={globalStyles.input} placeholder="Sales Rate (Inc. Taxes and Discount)"/>
                    <TextInput style={globalStyles.input} placeholder="Category"/>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        {!image ? <POSButton1 onPress={() => UploadImage(setImage)} text='Select Image' /> : <></>}
                        {image ? <POSButton1 onPress={() => UploadImage(setImage)} text='Change Image' /> : <></>}
                        {image ? <POSButton1 onPress={() => setImage(null)} text='Delete Image' /> : <></>}
                    </View>
                    {image && <Image source={{ uri: image.uri }} style={globalStyles.UploadImage} />}
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <Checkbox
                            style={globalStyles.Checkbox}
                            value={itemInPos}
                            onValueChange={setItemInPos}
                            color={itemInPos ? globalStyles.CheckedColor.color : undefined}
                        />
                        <Text>Display Item in POS</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <Checkbox
                            style={globalStyles.Checkbox}
                            value={imageInPos}
                            onValueChange={setImageInPos}
                            color={imageInPos ? globalStyles.CheckedColor.color : undefined}
                        />
                        <Text>Display Image in POS (Not Recommended On Mobile Devices)</Text>
                    </View>
                </ScrollView>
                <FlatButton text='Add Item' />
            </View>
        </TouchableWithoutFeedback>
    )
}