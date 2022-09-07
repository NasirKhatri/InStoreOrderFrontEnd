import * as React from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useMutation } from '@tanstack/react-query';

import globalStyles from '../../globalStyles';
import { FlatButton } from '../../Components/Button.js';
import LoginSubscribeFooter from '../../Components/LoginSubscribeFooter';
import { Dropdown } from '../../Components/Dropdown';

import { Formik, ErrorMessage } from 'formik';
import * as Yup from "yup";
import axios from 'axios';

const SubscriptionSchema = Yup.object().shape({
    Name: Yup.string().min(2, 'Too Short').max(20, 'Too Long').required('Required'),
    Gender: Yup.string(),
    Email: Yup.string().email('Invalid Email').required('Required'),
    PhoneNo: Yup.string().matches(/[0-9]{4}-[0-9]{7}/, 'Invalid Phone No').required('Required'),
    Password: Yup.string().min(6, 'Too Short').matches(/[A-Z]/, 'Must Contain Atleast One Upper Case Letter').matches(/[a-z]/, 'Must Contain Atleast One Lower Case Letter').matches(/[0-9]/, 'Must Contain Atleast One Numeric Value').matches(/[!@#$&]/, 'Must Contain Atlease One Special Character').required('Required'),
    RetypePassword: Yup.string().oneOf([Yup.ref('Password'), null], 'Passwords Must Match').required('Required'),
    Voucher: Yup.string().max(40, 'Too Long').required('Required'),
    Address: Yup.string().min(10, 'Too Short').max(200, 'Too Long'),
    DOB: Yup.string(),
    CNIC: Yup.string().matches(/[0-9]{5}-[0-9]{7}-[0-9]{1}/, 'Invalid CNIC No'),

})

const initialValues = {
    Name: '',
    Gender: 'Male',
    Email: '',
    PhoneNo: '',
    Address: '',
    DOB: '',
    CNIC: '',
    Password: '',
    RetypePassword: '',
    Voucher: '',
}

const  userSubscription = async (values, actions) => {

    try {
        const result = await axios.post("http://192.168.8.103:3000/subscribe", values);
        return {
            msg: result.data.msg,
            status: result.status
        };
    }

    catch(err) {
        return {
            msg: err.response.data.msg,
            status: err.response.status
        };
    }
}

// actions.resetform();

const SubscriptionForm = ({ navigation }) => {
    const [passwordSecure, setPasswordSecure] = React.useState(true);
    const [retypePasswordSecure, setRetypePasswordSecure] = React.useState(true);
    const mutation = useMutation((values, actions) => userSubscription(values, actions));
    console.log(mutation);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={globalStyles.body}>
                <Formik initialValues={initialValues} validationSchema={SubscriptionSchema} onSubmit={(values, actions) => mutation.mutate(values, actions)}>
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                                <Text>Package: Basic</Text>
                                <Text style={globalStyles.inputLabel}>Name</Text>
                                <TextInput
                                    style={globalStyles.input} placeholder="Enter full name"
                                    onChangeText={handleChange('Name')}
                                    onBlur={handleBlur('Name')}
                                    value={values.Name} />
                                {errors.Name && touched.Name ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='Name' /></Text> : <></>}

                                <Text style={globalStyles.inputLabel}>Gender</Text>
                                <Dropdown value={values.Gender} setValue={handleChange('Gender')} data={['Male', 'Female']} />
                                {errors.Gender && touched.Gender ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='Gender' /></Text> : <></>}

                                <Text style={globalStyles.inputLabel}>Email</Text>
                                <TextInput
                                    style={globalStyles.input} placeholder="Enter email address"
                                    onChangeText={handleChange('Email')}
                                    onBlur={handleBlur('Email')}
                                    value={values.Email} />
                                {errors.Email && touched.Email ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='Email' /></Text> : <></>}

                                <Text style={globalStyles.inputLabel}>Contact Number</Text>
                                <TextInput
                                    keyboardType='numeric' style={globalStyles.input} placeholder="Enter Phone Number (i.e. 0123-1234567)"
                                    onChangeText={handleChange('PhoneNo')}
                                    onBlur={handleBlur('PhoneNo')}
                                    value={values.PhoneNo} />
                                {errors.PhoneNo && touched.PhoneNo ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='PhoneNo' /></Text> : <></>}

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

                                <Text style={globalStyles.inputLabel}>Password</Text>
                                <View style={globalStyles.PasswordContainer}>
                                    <TextInput
                                        placeholder="Enter password"
                                        secureTextEntry={passwordSecure}
                                        onChangeText={handleChange('Password')}
                                        onBlur={handleBlur('Password')}
                                        value={values.Password} />
                                    {values.Password ? <Text style={{ textAlignVertical: 'center' }} onPress={() => setPasswordSecure(!passwordSecure)}>{passwordSecure ? 'Show' : 'Hide'}</Text> : <></>}
                                </View>
                                {errors.Password && touched.Password ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='Password' /></Text> : <></>}
                                
                                <Text style={globalStyles.inputLabel}>Retype Password</Text>
                                <View style={globalStyles.PasswordContainer}>
                                    <TextInput
                                        placeholder="Retype password"
                                        secureTextEntry={retypePasswordSecure}
                                        onChangeText={handleChange('RetypePassword')}
                                        onBlur={handleBlur('RetypePassword')}
                                        value={values.RetypePassword} />
                                    {values.RetypePassword ? <Text style={{ textAlignVertical: 'center' }} onPress={() => setRetypePasswordSecure(!retypePasswordSecure)}>{retypePasswordSecure ? 'Show' : 'Hide'}</Text> : <></>}
                                </View>
                                {errors.RetypePassword && touched.RetypePassword ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='RetypePassword' /></Text> : <></>}
                                
                                <Text style={globalStyles.inputLabel}>Payment Voucher</Text>
                                <TextInput
                                    style={globalStyles.input} placeholder='Payment Voucher / Transaction No'
                                    onChangeText={handleChange('Voucher')}
                                    onBlur={handleBlur('Voucher')}
                                    value={values.Voucher} />
                                {errors.Voucher && touched.Voucher ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='Voucher' /></Text> : <></>}
                                <Text style={{ marginVertical: 10 }}>By clicking Subscribe button, you agree to our <Text style={globalStyles.forgotPassword}>Terms and Conditions</Text></Text>
                                <FlatButton text='Subscribe' onPress={handleSubmit} />
                            </KeyboardAwareScrollView>
                        </View>
                    )}
                </Formik>
                <LoginSubscribeFooter text1='Already have account?' text2='Login' linkTo='Login' navigation={navigation} />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default SubscriptionForm;