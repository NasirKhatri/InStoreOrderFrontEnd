import React from "react";
import { Text, StyleSheet, Image, View } from "react-native";
import { IconButton, RoundButton } from "./Button";
import { BaseUrl } from "../SharedFunctions.js/StoreContext";

//type mean either item card is being displayed for 'items list (item Screen)' or 'cart items (cart screen)'  
const ItemCard = ({ type, item }) => {
    const imageUrl = `${BaseUrl}/${item.ImageSrc}`;
    return (
        <View style={styles.Box} >
            <Image style={styles.image} source={{uri: imageUrl}} />
            <View style={{ flex: 1, marginLeft: 16 }}>
                <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
                    <Text style={styles.Title}>{item.ItemName}</Text>
                    {type === 'cart' ? <IconButton name='delete' onPress={() => null} color='red' /> : <></>}
                    {item.Discount > 0 ? <Text style={{fontWeight: 'bold', color: 'red'}}>{item.Discount}% Off</Text> : <></>}
                </View>
                <Text>Rs : {item.SalesPrice} </Text>
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