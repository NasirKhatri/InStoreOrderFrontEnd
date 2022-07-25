import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '@react-native-material/core';
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import CategoriesScreen from '../Screens/Categories';
import ItemsScreen from '../Screens/Items';

import globalStyles from '../globalStyles';

const Stack = createNativeStackNavigator();

const MenuStack = ({ navigation }) => {
    return (
        <Stack.Navigator screenOptions={{
            ...globalStyles.AppBar, headerRight: () => {
                return (
                    <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                        <Icon name="logout" size={24} color="white" />
                    </IconComponentProvider>
                )
            }
        }}>
            <Stack.Screen name="Categories" component={CategoriesScreen} />
            <Stack.Screen name="Items" component={ItemsScreen} />
        </Stack.Navigator>
    )
}

export default MenuStack;