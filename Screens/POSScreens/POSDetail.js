import * as React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import { RadioButton } from 'react-native-paper';

import POSOrderline from '../../Components/POSOrderline';
import { POSButton1 } from '../../Components/Button';

import globalStyles from '../../globalStyles';

const CustomerNoSection = () => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <POSButton1 text='Customer 1' onPress={() => null} />
            <POSButton1 text='Customer 2' onPress={() => null} />
            <POSButton1 text='Customer 3' onPress={() => null} />
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
    const [discountType, setDiscountType] = useState('percent');
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 6, backgroundColor: 'lightblue', marginBottom: 6, marginTop: 6 }}>
            <View>
                <Text style={styles.title}>No of Products: 5</Text>
                <Text style={styles.title}>No of Items Sold: 8</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={styles.title}>Discount:</Text>
                    <TextInput placeholder='??' keyboardType='numeric' style={{ paddingHorizontal: 5 }} />
                </View>
                <RadioButton.Group onValueChange={newValue => setDiscountType(newValue)} value={discountType}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.title}>%age</Text>
                            <RadioButton value="percent" />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.title}>Fixed</Text>
                            <RadioButton value="fixed" />
                        </View>
                    </View>
                </RadioButton.Group>
            </View>
            <View>
                <Text style={styles.title}>Sub Total : 5000</Text>
                <Text style={styles.title}>Tax : 850 (17%)</Text>
                <Text style={styles.title}>Total : 5850</Text>
            </View>
        </View>
    )
}

const BottomButtonsSection = ({navigation}) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <POSButton1 text='Back' onPress={() => navigation.goBack()} />
            <POSButton1 text='Discard Sale' onPress={() => null} />
            <POSButton1 text='Pay' onPress={() => navigation.navigate('POSPayment')} />
        </View>
    )
}

const POSDetailScreen = ({navigation}) => {
    const orderLines = [
        { key: 1, name: 'Club Sandwitch', qty: 2, price: 250, discount: 0, total: 500 },
        { key: 2, name: 'Club Sandwitch', qty: 2, price: 250, discount: 0, total: 500 },
        { key: 3, name: 'Club Sandwitch', qty: 2, price: 250, discount: 0, total: 500 },
        { key: 4, name: 'Club Sandwitch', qty: 2, price: 250, discount: 0, total: 500 },
        { key: 5, name: 'Club Sandwitch', qty: 2, price: 250, discount: 0, total: 500 },
        { key: 6, name: 'Club Sandwitch', qty: 2, price: 250, discount: 0, total: 500 },
        { key: 7, name: 'Club Sandwitch', qty: 2, price: 250, discount: 0, total: 500 },
        { key: 8, name: 'Club Sandwitch', qty: 2, price: 250, discount: 0, total: 500 },
        { key: 9, name: 'Club Sandwitch', qty: 2, price: 250, discount: 0, total: 500 },
        { key: 10, name: 'Club Sandwitch', qty: 2, price: 250, discount: 0, total: 500 },
        { key: 11, name: 'Club Sandwitch', qty: 2, price: 250, discount: 0, total: 500 },
        { key: 12, name: 'Club Sandwitch', qty: 2, price: 250, discount: 0, total: 500 },
        { key: 13, name: 'Club Sandwitch', qty: 2, price: 250, discount: 0, total: 500 },
        { key: 14, name: 'Club Sandwitch', qty: 2, price: 250, discount: 0, total: 500 },
        { key: 15, name: 'Club Sandwitch', qty: 2, price: 300, discount: 0, total: 500 },
    ]

    return (
        <View style={{ ...globalStyles.body, paddingHorizontal: 4, paddingTop: 4 }}>
            <CustomerNoSection />
            <OrderLinesHeaderSection />
            <FlatList
                data={orderLines}
                renderItem={({ item }) => <POSOrderline item={item} />}
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