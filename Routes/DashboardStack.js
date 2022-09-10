import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';

import { IconButton } from '../Components/Button';
import DashboardScreen from '../Screens/DashboardScreens/Dashboard';
import { StoreContext } from '../SharedFunctions.js/StoreContext';

import globalStyles from '../globalStyles';
import { HandleLogout } from '../SharedFunctions.js/HandleLogout';

const Stack = createNativeStackNavigator();

const DashboardStack = ({ navigation }) => {
    const storeData = useContext(StoreContext);

    const headerRight = () => <IconButton name="logout" onPress={() => HandleLogout(storeData.setLoggedIn)} />
    const headerLeft = () => <IconButton name="menu" onPress={() => navigation.toggleDrawer()} />

    return (
        <Stack.Navigator screenOptions={{...globalStyles.AppBar, headerRight}}>
            <Stack.Screen name="Dashboard Main" component={DashboardScreen} options={{headerLeft}}/>
        </Stack.Navigator>
    )
}

export default DashboardStack;