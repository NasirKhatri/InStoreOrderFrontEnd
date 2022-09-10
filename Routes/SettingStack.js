import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';

import { StoreContext } from '../App';

import SettingsScreen from '../Screens/SettingScreens/Settings';
import { AddCategory } from '../Screens/SettingScreens/AddCategory';
import { AddCustomer } from '../Screens/SettingScreens/AddCustomer';
import { AddItem } from '../Screens/SettingScreens/AddItem';
import { AddRider } from '../Screens/SettingScreens/AddRider';
import { AddTable } from '../Screens/SettingScreens/AddTable';
import { AddTaxType } from '../Screens/SettingScreens/AddTaxType';
import { AddUser } from '../Screens/SettingScreens/AddUser';
import { AddBranch } from '../Screens/SettingScreens/AddBranch';

import globalStyles from '../globalStyles';
import { HandleLogout } from '../SharedFunctions.js/HandleLogout';
import { IconButton } from '../Components/Button';

const Stack = createNativeStackNavigator();

const SettingsStack = ({ navigation }) => {
    const storeData = useContext(StoreContext);

    const headerRight = () => <IconButton name="logout" onPress={() => HandleLogout(storeData.setLoggedIn)} />
    const headerLeft = () => <IconButton name="menu" onPress={() => navigation.toggleDrawer()} />

    return (
        <Stack.Navigator screenOptions={{...globalStyles.AppBar, headerRight}}>
            <Stack.Screen name="Settings" component={SettingsScreen} options={{headerLeft}}/>
            <Stack.Screen name="Add Customer" component={AddCustomer}/>
            <Stack.Screen name="Add Category" component={AddCategory}/>
            <Stack.Screen name="Add Item" component={AddItem}/>
            <Stack.Screen name="Add Rider" component={AddRider}/>
            <Stack.Screen name="Add Table" component={AddTable}/>
            <Stack.Screen name="Add Tax Type" component={AddTaxType}/>
            <Stack.Screen name="Add User" component={AddUser}/>
            <Stack.Screen name="Add Branch" component={AddBranch}/>
        </Stack.Navigator>
    )
}

export default SettingsStack;