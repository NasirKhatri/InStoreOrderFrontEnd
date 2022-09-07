import 'react-native-gesture-handler';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import LoginSubscribeStack from './Routes/LoginSubscribeStack';
import DashboardStack from './Routes/DashboardStack';
import MenuStack from './Routes/MenuStack';
import POSStack from './Routes/POSStack';
import KitchenStack from './Routes/KitchenStack';
import SettingsStack from './Routes/SettingStack';

const Drawer = createDrawerNavigator();
export const StoreContext = React.createContext();

const queryClient = new QueryClient();


export default function App() {
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  return (
    <QueryClientProvider client={queryClient}>
      <StoreContext.Provider value={{ isLoggedin: isLoggedIn, setLoggedIn: setLoggedIn }}>
        <NavigationContainer>
          {
            !isLoggedIn ? <LoginSubscribeStack /> :
              <Drawer.Navigator screenOptions={{ headerShown: false }}>
                <Drawer.Screen name="Dashboard" component={DashboardStack} />
                <Drawer.Screen name="Menu" component={MenuStack} />
                <Drawer.Screen name='POS' component={POSStack} />
                <Drawer.Screen name='Kitchen' component={KitchenStack} />
                <Drawer.Screen name='Settings' component={SettingsStack} />
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
