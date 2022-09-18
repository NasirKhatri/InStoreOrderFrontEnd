import * as React from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
import { StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getCategories, getItems } from '../../SharedFunctions.js/GetQueries';

import globalStyles from '../../globalStyles';

import { POSButton1, POSButton2 } from '../../Components/Button';



const POSMainScreen = ({ navigation }) => {
    const [customerNo, setCustomerNo] = React.useState(1);
    const [custoemrType, setCustomerType] = React.useState('Take Away');
    const categories = useQuery(['Categories', 'Details'], () => getCategories());
    const items = useQuery(['Items', 'Details'], () => getItems());

    if(categories.isLoading || items.isLoading) {
        return (
            <>
            </>
        )
    }

    else {

    return (
        <View style={{ ...globalStyles.body, paddingHorizontal: 4, paddingTop: 4 }}>
            <View style={{ flexDirection: 'row' }}>
                <POSButton1 text='Customer 1' active={customerNo === 1 ? true : false} onPress={() => setCustomerNo(1)} />
                <POSButton1 text='Customer 2' active={customerNo === 2 ? true : false} onPress={() => setCustomerNo(2)} />
                <POSButton1 text='Customer 3' active={customerNo === 3 ? true : false} onPress={() => setCustomerNo(3)} />
            </View>
            <View style={{ flexDirection: 'row' }}>
                <POSButton1 text='Take Away' active={custoemrType === "Take Away" ? true : false } onPress={() => setCustomerType("Take Away")} />
                <POSButton1 text='Dine In' active={custoemrType === "Dine In" ? true : false }  onPress={() => setCustomerType("Dine In")} />
                <POSButton1 text='Delivery' active={custoemrType === "Delivery" ? true : false } onPress={() => setCustomerType("Delivery")} />
            </View>
            <TextInput style={{ ...globalStyles.input, marginTop: 0, borderRadius: 18, marginHorizontal: 6, paddingLeft: 8 }} placeholder='Search' />
            <View style={{ flex: 1, ...styles.Section }}>
                <Text style={styles.title}>Categories</Text>
                <FlatList
                    columnWrapperStyle={{ justifyContent: 'flex-start'}}
                    data={categories.data}
                    numColumns={3}
                    renderItem={({ item }) => <POSButton2 item={item} />}
                    keyExtractor={item => item.CategoryID}
                    style={{ flexGrow: 0, paddingVertical: 8 }}
                />
            </View>
            <View style={{ flex: 1, ...styles.Section }}>
                <Text style={styles.title}>Items</Text>
                <FlatList
                    
                    data={items.data}
                    numColumns={3}
                    renderItem={({ item }) => <POSButton2 item={item} />}
                    keyExtractor={item => item.ItemID}
                    style={{ flexGrow: 0, paddingVertical: 8 }}
                />
            </View>
            <View style={{ flexDirection: 'row' }}>
                <POSButton1 text='6 Items' onPress={() => null} />
                <POSButton1 text='Rs 4000' onPress={() => null} />
                <POSButton1 text='Details' onPress={() => navigation.navigate('POSDetail', {customerNo: customerNo, setCustomerNo: setCustomerNo})} />
            </View>
            <View style={{ flexDirection: 'row' }}>
                <POSButton1 text='Discard Sale' onPress={() => null} />
                <POSButton1 text='Recall' onPress={() => null} />
                <POSButton1 text='Pay' onPress={() => navigation.navigate('POSPayment')} />
            </View>
        </View>
    )
    }
}

const styles = StyleSheet.create({

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