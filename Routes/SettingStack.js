import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';

import { StoreContext } from '../App';
import SettingsScreen from '../Screens/SettingScreens/Settings';
import globalStyles from '../globalStyles';
import { IconButton } from '../Components/Button';

const Stack = createNativeStackNavigator();

const SettingsStack = ({ navigation }) => {
    const storeData = useContext(StoreContext);

    const headerRight = () => <IconButton name="logout" onPress={() => storeData.setLoggedIn(false)} />
    const headerLeft = () => <IconButton name="menu" onPress={() => navigation.toggleDrawer()} />

    return (
        <Stack.Navigator screenOptions={{...globalStyles.AppBar, headerRight}}>
            <Stack.Screen name="Settings" component={SettingsScreen} options={{headerLeft}}/>
        </Stack.Navigator>
    )
}

export default SettingsStack;