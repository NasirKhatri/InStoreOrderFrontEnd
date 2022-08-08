import React from 'react'
import { Text, View, Image, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { UploadImage } from '../../SharedFunctions.js/UploadImage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { FlatButton, POSButton1 } from '../../Components/Button';
import { Dropdown } from '../../Components/Dropdown';
import { CheckBoxContainer } from '../../Components/CheckBoxContainer';

import globalStyles from '../../globalStyles';

export const AddItem = () => {
    const [itemInPos, setItemInPos] = React.useState(true);
    const [imageInPos, setImageInPos] = React.useState(false);
    const [image, setImage] = React.useState(null);
    const [unit, setUnit] = React.useState('Pc');
    const [taxType, setTaxType] = React.useState('Sales Tax');
    const [category, setCategory] = React.useState('Burgers');

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={globalStyles.body}>
                <KeyboardAwareScrollView>
                    <TextInput style={globalStyles.input} placeholder="Item Name" />
                    <Dropdown value={unit} setValue={setUnit} data={['Pc', 'Kg']}/>
                    <TextInput style={globalStyles.input} keyboardType="numeric" placeholder='Sales Rate (Exc. Taxes and Discount)' />
                    <TextInput style={globalStyles.input} keyboardType="numeric" placeholder='Discount (In %)' />
                    <Dropdown value={taxType} setValue={setTaxType} data={['Sales Tax', 'Sevice Tax']}/>
                    <Text style={{ ...globalStyles.input, paddingVertical: 10 }}>25.90 (Inc. Taxes and Discount)</Text>
                    <Dropdown value={category} setValue={setCategory} data={['Burgers', 'Broasts']}/>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        {!image ? <POSButton1 onPress={() => UploadImage(setImage)} text='Select Image' /> : <></>}
                        {image ? <POSButton1 onPress={() => UploadImage(setImage)} text='Change Image' /> : <></>}
                        {image ? <POSButton1 onPress={() => setImage(null)} text='Delete Image' /> : <></>}
                    </View>
                    {image && <Image source={{ uri: image.uri }} style={globalStyles.UploadImage} />}
                    <CheckBoxContainer value={itemInPos} setValue={setItemInPos} text="Display Item in POS"/>
                    <CheckBoxContainer value={imageInPos} setValue={setImageInPos} text="Display Image in POS (Not Recommended On Mobile Devices)"/>
                </KeyboardAwareScrollView>
                <View style={{ marginTop: 6 }}>
                    <FlatButton text='Add Item' />
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}