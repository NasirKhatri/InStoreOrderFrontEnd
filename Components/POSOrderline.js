import * as React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const POSOrderline = ({ item }) => {
    return (
        <View style={{ flexDirection: 'row', alignContent: 'flex-start', borderBottomWidth: 0.5, borderColor: 'gray' }}>
            <Text style={{ ...styles.row, flexBasis: '25%' }}>{item.ItemName}</Text>
            <TextInput defaultValue={JSON.stringify(item.Qty)} style={{ ...styles.row, flexBasis: '14%' }} keyboardType='number-pad'/>
            <Text style={{ ...styles.row, flexBasis: '19.5%' }}>{(item.SalesPrice).toFixed(2)}</Text>
            <TextInput defaultValue={JSON.stringify(item.Discount)} style={{ ...styles.row, flexBasis: '14%' }}keyboardType='number-pad'/>
            <Text style={{ ...styles.row, flexBasis: '19.5%' }}>{(item.SalesPrice * item.Qty).toFixed(2)}</Text>
            <Text style={{ ...styles.row, flexBasis: '8%' }}> X </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        paddingVertical: 8,
        textAlign: 'center',
    }
})


export default POSOrderline;

