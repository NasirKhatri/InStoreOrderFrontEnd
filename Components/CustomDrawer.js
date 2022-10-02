import React from 'react'
import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { IconButton } from './Button';
import { HandleLogout } from '../SharedFunctions.js/HandleLogout';
import { StoreContext } from '../SharedFunctions.js/StoreContext';
import { useContext } from 'react';

export const CustomDrawer = (props) => {
    const storeData = useContext(StoreContext);
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}
                contentContainerStyle={{ backgroundColor: '#0080FF' }}>
                {/* <ImageBackground source={require('../assets/images/Broast.png')} style={{padding: 20}} >
                    <Image source={require('../assets/images/Burger.png')} style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}/>
                </ ImageBackground> */}
                <Image source={require('../assets/images/Pic.png')} style={{ height: 60, width: 60, borderRadius: 30, marginLeft: 20, marginTop: 10 }} />
                <Text style={{ color: 'white', fontSize: 20, letterSpacing: 0.75, marginLeft: 20, marginVertical: 10, fontWeight: 'bold' }}>Muhammad Nasir</Text>
                <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => HandleLogout(storeData.setLoggedIn)}>
                    <IconButton name="logout" size={22} color="#0080FF" />
                    <Text style={{ marginLeft: 13, color: '#0080FF', fontWeight: 'bold' }}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}