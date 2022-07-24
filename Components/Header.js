import * as React from 'react';
import { View, Text } from 'react-native';
import globalStyles from '../globalStyles';


const Header = ( { title }) => {
    return(
        <View style={globalStyles.TopBar}>
            <Text style={globalStyles.Title}>{title}</Text>
        </View>
    )
}

export default Header;