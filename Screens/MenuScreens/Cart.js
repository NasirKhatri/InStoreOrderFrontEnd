import * as React from 'react';
import { View, Text } from 'react-native';
import { FlatList } from 'react-native';

import ItemCard from '../../Components/ItemCard';
import { CartButton } from '../../Components/Button';

import globalStyles from '../../globalStyles';
import { useContext } from 'react';
import { StoreContext } from '../../SharedFunctions.js/StoreContext';


const CartScreen = ({ navigation }) => {
    const storeData = useContext(StoreContext);
    const activeTable = storeData.tableNumber;
    const cartitems = storeData.dineInOrders[activeTable];

    return (
        <View style={globalStyles.body}>
            <FlatList
                data={cartitems}
                numColumns={1}
                keyExtractor={(item) => item.ItemID}
                renderItem={({ item }) => <ItemCard type='cart' item={item}/>}
            />
            <CartButton text='Place Order' onPress={() => null} />
        </View>
    )
}

export default CartScreen;