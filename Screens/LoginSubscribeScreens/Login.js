import * as React from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import globalStyles from '../../globalStyles.js';
import { FlatButton } from '../../Components/Button.js';
import LoginSubscribeFooter from '../../Components/LoginSubscribeFooter';
import { useContext } from 'react';
import { StoreContext } from '../../App.js';

import { Formik, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { TouchableNativeFeedback } from 'react-native-web';

const LoginSchema = Yup.object().shape({
    Email: Yup.string().email('Invalid Email').required('Required'),
    Password: Yup.string().required('Required'),
})

const initialValues = {
    Email: '',
    Password: '',
}

const userLogin = (func, values) => {
    func(true);
}

const LoginScreen = ({ navigation }) => {
    const storeData = useContext(StoreContext);
    const [isPasswordSecure, setIsPasswordSecure] = React.useState(true);
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={globalStyles.body}>
                <Formik initialValues={initialValues} validationSchema={LoginSchema} onSubmit={(values) => userLogin(storeData.setLoggedIn, values)}>
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
                                { values.Password && touched.Password ? <Text style={{textAlignVertical: 'center'}} onPress={() => setIsPasswordSecure(!isPasswordSecure)}>{isPasswordSecure ? 'Show' : 'Hide'}</Text> : <></> }
                            </View>
                            {errors.Password ? <Text style={globalStyles.ErrorMessages}><ErrorMessage name='Password' /></Text> : <></>}
                            <Text style={globalStyles.forgotPassword}>Forgot Password?</Text>
                            <FlatButton text='Login' onPress={handleSubmit} />
                        </View>
                    )}
                </Formik>
                <LoginSubscribeFooter text1='Do not have account?' text2='Subscribe' linkTo='Packages' navigation={navigation} />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default LoginScreen;