import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { YellowBox } from 'react-native-web';

import globalStyles from '../../globalStyles';



const POSMainScreen = ({ navigation }) => {

    const POSButton1 = ({ text, onPress }) => {
        return (
            <TouchableOpacity style={{ flex: 1 }} onPress={onPress}>
                <View style={styles.CustomerTypeButton}>
                    <Text style={styles.ButtonText}>{text}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{...globalStyles.body, paddingHorizontal: 4, paddingTop: 4}}>
            <View style={{ flexDirection: 'row' }}>
                <POSButton1 text='Customer 1' onPress={() => null} />
                <POSButton1 text='Customer 2' onPress={() => null} />
                <POSButton1 text='Customer 3' onPress={() => null} />
            </View>
            <View style={{ flexDirection: 'row' }}>
                <POSButton1 text='Dine In' onPress={() => null} />
                <POSButton1 text='Take Away' onPress={() => null} />
                <POSButton1 text='Delivery' onPress={() => null} />
            </View>
            <View style={{ flex: 1, ...styles.Section }}>
                <Text style={styles.title}>Categories</Text>
            </View>
            <View style={{ flex: 1.5, ...styles.Section }}>
                <Text style={styles.title}>Items</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <POSButton1 text='6 Items' onPress={() => null} />
                <POSButton1 text='Rs 4000' onPress={() => null} />
                <POSButton1 text='Details' onPress={() => navigation.navigate('POSDetail')} />
            </View>
            <View style={{ flexDirection: 'row' }}>
                <POSButton1 text='Discard Sale' onPress={() => null} />
                <POSButton1 text='Recall' onPress={() => null} />
                <POSButton1 text='Pay' onPress={() => null} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    CustomerTypeButton: {
        backgroundColor: 'lightblue',
        marginHorizontal: 4,
        padding: 6,
        marginBottom: 6
    },
    ButtonText: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18
    },
    Section: {
 
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 1
    }
})

export default POSMainScreen;