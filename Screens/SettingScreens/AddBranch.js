import React from 'react'
import { View, TouchableWithoutFeedback, TextInput, ScrollView, Keyboard, Text, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { FlatButton } from '../../Components/Button'
import { getData } from '../../SharedFunctions.js/SetGetData.js';
import { useMutation } from '@tanstack/react-query';

import globalStyles from '../../globalStyles'
import { BaseUrl } from '../../SharedFunctions.js/StoreContext';

import { Formik, ErrorMessage } from 'formik';
import * as Yup from "yup";
import axios from 'axios';

const initialValues = {
    BranchName: '',
    BranchAddress: '',
    ContactNumber: '',

}

const BranchSchema = Yup.object().shape({
    BranchName: Yup.string().min(2, 'Too Short').max(20, 'Too Long').required('Required'),
    BranchAddress: Yup.string().min(10, 'Too Short').max(200, 'Too Long').required('Required'),
    ContactNumber: Yup.string().matches(/[0-9]{4}-[0-9]{7}/, 'Invalid Phone No').required('Required'),

})

const addBranchRequest = async (values) => {
    try {
        const user = await getData('user');
        if (user != null) {
            const token = user.Token;
            const requestBody = { ...values, clientID: user.ClientID, userID: user.UserID, roleID: user.RoleID };
            const result = await axios.post(`${BaseUrl}/branches/addbranch`, requestBody, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            return {
                msg: result.data.msg,
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

export const AddBranch = () => {
    const mutation = useMutation((values) => addBranchRequest(values));

    const handleSubmit = (values, actions) => {
        mutation.mutateAsync(values);
        actions.resetForm();
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={globalStyles.body}>
                <Formik initialValues={initialValues} validationSchema={BranchSchema} onSubmit={(values, actions) => handleSubmit(values, actions)}>
                    {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                        <>
                            <KeyboardAwareScrollView>
                                <Text style={globalStyles.inputLabel}>Branch Name *</Text>
                                <TextInput 
                                    style={globalStyles.input} placeholder="Branch Name"
                                    onChangeText={handleChange('BranchName')}
                                    onBlur={handleBlur('BranchName')}
                                    value={values.BranchName}  />
                                {errors.BranchName && touched.BranchName ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='BranchName' /></Text> : <></>}

                                <Text style={globalStyles.inputLabel}>Branch Address *</Text>
                                <TextInput 
                                    style={globalStyles.input} placeholder="Branch Address"
                                    onChangeText={handleChange('BranchAddress')}
                                    onBlur={handleBlur('BranchAddress')}
                                    value={values.BranchAddress} />
                                {errors.BranchAddress && touched.BranchAddress ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='BranchAddress' /></Text> : <></>}

                                <Text style={globalStyles.inputLabel}>Contact Number *</Text>
                                <TextInput 
                                    keyboardType='numeric' style={globalStyles.input} placeholder="Phone Number (i.e. 0123-1234567)"
                                    onChangeText={handleChange('ContactNumber')}
                                    onBlur={handleBlur('ContactNumber')}
                                    value={values.ContactNumber} />
                                {errors.ContactNumber && touched.ContactNumber ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='ContactNumber' /></Text> : <></>}
                            </KeyboardAwareScrollView>
                            <FlatButton text={mutation.isLoading ? 'Loading...' : 'Add Branch'} onPress={handleSubmit} />
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