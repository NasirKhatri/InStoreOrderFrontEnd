import * as React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const POSOrderline = ({ item }) => {
    return (
        <View style={{ flexDirection: 'row', alignContent: 'flex-start', borderBottomWidth: 0.5, borderColor: 'gray' }}>
            <Text style={{ ...styles.row, flexBasis: '25%' }}>{item.name}</Text>
            <TextInput defaultValue={JSON.stringify(item.qty)} style={{ ...styles.row, flexBasis: '14%' }} keyboardType='number-pad'/>
            <Text style={{ ...styles.row, flexBasis: '19.5%' }}>{item.price}</Text>
            <TextInput defaultValue={JSON.stringify(item.discount)} style={{ ...styles.row, flexBasis: '14%' }}keyboardType='number-pad'/>
            <Text style={{ ...styles.row, flexBasis: '19.5%' }}>{item.total}</Text>
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

