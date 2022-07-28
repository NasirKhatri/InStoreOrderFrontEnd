import * as React from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { StyleSheet } from 'react-native';

import globalStyles from '../../globalStyles';



const POSMainScreen = ({ navigation }) => {
    const categories = [
        { key: '1', name: 'Burger', color: 'blue' },
        { key: '2', name: 'Burger', color: 'darkgray' },
        { key: '3', name: 'Burger', color: 'green' },
        { key: '4', name: 'Burger', color: 'red' },
        { key: '5', name: 'Burger', color: 'orange' },
        { key: '6', name: 'Burger', color: 'purple' },
        { key: '7', name: 'Burger', color: 'lightgreen' },
        { key: '8', name: 'Burger', color: 'gray' },
        { key: '9', name: 'Burger', color: 'black' },
        { key: '10', name: 'Burger', color: 'pink' },
    ];

    const items = [
        { key: '1', name: 'Burger and Burger', color: 'blue' },
        { key: '2', name: 'Burger', color: 'darkgray' },
        { key: '3', name: 'Burger', color: 'green' },
        { key: '4', name: 'Burger', color: 'red' },
        { key: '5', name: 'Burger', color: 'orange' },
        { key: '6', name: 'Burger', color: 'purple' },
        { key: '7', name: 'Burger', color: 'lightgreen' },
        { key: '8', name: 'Burger', color: 'gray' },
        { key: '9', name: 'Burger', color: 'black' },
        { key: '10', name: 'Burger', color: 'pink' },
    ];

    const POSButton1 = ({ text, onPress }) => {
        return (
            <TouchableOpacity style={{ flex: 1 }} onPress={onPress}>
                <View style={styles.CustomerTypeButton}>
                    <Text style={styles.ButtonText}>{text}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const POSButton2 = ({ item }) => {
        const [opacity, setOpacity] = React.useState(1);
        return (
            <TouchableOpacity style={{ flex: 1/3 }}>
                <View style={{ ...styles.CustomerTypeButton, backgroundColor: item.color }}>
                    <Text style={{...styles.ButtonText, color: 'white', marginVertical: 12}}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ ...globalStyles.body, paddingHorizontal: 4, paddingTop: 4 }}>
            <View style={{ flexDirection: 'row' }}>
                <POSButton1 text='Customer 1' onPress={() => null} />
                <POSButton1 text='Customer 2' onPress={() => null} />
                <POSButton1 text='Customer 3' onPress={() => null} />
            </View>
            <View style={{ flexDirection: 'row' }}>
                <POSButton1 text='Dine In' onPress={() => null} />
                <POSButton1 text='Take Away' onPress={() => null} />
                <POSButton1 text='Delivery' onPress={() => null} />
            </View>
            <TextInput style={{ ...globalStyles.input, marginTop: 0, borderRadius: 18, marginHorizontal: 6, paddingLeft: 8 }} placeholder='Search' />
            <View style={{ flex: 1, ...styles.Section }}>
                <Text style={styles.title}>Categories</Text>
                <FlatList
                    columnWrapperStyle={{ justifyContent: 'space-between', alignItems: 'baseline' }}
                    data={categories}
                    numColumns={3}
                    renderItem={({ item }) => <POSButton2 item={item} />}
                    style={{flexGrow: 0, paddingVertical: 8}}
                />
            </View>
            <View style={{ flex: 1, ...styles.Section }}>
                <Text style={styles.title}>Items</Text>
                <FlatList
                    columnWrapperStyle={{ justifyContent: 'space-between', alignItems: 'baseline' }}
                    data={items}
                    numColumns={3}
                    renderItem={({ item }) => <POSButton2 item={item} />}
                    style={{flexGrow: 0, paddingVertical: 8}}
                />
            </View>
            <View style={{ flexDirection: 'row' }}>
                <POSButton1 text='6 Items' onPress={() => null} />
                <POSButton1 text='Rs 4000' onPress={() => null} />
                <POSButton1 text='Details' onPress={() => navigation.navigate('POSDetail')} />
            </View>
            <View style={{ flexDirection: 'row' }}>
                <POSButton1 text='Discard Sale' onPress={() => null} />
                <POSButton1 text='Recall' onPress={() => null} />
                <POSButton1 text='Pay' onPress={() => null} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    CustomerTypeButton: {
        backgroundColor: 'lightblue',
        marginHorizontal: 4,
        padding: 6,
        marginBottom: 6
    },
    ButtonText: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 14
    },
    Section: {
        marginBottom: 8
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 1
    }
})

export default POSMainScreen;