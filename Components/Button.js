import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export function FlatButton({ text, onPress }) {
  return (
    <TouchableOpacity  onPress={onPress}>
      <View style={{...styles.button, marginTop: 10}}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

export function CartButton({text, onPress}) {
  return (
    <TouchableOpacity  onPress={onPress}>
      <View style={styles.Cartbutton}>
        <Text style={styles.CartbuttonText}>Items 5</Text>
        <Text style={styles.CartbuttonText}>{text}</Text>
        <Text style={styles.CartbuttonText}>Rs 10000</Text>
      </View>
    </TouchableOpacity>
  );
}

export function RoundButton({text}) {
  return (
    <TouchableOpacity>
    <View style={styles.Roundbutton}>
      <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 22}}>{text}</Text>
    </View>
  </TouchableOpacity>
  )
}

export function IconButton({name, onPress, color}) {
  return (
    <IconComponentProvider IconComponent={MaterialCommunityIcons}>
        <Icon name={name} size={24} color={color ? color : 'white'} onPress={onPress} />
    </IconComponentProvider>
)
}

export const POSButton1 = ({ text, onPress, active }) => {
  return (
      <TouchableOpacity style={{ flex: 1 }} onPress={onPress}>
          <View style={active ? styles.CustomerTypeButtonActive : styles.CustomerTypeButton}>
              <Text style={styles.ButtonText}>{text}</Text>
          </View>
      </TouchableOpacity>
  )
}

export const POSButton2 = ({ item }) => {
  return (
      <TouchableOpacity style={{ flex: 1/3 }}>
          <View style={{ ...styles.CustomerTypeButton, backgroundColor: 'white', borderColor: 'lightgray', borderWidth: 1, borderTopColor: item.color, borderTopWidth: 10 }}>
              <Text style={{...styles.ButtonText, color: 'black', marginVertical: 12}}>{item.name}</Text>
          </View>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#0080FF',
    alignSelf: 'stretch',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 18,
    textAlign: 'center',
  },
  Cartbutton: {
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 18,
    backgroundColor: '#0080FF',
    alignSelf: 'stretch',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  CartbuttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  Roundbutton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'blue'
  },
  CustomerTypeButton: {
    backgroundColor: 'lightblue',
    marginHorizontal: 4,
    padding: 6,
    marginBottom: 6
},
CustomerTypeButtonActive: {
  backgroundColor: 'lightgreen',
  marginHorizontal: 4,
  padding: 6,
  marginBottom: 6
},
  ButtonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14
},
});

