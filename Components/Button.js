import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StoreContext } from '../App';
import { useContext } from 'react';

export function FlatButton({ text, onPress }) {
  return (
    <TouchableOpacity  onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

export function CartButton({onPress}) {
  return (
    <TouchableOpacity  onPress={onPress}>
      <View style={styles.Cartbutton}>
        <Text style={styles.CartbuttonText}>Items 5</Text>
        <Text style={styles.CartbuttonText}>View Cart</Text>
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

export function IconButton({name, onPress}) {
  return (
    <IconComponentProvider IconComponent={MaterialCommunityIcons}>
        <Icon name={name} size={24} color="white" onPress={onPress} />
    </IconComponentProvider>
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
  }
});