import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';

import { IconButton } from '../Components/Button';

import KitchenMainScreen from '../Screens/KitchenDisplayScreens/KitchenMain';
import KitchenOrderDetailsScreen from '../Screens/KitchenDisplayScreens/KitchenOrderDetails';
import KitchenItemWiseScreen from '../Screens/KitchenDisplayScreens/KitchenItemWise';

import { StoreContext } from '../App';

import globalStyles from '../globalStyles';

const Stack = createNativeStackNavigator();

const KitchenStack = ({ navigation }) => {
    const storeData = useContext(StoreContext);

    const headerRight = () => <IconButton name="logout" onPress={() => storeData.setLoggedIn(false)} />
    const headerLeft = () => <IconButton name="menu" onPress={() => navigation.toggleDrawer()} />

    return (
        <Stack.Navigator screenOptions={{...globalStyles.AppBar, headerRight}}>
            <Stack.Screen name="Kitchen Main" component={KitchenMainScreen} options={{headerLeft}}/>
            <Stack.Screen name="Order Details" component={KitchenOrderDetailsScreen}/>
            <Stack.Screen name="Items Summary" component={KitchenItemWiseScreen}/>
        </Stack.Navigator>
    )
}

export default KitchenStack;