import * as React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useContext } from 'react';

import POSOrderline from '../../Components/POSOrderline';
import { POSButton1 } from '../../Components/Button';
import { StoreContext } from '../../SharedFunctions.js/StoreContext';

import globalStyles from '../../globalStyles';
import { getOrderSummary } from '../../SharedFunctions.js/GetOrderSummary';

const CustomerNoSection = () => {

    const storeData = useContext(StoreContext);
    const customerNo = storeData.customerNo;
    const setCustomerNo = storeData.setCustomerNo;

    return (
        <View style={{ flexDirection: 'row' }}>
            <POSButton1 text='Customer 1' active={customerNo === 1 ? true : false} onPress={() => setCustomerNo(1)} />
            <POSButton1 text='Customer 2' active={customerNo === 2 ? true : false} onPress={() => setCustomerNo(2)} />
            <POSButton1 text='Customer 3' active={customerNo === 3 ? true : false} onPress={() => setCustomerNo(3)} />
        </View>
    )
}

const OrderLinesHeaderSection = () => {
    return (
        <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, borderColor: 'gray' }}>
            <Text style={{ ...styles.title, flexBasis: '25%' }}>Item</Text>
            <Text style={{ ...styles.title, flexBasis: '14%' }}>Qty</Text>
            <Text style={{ ...styles.title, flexBasis: '19.5%' }}>Price</Text>
            <Text style={{ ...styles.title, flexBasis: '14%' }}>% Disc</Text>
            <Text style={{ ...styles.title, flexBasis: '19.5%' }}>Total</Text>
            <Text style={{ ...styles.title, flexBasis: '8%' }}> </Text>
        </View>
    )
}

const InvoiceDetailsSection = () => {
    const storeData = useContext(StoreContext);
    const customerNo = storeData.customerNo;
    const discounts = storeData.discounts;
    let addDisc = customerNo === 1 ? discounts.discount1 : customerNo === 2 ? discounts.discount2 : discounts.discount3;
    console.log(addDisc);
    
    //const [addDisc, setAddDisc] = React.useState(0);
    //const Parsedvalue = addDisc ? parseFloat(addDisc) : 0;

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

    let orderDetails = getOrderSummary(itemDetails);

    let Products = orderDetails._Products;
    let ItemsQty = orderDetails._ItemsQty;
    let ItemDisc = orderDetails._ItemDisc;
    let SubTotal = orderDetails._SubTotal;
    let TaxAmount = orderDetails._TaxAmount;
    let TotalDiscount = (ItemDisc + parseFloat(addDisc)).toFixed(2);
    let Total = (SubTotal + TaxAmount - TotalDiscount).toFixed(2);


    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 6, backgroundColor: 'lightblue', marginBottom: 6, marginTop: 6 }}>
            <View style={{alignItems: "flex-start"}}>
                <Text style={styles.title}>Products: {Products}</Text>
                <Text style={styles.title}>Items Qty: {ItemsQty}</Text>
                <Text style={styles.title}>Item Disc: {ItemDisc.toFixed(2)}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={styles.title}>Add Disc:</Text>
                    <TextInput placeholder='??' keyboardType='numeric' style={{ paddingHorizontal: 5 }} onChangeText={(value) => storeData.dispatchDiscount({ active_invoice: customerNo, addDiscount: parseFloat(value)})} />
                </View>
            </View>
            <View style={{alignItems: "flex-start"}}>
                <Text style={styles.title}>Sub Total: {SubTotal.toFixed(2)}</Text>
                <Text style={styles.title}>Tax Amt: {TaxAmount.toFixed(2)}</Text>
                <Text style={styles.title}>Total Disc: {TotalDiscount} </Text>
                <Text style={styles.title}>Total: {Total}</Text>
            </View>
        </View>
    )
}

const BottomButtonsSection = ({ navigation }) => {
    const storeData = useContext(StoreContext);
    const customerNo = storeData.customerNo;
    return (
        <View style={{ flexDirection: 'row' }}>
            <POSButton1 text='Back' onPress={() => navigation.goBack()} />
            <POSButton1 text='Clear' onPress={() => storeData.dispatchInvoice({ type: 'clear', active_invoice: customerNo })} />
            <POSButton1 text='Pay' onPress={() => navigation.navigate('POSPayment')} />
        </View>
    )
}

const POSDetailScreen = ({ navigation }) => {
    const storeData = useContext(StoreContext);
    const customerNo = storeData.customerNo;

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

    return (
        <View style={{ ...globalStyles.body, paddingHorizontal: 4, paddingTop: 4 }}>
            <CustomerNoSection />
            <OrderLinesHeaderSection />
            <FlatList
                data={itemDetails}
                renderItem={({ item }) => <POSOrderline item={item} />}
                keyExtractor={item => item.ItemID}
                removeClippedSubviews={false}
            />
            <InvoiceDetailsSection />
            <BottomButtonsSection navigation={navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        paddingVertical: 6,
        textAlign: 'center',
        fontWeight: 'bold',

    }
})

export default POSDetailScreen;