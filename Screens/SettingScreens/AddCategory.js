import React from 'react'
import { View, Image, TextInput, Keyboard, TouchableWithoutFeedback, Text } from 'react-native'
import { UploadImage } from '../../SharedFunctions.js/UploadImage';

import { FlatButton, POSButton1 } from '../../Components/Button';
import { CheckBoxContainer } from '../../Components/CheckBoxContainer';

import { Formik, ErrorMessage } from 'formik';
import * as Yup from "yup";

import globalStyles from '../../globalStyles';
import { Dropdown } from '../../Components/Dropdown';

const initialValues = {
    Name: '',
    Branches: '',
    Color: 'Red',
    Image: null,
    VisibilityInPOS: true,
    ImageInPOS: false,
}

const CategorySchema = Yup.object().shape({
    Name: Yup.string().min(2, 'Too Short').max(20, 'Too Long').required('Required'),
})

const addCategoryRequest = (values, actions) => {
    console.log(values);
    actions.resetForm();

}

export const AddCategory = () => {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={globalStyles.body}>
                <Formik initialValues={initialValues} validationSchema={CategorySchema} onSubmit={(values, actions) => addCategoryRequest(values, actions)}>
                    {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                        <>
                            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                                <TextInput 
                                    style={globalStyles.input} placeholder="Category Name" 
                                    onChangeText={handleChange('Name')}
                                    onBlur={handleBlur('Name')}
                                    value={values.Name}/>
                                {errors.Name && touched.Name ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='Name' /></Text> : <></>}    
                                <TextInput 
                                    style={globalStyles.input} placeholder="Show in Branches" 
                                    onChangeText={handleChange('Branches')}
                                    onBlur={handleBlur('Branches')}
                                    value={values.Branches}/>
                                <Dropdown value={values.Color} setValue={handleChange('Color')} data={['Red', 'Green', 'Orange', 'Pink', 'Black']} />
                                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                    {!values.Image ? <POSButton1 onPress={() => UploadImage(setFieldValue)} text='Select Image' /> : <></>}
                                    {values.Image ? <POSButton1 onPress={() => UploadImage(setFieldValue)} text='Change Image' /> : <></>}
                                    {values.Image ? <POSButton1 onPress={() => setFieldValue('Image', null)} text='Delete Image' /> : <></>}
                                </View>
                                {values.Image && <Image source={{ uri: values.Image.uri }} style={globalStyles.UploadImage} />}
                                <CheckBoxContainer value={values.VisibilityInPOS} name='VisibilityInPOS' setValue={setFieldValue} text="Display Category in POS" />
                                <CheckBoxContainer value={values.ImageInPOS} name='ImageInPOS'  setValue={setFieldValue} text="Display Image in POS (Not Recommended On Mobile Devices)" />
                            </View>
                            <FlatButton text='Add Category' onPress={handleSubmit} />
                        </>
                    )}
                </Formik>
            </View>
        </TouchableWithoutFeedback>
    )
}