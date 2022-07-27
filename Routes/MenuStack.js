import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';

import CategoriesScreen from '../Screens/MenuScreens/Categories';
import ItemsScreen from '../Screens/MenuScreens/Items';
import { IconButton } from '../Components/Button';
import { StoreContext } from '../App';

import globalStyles from '../globalStyles';
import { DrawerActions } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const MenuStack = ({ navigation }) => {
    const storeData = useContext(StoreContext);

    const headerRight = () => <IconButton name="logout" onPress={() => storeData.setLoggedIn(false)} />
    const headerLeft = () => <IconButton name="menu" onPress={() => navigation.toggleDrawer()} />

    return (
        <Stack.Navigator screenOptions={{...globalStyles.AppBar, headerRight}}>
            <Stack.Screen name="Categories" component={CategoriesScreen} options={{headerLeft}}/>
            <Stack.Screen name="Items" component={ItemsScreen} />
        </Stack.Navigator>
    )
}

export default MenuStack;