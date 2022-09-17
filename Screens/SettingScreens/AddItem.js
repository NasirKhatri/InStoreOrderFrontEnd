import React from 'react'
import { Text, View, Image, TextInput, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native'
import { UploadImage } from '../../SharedFunctions.js/UploadImage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { FlatButton, POSButton1 } from '../../Components/Button';
import { Dropdown } from '../../Components/Dropdown';
import { CheckBoxContainer } from '../../Components/CheckBoxContainer';

import { Formik, ErrorMessage } from 'formik';
import * as Yup from "yup";

import { getData } from '../../SharedFunctions.js/SetGetData';
import { BaseUrl } from '../../SharedFunctions.js/StoreContext';
import * as FileSystem from 'expo-file-system';
import { useMutation } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { getCategories, getTaxTypes, getTaxTypesDetails } from '../../SharedFunctions.js/GetQueries';

import globalStyles from '../../globalStyles';

const initialValues = {
    Name: '',
    UOM: 'Pc',
    SalesRate: 0,
    Discount: 0,
    TaxType: '0',
    Category: '0',
    Image: null,
    VisibilityInPOS: true,
    ImageInPOS: false,
}

const ItemSchema = Yup.object().shape({
    Name: Yup.string().min(2, 'Too Short').max(20, 'Too Long').required('Required'),
    UOM: Yup.string().required('Required'),
    SalesRate: Yup.number().moreThan(0, 'Must be greater than 0').required('Required'),
    Discount: Yup.number().min(0, 'Must be greater than or equal to 0'),
    TaxType: Yup.string().required('Required'),
    Category: Yup.string().required('Required'),
})

const addItemRequest = async (values, netPrice, url) => {
    try {
        const user = await getData('user');
        if (user != null) {
            const token = user.Token;
            const requestBody = {
                ...values,
                NetPrice: netPrice,
                clientID: user.ClientID,
                userID: user.UserID,
                roleID: user.RoleID
            }
            console.log(requestBody);
            let result = await FileSystem.uploadAsync(`${BaseUrl}/${url}`, values.Image.uri, {
                fieldName: 'Image',
                httpMethod: "POST",
                uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                parameters: requestBody,
                headers: {
                    authorization: `Bearer ${token}`,
                }
            })
            return {
                msg: JSON.parse(result.body).msg,
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


export const AddItem = () => {
    const [netPrice, setNetPrice] = React.useState(0);
    const { isLoading: cloading, data: cdata } = useQuery(['categories'], () => getCategories('dropdown'));
    const { isLoading: tloading, data: tdata } = useQuery(['taxTypes', 'dropdown'], () => getTaxTypes('dropdown'));
    const { isLoading: tdloading, data: tddata } = useQuery(['taxDetails', 'details'], () => getTaxTypesDetails());
    const mutation = useMutation((values) => addItemRequest(values, netPrice, "items/additem"));

    if (!cloading && !tloading) {
        initialValues.Category = (cdata[0].id).toString();
        initialValues.TaxType = (tdata[0].id).toString();
    }

    const handleSubmit = (values, actions) => {
        mutation.mutateAsync(values);
        actions.resetForm();
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={globalStyles.body}>
                <Formik initialValues={initialValues} validationSchema={ItemSchema} onSubmit={(values, actions) => handleSubmit(values, actions)}>
                    {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                        <>
                            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                                <Text style={globalStyles.inputLabel}>Item Name *</Text>
                                <TextInput
                                    style={globalStyles.input} placeholder="Item Name"
                                    onChangeText={handleChange('Name')}
                                    onBlur={handleBlur('Name')}
                                    value={values.Name} />
                                {errors.Name && touched.Name ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='Name' /></Text> : <></>}

                                <Text style={globalStyles.inputLabel}>Related Category *</Text>
                                <Dropdown value={values.Category} setValue={handleChange('Category')} data={!cloading ? cdata : []} />
                                {errors.Category && touched.Category ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='Category' /></Text> : <></>}

                                <Text style={globalStyles.inputLabel}>Unit of Measure *</Text>
                                <Dropdown value={values.UOM} setValue={handleChange('UOM')} data={['Pc', 'Kg']} />
                                {errors.UOM && touched.UOM ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='UOM' /></Text> : <></>}

                                <Text style={globalStyles.inputLabel}>Sales Price *</Text>
                                <TextInput
                                    style={globalStyles.input} keyboardType="numeric" placeholder='Sales Rate (Exc. Taxes and Discount)'
                                    onChangeText={handleChange('SalesRate')}
                                    onBlur={handleBlur('SalesRate')}
                                    value={values.SalesRate} />
                                {errors.SalesRate && touched.SalesRate ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='SalesRate' /></Text> : <></>}

                                <Text style={globalStyles.inputLabel}>Discount</Text>
                                <TextInput
                                    style={globalStyles.input} keyboardType="numeric" placeholder='Discount (In %)'
                                    onChangeText={handleChange('Discount')}
                                    onBlur={handleBlur('Discount')}
                                    value={values.Discount} />
                                {errors.Discount && touched.Discount ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='Discount' /></Text> : <></>}

                                <Text style={globalStyles.inputLabel}>Tax Type *</Text>
                                <Dropdown value={values.TaxType} setValue={handleChange('TaxType')} data={!tloading ? tdata : []} />
                                {errors.TaxType && touched.TaxType ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='TaxType' /></Text> : <></>}

                                <Text style={globalStyles.inputLabel}>Net Price</Text>
                                {(() => {
                                    if(!tdloading) {
                                        const taxDetails = tddata.find((element) => element.TaxTypeID == values.TaxType);
                                        if(taxDetails) {
                                        taxDetails.TaxBfrDisc ? setNetPrice((values.SalesRate * (1 + taxDetails.TaxRate / 100) - values.SalesRate * (values.Discount / 100)).toFixed(2)) :
                                        setNetPrice((values.SalesRate - values.SalesRate * (values.Discount / 100)) * (1 + taxDetails.TaxRate / 100).toFixed(2))
                                        }
                                    }
                                })()}
                                <Text style={{ ...globalStyles.input, paddingVertical: 10 }}>{netPrice} (Inc. Taxes and Discount)</Text>

                                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                    {!values.Image ? <POSButton1 onPress={() => UploadImage(setFieldValue)} text='Select Image' /> : <></>}
                                    {values.Image ? <POSButton1 onPress={() => UploadImage(setFieldValue)} text='Change Image' /> : <></>}
                                    {values.Image ? <POSButton1 onPress={() => setFieldValue('Image', null)} text='Delete Image' /> : <></>}
                                </View>
                                {values.Image && <Image source={{ uri: values.Image.uri }} style={globalStyles.UploadImage} />}
                                <CheckBoxContainer value={values.VisibilityInPOS} name='VisibilityInPOS' setValue={setFieldValue} text="Display Item in POS" />
                                <CheckBoxContainer value={values.ImageInPOS} name='ImageInPOS' setValue={setFieldValue} text="Display Image in POS (Not Recommended On Mobile Devices)" />
                            </KeyboardAwareScrollView>
                            <FlatButton text={mutation.isLoading ? 'Loading...' : 'Add Item'} onPress={handleSubmit} />
                        </>
                    )}
                </Formik>
                {
                    mutation.isError ? (Alert.alert('Instore Order', mutation.data.msg), mutation.reset()) :
                        mutation.isSuccess ? (Alert.alert('Instore Order', mutation.data.msg), mutation.reset()) : null
                }
            </View>
        </TouchableWithoutFeedback>
    )
}