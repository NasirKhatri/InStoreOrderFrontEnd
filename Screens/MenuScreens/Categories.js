import * as React from 'react';
import { View, FlatList } from 'react-native';
import { useQuery } from '@tanstack/react-query';

import globalStyles from '../../globalStyles';
import { CartButton } from '../../Components/Button.js';
import CategoryCard from '../../Components/CategoryCard';
import { getCategories } from '../../SharedFunctions.js/GetQueries';


const CategoriesScreen = ({ navigation }) => {
    const { isLoading: cloading, data: cdata } = useQuery(['categories'], () => getCategories("POS"));

    if (cloading) {
        return (
            <></>
        )
    }

    else {
        return (
            <View style={globalStyles.body}>
                <FlatList
                    columnWrapperStyle={{ justifyContent: 'flex-start'}}
                    data={cdata}
                    numColumns={3}
                    keyExtractor={category => category.CategoryID}
                    renderItem={({item}) => <CategoryCard item={item} onPress={() => navigation.navigate('Items', {categoryID: item.CategoryID})} />}
                />
                <CartButton text='View Cart' onPress={() => navigation.navigate('Cart')} />
            </View>
        )
    }
}

export default CategoriesScreen;