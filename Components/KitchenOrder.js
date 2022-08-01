import React from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { IconButton } from "./Button";

const KitchenOrder = ({item}) => {

    //Setting background color based on order type i.e. Dine in, take away or delivery
    let color = item.type == 'Dine In' ? 'lightblue' : item.type == 'Take Away' ? 'lightgreen' : 'orange';

    //Setting icon name based on order type
    let icon = item.type == 'Dine In' ? 'table' : item.type == 'Take Away' ? 'shopping' : 'bike';

    return (
        <View style={{ ...styles.body, backgroundColor: color }}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6}}>
                <Text>00001</Text>
                <Text>Name / Table</Text>
                <IconButton name={icon} color='black' />
                <Text>12:25</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>Items: 6</Text>
                <Text>Qty: 8</Text>
                <Text>Status</Text>
                <Text>Details</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        paddingHorizontal: 6,
        paddingVertical: 12,
        borderRadius: 6,
        justifyContent: 'space-between',
        marginBottom: 10,
    }
})

export default KitchenOrder;