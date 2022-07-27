import * as React from 'react';
import { View, Text, Button } from 'react-native';

import globalStyles from '../../globalStyles';

const POSMainScreen = ({navigation}) => {
    return(
        <View style={globalStyles.body}>
            <Text>This Is POS Main Screen</Text>
        </View>
    )
}

export default POSMainScreen;