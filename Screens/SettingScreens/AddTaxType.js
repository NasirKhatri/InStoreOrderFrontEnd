import React from 'react'
import { View, TouchableWithoutFeedback, TextInput, ScrollView, Keyboard, Text } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { FlatButton } from '../../Components/Button'
import { CheckBoxContainer } from '../../Components/CheckBoxContainer';

import globalStyles from '../../globalStyles'

import { Formik, ErrorMessage } from 'formik';
import * as Yup from "yup";

const initialValues = {
    TaxName: '',
    TaxRate: null,
    CalculationType: true,
}

const TaxTypeSchema = Yup.object().shape({
    TaxName: Yup.string().min(2, 'Too Short').max(20, 'Too Long').required('Required'),
    TaxRate: Yup.number().min(0, 'Rate Must be Greater than or equal to Zero').required('Required'),
})

const addTaxTypeRequest = (values, actions) => {
    console.log(values);
    actions.resetForm();

}

export const AddTaxType = () => {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={globalStyles.body}>
                <Formik initialValues={initialValues} validationSchema={TaxTypeSchema} onSubmit={(values, actions) => addTaxTypeRequest(values, actions)}>
                    {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                        <>
                            <KeyboardAwareScrollView>
                                <Text style={globalStyles.inputLabel}>Tax Name *</Text>
                                <TextInput 
                                    style={globalStyles.input} placeholder="Tax Type Name"
                                    onChangeText={handleChange('TaxName')}
                                    onBlur={handleBlur('TaxName')}
                                    value={values.TaxName} />
                                {errors.TaxName && touched.TaxName ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='TaxName' /></Text> : <></>}

                                <Text style={globalStyles.inputLabel}>Tax Rate *</Text>
                                <TextInput 
                                    keyboardType='numeric' style={globalStyles.input} placeholder="Tax Rate (in %)"
                                    onChangeText={handleChange('TaxRate')}
                                    onBlur={handleBlur('TaxRate')}
                                    value={values.TaxRate} />
                                {errors.TaxRate && touched.TaxRate ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='TaxRate' /></Text> : <></>}

                                <CheckBoxContainer value={values.CalculationType} name="CalculationType" setValue={setFieldValue} text="Calculate Tax Before Discount" />
                            </KeyboardAwareScrollView>
                            <FlatButton text='Add Tax Type' onPress={handleSubmit} />
                        </>
                    )}
                </Formik>
            </View>
        </TouchableWithoutFeedback>
    )
}