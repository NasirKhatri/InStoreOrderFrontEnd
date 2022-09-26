import * as React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import { useContext } from 'react';

import { POSButton1, IconButton } from '../../Components/Button';

import { useQuery, useMutation } from '@tanstack/react-query';
import { getCustomers } from '../../SharedFunctions.js/GetQueries';
import { StoreContext } from '../../SharedFunctions.js/StoreContext';
import { getOrderSummary } from '../../SharedFunctions.js/GetOrderSummary';
import { addRequest } from '../../SharedFunctions.js/AddRequest';

import globalStyles from '../../globalStyles';
import { getData } from '../../SharedFunctions.js/SetGetData';

const POSPaymentScreen =  ({ navigation }) => {
    const [clientID, setClientID] = React.useState(null);
    const mutation = useMutation((values) => addRequest(values, `sales/${clientID}`));
    
    React.useEffect(() => {
        (async () => {
            const user = await getData("user");
            setClientID(user.ClientID);
        })()
    }, []);

    const [showDatePicker, setShowDatePicker] = React.useState(false);
    const [date, setDate] = React.useState(new Date());
    
    const [cashPayment, setCashPayment] = React.useState(0);
    const [cardPayment, setCardPayment] = React.useState(0);

    const { isLoading, data } = useQuery(['customers', 'dropdown'], () => getCustomers('dropdown'));

    const handleDateChange = (event, date) => {
        const selectedDate = date;
        setShowDatePicker(false);
        setDate(selectedDate);
    }

    const dateYear = date.getFullYear();
    const dateMonth = ('0' + date.getMonth(date)).slice(-2);
    const dateDate = ('0' + date.getDate(date)).slice(-2);
    const dateFormat = `${dateYear}-${dateMonth}-${dateDate}`;

    const [customerID, setCustomerID] = React.useState(data ? data[0].id : null);

    const storeData = useContext(StoreContext);
    const customerNo = storeData.customerNo;
    const discounts = storeData.discounts;
    let addDisc = customerNo === 1 ? discounts.discount1 : customerNo === 2 ? discounts.discount2 : discounts.discount3;

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
    let receivedAmount = parseFloat(cashPayment) + parseFloat(cardPayment);
    let TotalDiscount = (ItemDisc + parseFloat(addDisc)).toFixed(2);
    let Total = (SubTotal + TaxAmount - TotalDiscount).toFixed(2);
    let returnedAmount = receivedAmount - Total;

    const requestBody = {
        itemDetails: itemDetails,
        saleDate: dateFormat,
        paymentMode: cashPayment && cardPayment ? "Both" : cashPayment ? "Cash" : "Card",
        receivedAmount: receivedAmount,
        total: parseFloat(Total),
        returnedAmount: returnedAmount,
        balance: 0,
        customerID: customerID,
        products: Products,
        itemsQty: ItemsQty,
        subTotal: SubTotal,
        itemDisc: ItemDisc,
        additionalDiscount: parseFloat(addDisc),
        taxAmount: TaxAmount,
        saleTypeID: 1, //Take Away Sale
        paymentStatus: "Paid",
        statusCode: 1, //Cooking
    }

    
    const handlePost = (values) => {
        mutation.mutateAsync(values);
        storeData.dispatchInvoice({ type: 'clear', active_invoice: customerNo });
        storeData.dispatchDiscount({active_invoice: customerNo, addDiscount: 0});
        navigation.navigate('POSMain');
    }

    if(isLoading) {
        return (
            <></>
        )
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={globalStyles.body}>
                <View>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1, marginRight: 8 }}>
                            <Text>Date</Text>
                            <View style={{ ...globalStyles.input, flexDirection: 'row', justifyContent: "space-between" }}>
                                <IconButton name='calendar' onPress={() => setShowDatePicker(true)} color='blue' />
                                {
                                    showDatePicker ? (<DateTimePicker mode='date' value={date} onChange={handleDateChange} />) : null
                                }
                                <Text style={{ marginRight: 10, marginTop: 3 }}>{dateFormat}</Text>
                            </View>

                        </View>
                        <View style={{ flex: 1 }}>
                            <Text>Customer</Text>
                            <Dropdown
                                style={{...globalStyles.input, paddingVertical: 0}}
                                selectedTextStyle={{fontSize: 14}}
                                itemTextStyle={{fontSize: 14}}
                                data={data}
                                search
                                labelField='name'
                                value={customerID}
                                valueField='id'
                                onChange={item => setCustomerID(item.id)}
                                />
                        </View>
                    </View>


                    <View style={styles.receivables}>
                        <Text style={styles.title}>PKR {Total}</Text>
                    </View>


                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <View style={{ flex: 1, marginRight: 8 }}>
                            <Text>Cash</Text>
                            <TextInput placeholder='Enter Amount' value={cashPayment} onChangeText={(value) => value ? setCashPayment(parseFloat(value)) : 0} style={globalStyles.input} keyboardType="numeric" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text>Card</Text>
                            <TextInput placeholder='Enter Amount' value={cardPayment} onChangeText={(value) => value ? setCardPayment(parseFloat(value)) : 0} style={globalStyles.input} keyboardType="numeric" />
                        </View>
                    </View>


                    <View style={{ marginTop: 8 }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Return Cash</Text>
                        <Text style={styles.balanceAmount}>{(cardPayment + cashPayment - Total).toFixed(2)}</Text>
                    </View>


                    <View style={{ marginTop: 8 }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Remarks</Text>
                        <TextInput style={globalStyles.input} />
                    </View>

                </View>


                <View style={{ flexDirection: 'row' }}>
                    <POSButton1 text="Back" onPress={() => navigation.goBack()} />
                    <POSButton1 text="Post" onPress={() => handlePost(requestBody)} />
                    <POSButton1 text="Post & Print" />
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    receivables: {
        backgroundColor: 'lightblue',
        paddingVertical: 15,
        marginTop: 10,
        borderRadius: 8,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        letterSpacing: 1
    },
    balanceAmount: {
        backgroundColor: 'darkgray', fontSize: 18, fontWeight: 'bold', textAlign: 'center', paddingVertical: 15, marginTop: 8, borderRadius: 8
    }
})

export default POSPaymentScreen;