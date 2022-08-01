import * as React from 'react';
import { View, FlatList } from 'react-native';

import KitchenOrder from '../../Components/KitchenOrder';

import globalStyles from '../../globalStyles';

const KitchenMainScreen = ({ navigation }) => {
    const orders = [{key:1, type: 'Dine In', }, {key:2, type: 'Take Away', }, {key:3, type: 'Delivery', }]
    return (
        <View style={globalStyles.body}>
            <FlatList
            data={orders}
            renderItem={({ item }) => <KitchenOrder item={item} />} />
        </View>
    )
}

export default KitchenMainScreen;