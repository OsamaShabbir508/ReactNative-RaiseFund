import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Colors from '../theme/color';
import Metrix from '../theme/Metrix';

const Input = props => {
  return (
    <TextInput
      style={styles.inputs}
      placeholderTextColor={Colors.grey}
      placeholder={props.placeholder}
      value={props.value}
      maxLength={props.maxLength}
      secureTextEntry={props.hide}
      keyboardType={props.type}
      onChangeText={(val) => {props.onChange(val)}}
    />
  );
};
const styles = StyleSheet.create({
  inputs: {
    height: Metrix.VerticalSize(60),
    width: '95%',
    backgroundColor: Colors.white,
    alignSelf: 'center',
    marginTop: Metrix.VerticalSize(7),
    marginBottom: Metrix.VerticalSize(7),
    color:'black',
    borderRadius:Metrix.VerticalSize(10)
  },
});
export default Input;
