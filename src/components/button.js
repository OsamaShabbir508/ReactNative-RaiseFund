import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import color from '../theme/color';
import Metrix from '../theme/Metrix';

const AppButton = props => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={props.onPress}>
      <View
        style={styles(props).container}>
        <Text style={styles(props).textStyle}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default AppButton;
const styles =(props) => StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Metrix.VerticalSize(10),
    height:props.height?props.height:Metrix.VerticalSize(60),
    width: props.width ? props.width : '30%',
    backgroundColor:props.color? props.color:color.darkBlue,
    borderRadius:Metrix.VerticalSize(15)
  },
  textStyle:{
    color:color.white,
    fontSize:Metrix.VerticalSize(17),
    fontWeight:'800'
}
});
