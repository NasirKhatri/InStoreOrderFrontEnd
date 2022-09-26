import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';

import { IconButton } from '../Components/Button';

import { StoreContext } from '../SharedFunctions.js/StoreContext';

import POSMainScreen from '../Screens/POSScreens/POSMain';
import POSDetailScreen from '../Screens/POSScreens/POSDetail';
import POSPaymentScreen from '../Screens/POSScreens/POSPayment';

import globalStyles from '../globalStyles';
import { HandleLogout } from '../SharedFunctions.js/HandleLogout';

const Stack = createNativeStackNavigator();

const POSStack = ({ navigation }) => {
    const storeData = useContext(StoreContext);

    const headerRight = () => <IconButton name="logout" onPress={() => HandleLogout(storeData.setLoggedIn)} />
    const headerLeft = () => <IconButton name="menu" onPress={() => navigation.toggleDrawer()} />

    return (
        <Stack.Navigator screenOptions={{...globalStyles.AppBar, headerRight}}>
            <Stack.Screen name="POSMain" component={POSMainScreen} options={{title: "POS", headerLeft}}/>
            <Stack.Screen name="POSDetail" component={POSDetailScreen} options={{title: "Details"}}/>
            <Stack.Screen name="POSPayment" component={POSPaymentScreen} options={{title: "Payment"}}/>
        </Stack.Navigator>
    )
}

export default POSStack;