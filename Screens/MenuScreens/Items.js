import * as React from 'react';
import { View, Text } from 'react-native';
import globalStyles from '../../globalStyles';
import { CartButton } from '../../Components/Button.js';
import ItemCard from '../../Components/ItemCard';
import { FlatList } from 'react-native';

const ItemsScreen = ({ navigation }) => {
    const items = [
        { key: '1' },
        { key: '2' },
        { key: '3' },
        { key: '4' },
        { key: '5' },
        { key: '6' },
        { key: '7' },
        { key: '8' },
        { key: '9' },
        { key: '10' },
    ];
    return (
        <View style={globalStyles.body}>
            <FlatList
                data={items}
                numColumns={1}
                renderItem={({ item }) => <ItemCard />}
            />
            <CartButton text='View Cart' onPress={() => navigation.navigate('Cart')} />
        </View>
    )
}

export default ItemsScreen;