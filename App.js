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
      }}>
        <NavigationContainer>
          {
            !isLoggedIn ? <LoginSubscribeStack /> :
              <Drawer.Navigator screenOptions={{ headerShown: false }}>
                <Drawer.Screen name="Dashboard" component={DashboardStack} />
                <Drawer.Screen name="Menu" component={MenuStack} />
                <Drawer.Screen name='POS' component={POSStack} />
                <Drawer.Screen name='Kitchen' component={KitchenStack} />
                <Drawer.Screen name='Setup' component={SettingsStack} />
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
