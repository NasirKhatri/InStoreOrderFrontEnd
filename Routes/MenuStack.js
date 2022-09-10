import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';

import CategoriesScreen from '../Screens/MenuScreens/Categories';
import ItemsScreen from '../Screens/MenuScreens/Items';
import CartScreen from '../Screens/MenuScreens/Cart';

import { IconButton } from '../Components/Button';
import { StoreContext } from '../App';

import globalStyles from '../globalStyles';
import { HandleLogout } from '../SharedFunctions.js/HandleLogout';

const Stack = createNativeStackNavigator();

const MenuStack = ({ navigation }) => {
    const storeData = useContext(StoreContext);

    const headerRight = () => <IconButton name="logout" onPress={() => HandleLogout(storeData.setLoggedIn)} />
    const headerLeft = () => <IconButton name="menu" onPress={() => navigation.toggleDrawer()} />

    return (
        <Stack.Navigator screenOptions={{...globalStyles.AppBar, headerRight}}>
            <Stack.Screen name="Categories" component={CategoriesScreen} options={{headerLeft}}/>
            <Stack.Screen name="Items" component={ItemsScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
        </Stack.Navigator>
    )
}

export default MenuStack;