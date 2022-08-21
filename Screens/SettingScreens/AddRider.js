import React from 'react'
import { View, TouchableWithoutFeedback, TextInput, ScrollView, Keyboard, Text } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { FlatButton } from '../../Components/Button'
import { Dropdown } from '../../Components/Dropdown';
import { CheckBoxContainer } from '../../Components/CheckBoxContainer';

import { Formik, ErrorMessage } from 'formik';
import * as Yup from "yup";

import globalStyles from '../../globalStyles'

const initialValues = {
    Name: '',
    LicenseNumber: '',
    Branch: 'Branch A',
    ContactNumber: '',
    Active: true,
}

const UserSchema = Yup.object().shape({
    Name: Yup.string().min(2, 'Too Short').max(20, 'Too Long').required('Required'),
    LicenseNumber: Yup.string().required('Required'),
    Branch: Yup.string().required('Required'),
    ContactNumber: Yup.string().matches(/[0-9]{4}-[0-9]{7}/, 'Invalid Phone No').required('Required'),
})

const addRiderRequest = (values, actions) => {
    console.log(values);
    actions.resetForm();

}

export const AddRider = () => {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={globalStyles.body}>
                <Formik initialValues={initialValues} validationSchema={UserSchema} onSubmit={(values, actions) => addRiderRequest(values, actions)}>
                    {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                        <>
                            <KeyboardAwareScrollView>
                                <Text style={globalStyles.inputLabel}>Name *</Text>
                                <TextInput 
                                    style={globalStyles.input} placeholder="Rider Name"
                                    onChangeText={handleChange('Name')}
                                    onBlur={handleBlur('Name')}
                                    value={values.Name}  />
                                {errors.Name && touched.Name ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='Name' /></Text> : <></>}

                                <Text style={globalStyles.inputLabel}>License Number *</Text>
                                <TextInput 
                                    style={globalStyles.input} placeholder="License Number"
                                    onChangeText={handleChange('LicenseNumber')}
                                    onBlur={handleBlur('LicenseNumber')}
                                    value={values.LicenseNumber}  />
                                {errors.LicenseNumber && touched.LicenseNumber ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='LicenseNumber' /></Text> : <></>}

                                <Text style={globalStyles.inputLabel}>Contact Number *</Text>
                                <TextInput 
                                    keyboardType='numeric' style={globalStyles.input} placeholder="Phone Number (i.e. 0123-1234567)"
                                    onChangeText={handleChange('ContactNumber')}
                                    onBlur={handleBlur('ContactNumber')}
                                    value={values.ContactNumber}  />
                                {errors.ContactNumber && touched.ContactNumber ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='ContactNumber' /></Text> : <></>}

                                <Text style={globalStyles.inputLabel}>Branch *</Text>
                                <Dropdown value={values.Branch} setValue={handleChange('Branch')} data={['Branch A', 'Branch B']} />
                                {errors.Branch && touched.Branch ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='Branch' /></Text> : <></>}

                                <CheckBoxContainer value={values.Active} name="Active" setValue={setFieldValue} text="Active" />
                            </KeyboardAwareScrollView>
                            <FlatButton text='Add Rider' onPress={handleSubmit} />
                        </>
                    )}
                </Formik>
            </View>
        </TouchableWithoutFeedback>
    )
}
