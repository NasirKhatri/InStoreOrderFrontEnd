import * as React from 'react';
import { View, Text, TextInput, FlatList, Alert } from 'react-native';
import { StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getCategories, getItems } from '../../SharedFunctions.js/GetQueries';
import globalStyles from '../../globalStyles';
import { StoreContext } from '../../SharedFunctions.js/StoreContext';
import { useContext } from 'react';

import { POSButton1, POSButton2 } from '../../Components/Button';



const POSMainScreen = ({ navigation }) => {
    const [filterBy, setFilterBy] = React.useState(0);
    const categories = useQuery(['Categories', 'Details'], () => getCategories("POS"));
    const items = useQuery(['Items', 'Details'], () => getItems());
    const storeData = useContext(StoreContext);
    const customerNo = storeData.customerNo;
    const setCustomerNo = storeData.setCustomerNo;

    let itemDetails = [];
    if (customerNo === 1) {
        itemDetails = storeData.invoices.invoice1_details;
    }
    else if (customerNo === 2) {
        itemDetails = storeData.invoices.invoice2_details;
    }
    else {
        itemDetails = storeData.invoices.invoice3_details;;
    }

    let no_of_products = itemDetails.length;
    let no_of_items_sold = 0;
    let gross_price = 0;

    if(itemDetails.length > 0) {
        itemDetails.forEach((item) => {
            no_of_items_sold += item.Qty;
            gross_price += item.Qty * item.NetPrice;
        })
    }

    gross_price = gross_price.toFixed(2);

    const handleClear = () => {
        if(itemDetails.length > 0) {
            Alert.alert('Instore Order', 'Are you sure to clear details?', [
                {
                  text: 'Cancel',
                  onPress: () => null,
                  style: 'cancel',
                },
                { text: 'Yes', onPress: () => storeData.dispatchInvoice({ type: 'clear', active_invoice: customerNo }) },
              ]);
        }
    }

    const handlePay = () => {
        if(itemDetails.length > 0 ) {
            navigation.navigate('POSPayment');
        }
    }


    if(categories.isLoading || items.isLoading) {
        return (
            <>
            </>
        )
    }

    else {
        
    const filteredItems = filterBy === 0 ? items.data : items.data.filter(item => item.CategoryID === filterBy);

    return (
        <View style={{ ...globalStyles.body, paddingHorizontal: 4, paddingTop: 4 }}>
            <View style={{ flexDirection: 'row' }}>
                <POSButton1 text='Customer 1' active={customerNo === 1 ? true : false} onPress={() => setCustomerNo(1)} />
                <POSButton1 text='Customer 2' active={customerNo === 2 ? true : false} onPress={() => setCustomerNo(2)} />
                <POSButton1 text='Customer 3' active={customerNo === 3 ? true : false} onPress={() => setCustomerNo(3)} />
            </View>
            <View style={{flexDirection: "row", paddingRight: 7}}>
            <TextInput style={{ ...globalStyles.input, marginTop: 0, borderRadius: 2, marginHorizontal: 6, paddingLeft: 8, flex: 0.8 }} placeholder='Search' />
            <Text style={{flex: 0.2, paddingVertical: 9, borderColor: 'lightgray', borderWidth: 1, textAlign: 'center'}} onPress={() => setFilterBy(0)}>Show All</Text>
            </View>
            
            <View style={{ flex: 1, ...styles.Section }}>
                <Text style={styles.title}>Categories</Text>
                <FlatList
                    columnWrapperStyle={{ justifyContent: 'flex-start'}}
                    data={categories.data}
                    numColumns={3}
                    renderItem={({ item }) => <POSButton2 item={item} onPress={() => setFilterBy(item.CategoryID)} />}
                    keyExtractor={item => item.CategoryID}
                    style={{ flexGrow: 0, paddingVertical: 8 }}
                />
            </View>
            <View style={{ flex: 1.5, ...styles.Section }}>
                <Text style={styles.title}>Items</Text>
                <FlatList
                    columnWrapperStyle={{ justifyContent: 'flex-start'}}
                    data={filteredItems}
                    numColumns={3}
                    renderItem={({ item }) => <POSButton2 item={item} onPress={() => storeData.dispatchInvoice({ type: 'increase', ItemNumber: item.ItemID, ItemDetails: item, active_invoice: customerNo })} />}
                    keyExtractor={item => item.ItemID}
                    style={{ flexGrow: 0, paddingVertical: 8 }}
                />
            </View>
            <View style={{ flexDirection: 'row' }}>
                <POSButton1 text={`I ${no_of_products}`} onPress={() => null} />
                <POSButton1 text={`Q ${no_of_items_sold}`} onPress={() => null} />
                <POSButton1 text={`${gross_price}`} onPress={() => null} />
                <POSButton1 text='Details' onPress={() => navigation.navigate('POSDetail')} />
            </View>
            <View style={{ flexDirection: 'row' }}>
                <POSButton1 text='Clear' onPress={handleClear} />
                <POSButton1 text='Dine In' onPress={() => null} />
                <POSButton1 text='Online' onPress={() => null} />
                <POSButton1 text='Pay' onPress={handlePay} />
            </View>
        </View>
    )
    }
}

const styles = StyleSheet.create({

    Section: {
        marginBottom: 8,
        marginTop: 4
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 1,
        marginLeft: 5
    }
})

export default POSMainScreen;