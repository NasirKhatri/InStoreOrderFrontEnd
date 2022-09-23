import * as React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';

import { POSButton1, IconButton } from '../../Components/Button';

import { useQuery } from '@tanstack/react-query';
import { getCustomers } from '../../SharedFunctions.js/GetQueries';

import globalStyles from '../../globalStyles';

const POSPaymentScreen = ({ navigation }) => {

    const [showDatePicker, setShowDatePicker] = React.useState(false);
    const [date, setDate] = React.useState(new Date());
    const [customerID, setCustomerID] = React.useState(null);

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
                        <Text style={styles.title}>PKR 5850</Text>
                    </View>


                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <View style={{ flex: 1, marginRight: 8 }}>
                            <Text>Cash</Text>
                            <TextInput placeholder='Enter Amount' style={globalStyles.input} keyboardType="numeric" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text>Card</Text>
                            <TextInput placeholder='Enter Amount' style={globalStyles.input} keyboardType="numeric" />
                        </View>
                    </View>


                    <View style={{ marginTop: 8 }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Return Cash</Text>
                        <Text style={styles.balanceAmount}>150</Text>
                    </View>


                    <View style={{ marginTop: 8 }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Remarks</Text>
                        <TextInput style={globalStyles.input} />
                    </View>

                </View>


                <View style={{ flexDirection: 'row' }}>
                    <POSButton1 text="Back" onPress={() => navigation.goBack()} />
                    <POSButton1 text="Post" />
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