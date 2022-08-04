import * as React from 'react';
import { View, Text, FlatList } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { FlatButton, POSButton1 } from '../../Components/Button';

import KitchenOrder from '../../Components/KitchenOrder';

import globalStyles from '../../globalStyles';

const DetailLine = ({ item }) => {
    const [checked, setChecked] = React.useState(false);
    return (
        <BouncyCheckbox
            size={30}
            fillColor="blue"
            unfillColor="#FFFFFF"
            text={`${item.Qty}     ${item.item}`}
            iconStyle={{ borderColor: "red" }}
            iconInnerStyle={{ borderWidth: 4 }}
            textStyle={{ fontWeight: 'bold' }}
            onPress={() => setChecked(!checked)}
            style={{ margin: 15 }}
        />
    )
}

const KitchenOrderDetailsScreen = ({ navigation }) => {
    const order = { key: 1, type: 'Dine In', }
    const orderItems = [{ key: 1, item: 'Chest Broast', Qty: 25 }, { key: 2, item: 'Zinder Burger', Qty: 250 }, { key: 3, item: 'Zinder Burger with Cheese Spicy', Qty: 5 }]
    return (
        <View style={{ ...globalStyles.body, paddingHorizontal: 8 }}>
            <View>
                <KitchenOrder item={order} navigation={navigation} />
                <FlatList
                    data={orderItems}
                    renderItem={({ item }) => <DetailLine item={item} />} />
            </View>
            <FlatButton text='Mark As Ready'/>
        </View>
    )
}

export default KitchenOrderDetailsScreen;