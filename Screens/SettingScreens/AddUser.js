import React from 'react'
import { View, TouchableWithoutFeedback, TextInput, ScrollView, Keyboard, Text } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { FlatButton } from '../../Components/Button'
import { Dropdown } from '../../Components/Dropdown';
import { CheckBoxContainer } from '../../Components/CheckBoxContainer';
import { setData, getData } from '../../SharedFunctions.js/SetGetData.js';

import { useMutation } from '@tanstack/react-query';

import { Formik, ErrorMessage } from 'formik';
import * as Yup from "yup";
import axios from 'axios';

import globalStyles from '../../globalStyles'

const initialValues = {
    Name: '',
    Gender: 'Male',
    UserRole: '2',
    Email: '',
    Password: '',
    ContactNumber: '',
    Address: '',
    DOB: '',
    CNIC: '',
    Active: true,
}

const UserSchema = Yup.object().shape({
    Name: Yup.string().min(2, 'Too Short').max(20, 'Too Long').required('Required'),
    Gender: Yup.string(),
    UserRole: Yup.string().required('Required'),
    Email: Yup.string().email('Invalid Email').required('Required'),
    Password: Yup.string().min(6, 'Too Short').matches(/[A-Z]/, 'Must Contain Atleast One Upper Case Letter').matches(/[a-z]/, 'Must Contain Atleast One Lower Case Letter').matches(/[0-9]/, 'Must Contain Atleast One Numeric Value').matches(/[!@#$&]/, 'Must Contain Atlease One Special Character').required('Required'),
    ContactNumber: Yup.string().matches(/[0-9]{4}-[0-9]{7}/, 'Invalid Phone No').required('Required'),
    Address: Yup.string().min(10, 'Too Short').max(200, 'Too Long'),
    DOB: Yup.string(),
    CNIC: Yup.string().matches(/[0-9]{5}-[0-9]{7}-[0-9]{1}/, 'Invalid CNIC No'),
})

const addUserRequest = async (values) => {

    try {
        const user = await getData('user');
        if(user != null) {
            const token = user.Token;
            const requestBody = {...values, clientID: user.ClientID, userID: user.UserID, roleID: user.RoleID}
            console.log(requestBody, token);
        }
        else {
            console.log('No User');
        }
    }

    catch(err) {
        console.log('Somethin went wrong');
    }
}

export const AddUser = () => {
    const mutation = useMutation((values) => addUserRequest(values));
    const roles = [{name: "Admin", id: '1'}, {name: "All", id: '2'}, {name: "Cook", id: '3'}, {name: "Cashier", id: '4'},
    {name: "Waiter", id: '5'}, {name: "Cook & Cashier", id: '6'}, {name: "Cook & Cashier", id: '7'}, {name: "Waiter & Cashier", id: '8'} ]

    const handleSubmit = (values, actions) => {
        mutation.mutateAsync(values);
        actions.resetForm();
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={globalStyles.body}>
                <Formik initialValues={initialValues} validationSchema={UserSchema} onSubmit={(values, actions) => handleSubmit(values, actions)}>
                    {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                        <>
                            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>

                                <Text style={globalStyles.inputLabel}>Name *</Text>
                                <TextInput 
                                    style={globalStyles.input} placeholder="User Name"
                                    onChangeText={handleChange('Name')}
                                    onBlur={handleBlur('Name')}
                                    value={values.Name} />
                                {errors.Name && touched.Name ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='Name' /></Text> : <></>}

                                <Text style={globalStyles.inputLabel}>Gender</Text>
                                <Dropdown value={values.Gender} setValue={handleChange('Gender')} data={['Male', 'Female']} />
                                {errors.Gender && touched.Gender ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='Gender' /></Text> : <></>}

                                <Text style={globalStyles.inputLabel}>User Role *</Text>
                                <Dropdown value={values.UserRole} setValue={handleChange('UserRole')} data={roles} />
                                {errors.UserRole && touched.UserRole ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='UserRole' /></Text> : <></>}

                                <Text style={globalStyles.inputLabel}>Email *</Text>
                                <TextInput 
                                    style={globalStyles.input} placeholder="User Email" 
                                    onChangeText={handleChange('Email')}
                                    onBlur={handleBlur('Email')}
                                    value={values.Email}/>
                                {errors.Email && touched.Email ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='Email' /></Text> : <></>}

                                <Text style={globalStyles.inputLabel}>Password *</Text>
                                <TextInput 
                                    style={globalStyles.input} placeholder="Password"
                                    onChangeText={handleChange('Password')}
                                    onBlur={handleBlur('Password')}
                                    value={values.Password} />
                                {errors.Password && touched.Password ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='Password' /></Text> : <></>}

                                <Text style={globalStyles.inputLabel}>Contact Number *</Text>
                                <TextInput 
                                    keyboardType='numeric' style={globalStyles.input} placeholder="Phone Number (i.e. 0123-1234567)"
                                    onChangeText={handleChange('ContactNumber')}
                                    onBlur={handleBlur('ContactNumber')}
                                    value={values.ContactNumber} />
                                {errors.ContactNumber && touched.ContactNumber ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='ContactNumber' /></Text> : <></>}

                                <Text style={globalStyles.inputLabel}>Address</Text>
                                <TextInput 
                                    style={globalStyles.input} placeholder="User Address"
                                    onChangeText={handleChange('Address')}
                                    onBlur={handleBlur('Address')}
                                    value={values.Address} />
                                {errors.Address && touched.Address ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='Address' /></Text> : <></>}

                                <Text style={globalStyles.inputLabel}>Date of Birth</Text>
                                <TextInput 
                                    style={globalStyles.input} placeholder="Date of Birth"
                                    onChangeText={handleChange('DOB')}
                                    onBlur={handleBlur('DOB')}
                                    value={values.DOB} />
                                {errors.DOB && touched.DOB ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='DOB' /></Text> : <></>}

                                <Text style={globalStyles.inputLabel}>CNIC Number</Text>
                                <TextInput 
                                    style={globalStyles.input} placeholder="User CNIC"
                                    onChangeText={handleChange('CNIC')}
                                    onBlur={handleBlur('CNIC')}
                                    value={values.CNIC} />
                                {errors.CNIC && touched.CNIC ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='CNIC' /></Text> : <></>}

                                <CheckBoxContainer value={values.Active} name='Active' setValue={setFieldValue} text="Active" />
                            </KeyboardAwareScrollView>
                            <FlatButton text='Add User' onPress={handleSubmit} />
                        </>
                    )}
                </Formik>
            </View>
        </TouchableWithoutFeedback>
    )
}
