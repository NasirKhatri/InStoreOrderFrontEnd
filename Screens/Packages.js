import * as React from 'react';
import { View, TouchableWithoutFeedback, Keyboard, FlatList, ScrollView } from 'react-native';
import globalStyles from '../globalStyles';
import LoginSubscribeFooter from '../Components/LoginSubscribeFooter';
import PackageCard from '../Components/PackageCard';

const PackagesScreen = ({ navigation }) => {
    return (
            <View style={globalStyles.body}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <PackageCard navigation={navigation} />
                        <PackageCard navigation={navigation}/>
                        <PackageCard navigation={navigation}/>
                        <PackageCard navigation={navigation}/>
                    </ScrollView>
                </View>
                <LoginSubscribeFooter text1='Already have account?' text2='Login' linkTo='Login' navigation={navigation} />
            </View>
    )
}

export default PackagesScreen;