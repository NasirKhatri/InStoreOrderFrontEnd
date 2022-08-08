import React from 'react'
import { View, Image, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { UploadImage } from '../../SharedFunctions.js/UploadImage';

import { FlatButton, POSButton1 } from '../../Components/Button';
import { CheckBoxContainer } from '../../Components/CheckBoxContainer';

import globalStyles from '../../globalStyles';
import { Dropdown } from '../../Components/Dropdown';

export const AddCategory = () => {
    const [categoryInPos, setCategoryInPos] = React.useState(true);
    const [imageInPos, setImageInPos] = React.useState(false);
    const [image, setImage] = React.useState(null);
    const [color, setColor] = React.useState('Red');

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={globalStyles.body}>
                <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                    <TextInput style={globalStyles.input} placeholder="Category Name" />
                    <TextInput style={globalStyles.input} placeholder="Show in Branches" />
                    <Dropdown value={color} setValue={setColor} data={['Red', 'Green', 'Orange', 'Pink', 'Black']}/>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        {!image ? <POSButton1 onPress={() => UploadImage(setImage)} text='Select Image' /> : <></>}
                        {image ? <POSButton1 onPress={() => UploadImage(setImage)} text='Change Image' /> : <></>}
                        {image ? <POSButton1 onPress={() => setImage(null)} text='Delete Image' /> : <></>}
                    </View>
                    {image && <Image source={{ uri: image.uri }} style={globalStyles.UploadImage} />}
                    <CheckBoxContainer value={categoryInPos} setValue={setCategoryInPos} text="Display Category in POS"/>
                    <CheckBoxContainer value={imageInPos} setValue={setImageInPos} text="Display Image in POS (Not Recommended On Mobile Devices)"/>
                </View>
                <FlatButton text='Add Category' />
            </View>
        </TouchableWithoutFeedback>
    )
}