import * as React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useContext } from 'react';

import POSOrderline from '../../Components/POSOrderline';
import { POSButton1 } from '../../Components/Button';
import { StoreContext } from '../../SharedFunctions.js/StoreContext';

import globalStyles from '../../globalStyles';

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
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 6, backgroundColor: 'lightblue', marginBottom: 6, marginTop: 6 }}>
            <View style={{alignItems: "flex-start"}}>
                <Text style={styles.title}>Products: 5</Text>
                <Text style={styles.title}>Items Qty: 8</Text>
                <Text style={styles.title}>Item Disc: </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={styles.title}>Add Disc:</Text>
                    <TextInput placeholder='??' keyboardType='numeric' style={{ paddingHorizontal: 5 }} />
                </View>
            </View>
            <View style={{alignItems: "flex-start"}}>
                <Text style={styles.title}>Sub Total: 5000</Text>
                <Text style={styles.title}>Tax Amt: 850</Text>
                <Text style={styles.title}>Total Disc: </Text>
                <Text style={styles.title}>Total: 5850</Text>
            </View>
        </View>
    )
}

const BottomButtonsSection = ({ navigation }) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <POSButton1 text='Back' onPress={() => navigation.goBack()} />
            <POSButton1 text='Discard Sale' onPress={() => null} />
            <POSButton1 text='Pay' onPress={() => navigation.navigate('POSPayment')} />
        </View>
    )
}

const POSDetailScreen = ({ route, navigation }) => {
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