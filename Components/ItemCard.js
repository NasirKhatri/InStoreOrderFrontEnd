import React from "react";
import { Box } from "@react-native-material/core";
import { Text, StyleSheet, Image, View } from "react-native";
import { IconButton, RoundButton } from "./Button";

//type mean either item card is being displayed for 'items list (item Screen)' or 'cart items (cart screen)'  
const ItemCard = ({ type, color }) => {
    return (
        <View style={styles.Box} >
            <Image style={styles.image} source={require('../assets/images/Sandwich.png')} />
            <View style={{ flex: 1, marginLeft: 16 }}>
                <View style={{flexDirection: "row"}}>
                    <Text style={styles.Title}>Club Sandwitch Very Delicious 500 gm</Text>
                    {type === 'cart' ? <IconButton name='delete' onPress={() => null} color='red' /> : <></>}
                </View>
                <Text>Delicious Club Sandwith 2 Person serving </Text>
                <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'flex-end' }}>
                    <RoundButton text='-' />
                    <View style={{ width: 64, height: 32, borderWidth: 1, borderColor: 'lightgray', borderRadius: 16, marginHorizontal: 5 }}>
                        <Text style={{ textAlign: 'center', paddingTop: 5 }}>6</Text>
                    </View>
                    <RoundButton text='+' />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Box: {
        backgroundColor: "white",
        borderRadius: 15,
        borderColor: 'lightgray',
        paddingVertical: 16,
        paddingHorizontal: 16,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 15,
        borderWidth: 2, elevation: 3
    },
    Title: {
        fontWeight: 'bold',
        textAlign: "left",
        marginBottom: 5,
    },
    image: {
        width: 80,
        height: 80,
        alignSelf: 'center',
        borderRadius: 8
    }

})

export default ItemCard;