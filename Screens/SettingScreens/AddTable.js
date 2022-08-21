import React from 'react'
import { View, TouchableWithoutFeedback, TextInput, ScrollView, Keyboard , Text} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { FlatButton } from '../../Components/Button'
import { Dropdown } from '../../Components/Dropdown';

import globalStyles from '../../globalStyles'

import { Formik, ErrorMessage } from 'formik';
import * as Yup from "yup";

const initialValues = {
    TableName: '',
    Branch: 'Branch A',
}

const TableSchema = Yup.object().shape({
    TableName: Yup.string().min(2, 'Too Short').max(20, 'Too Big').required('Required'),
    Branch: Yup.string().required('Required')
})

const addTableRequest = (values, actions) => {
    console.log(values);
    actions.resetForm();

}

export const AddTable = () => {
    const [branch, setBranch] = React.useState('Branch A');

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={globalStyles.body}>
                <Formik initialValues={initialValues} validationSchema={TableSchema} onSubmit={(values, actions) => addTableRequest(values, actions)}>
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
                                <Dropdown value={values.Branch} setValue={handleChange('Branch')} data={['Branch A', 'Branch B']} />
                            </KeyboardAwareScrollView>
                            <FlatButton text='Add Table' onPress={handleSubmit} />
                        </>
                    )}
                </Formik>
            </View>
        </TouchableWithoutFeedback>
    )
}
