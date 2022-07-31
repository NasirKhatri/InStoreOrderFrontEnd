import * as React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { POSButton1 } from '../../Components/Button';

import globalStyles from '../../globalStyles';

const POSPaymentScreen = ({navigation}) => {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={globalStyles.body}>
                <View>


                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1, marginRight: 8 }}>
                            <Text>Date</Text>
                            <TextInput placeholder='Add Date Picker' style={globalStyles.input} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text>Customer</Text>
                            <TextInput placeholder='Add searchable picker' style={globalStyles.input} />
                        </View>
                    </View>


                    <View style={styles.receivables}>
                        <Text style={styles.title}>Total Receivables: PKR 5850</Text>
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
                    <POSButton1 text="Post and Print" />
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