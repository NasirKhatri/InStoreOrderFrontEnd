import * as React from 'react';
import { View, Text } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";

import KitchenOrder from '../../Components/KitchenOrder';

import globalStyles from '../../globalStyles';

const DetailLine = () => {
    const [checked, setChecked] = React.useState(false);
    return (
            <BouncyCheckbox
                size={30}
                fillColor="red"
                unfillColor="#FFFFFF"
                text="Custom Checkbox"
                iconStyle={{ borderColor: "red" }}
                iconInnerStyle={{ borderWidth: 4 }}
                textStyle={{ fontFamily: "JosefinSans-Regular" }}
                onPress={() => setChecked(!checked)}
                style={{margin: 15}}
            />
    )
}

const KitchenOrderDetailsScreen = ({ navigation }) => {
    const order = { key: 1, type: 'Dine In', }
    return (
        <View style={{ ...globalStyles.body, paddingHorizontal: 8 }}>
            <View>
                <KitchenOrder item={order} navigation={navigation} />
                <DetailLine/>
                <DetailLine/>
                <DetailLine/>
            </View>
        </View>
    )
}

export default KitchenOrderDetailsScreen;