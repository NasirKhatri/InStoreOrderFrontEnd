import * as React from 'react';
import { View, FlatList } from 'react-native';

import KitchenOrder from '../../Components/KitchenOrder';
import { FlatButton, POSButton1 } from '../../Components/Button';

import globalStyles from '../../globalStyles';

const KitchenMainScreen = ({ navigation }) => {
    const orders = [{ key: 1, type: 'Dine In', }, { key: 2, type: 'Take Away', }, { key: 3, type: 'Delivery', }]
    return (
        <View style={{ ...globalStyles.body, paddingHorizontal: 8 }}>
            <View>
                <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                    <POSButton1 text='Dine In' />
                    <POSButton1 text='TakeAway' />
                    <POSButton1 text='Delivery' />
                    <POSButton1 text='All' />
                </View>
                <FlatList
                    data={orders}
                    renderItem={({ item }) => <KitchenOrder item={item} navigation={navigation} />} />
            </View>
            <FlatButton text='Show Requirement Summary' onPress={() => navigation.navigate('Items Summary')} />
        </View>
    )
}

export default KitchenMainScreen;