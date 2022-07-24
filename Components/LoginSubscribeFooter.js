import * as React from 'react';
import { View, Text} from 'react-native';
import globalStyles from '../globalStyles';
import { Divider } from "@react-native-material/core";

const LoginSubscribeFooter = ({text1, text2, linkTo, navigation}) => {
    return(
    <View>
        <Divider style={{ marginVertical: 14 }} color='pink' />
        <Text style={{textAlign: 'center',fontSize: 16, marginBottom: 14}}>{text1} <Text style={globalStyles.forgotPassword} onPress={() => navigation.navigate(linkTo)}>{text2} Now</Text></Text>
    </View>
    )
}

export default LoginSubscribeFooter;