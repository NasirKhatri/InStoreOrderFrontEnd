import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';

import { IconButton } from '../Components/Button';

import { StoreContext } from '../App';

import POSMainScreen from '../Screens/POSScreens/POSMain';
import POSDetailScreen from '../Screens/POSScreens/POSDetail';

import globalStyles from '../globalStyles';

const Stack = createNativeStackNavigator();

const POSStack = ({ navigation }) => {
    const storeData = useContext(StoreContext);

    const headerRight = () => <IconButton name="logout" onPress={() => storeData.setLoggedIn(false)} />
    const headerLeft = () => <IconButton name="menu" onPress={() => navigation.toggleDrawer()} />

    return (
        <Stack.Navigator screenOptions={{...globalStyles.AppBar, headerRight}}>
            <Stack.Screen name="POSMain" component={POSMainScreen} options={{headerLeft}}/>
            <Stack.Screen name="POSDetail" component={POSDetailScreen}/>
        </Stack.Navigator>
    )
}

export default POSStack;