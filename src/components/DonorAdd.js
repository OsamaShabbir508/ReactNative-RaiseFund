import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../theme/color';
import Metrix from '../theme/Metrix';
import AppButton from './button';

const DonorAdd = props => {
  // props.idx=props.ind
  return (
    <View style={styles.container}>
      <Text style={styles.addNoText}>ADD NO {props.ind + 1}</Text>
      <AddDetail title="Total amount" value={props.totalAmount} />
      <AddDetail
        title="Remaining"
        value={props.totalAmount - props.amountPaid}
      />
      <AddDetail title="Delivery Date" value={props.deliveryDate} />
      <View style={styles.buttonContainer}>
        <AppButton
          onPress={() => {
            props.setIndex(props.ind);
            props.setShowModal(!props.showModal);
          }}
          width={'100%'}
          title="Donate"
        />
      </View>
    </View>
  );
};
const AddDetail = props => {
  return (
    <View style={styles.addDetailContainer}>
      <Text style={styles.titleAndValue}>{props.title}</Text>
      <View style={styles.valueContainer}>
        <Text style={styles.titleAndValue}>{props.value}</Text>
      </View>
    </View>
  );
};
export default DonorAdd;
const styles = StyleSheet.create({
  container: {
    width: '85%',
    backgroundColor: Colors.white,
    borderRadius: Metrix.VerticalSize(5),
    borderColor:Colors.darkBlue,
    borderWidth:.15,
    margin: Metrix.VerticalSize(5),
    alignSelf: 'center',
  },
  addNoText: {
    textAlign: 'center',
    fontSize: Metrix.VerticalSize(20),
    fontWeight: 'bold',
    marginBottom: Metrix.VerticalSize(10),
    color: Colors.grey,
  },
  buttonContainer: {
    alignSelf: 'center',
    width: '50%',
    marginTop: Metrix.VerticalSize(15),
    marginBottom: Metrix.VerticalSize(15),
  },
  addDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: Metrix.VerticalSize(15),
  },
  titleAndValue: {
    fontSize: Metrix.VerticalSize(17),
    fontWeight: '300',
    color: 'black',
  },
  valueContainer: {
    padding: Metrix.VerticalSize(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Metrix.VerticalSize(20),
    width: '50%',
    borderColor: Colors.grey,
    borderWidth: 0.5,
  },
});
