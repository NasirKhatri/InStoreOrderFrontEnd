import React from "react";
import { Box } from "@react-native-material/core";
import { TouchableOpacity, Text, StyleSheet, Image } from "react-native";

const CategoryCard = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}> 
            <Box w={100} h={130} m={4} style={styles.Box} >
                <Text style={styles.Title}>Sandwitches</Text>
                <Image style={styles.image} source={require('../assets/images/Sandwich.png')} />
            </Box>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    Box: {
        backgroundColor: "white", borderRadius: 5, borderColor:'lightgray', paddingVertical: 4, paddingHorizontal: 1, justifyContent: 'space-between'
    },
    Title: {
        fontWeight: 'bold',
        textAlign: "center",
        marginBottom: 5,
    },
    image: {
        width: 80,
        height: 80,
        alignSelf: 'center',
        borderRadius: 3
    }

})

export default CategoryCard;