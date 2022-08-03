import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import globalStyles from '../../globalStyles';

const Category = () => {
    return(
        <View>
            <Text style={styles.title}>Burgers</Text>
            <View style={{...styles.item, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.itemText}>Zinger Burger</Text>
                <Text style={styles.itemText}>4</Text>
            </View>
            <View style={{...styles.item, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.itemText}>Zinger Burger</Text>
                <Text style={styles.itemText}>4</Text>
            </View>
            <View style={{...styles.item, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.itemText}>Zinger Burger</Text>
                <Text style={styles.itemText}>4</Text>
            </View>
        </View>
    )
}

const KitchenItemWiseScreen = ({ navigation }) => {
    return (
        <View style={globalStyles.body}>
            <Category/>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 8,
    },
    item: {
        marginBottom: 8,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },
    itemText: {
        marginBottom: 8,
    }
})

export default KitchenItemWiseScreen;