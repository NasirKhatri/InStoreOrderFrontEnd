import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CategoriesScreen from '../Screens/Categories';
import ItemsScreen from '../Screens/Items';

import globalStyles from '../globalStyles';

const Stack = createNativeStackNavigator();

const MenuStack = ({ navigation }) => {
    return (
        <Stack.Navigator screenOptions={globalStyles.AppBar}>
            <Stack.Screen name="Categories" component={CategoriesScreen}/>
            <Stack.Screen name="Items" component={ItemsScreen}/>
        </Stack.Navigator>
    )
}

export default MenuStack;