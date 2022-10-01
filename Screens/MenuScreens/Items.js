import * as React from 'react';
import { View } from 'react-native';
import globalStyles from '../../globalStyles';
import { CartButton } from '../../Components/Button.js';
import ItemCard from '../../Components/ItemCard';
import { FlatList } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getItems } from '../../SharedFunctions.js/GetQueries';

const ItemsScreen = ({ route, navigation }) => {
    const { categoryID } = route.params;
    const items = useQuery(['Items', 'Details'], () => getItems());
    console.log(items);
    let filteredItems;

    // const items = [
    //     { key: '1' },
    //     { key: '2' },
    //     { key: '3' },
    //     { key: '4' },
    //     { key: '5' },
    //     { key: '6' },
    //     { key: '7' },
    //     { key: '8' },
    //     { key: '9' },
    //     { key: '10' },
    // ];

    if(items.isLoading) {
        return (
            <></>
        )
    }

    else {
        filteredItems = items.data.filter(item => item.CategoryID === categoryID);
        console.log(filteredItems);
        return (
            <View style={globalStyles.body}>
                <FlatList
                    data={filteredItems}
                    numColumns={1}
                    keyExtractor={(item) => item.ItemID}
                    renderItem={({ item }) => <ItemCard item={item} />}
                />
                <CartButton text='View Cart' onPress={() => navigation.navigate('Cart')} />
            </View>
        )
    }

}

export default ItemsScreen;