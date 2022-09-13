import React from 'react'
import { View, TouchableWithoutFeedback, TextInput, Keyboard , Text, Alert} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { FlatButton } from '../../Components/Button'
import { Dropdown } from '../../Components/Dropdown';
import { getBranches } from '../../SharedFunctions.js/GetBranches';
import { getData } from '../../SharedFunctions.js/SetGetData';
import { BaseUrl } from '../../SharedFunctions.js/StoreContext';
import axios from 'axios';

import globalStyles from '../../globalStyles'

import { Formik, ErrorMessage } from 'formik';
import * as Yup from "yup";

import { useMutation } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

const initialValues = {
    TableName: '',
    Branch: '0',
}

const TableSchema = Yup.object().shape({
    TableName: Yup.string().min(2, 'Too Short').max(20, 'Too Big').required('Required'),
    Branch: Yup.string().required('Required')
})

const addTableRequest = async (values) => {
    try {
        const user = await getData('user');
        if (user != null) {
            const token = user.Token;
            const requestBody = { ...values, clientID: user.ClientID, userID: user.UserID, roleID: user.RoleID };
            const result = await axios.post(`${BaseUrl}/tables/addtable`, requestBody, {
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

export const AddTable = () => {
    const { isLoading: bloading, data: bdata } = useQuery(['branches'], () => getBranches('dropdown'));
    const mutation = useMutation((values) => addTableRequest(values));

    const handleSubmit = (values, actions) => {
        mutation.mutateAsync(values);
        actions.resetForm();
    }

    if (!bloading) {
        initialValues.Branch = (bdata[0].id).toString();
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={globalStyles.body}>
                <Formik initialValues={initialValues} validationSchema={TableSchema} onSubmit={(values, actions) => handleSubmit(values, actions)}>
                    {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                        <>
                            <KeyboardAwareScrollView>
                                <Text style={globalStyles.inputLabel}>Table Name *</Text>
                                <TextInput 
                                    style={globalStyles.input} placeholder="Table Name"
                                    onChangeText={handleChange('TableName')}
                                    onBlur={handleBlur('TableName')}
                                    value={values.TableName}  />
                                    {errors.TableName && touched.TableName ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='TableName' /></Text> : <></>}

                                <Text style={globalStyles.inputLabel}>Branch *</Text>
                                <Dropdown value={values.Branch} setValue={handleChange('Branch')} data={!bloading ? bdata : []} />
                            </KeyboardAwareScrollView>
                            <FlatButton text={mutation.isLoading ? 'Loading...' : 'Add Table'} onPress={handleSubmit} />
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
