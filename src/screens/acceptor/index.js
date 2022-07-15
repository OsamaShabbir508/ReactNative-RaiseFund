import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Colors from '../../theme/color';
import {useForm, Controller} from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';
import AppButton from '../../components/button';
import Metrix from '../../theme/Metrix';
import Input from '../../components/input';
import RadioForm from 'react-native-simple-radio-button';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {addAd, loaderOff, loaderOn, removeUser} from '../../redux/action';
import axios from 'axios';
import {baseUrl, showToast} from '../../global';

const Acceptor = props => {

  // const a=useSelector((state)=>state.user);
  // console.log(a);
  const dispatch = useDispatch();
  const [showDatePicker, setShowDatePicker] = useState(false);
  var radio_props = [
    // {label: 'Admin  ', value: 0},
    {label: 'Own  ', value: 0},
    {label: 'Rent  ', value: 1},
  ];
  const selectIamge = onchange => {
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
          console.log(response, 'Image Respomce');
          const source = {uri: response?.uri};
          console.log(source);
          console.log(response?.assets[0]?.uri);
          //setImage(response?.assets[0].uri);
          onchange(
            `data:${response.assets[0].type};base64,${response?.assets[0]?.base64}`,
          );
          // setForm({...form, amountImg: response?.assets[0]?.base64});
        }
      },
    );
    //  console.log(res, '-----------');
  };

  const {
    control,
    formState: {errors},
    handleSubmit,
    getValues,
  } = useForm({
    defaultValues: {
      applicantName: '',
      applicantContact: '',
      applicantHomeAdd: '',
      amountRequied:'',
      houseOwner: '',
      guardianName: '',
      // guardianContact: "",
      adDeliveryDate: '',
      itemsNeeded: [],

      // totalAmount: 39082,
    },
  });
  const submit = async dt => {
    // console.log(dt);
    dispatch(loaderOn());
    const formData = getValues();
    console.log(formData.adDeliveryDate, 'datteeeee');
    //return;
    const data = {
      applicantAddress: formData.applicantHomeAdd,
      applicantContactNo: formData.applicantContact,
      applicantName: formData.applicantName,
      deliveryDate: formData.adDeliveryDate,
      guardianName: formData.guardianName,
      houseOwnership: formData.houseOwner,
      itemsNeeded: formData.itemsNeeded,
      totalAmount: formData.amountRequied,
      datePosting:moment(new Date()).format('YYYY-MM-DD')
    };
    console.log(data.deliveryDate);
  
    if (data.deliveryDate == '') {
      dispatch(loaderOff())
      return showToast({
        type: 'error',
        text: 'DeliveryDate  must be a valid date',
      });
    }
    setTimeout(() => {
     
      dispatch(addAd(data))
      showToast({type: 'success', text: 'Your Ads posted successfully'});
      dispatch(loaderOff())
    }, 2000);
   
  };
  const needed = [
    'Bed set (Bed, Matress, Wardrobe)',
    'Washing Machine',
    'Refrigerator',
    'Crockery',
    'Grinder',
    'Juicer',
    'Iron',
  ];
  return (
    <ScrollView>
      <View
        style={{
          padding: Metrix.VerticalSize(15),
        }}>
        <TouchableOpacity
          onPress={async () => {
            // await AsyncStorage.multiRemove(['userType', 'token']);
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
        <View
          style={{
            alignSelf: 'flex-end',
          }}>
          {/* <TouchableOpacity> 

          <Text
            style={{
              fontSize: Metrix.VerticalSize(19),
              color: Colors.darkBlue,
              fontWeight: 'bold',
              textAlign: 'right',
            }}>
            See your Status{' '}
          </Text>
        </TouchableOpacity> */}
          <AppButton
            height={Metrix.VerticalSize(50)}
            onPress={() => props.navigation.navigate('Status')}
            width="100%"
            title="See Your Ads Status"
          />
        </View>
        <Text
          style={{
            textAlign: 'center',
            color: Colors.darkBlue,
            fontSize: Metrix.VerticalSize(20),
            fontWeight: 'bold',
            margin: Metrix.VerticalSize(20),
          }}>
          Enter your Credentials for Posting FundRaising Ads
        </Text>
        <Controller
          rules={{required: true}}
          control={control}
          render={({field: {name, onChange, value}}) => {
            return (
              <Input
                placeholder="ApplicantName"
                value={value}
                onChange={onChange}
              />
            );
          }}
          name="applicantName"
        />
        {errors.applicantName?.type === 'required' && (
          <Text style={styles.errorTextColor}>This field is required</Text>
        )}
        <Controller
          rules={{required: true}}
          control={control}
          render={({field: {name, onChange, value}}) => {
            return (
              <Input
                placeholder="Applicant ContactNo"
                value={value}
                onChange={onChange}
                maxLength={11}
              />
            );
          }}
          name="applicantContact"
        />
        {errors.applicantContact?.type === 'required' && (
          <Text style={styles.errorTextColor}>This field is required</Text>
        )}
<Controller
          rules={{required: true}}
          control={control}
          render={({field: {name, onChange, value}}) => {
            return (
              <Input
                placeholder="Amount Req"
                value={value}
                onChange={onChange}
                maxLength={6}
                type={'numeric'}
              />
            );
          }}
          name="amountRequied"
        />
        {errors.amountRequied?.type === 'required' && (
          <Text style={styles.errorTextColor}>This field is required</Text>
        )}
        <Controller
          rules={{required: true}}
          control={control}
          render={({field: {name, onChange, value}}) => {
            return (
              <Input
                placeholder="Applicant HomeAddress"
                value={value}
                onChange={onChange}
              />
            );
          }}
          name="applicantHomeAdd"
        />
        {errors.applicantHomeAdd?.type === 'required' && (
          <Text style={styles.errorTextColor}>This field is required</Text>
        )}

        <View
          style={{
            alignSelf: 'center',
          }}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, value}}) => {
              return (
                <RadioForm
                  initial={3}
                  radio_props={radio_props}
                  onPress={val => {
                    onChange(radio_props[val].label.trim());
                  }}
                  formHorizontal={true}
                />
              );
            }}
            name="houseOwner"
          />
        </View>
        {errors.houseOwner?.type === 'required' && (
          <Text style={styles.errorTextColor}>This field is required</Text>
        )}

        <Controller
          rules={{required: true}}
          control={control}
          render={({field: {name, onChange, value}}) => {
            return (
              <Input
                placeholder="Guardian Name"
                value={value}
                onChange={onChange}
              />
            );
          }}
          name="guardianName"
        />
        {errors.guardianName?.type === 'required' && (
          <Text style={styles.errorTextColor}>This field is required</Text>
        )}
        {/* <Controller
         rules={{required: true}}
          control={control}
          render={({field: {name, onChange, value}}) => {
            return (
              <Input
                placeholder="Guardian ContactNo"
                value={''}
                onChange={() => {}}
              />
            );
          }}
          name=""
        /> */}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AppButton
            height={Metrix.VerticalSize(50)}
            width={'100%'}
            onPress={() => setShowDatePicker(true)}
            title={
              getValues('adDeliveryDate') != ''
                ? 'Your Date'
                : 'Select Delivery Date'
            }
          />

          <Text
            style={{
              color: Colors.darkBlue,
              marginLeft: 10,
              fontWeight: 'bold',
              fontSize: Metrix.VerticalSize(18),
            }}>
            {getValues('adDeliveryDate') != ''
              ? getValues('adDeliveryDate').toString()
              : 'YY-MM-DD'}
          </Text>
        </View>
        {errors.adDeliveryDate?.type === 'required' && (
          <Text
            style={[
              styles.errorTextColor,
              {marginBottom: Metrix.VerticalSize(20)},
            ]}>
            Electricity Bill is required
          </Text>
        )}
        {showDatePicker == true ? (
          <Controller
            rules={{required: true}}
            control={control}
            render={({field: {name, onChange, value}}) => {
              return (
                <DateTimePicker
                  value={new Date()}
                  mode="date"
                  onChange={(event, val) => {
                    //   console.log(val, 'ssdsdsdsd');
                    // console.log(  moment(val).format('YYYY-MM-DD'))
                    onChange(moment(val).format('YYYY-MM-DD'));
                    setShowDatePicker(false);
                  }}
                />
              );
            }}
            name="adDeliveryDate"
          />
        ) : null}
        {errors.adDeliveryDate?.type === 'required' && (
          <Text style={styles.errorTextColor}>This field is required</Text>
        )}
        <Text
          style={{
            color: Colors.darkBlue,
            fontSize: Metrix.VerticalSize(20),
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: Metrix.VerticalSize(15),
          }}>
          Items Needed
        </Text>
        <View>
          <Controller
            control={control}
            render={({field: {name, onChange}}) => {
              return (
                <CheckBoxWithText
                  ind={1}
                  onChnage={onChange}
                  text={'Bed set (Bed, Matress, Wardrobe)'}
                  itemPresent={getValues('itemsNeeded')}
                  value={getValues('itemsNeeded').includes(
                    'Bed set (Bed, Matress, Wardrobe)',
                  )}
                />
              );
            }}
            name="itemsNeeded"
          />
          <Controller
            control={control}
            render={({field: {name, onChange}}) => {
              return (
                <CheckBoxWithText
                  ind={2}
                  onChnage={onChange}
                  text={'Washing Machine'}
                  itemPresent={getValues('itemsNeeded')}
                  value={getValues('itemsNeeded').includes('Washing Machine')}
                />
              );
            }}
            name="itemsNeeded"
          />

          <Controller
            control={control}
            render={({field: {name, onChange}}) => {
              return (
                <CheckBoxWithText
                  ind={3}
                  onChnage={onChange}
                  text={'Refrigerator'}
                  itemPresent={getValues('itemsNeeded')}
                  value={getValues('itemsNeeded').includes('Refrigerator')}
                />
              );
            }}
            name="itemsNeeded"
          />
          <Controller
            control={control}
            render={({field: {name, onChange}}) => {
              return (
                <CheckBoxWithText
                  ind={4}
                  onChnage={onChange}
                  text={'Crockery'}
                  itemPresent={getValues('itemsNeeded')}
                  value={getValues('itemsNeeded').includes('Crockery')}
                />
              );
            }}
            name="itemsNeeded"
          />
          <Controller
            control={control}
            render={({field: {name, onChange}}) => {
              return (
                <CheckBoxWithText
                  ind={5}
                  onChnage={onChange}
                  text={'Grinder'}
                  itemPresent={getValues('itemsNeeded')}
                  value={getValues('itemsNeeded').includes('Grinder')}
                />
              );
            }}
            name="itemsNeeded"
          />
          <Controller
            control={control}
            render={({field: {name, onChange}}) => {
              return (
                <CheckBoxWithText
                  itemPresent={getValues('itemsNeeded')}
                  value={getValues('itemsNeeded').includes('Juicer')}
                  ind={6}
                  onChnage={onChange}
                  text={'Juicer'}
                />
              );
            }}
            name="itemsNeeded"
          />
          <Controller
            control={control}
            render={({field: {name, onChange}}) => {
              return (
                <CheckBoxWithText
                  ind={7}
                  onChnage={onChange}
                  text={'Iron'}
                  itemPresent={getValues('itemsNeeded')}
                  value={getValues('itemsNeeded').includes('Iron')}
                />
              );
            }}
            name="itemsNeeded"
          />
        </View>
        <View
          style={{
            marginTop: Metrix.VerticalSize(20),
            marginBottom: Metrix.VerticalSize(30),
          }}>
          <AppButton
            height={Metrix.VerticalSize(60)}
            onPress={() => {
              handleSubmit(submit)();
            }}
            width="100%"
            title="SUBMIT"
          />
        </View>
      </View>
    </ScrollView>
  );
};
const CheckBoxWithText = ({itemPresent, value, onChnage, text}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <CheckBox
        disabled={false}
        value={value}
        onValueChange={
          val => {
            if (val == true) {
              itemPresent.push(text);
              onChnage(itemPresent);
            } else {
              const temp = itemPresent.filter(it => it != text);
              onChnage(temp);
            }
          }
          // val => console.log(val)
        }
        tintColors={{
          true: Colors.darkBlue,
          false: Colors.seaBlue,
        }}
      />
      <Text
        style={{
          color: Colors.darkBlue,
        }}>
        {text}
      </Text>
    </View>
  );
};
export default Acceptor;
const styles = StyleSheet.create({
  container: {},
  errorTextColor: {
    color: Colors.darkBlue,
  },
});
