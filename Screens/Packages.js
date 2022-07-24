import * as React from 'react';
import { View, TouchableWithoutFeedback, Keyboard, FlatList, ScrollView } from 'react-native';
import globalStyles from '../globalStyles';
import LoginSubscribeFooter from '../Components/LoginSubscribeFooter';
import PackageCard from '../Components/PackageCard';

const PackagesScreen = ({ navigation }) => {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={globalStyles.body}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ScrollView>
                        <PackageCard navigation={navigation} />
                        <PackageCard navigation={navigation}/>
                        <PackageCard navigation={navigation}/>
                        <PackageCard navigation={navigation}/>
                    </ScrollView>
                </View>
                <LoginSubscribeFooter text1='Already have account?' text2='Login' linkTo='Login' navigation={navigation} />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default PackagesScreen;