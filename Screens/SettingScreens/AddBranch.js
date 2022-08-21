import React from 'react'
import { View, TouchableWithoutFeedback, TextInput, ScrollView, Keyboard, Text } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { FlatButton } from '../../Components/Button'

import globalStyles from '../../globalStyles'

import { Formik, ErrorMessage } from 'formik';
import * as Yup from "yup";

const initialValues = {

}

const BranchSchema = Yup.object().shape({

})

const addBranchRequest = (values, actions) => {
    console.log(values);
    actions.resetForm();

}

export const AddBranch = () => {

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={globalStyles.body}>
                <Formik initialValues={initialValues} validationSchema={BranchSchema} onSubmit={(values, actions) => addBranchRequest(values, actions)}>
                    {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                        <>
                            <KeyboardAwareScrollView>
                                <Text style={globalStyles.inputLabel}>Branch Name *</Text>
                                <TextInput style={globalStyles.input} placeholder="Branch Name" />

                                <Text style={globalStyles.inputLabel}>Branch Address *</Text>
                                <TextInput style={globalStyles.input} placeholder="Branch Address" />

                                <Text style={globalStyles.inputLabel}>Contact Number *</Text>
                                <TextInput keyboardType='numeric' style={globalStyles.input} placeholder="Phone Number (i.e. 0123-1234567)" />
                            </KeyboardAwareScrollView>
                            <FlatButton text='Add Branch' />
                        </>
                    )}
                </Formik>
            </View>
        </TouchableWithoutFeedback>
    )
}