import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Metrix from '../theme/Metrix';
import Colors from '../theme/color';

const AddStatus = props => {
  return (
    <View style={styles.container}>
      <View
        style={{
          alignSelf: 'flex-end',
          padding: Metrix.VerticalSize(10),
          backgroundColor:
            props.status === 'Live'
              ? '#178ace'
              : props.status == 'Reject'
              ? '#f7bd14'
              : '#f35f65',
              borderRadius:Metrix.VerticalSize(20)
        }}>
        <Text
          style={{
            color:'white',
            fontSize: 14,
            fontWeight:'bold'
          }}>
          {props.status=='Reject'?'Rejected':props.status}
        </Text>
      </View>
      <AddDetail title="AddNo" value={props.index} />
      <AddDetail title="TotalAmount" value={props.totalAmount} />
      {/* <AddDetail title="DonationReceived" value={props.amountPaid} /> */}
      <AddDetail title="Date Posting" value={props.dateCreated} />
      <AddDetail title="Delivery Date" value={props.deliveryDate} />
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
export default AddStatus;
const styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: Colors.lightBlue,
    borderRadius: Metrix.VerticalSize(5),
    margin: Metrix.VerticalSize(5),
    alignSelf: 'center',
    padding:Metrix.VerticalSize(10)
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
