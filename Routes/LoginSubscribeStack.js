import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../Screens/Login';
import PackagesScreen from '../Screens/Packages';
import PackageDetail from '../Screens/PackageDetail';
import SubscriptionForm from '../Screens/SubscriptionForm';

import globalStyles from '../globalStyles';

const Stack = createNativeStackNavigator();

const LoginSubscribeStack = ({ navigation }) => {
    return (
        <Stack.Navigator screenOptions={globalStyles.AppBar}>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Packages" component={PackagesScreen}/>
            <Stack.Screen name="Package Detail" component={PackageDetail}/>
            <Stack.Screen name="Subscribe" component={SubscriptionForm}/>
        </Stack.Navigator>
    )
}

export default LoginSubscribeStack;