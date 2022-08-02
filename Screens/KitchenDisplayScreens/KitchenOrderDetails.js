import * as React from 'react';
import { View, Text } from 'react-native';

import KitchenOrder from '../../Components/KitchenOrder';

import globalStyles from '../../globalStyles';

const DetailLine = () => {
    const [checked, setChecked] = React.useState(false);
    return(
        <View style={{flexDirection: 'row'}}>
            <Text style={{flexBasis: '15%'}}>2</Text>
            <Text style={{flexBasis: '75%'}}>Zinger Burger With Cheese</Text>
        </View>
    )
}

const KitchenOrderDetailsScreen = ({ navigation }) => {
    const order = { key: 1, type: 'Dine In', }
    return (
        <View style={{ ...globalStyles.body, paddingHorizontal: 8 }}>
            <View>
                <KitchenOrder item={order} navigation={navigation} />
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ flexBasis: '10%', textAlign: 'center', fontWeight: 'bold' }}> </Text>
                    <Text style={{ flexBasis: '15%', textAlign: 'center', fontWeight: 'bold' }}>Qty</Text>
                    <Text style={{ flexBasis: '75%', textAlign: 'center', fontWeight: 'bold' }}>Item</Text>
                </View>
            </View>
        </View>
    )
}

export default KitchenOrderDetailsScreen;