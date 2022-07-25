import * as React from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import globalStyles from '../globalStyles';
import FlatButton from '../Components/Button.js';

const CategoriesScreen = ({ navigation }) => {
    return (
        <View style={globalStyles.body}>
            <Text>This Is Categories Screen</Text>
            <FlatButton text='Items' onPress={() => navigation.navigate('Items')}/>
        </View>
    )
}

export default CategoriesScreen;