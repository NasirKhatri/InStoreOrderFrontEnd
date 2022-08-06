import react from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import globalStyles from "../../globalStyles";

const Tab = ({ text, onPress }) => {
    return (
        <TouchableOpacity style={styles.box} onPress={onPress}>
            <View >
                <Text style={styles.title}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

const SettingsScreen = ({navigation}) => {
    const x = [
        { key: 1, text: 'Add Customer' },
        { key: 2, text: 'Add Category' },
        { key: 3, text: 'Add Item' },
        { key: 4, text: 'Add User' },
        { key: 5, text: 'Add Table' },
        { key: 6, text: 'Add Rider' },
        {key: 7, text: 'Add Tax Type'},
        {key: 8, text: 'Add Branch'}
    ];
    return (
        <View style={globalStyles.body}>
            <FlatList
                data={x}
                numColumns={2}
                renderItem={({ item }) => <Tab text={item.text} onPress={() => navigation.navigate(item.text)} />} />
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        backgroundColor: '#0080FF',
        height: 120,
        flex: 1,
        marginBottom: 20,
        marginHorizontal: 10,
        borderBottomEndRadius: 30,
        borderBottomLeftRadius: 30,
        borderTopLeftRadius: 30,
    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        height: 120,
        flexWrap: 'wrap',
        paddingHorizontal: 8,
        letterSpacing: 1
    }

})

export default SettingsScreen;