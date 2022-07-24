import React from "react";
import { Surface, Text, Divider } from "@react-native-material/core";
import { StyleSheet } from "react-native";
import { Button } from "@react-native-material/core";
import { View } from "react-native";

const PackageCard = ({navigation}) => {
    return(
        <Surface
        elevation={12}
        category="large"
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 5,
          backgroundColor: 'pink',
          marginBottom: 18,
        }}
      >
        <Text style={styles.title}>Basic</Text>
        <Text style={styles.price}>Rs 1,000</Text>
        <Text>Per Month</Text>
        <View style={{flexDirection: "row", marginTop: 8, justifyContent: 'space-around', alignSelf: 'stretch'}}>
            <Button title='View Details' variant="text" onPress={() => navigation.navigate('Package Detail')}/>
            <Button title="Buy Now" onPress={() => navigation.navigate('Subscribe')} />
        </View>
      </Surface>
    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 5,
    },
    price: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 5,
    }
})

export default PackageCard;