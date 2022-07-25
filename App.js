import 'react-native-gesture-handler';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { StyleSheet } from 'react-native';

import LoginSubscribeStack from './Routes/LoginSubscribeStack';
import MenuStack from './Routes/MenuStack';

const Drawer = createDrawerNavigator();

export default function App() {
  const [isLoggedIn, setLoggedIn] = React.useState(true);
  return (
    <NavigationContainer>
      {
        !isLoggedIn ? <LoginSubscribeStack /> :
          <Drawer.Navigator screenOptions={{ headerShown: false }}>
            <Drawer.Screen name="Login" component={MenuStack} />
          </Drawer.Navigator>
      }
    </NavigationContainer>
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
