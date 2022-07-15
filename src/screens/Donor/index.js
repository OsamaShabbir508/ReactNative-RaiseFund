import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import DonorAdd from '../../components/DonorAdd';
import Colors from '../../theme/color';
import Metrix from '../../theme/Metrix';
import axios from 'axios';
import {baseUrl, showToast} from '../../global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RadioForm from 'react-native-simple-radio-button';
import AppButton from '../../components/button';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch,useSelector} from 'react-redux';
import {loaderOff, loaderOn, removeUser} from '../../redux/action';
var radio_props = [
  // {label: 'Admin  ', value: 0},
  {label: 'MCB  ', value: 0},
  {label: 'BCP Bank  ', value: 1},
  {label: 'HBL  ', value: 2},
];
const ACC_NO = {
  MCB: 'MCB Acc: 123456784444444',
  'BCP Bank': 'BCP Acc : 453333333444444',
  HBL: 'HBL Account Number : 453984954444444',
};
const Donor = () => {
  const {add} =useSelector((state)=>state.user);
  const dispatch = useDispatch();
  const [adds, setAdds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState('');
  const [index, setIndex] = useState(null);
  const [form, setForm] = useState({
    step: 1,
    paymentMethod: '',
    amountImg: '',
    phNumber: '',
    donationAmount: 0,
  });
  let idx = null;
  const donateHandler =  id => {
    if (form.paymentMethod == '' || form.amountImg == '') {
      setShowModal(!showModal);
      showToast({
        type: 'info',
        text: 'Screenshot and Payment Method is required',
      });
      return;
    }

    setShowModal(!showModal);
    setImage('');
    setForm(prev => ({paymentMethod: '', amountImg: ''}));
    dispatch(loaderOn());
    setTimeout(() => {
      dispatch(loaderOff());
      showToast({
        type: 'info',
        text: 'Donation has been Completed!',
      });
    }, 2000);
    
      
      
  };

  const fetchData = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    const config = {
      headers: {
        'x-auth-token': token,
      },
    };

    try {
      dispatch(loaderOn());
      const res = await axios.get(`${baseUrl}/api/v1/adcatc/live`, config);
      if (res.status === 200) {
        console.log(res.data);
        // dispatch(loaderOff())
        setAdds(res.data);
      }
      dispatch(loaderOff());
    } catch (error) {
      if (error.response.status >= 500) {
        dispatch(loaderOff());
        return showToast({
          type: 'error',
          text: 'Something went wrong or Server error!',
        });
      }
      console.log(error);
      dispatch(loaderOff());
      showToast({
        type: 'error',
        text: error.response.data?.error
          ? error.response.data?.error
          : error.response.data.errors[0]?.msg,
      });
    }
  };

  useEffect(() => {
    //  fetchData();
  }, []);
  console.log(add, 'add dffdfdf');
  let data = [
    {
      index: 0,
      setIndex: {setIndex},
      amountPaid: 23,
      totalAmount: 323,
      deliveryDate: '21212',
      setShowModal: {setShowModal},
      showModal: {showModal},
    },
    {
      index: 0,
      setIndex: {setIndex},
      amountPaid: 23,
      totalAmount: 323,
      deliveryDate: '21212',
      setShowModal: {setShowModal},
      showModal: {showModal},
    },
    {
      index: 0,
      setIndex: {setIndex},
      amountPaid: 23,
      totalAmount: 323,
      deliveryDate: '21212',
      setShowModal: {setShowModal},
      showModal: {showModal},
    },
  ];
 
  const selectIamge = () => {
    console.log('select image -----');
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          console.log(response);
          const source = {uri: response?.uri};
          console.log(source);
          console.log(response?.assets[0]?.uri);
          setImage(response?.assets[0].uri);
          setForm({
            ...form,
            amountImg: `data:${response.assets[0].type};base64,${response?.assets[0]?.base64}`,
          });
        }
      },
    );
    //  console.log(res, '-----------');
  };

  return (
    // <View><Text style={{
    //   color:'red'
    // }}>Donor stack</Text></View>
    <View
      style={[
        styles.container,
        {backgroundColor: adds.length > 0 ? Colors.white : 'white'},
      ]}>
      <TouchableOpacity
        onPress={async () => {
          await AsyncStorage.multiRemove(['userType', 'token']);
          dispatch(removeUser());
        }}>
        <Text
          style={{
            textAlign: 'left',
            margin: Metrix.VerticalSize(12),
            fontSize: 18,
            fontWeight: 'bold',
            color: Colors.darkBlue,
          }}>
          Log Out
        </Text>
      </TouchableOpacity>
      <FlatList
      ListEmptyComponent={<View style={{
        
      }}>
        <Text style={{
          textAlign:'center',
          color:Colors.darkBlue,
          alignSelf:'center',
          fontWeight:'bold',
          fontSize:20
        }}>No Campaign yet!</Text>
      </View>}
        data={add}
        renderItem={({item, index}) => {
         
          return (
            <DonorAdd
              ind={index}
              setIndex={setIndex}
              amountPaid={Math.trunc((item?.totalAmount>10?item?.totalAmount/10:item?.totalAmount))}
              totalAmount={item?.totalAmount}
              deliveryDate={item?.deliveryDate}
              setShowModal={setShowModal}
              showModal={showModal}
            />
          );
        }}
      />
      <ModalView
        form={form}
        setForm={setForm}
        selectIamge={selectIamge}
        showModal={showModal}
        setShowModal={setShowModal}
        image={image}
        index={index}
        adds={adds}
        donateHandler={donateHandler}
        setImage={setImage}
      />
    </View>
  );
};

const ModalView = ({
  showModal,
  setShowModal,
  image,
  setImage,
  selectIamge,
  form,
  setForm,
  index,
  adds,
  donateHandler,
}) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        style={{
          padding: Metrix.VerticalSize(100),
        }}
        visible={showModal}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setShowModal(!showModal);
        }}>
        <View
          style={{
            alignSelf: 'center',
            backgroundColor: Colors.white,
            flex: 1,
            width: '90%',
          }}>
          <Text
            style={[
              styles.headingStyle,
              {
                marginTop: Metrix.VerticalSize(30),
                fontSize: Metrix.VerticalSize(23),
              },
            ]}>
            Enter your Account Details
          </Text>
          <Text
            style={[styles.headingStyle, {marginTop: Metrix.VerticalSize(20)}]}>
            Total Amount {adds[index]?.totalAmount} PKR
          </Text>
          <Text
            style={[styles.headingStyle, {marginTop: Metrix.VerticalSize(20)}]}>
            Donation Need {adds[index]?.totalAmount - adds[index]?.amountPaid}{' '}
            PKR
          </Text>
          <Text
            style={[styles.headingStyle, {marginTop: Metrix.VerticalSize(15)}]}>
            {' '}
            Select Payment Method
          </Text>
          <View
            style={{
              marginTop: Metrix.VerticalSize(30),
              alignSelf: 'center',
            }}>
            <RadioForm
              initial={4}
              radio_props={radio_props}
              onPress={val => {
                setForm({
                  ...form,
                  paymentMethod: radio_props[val].label.trim(),
                });
                // onChange(radio_props[val].label.trim());
              }}
              formHorizontal={true}
            />
          </View>
          <Text
            style={[
              styles.headingStyle,
              {
                fontSize: Metrix.VerticalSize(14),
                fontWeight: '500',
                marginTop: 5,
              },
            ]}>
            {ACC_NO[form.paymentMethod]}
          </Text>
          <Text
            style={[
              styles.headingStyle,
              {
                fontSize: Metrix.VerticalSize(14),
                fontWeight: '500',
                marginTop: Metrix.VerticalSize(20),
              },
            ]}>
            Attach the Screenshot of your Sent Amount
          </Text>
          <View
            style={{
              alignSelf: 'center',
              width: '60%',
              marginTop: Metrix.VerticalSize(50),
            }}>
            <AppButton
              onPress={selectIamge}
              width="100%"
              title="Select Image"
            />
          </View>
          {image != '' && (
            <Image
              resizeMode="cover"
              style={{
                height: Metrix.VerticalSize(150),
                width: Metrix.HorizontalSize(150),
                alignSelf: 'center',
                marginTop: Metrix.VerticalSize(20),
              }}
              source={{uri: image}}
            />
          )}
          <View
            style={{
              flexDirection: 'row',
              width: '80%',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginTop: Metrix.VerticalSize(50),
              alignSelf: 'center',
            }}>
            <AppButton
              onPress={() => {
                setShowModal(!showModal);
                setImage('');
                setForm(prev => ({paymentMethod: '', amountImg: ''}));
              }}
              width={'100%'}
              color={Colors.grey}
              title="Cancel"
            />
            <AppButton
              onPress={() => {
                donateHandler();
              }}
              width={'100%'}
              title="Donate"
            />
          </View>
        </View>

        {/* <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Hello World!</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable>
              </View>
            </View> */}
      </Modal>
      {/* <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textStyle}>Show Modal</Text>
          </Pressable> */}
    </View>
  );
};
export default Donor;
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightPurple,
    padding: Metrix.HorizontalSize(10),
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  headingStyle: {
    textAlign: 'center',
    color: 'black',
    fontWeight: '800',
    fontSize: Metrix.VerticalSize(19),
  },
  amountText: {
    textAlign: 'center',
    color: Colors.lightPurple,
    fontWeight: '800',
    fontSize: Metrix.VerticalSize(19),
  },
});
