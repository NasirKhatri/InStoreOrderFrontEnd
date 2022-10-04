import 'react-native-gesture-handler';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useReducer } from 'react';

import LoginSubscribeStack from './Routes/LoginSubscribeStack';
import DashboardStack from './Routes/DashboardStack';
import MenuStack from './Routes/MenuStack';
import POSStack from './Routes/POSStack';
import KitchenStack from './Routes/KitchenStack';
import SettingsStack from './Routes/SettingStack';
import { StoreContext } from './SharedFunctions.js/StoreContext';
import { invoiceUpdateReducer } from './SharedFunctions.js/Reducers';
import { discountsUpdateReducer } from './SharedFunctions.js/Reducers';
import { dineInOrdersReducers } from './SharedFunctions.js/Reducers';
import { CustomDrawer } from './Components/CustomDrawer';
import { IconButton } from './Components/Button';
import Ionicons from '@expo/vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

const queryClient = new QueryClient();

const all_invoice_details = {
  invoice1_details: [],
  invoice2_details: [],
  invoice3_details: [],
}

const additional_discounts = {
  discount1: 0,
  discount2: 0,
  discount3: 0
}

const dineInOrdersBody = {}

export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [customerNo, setCustomerNo] = useState(1);
  const [invoices, dispatch] = useReducer(invoiceUpdateReducer, all_invoice_details);
  const [addDiscounts, setAddDiscounts] = useReducer(discountsUpdateReducer, additional_discounts);
  const [dineInOrders, dispatchDineInOrders] = useReducer(dineInOrdersReducers, dineInOrdersBody);
  const [tableNumber, setTableNumber] = useState(null);

  return (
    <QueryClientProvider client={queryClient}>
      <StoreContext.Provider value={{
        isLoggedin: isLoggedIn,
        setLoggedIn: setLoggedIn,
        customerNo: customerNo,
        setCustomerNo: setCustomerNo,
        invoices: invoices,
        dispatchInvoice: dispatch,
        discounts: addDiscounts,
        dispatchDiscount: setAddDiscounts,
        dineInOrders: dineInOrders,
        dispatchDineInOrders: dispatchDineInOrders,
        tableNumber: tableNumber,
        setTableNumber: setTableNumber,
      }}>
        <NavigationContainer>
          {
            !isLoggedIn ? <LoginSubscribeStack /> :
              <Drawer.Navigator 
                drawerContent={props => <CustomDrawer {...props}/>} 
                screenOptions={{ 
                  headerShown: false, 
                  drawerLabelStyle: {marginLeft: -20},
                  drawerActiveBackgroundColor: '#0080FF',
                  drawerActiveTintColor: 'white',
                  drawerInactiveTintColor: '#0080FF' }}>
                <Drawer.Screen name="Dashboard" component={DashboardStack} options={{
                  drawerIcon: ({color}) => (
                    <IconButton name="tablet-dashboard" color={color} size={22}/>
                  )
                }} />
                <Drawer.Screen name="Menu" component={MenuStack} options={{
                  drawerIcon: ({color}) => (
                    <IconButton name="food" color={color} size={22}/>
                  )
                }}/>
                <Drawer.Screen name='POS' component={POSStack} options={{
                  drawerIcon: ({color}) => (
                    <IconButton name="point-of-sale" color={color} size={22}/>
                  )
                }} />
                <Drawer.Screen name='Kitchen' component={KitchenStack} options={{
                  drawerIcon: ({color}) => (
                    <IconButton name="chef-hat" color={color} size={22}/>
                  )
                }}/>
                <Drawer.Screen name='Setup' component={SettingsStack} options={{
                  drawerIcon: ({color}) => (
                    <Ionicons name="settings" size={22} color={color}/>
                  )
                }}/>
              </Drawer.Navigator>
          }
        </NavigationContainer>
      </StoreContext.Provider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
