import React from 'react'
import { Text, View, Image, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import Checkbox from 'expo-checkbox'
import { UploadImage } from '../../SharedFunctions.js/UploadImage';

import { FlatButton, POSButton1 } from '../../Components/Button';

import globalStyles from '../../globalStyles';

export const AddCategory = () => {
    const [categoryInPos, setCategoryInPos] = React.useState(true);
    const [imageInPos, setImageInPos] = React.useState(false);
    const [image, setImage] = React.useState(null);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={globalStyles.body}>
                <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                    <TextInput style={globalStyles.input} placeholder="Category Name" />
                    <TextInput style={globalStyles.input} placeholder="Show in Branches" />
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        {!image ? <POSButton1 onPress={() => UploadImage(setImage)} text='Select Image' /> : <></>}
                        {image ? <POSButton1 onPress={() => UploadImage(setImage)} text='Change Image' /> : <></>}
                        {image ? <POSButton1 onPress={() => setImage(null)} text='Delete Image' /> : <></>}
                    </View>
                    {image && <Image source={{ uri: image.uri }} style={globalStyles.UploadImage} />}
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <Checkbox
                            style={globalStyles.Checkbox}
                            value={categoryInPos}
                            onValueChange={setCategoryInPos}
                            color={categoryInPos ? globalStyles.CheckedColor.color : undefined}
                        />
                        <Text>Display Category in POS</Text>
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
                </View>
                <FlatButton text='Add Category' />
            </View>
        </TouchableWithoutFeedback>
    )
}