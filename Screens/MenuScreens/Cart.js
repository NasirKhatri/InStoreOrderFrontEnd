import * as React from 'react';
import { View, Text } from 'react-native';
import { FlatList } from 'react-native';

import ItemCard from '../../Components/ItemCard';
import { CartButton } from '../../Components/Button';

import globalStyles from '../../globalStyles';

const CartScreen = ({ navigation }) => {
    const cartitems = [
        { key: '1' },
        { key: '2' },
        { key: '3' },
    ];
    return (
        <View style={globalStyles.body}>
            <FlatList
                data={cartitems}
                numColumns={1}
                renderItem={({ item }) => <ItemCard type='cart'/>}
            />
            <CartButton text='Place Order' onPress={() => null} />
        </View>
    )
}

export default CartScreen;