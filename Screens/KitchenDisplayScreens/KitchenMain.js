import * as React from 'react';
import { View, FlatList } from 'react-native';

import KitchenOrder from '../../Components/KitchenOrder';
import { POSButton1 } from '../../Components/Button';

import globalStyles from '../../globalStyles';

const KitchenMainScreen = ({ navigation }) => {
    const orders = [{key:1, type: 'Dine In', }, {key:2, type: 'Take Away', }, {key:3, type: 'Delivery', }]
    return (
        <View style={{...globalStyles.body, paddingHorizontal: 8}}>
            <View>
                <View style={{flexDirection: 'row'}}>
                    <POSButton1 text='Dine In'/>
                    <POSButton1 text='TakeAway'/>
                    <POSButton1 text='Delivery'/>
                    <POSButton1 text='All'/>
                </View>
            <FlatList
            data={orders}
            renderItem={({ item }) => <KitchenOrder item={item} navigation={navigation}/>} />
        </View>
        </View>
    )
}

export default KitchenMainScreen;