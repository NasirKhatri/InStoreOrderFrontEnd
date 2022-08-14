import React from 'react'
import { Text, View, Image, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { UploadImage } from '../../SharedFunctions.js/UploadImage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { FlatButton, POSButton1 } from '../../Components/Button';
import { Dropdown } from '../../Components/Dropdown';
import { CheckBoxContainer } from '../../Components/CheckBoxContainer';

import { Formik, ErrorMessage } from 'formik';
import * as Yup from "yup";

import globalStyles from '../../globalStyles';

const initialValues = {
    Name: '',
    UOM: 'Pc',
    SalesRate: 0,
    Discount: 0,
    TaxType: 'Sales Tax',
    Category: 'Burger',
    Image: null,
    VisibilityInPOS: true,
    ImageInPOS: false,
}

const ItemSchema = Yup.object().shape({
    Name: Yup.string().min(2, 'Too Short').max(20, 'Too Long').required('Required'),
    UOM: Yup.string().required('Required'),
    SalesRate: Yup.number().required('Required'),
    Discount: Yup.number().required('Required'),
    TaxType: Yup.string().required('Required'),
    Category: Yup.string().required('Required'),
})

const addItemRequest = (values, actions) => {
    console.log(values);
    actions.resetForm();

}

export const AddItem = () => {
    const [netPrice, setNetPrice] = React.useState(0);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={globalStyles.body}>
                <Formik initialValues={initialValues} validationSchema={ItemSchema} onSubmit={(values, actions) => addItemRequest(values, actions)}>
                    {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                        <>
                            <KeyboardAwareScrollView>
                                <TextInput
                                    style={globalStyles.input} placeholder="Item Name"
                                    onChangeText={handleChange('Name')}
                                    onBlur={handleBlur('Name')}
                                    value={values.Name} />
                                {errors.Name && touched.Name ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='Name' /></Text> : <></>}
                                <Dropdown value={values.UOM} setValue={handleChange('UOM')} data={['Pc', 'Kg']} />
                                {errors.UOM && touched.UOM ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='UOM' /></Text> : <></>}
                                <TextInput
                                    style={globalStyles.input} keyboardType="numeric" placeholder='Sales Rate (Exc. Taxes and Discount)'
                                    onChangeText={handleChange('SalesRate')}
                                    onBlur={handleBlur('SalesRate')}
                                    value={values.SalesRate} />
                                {errors.SalesRate && touched.SalesRate ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='SalesRate' /></Text> : <></>}
                                <TextInput
                                    style={globalStyles.input} keyboardType="numeric" placeholder='Discount (In %)'
                                    onChangeText={handleChange('Discount')}
                                    onBlur={handleBlur('Discount')}
                                    value={values.Discount} />
                                {errors.Discount && touched.Discount ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='Discount' /></Text> : <></>}
                                <Dropdown value={values.TaxType} setValue={handleChange('TaxType')} data={['Sales Tax', 'Service Tax']} />
                                {errors.TaxType && touched.TaxType ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='TaxType' /></Text> : <></>}
                                {setNetPrice(Math.round(values.SalesRate * 1.17 - values.SalesRate * (values.Discount / 100)), 2)}
                                <Text style={{ ...globalStyles.input, paddingVertical: 10 }}>{netPrice} (Inc. Taxes and Discount)</Text>
                                <Dropdown value={values.Category} setValue={handleChange('Category')} data={['Burgers', 'Broasts']} />
                                {errors.Category && touched.Category ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='Category' /></Text> : <></>}
                                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                    {!values.Image ? <POSButton1 onPress={() => UploadImage(setFieldValue)} text='Select Image' /> : <></>}
                                    {values.Image ? <POSButton1 onPress={() => UploadImage(setFieldValue)} text='Change Image' /> : <></>}
                                    {values.Image ? <POSButton1 onPress={() => setFieldValue('image', null)} text='Delete Image' /> : <></>}
                                </View>
                                {values.Image && <Image source={{ uri: values.Image.uri }} style={globalStyles.UploadImage} />}
                                <CheckBoxContainer value={values.VisibilityInPOS} name='VisibilityInPOS' setValue={setFieldValue} text="Display Item in POS" />
                                <CheckBoxContainer value={values.ImageInPOS} name='ImageInPOS' setValue={setFieldValue} text="Display Image in POS (Not Recommended On Mobile Devices)" />
                            </KeyboardAwareScrollView>
                            <View style={{ marginTop: 6 }}>
                                <FlatButton text='Add Item' onPress={handleSubmit} />
                            </View>
                        </>
                    )}
                </Formik>
            </View>
        </TouchableWithoutFeedback>
    )
}