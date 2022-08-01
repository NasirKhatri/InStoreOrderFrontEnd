import 'react-native-gesture-handler';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet } from 'react-native';

import LoginSubscribeStack from './Routes/LoginSubscribeStack';
import DashboardStack from './Routes/DashboardStack';
import MenuStack from './Routes/MenuStack';
import POSStack from './Routes/POSStack';
import KitchenStack from './Routes/KitchenStack';

const Drawer = createDrawerNavigator();
export const StoreContext = React.createContext();


export default function App() {
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  return (
    <StoreContext.Provider value={{ isLoggedin: isLoggedIn , setLoggedIn: setLoggedIn }}>
      <NavigationContainer>
        {
          !isLoggedIn ? <LoginSubscribeStack /> :
            <Drawer.Navigator screenOptions={{ headerShown: false }}>
              <Drawer.Screen name="Dashboard" component={DashboardStack} />
              <Drawer.Screen name="Menu" component={MenuStack} />
              <Drawer.Screen name='POS' component={POSStack} />
              <Drawer.Screen name='Kitchen' component={KitchenStack} />
            </Drawer.Navigator>
        }
      </NavigationContainer>
    </StoreContext.Provider>
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
