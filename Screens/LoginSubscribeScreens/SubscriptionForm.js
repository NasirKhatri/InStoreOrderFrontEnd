import * as React from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import globalStyles from '../../globalStyles';
import { FlatButton } from '../../Components/Button.js';
import LoginSubscribeFooter from '../../Components/LoginSubscribeFooter';

import { Formik, ErrorMessage } from 'formik';
import * as Yup from "yup";

const SubscriptionSchema = Yup.object().shape({
    Name: Yup.string().min(2, 'Too Short').max(20, 'Too Long').required('Required'),
    Email: Yup.string().email('Invalid Email').required('Required'),
    PhoneNo: Yup.string().matches(/[0-9]{4}-[0-9]{7}/, 'Invalid Phone No').required('Required'),
    Password: Yup.string().min(6, 'Too Short').matches(/[A-Z]/, 'Must Contain Atleast One Upper Case Letter').matches(/[a-z]/, 'Must Contain Atleast One Lower Case Letter').matches(/[0-9]/, 'Must Contain Atleast One Numeric Value').matches(/[!@#$&]/, 'Must Contain Atlease One Special Character').required('Required'),
    RetypePassword: Yup.string().oneOf([Yup.ref('Password'), null], 'Passwords Must Match').required('Required'),
    Voucher: Yup.string().max(40, 'Too Long').required('Required'),

})

const initialValues = {
    Name: '',
    Email: '',
    PhoneNo: '',
    Password: '',
    RetypePassword: '',
    Voucher: '',
}

const userSubscription = (values, actions) => {
    console.log(values);
    actions.resetForm();

}

const SubscriptionForm = ({ navigation }) => {
    const [passwordSecure, setPasswordSecure] = React.useState(true);
    const [retypePasswordSecure, setRetypePasswordSecure] = React.useState(true);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={globalStyles.body}>
                <Formik initialValues={initialValues} validationSchema={SubscriptionSchema} onSubmit={(values, actions) => userSubscription(values, actions)}>
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                            <KeyboardAwareScrollView>
                                <Text>Package: Basic</Text>
                                <TextInput
                                    style={globalStyles.input} placeholder="Enter full name"
                                    onChangeText={handleChange('Name')}
                                    onBlur={handleBlur('Name')}
                                    value={values.Name} />
                                {errors.Name && touched.Name ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='Name' /></Text> : <></>}
                                <TextInput
                                    style={globalStyles.input} placeholder="Enter email address"
                                    onChangeText={handleChange('Email')}
                                    onBlur={handleBlur('Email')}
                                    value={values.Email} />
                                {errors.Email && touched.Email ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='Email' /></Text> : <></>}
                                <TextInput
                                    keyboardType='numeric' style={globalStyles.input} placeholder="Enter Phone Number (i.e. 0123-1234567)"
                                    onChangeText={handleChange('PhoneNo')}
                                    onBlur={handleBlur('PhoneNo')}
                                    value={values.PhoneNo} />
                                {errors.PhoneNo && touched.PhoneNo ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='PhoneNo' /></Text> : <></>}
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