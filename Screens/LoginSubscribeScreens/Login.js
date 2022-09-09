import * as React from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import globalStyles from '../../globalStyles.js';
import { FlatButton } from '../../Components/Button.js';
import LoginSubscribeFooter from '../../Components/LoginSubscribeFooter';
import { useContext } from 'react';
import { StoreContext } from '../../App.js';
import { setData, getData } from '../../SharedFunctions.js/SetGetData.js';

import { useMutation } from '@tanstack/react-query';

import { Formik, ErrorMessage } from 'formik';
import * as Yup from "yup";
import axios from 'axios';

const LoginSchema = Yup.object().shape({
    Email: Yup.string().email('Invalid Email').required('Required'),
    Password: Yup.string().required('Required'),
})

const initialValues = {
    Email: '',
    Password: '',
}

const userLogin = async (values) => {
    try {
        const result = await axios.post("http://192.168.8.103:3000/login", values);
        await setData('user', result.data);

        return {
            data: result.data,
            status: result.status
        };
    }

    catch (err) {
        return {
            data: err.response.data,
            status: err.response.status
        };
    }
}

const LoginScreen = ({ navigation }) => {
    const storeData = useContext(StoreContext);
    const [isPasswordSecure, setIsPasswordSecure] = React.useState(true);
    const mutation = useMutation((values) => userLogin(values));

    const handleSubmit = (values) => {
        mutation.mutateAsync(values);
    }


    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={globalStyles.body}>
                <Formik initialValues={initialValues} validationSchema={LoginSchema} onSubmit={(values) => handleSubmit(values)}>
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={globalStyles.AppTitle}>Dine In</Text>
                            <TextInput
                                style={globalStyles.input} placeholder="Enter your email address"
                                onChangeText={handleChange('Email')}
                                onBlur={handleBlur('Email')}
                                value={values.Email} />
                            {errors.Email && touched.Email ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='Email' /></Text> : <></>}
                            <View style={globalStyles.PasswordContainer}>
                                <TextInput
                                    placeholder="Enter your password"
                                    secureTextEntry={isPasswordSecure}
                                    onChangeText={handleChange('Password')}
                                    onBlur={handleBlur('Password')}
                                    value={values.Password} />
                                { values.Password ? <Text style={{textAlignVertical: 'center'}} onPress={() => setIsPasswordSecure(!isPasswordSecure)}>{isPasswordSecure ? 'Show' : 'Hide'}</Text> : <></> }
                            </View>
                            {errors.Password  && touched.Password ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='Password' /></Text> : <></>}
                            <Text style={globalStyles.forgotPassword}>Forgot Password?</Text>
                            {mutation.isSuccess && mutation.data.status !== 200 ? <Text>{mutation.data.data.msg}</Text> : null}
                            {mutation.isLoading ? <Text>Loading...</Text> : null}
                            <FlatButton text='Login' onPress={handleSubmit} />
                        </View>
                    )}
                </Formik>
                { 
                    mutation.isSuccess && mutation.data.status === 200 ? storeData.setLoggedIn(true) : null                         
                }
                <LoginSubscribeFooter text1='Do not have account?' text2='Subscribe' linkTo='Packages' navigation={navigation} />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default LoginScreen;