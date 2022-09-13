import React from 'react'
import { View, TouchableWithoutFeedback, TextInput, Alert, Keyboard, Text } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useMutation } from '@tanstack/react-query';

import { FlatButton } from '../../Components/Button'
import { Dropdown } from '../../Components/Dropdown';
import { CheckBoxContainer } from '../../Components/CheckBoxContainer';

import { Formik, ErrorMessage } from 'formik';
import * as Yup from "yup";

import globalStyles from '../../globalStyles'
import axios from 'axios';
import { BaseUrl } from '../../SharedFunctions.js/StoreContext';
import { useQuery } from '@tanstack/react-query';
import { getData } from '../../SharedFunctions.js/SetGetData';

const initialValues = {
    Name: '',
    LicenseNumber: '',
    Branch: '0',
    ContactNumber: '',
    Active: true,
}

const UserSchema = Yup.object().shape({
    Name: Yup.string().min(2, 'Too Short').max(20, 'Too Long').required('Required'),
    LicenseNumber: Yup.string().required('Required'),
    Branch: Yup.string().required('Required'),
    ContactNumber: Yup.string().matches(/[0-9]{4}-[0-9]{7}/, 'Invalid Phone No').required('Required'),
})

const getBranches = async () => {
    const user = await getData('user');
    const token = user.Token;
    const url = `${BaseUrl}/branches/${user.ClientID}`;
    const data = await axios.get(url, {
        headers: {
            authorization: `Bearer ${token}`,

        }
    });
    return data.data;
}

const addRiderRequest = async (values) => {
    try {
        const user = await getData('user');
        if (user != null) {
            const token = user.Token;
            const requestBody = { ...values, clientID: user.ClientID, userID: user.UserID, roleID: user.RoleID };
            const result = await axios.post(`${BaseUrl}/riders/addrider`, requestBody, {
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

export const AddRider = () => {
    const { isLoading: bloading, data: bdata } = useQuery(['branches'], getBranches);
    const mutation = useMutation((values) => addRiderRequest(values));

    const handleSubmit = (values, actions) => {
        mutation.mutateAsync(values);
        actions.resetForm();
    }

    let branches = [];
    if (!bloading) {
        initialValues.Branch = (bdata[0].BranchID).toString();
        bdata.forEach(element => {
            branches.push({
                name: element.BranchName,
                id: `${element.BranchID}`
            });
        });
    }

        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={globalStyles.body}>
                    <Formik initialValues={initialValues} validationSchema={UserSchema} onSubmit={(values, actions) => handleSubmit(values, actions)}>
                        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                            <>
                                <KeyboardAwareScrollView>
                                    <Text style={globalStyles.inputLabel}>Name *</Text>
                                    <TextInput
                                        style={globalStyles.input} placeholder="Rider Name"
                                        onChangeText={handleChange('Name')}
                                        onBlur={handleBlur('Name')}
                                        value={values.Name} />
                                    {errors.Name && touched.Name ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='Name' /></Text> : <></>}

                                    <Text style={globalStyles.inputLabel}>License Number *</Text>
                                    <TextInput
                                        style={globalStyles.input} placeholder="License Number"
                                        onChangeText={handleChange('LicenseNumber')}
                                        onBlur={handleBlur('LicenseNumber')}
                                        value={values.LicenseNumber} />
                                    {errors.LicenseNumber && touched.LicenseNumber ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='LicenseNumber' /></Text> : <></>}

                                    <Text style={globalStyles.inputLabel}>Contact Number *</Text>
                                    <TextInput
                                        keyboardType='numeric' style={globalStyles.input} placeholder="Phone Number (i.e. 0123-1234567)"
                                        onChangeText={handleChange('ContactNumber')}
                                        onBlur={handleBlur('ContactNumber')}
                                        value={values.ContactNumber} />
                                    {errors.ContactNumber && touched.ContactNumber ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='ContactNumber' /></Text> : <></>}

                                    <Text style={globalStyles.inputLabel}>Branch *</Text>
                                    <Dropdown value={values.Branch} setValue={handleChange('Branch')} data={!bloading ? branches : []} />
                                    {errors.Branch && touched.Branch ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='Branch' /></Text> : <></>}

                                    <CheckBoxContainer value={values.Active} name="Active" setValue={setFieldValue} text="Active" />
                                </KeyboardAwareScrollView>
                                <FlatButton text={mutation.isLoading ? 'Loading...' : 'Add Rider'} onPress={handleSubmit} />
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
