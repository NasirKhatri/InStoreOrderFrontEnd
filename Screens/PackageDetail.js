import * as React from 'react';
import { View, Text } from 'react-native';
import globalStyles from '../globalStyles';
import { Button } from "@react-native-material/core";
import {FlatButton} from '../Components/Button';

import LoginSubscribeFooter from '../Components/LoginSubscribeFooter';

const PackageDetail = ({navigation}) => {
    return (
        <View style={globalStyles.body}>
            <View>
                <Text>No of Cooks:  2</Text>
                <Text>No of Tables: 6</Text>
                <Text>No of Admins: 1</Text>
                <Text>No of Cashier: 1</Text>
                <FlatButton text="Buy Now" onPress={() => navigation.navigate('Subscribe')}/>
            </View>
            <LoginSubscribeFooter text1='Already have account?' text2='Login' linkTo='Login' navigation={navigation} />
        </View>
    )
}

export default PackageDetail;