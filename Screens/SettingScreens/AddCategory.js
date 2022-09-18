import React from 'react'
import { View, Image, TextInput, Keyboard, TouchableWithoutFeedback, Text, Alert } from 'react-native'
import { UploadImage } from '../../SharedFunctions.js/UploadImage';

import { FlatButton, POSButton1 } from '../../Components/Button';
import { CheckBoxContainer } from '../../Components/CheckBoxContainer';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Formik, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { useMutation } from '@tanstack/react-query';

import { getData } from '../../SharedFunctions.js/SetGetData';
import { BaseUrl } from '../../SharedFunctions.js/StoreContext';

import * as FileSystem from 'expo-file-system';


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

const addCategoryRequest = async (values, url) => {
    try {
        const user = await getData('user');
        if (user != null) {
            const token = user.Token;
            const requestBody = {...values, clientID: user.ClientID, userID: user.UserID, roleID: user.RoleID}
            let result = await FileSystem.uploadAsync(`${BaseUrl}/${url}`,values.Image.uri,  {
                fieldName: 'Image',
                httpMethod: "POST",
                uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                parameters: requestBody,
                headers: {
                    authorization: `Bearer ${token}`,
                }
            })
            return {
                msg: JSON.parse(result.body).msg,
                status: result.status
            };
        }
        else {
            return;
        }
    }

    catch (err) {
        return {
            msg: err.response.data.msg ? err.response.data.msg : "Something went wrong, Try Again",
            status: err.response.status ? err.response.status : 500
        };
    }

}


export const AddCategory = () => {
    const mutation = useMutation((values) => addCategoryRequest(values, "categories/addcategory"));

    const handleSubmit = (values, actions) => {
        mutation.mutateAsync(values);
        actions.resetForm();
    }
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={globalStyles.body}>
                <Formik initialValues={initialValues} validationSchema={CategorySchema} onSubmit={(values, actions) => handleSubmit(values, actions)}>
                    {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                        <>
                            <KeyboardAwareScrollView>
                                <Text style={globalStyles.inputLabel}>Category Name *</Text>
                                <TextInput
                                    style={globalStyles.input} placeholder="Category Name"
                                    onChangeText={handleChange('Name')}
                                    onBlur={handleBlur('Name')}
                                    value={values.Name} />
                                {errors.Name && touched.Name ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='Name' /></Text> : <></>}

                                <Text style={globalStyles.inputLabel}>Show In Branches</Text>
                                <TextInput
                                    style={globalStyles.input} placeholder="Show in Branches"
                                    onChangeText={handleChange('Branches')}
                                    onBlur={handleBlur('Branches')}
                                    value={values.Branches} />

                                <Text style={globalStyles.inputLabel}>Category Color</Text>
                                <Dropdown value={values.Color} setValue={handleChange('Color')} data={['Red', 'Green', 'Orange', 'Pink', 'Black']} />
                                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                    {!values.Image ? <POSButton1 onPress={() => UploadImage(setFieldValue)} text='Select Image' /> : <></>}
                                    {values.Image ? <POSButton1 onPress={() => UploadImage(setFieldValue)} text='Change Image' /> : <></>}
                                    {values.Image ? <POSButton1 onPress={() => setFieldValue('Image', null)} text='Delete Image' /> : <></>}
                                </View>
                                {values.Image && <Image source={{ uri: values.Image.uri }} style={globalStyles.UploadImage} />}
                                <CheckBoxContainer value={values.VisibilityInPOS} name='VisibilityInPOS' setValue={setFieldValue} text="Display Category in POS" />
                                <CheckBoxContainer value={values.ImageInPOS} name='ImageInPOS' setValue={setFieldValue} text="Display Image in POS (Not Recommended On Mobile Devices)" />
                            </KeyboardAwareScrollView>
                            <FlatButton text={mutation.isLoading ? 'Loading...' : 'Add Category'} onPress={handleSubmit} />
                        </>
                    )}
                </Formik>
                {
                    mutation.isError ? Alert.alert('Instore Order', mutation.data.msg) :
                        mutation.isSuccess ? Alert.alert('Instore Order', mutation.data.msg) : null
                    }
            </View>
        </TouchableWithoutFeedback>
    )
}