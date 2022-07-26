import React from "react";
import { Surface, Text, Divider } from "@react-native-material/core";
import { StyleSheet } from "react-native";
import { Button } from "@react-native-material/core";
import { View } from "react-native";

const PackageCard = ({ navigation }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Basic</Text>
      <Text style={styles.price}>Rs 1,000</Text>
      <Text>Per Month</Text>
      <View style={{ flexDirection: "row", marginTop: 8, justifyContent: 'space-around', alignSelf: 'stretch' }}>
        <Button title='View Details' variant="text" onPress={() => navigation.navigate('Package Detail')} />
        <Button title="Buy Now" onPress={() => navigation.navigate('Subscribe')} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    elevation: 3,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 18,
    borderRadius: 25,
    borderColor: 'lightgray',
    borderWidth: 2
  },
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