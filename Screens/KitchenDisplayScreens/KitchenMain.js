import * as React from 'react';
import { View, Text, Button } from 'react-native';

import globalStyles from '../../globalStyles';

const KitchenMainScreen = ({ navigation }) => {
    return (
        <View style={globalStyles.body}>
            <Text>This is Kitchen Main Screen</Text>
            <Button title='Details' onPress={() => navigation.navigate('Order Details')}/>
            <Button title='Summary' onPress={() => navigation.navigate('Items Summary')}/>
        </View>
    )
}

export default KitchenMainScreen;