import * as React from 'react';
import { View, FlatList, Text, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import globalStyles from '../globalStyles';

import { CartButton } from '../Components/Button.js';
import CategoryCard from '../Components/CategoryCard';


const CategoriesScreen = ({ navigation }) => {
    const categories = [
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
                    columnWrapperStyle={{ justifyContent: 'space-around' }}
                    data={categories}
                    numColumns={3}
                    renderItem={({ item }) => <CategoryCard onPress={() => navigation.navigate('Items')} />}
                />
                <CartButton />
        </View>
    )
}

export default CategoriesScreen;