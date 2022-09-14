import React from 'react'
import { View, TouchableWithoutFeedback, TextInput, Text, Keyboard, Alert } from 'react-native'

import { FlatButton } from '../../Components/Button'
import { Dropdown } from '../../Components/Dropdown';
import { CheckBoxContainer } from '../../Components/CheckBoxContainer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useMutation } from '@tanstack/react-query';
import { addRequest } from '../../SharedFunctions.js/AddRequest';

import { Formik, ErrorMessage } from 'formik';
import * as Yup from "yup";

import globalStyles from '../../globalStyles'

const initialValues = {
    Name: '',
    Gender: 'Male',
    Address: '',
    PhoneNo: '',
    Email: '',
    DOB: '',
    CNIC: '',
    CreditCustomer: false,
}

const CustomerSchema = Yup.object().shape({
    Name: Yup.string().min(2, 'Too Short').max(20, 'Too Long').required('Required'),
    Gender: Yup.string(),
    Address: Yup.string().min(10, 'Too Short').max(60, 'Too Long'),
    PhoneNo: Yup.string().matches(/[0-9]{4}-[0-9]{7}/, 'Invalid Phone No').required('Required'),
    Email: Yup.string().email('Invalid Email').required('Required'),
    DOB: Yup.string(),
    CNIC: Yup.string().matches(/[0-9]{5}-[0-9]{7}-[0-9]{1}/, 'Invalid CNIC No'),
})

export const AddCustomer = () => {
    const mutation = useMutation((values) => addRequest(values, "customers/addcustomer"));

    const handleSubmit = (values, actions) => {
        mutation.mutateAsync(values);
        actions.resetForm();
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={globalStyles.body}>
                <Formik initialValues={initialValues} validationSchema={CustomerSchema} onSubmit={(values, actions) => handleSubmit(values, actions)}>
                    {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                        <>
                                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                                    <Text style={globalStyles.inputLabel}>Customer Name *</Text>
                                    <TextInput
                                        style={globalStyles.input} placeholder="Customer Name"
                                        onChangeText={handleChange('Name')}
                                        onBlur={handleBlur('Name')}
                                        value={values.Name} />
                                    {errors.Name && touched.Name ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='Name' /></Text> : <></>}

                                    <Text style={globalStyles.inputLabel}>Gender</Text>
                                    <Dropdown value={values.Gender} setValue={handleChange('Gender')} data={['Male', 'Female']} />

                                    <Text style={globalStyles.inputLabel}>Address</Text>
                                    <TextInput 
                                        style={globalStyles.input} placeholder="Customer Address"
                                        onChangeText={handleChange('Address')}
                                        onBlur={handleBlur('Address')}
                                        value={values.Address} />
                                    {errors.Address && touched.Address ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='Address' /></Text> : <></>}

                                    <Text style={globalStyles.inputLabel}>Contact Number *</Text>
                                    <TextInput 
                                        keyboardType='numeric' style={globalStyles.input} placeholder="Phone Number (i.e. 0123-1234567)"
                                        onChangeText={handleChange('PhoneNo')}
                                        onBlur={handleBlur('PhoneNo')}
                                        value={values.PhoneNo} />
                                    {errors.PhoneNo && touched.PhoneNo ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='PhoneNo' /></Text> : <></>}

                                    <Text style={globalStyles.inputLabel}>Email *</Text>
                                    <TextInput 
                                        style={globalStyles.input} placeholder="Customer Email"
                                        onChangeText={handleChange('Email')}
                                        onBlur={handleBlur('Email')}
                                        value={values.Email} />
                                    {errors.Email && touched.Email ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='Email' /></Text> : <></>}

                                    <Text style={globalStyles.inputLabel}>Date of Birth</Text>
                                    <TextInput 
                                        style={globalStyles.input} placeholder="Date of Birth" 
                                        onChangeText={handleChange('DOB')}
                                        onBlur={handleBlur('DOB')}
                                        value={values.DOB}/>
                                    {errors.DOB && touched.DOB ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='DOB' /></Text> : <></>}

                                    <Text style={globalStyles.inputLabel}>CNIC</Text>
                                    <TextInput 
                                        keyboardType='numeric' style={globalStyles.input} placeholder="Customer CNIC" 
                                        onChangeText={handleChange('CNIC')}
                                        onBlur={handleBlur('CNIC')}
                                        value={values.CNIC}/>
                                    {errors.CNIC && touched.CNIC ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='CNIC' /></Text> : <></>}

                                    <CheckBoxContainer value={values.CreditCustomer} name='CreditCustomer' setValue={setFieldValue} text="Credit Customer" />
                                </KeyboardAwareScrollView>
                            <FlatButton text={mutation.isLoading ? 'Loading...' : 'Add Customer'} onPress={handleSubmit} />
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