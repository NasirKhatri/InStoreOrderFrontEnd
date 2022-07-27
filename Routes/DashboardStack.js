import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';

import { IconButton } from '../Components/Button';
import DashboardScreen from '../Screens/DashboardScreens/Dashboard';
import { StoreContext } from '../App';

import globalStyles from '../globalStyles';

const Stack = createNativeStackNavigator();

const DashboardStack = ({ navigation }) => {
    const storeData = useContext(StoreContext);

    const headerRight = () => <IconButton name="logout" onPress={() => storeData.setLoggedIn(false)} />
    const headerLeft = () => <IconButton name="menu" onPress={() => navigation.toggleDrawer()} />

    return (
        <Stack.Navigator screenOptions={{...globalStyles.AppBar, headerRight}}>
            <Stack.Screen name="Dashboard" component={DashboardScreen} options={{headerLeft}}/>
        </Stack.Navigator>
    )
}

export default DashboardStack;