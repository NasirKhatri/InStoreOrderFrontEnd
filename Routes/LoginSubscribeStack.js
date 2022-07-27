import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../Screens/LoginSubscribeScreens/Login';
import PackagesScreen from '../Screens/LoginSubscribeScreens/Packages';
import PackageDetail from '../Screens/LoginSubscribeScreens/PackageDetail';
import SubscriptionForm from '../Screens/LoginSubscribeScreens/SubscriptionForm';

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