import React, {useState, useEffect} from 'react';
import {
  View,
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AppButton from '../../components/button';
import Input from '../../components/input';
import Colors from '../../theme/color';
import Metrix from '../../theme/Metrix';
import RadioForm from 'react-native-simple-radio-button';
import {Controller, useForm} from 'react-hook-form';
import TwitterIcon from '../../assets/twitter.png';
import FacebookIcon from '../../assets/facebook.png';
import InstaIcon from '../../assets/insta.png';
import LinkedInIcon from '../../assets/linkedin.png';
import WhatsAppIcon from '../../assets/whatsApp.png';

import axios from 'axios';
import {baseUrl, openApp, showToast} from '../../global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch,useSelector} from 'react-redux';
import {addUser} from '../../redux/action';

const Login = props => {
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const {
    control,
    formState,
    handleSubmit,
    getValues,
    formState: {errors},
  } = useForm({
    email: '',
    password: '',
    userType: '',
  });
  const [load, setLoad] = useState(false);

  const submit = async data => {
    console.log(data, 'data');

    setLoad(true);
    setTimeout(() => {
      const isExist = user?.findIndex(user => user?.email === getValues('email').toString());
    if (isExist<0) {
      setLoad(false);
      showToast({type: 'error', text: 'User Does not exist'});
  
          
    } else {
      dispatch(
            addUser({token: true, userType: getValues('userType')}),
          );
      setLoad(false)
      showToast({type: 'success', text: 'Successfully Login'});
    }

    }, 1500);

    // try {
    //   const res = await axios.post(`${baseUrl}/api/v1/user/login`, data);
    //   if (res.status == 200) {
    //     showToast({type: 'success', text: 'Successfully Login'});
    //   }

    //   await AsyncStorage.setItem('token', res.data.token);
    //   await AsyncStorage.setItem('userType', getValues('userType'));
    //   dispatch(
    //     addUser({token: res.data.token, userType: getValues('userType')}),
    //   );
    //   setLoad(false);
    // } catch (error) {
    //   if (error.response.status >= 500) {
    //     setLoad(false);
    //     return showToast({
    //       type: 'error',
    //       text: 'Something went wrong or Server error!',
    //     });
    //   }
    //   showToast({
    //     type: 'error',
    //     text: error.response.data?.error
    //       ? error.response.data?.error
    //       : error.response.data.errors[0]?.msg,
    //   });
    //   setLoad(false);
    // }
    // axios
    //   .post(`${baseUrl}/api/v1/user/login`, data)
    //   .then(async data => {
    //     console.log('Login', data);
    //     console.log(getValues('userType'),'userType');

    //   })
    //   .catch(err => {
    //     console.log(err);

    // toast.error("Please check your credentials!", {
    //   position: "top-center",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    // });
    // });
  };
  const passwordErrorMessage = err => {
    if (err.type === 'minLength') {
      return 'password should be 8 characters long';
    } else if (err.type === 'pattern') {
      return 'password must contain one upper and lower case';
    } else if (err.type === 'required') {
      return 'This field is required';
    } else {
      return '';
    }
  };
  const emailErrorMessage = err => {
    if (err.type === 'pattern') {
      return 'Invalid email';
    } else if (err.type === 'required') {
      return 'This field is required';
    } else {
      return '';
    }
  };
  const logIn = () => {
    props.navigation.navigate('Register');
  };
  var radio_props = [
    // {label: 'Admin  ', value: 0},
    {label: 'Receiver  ', value: 0},
    {label: 'Donor  ', value: 1},
  ];
  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          style={styles.mainLogoStyle}
          resizeMode="contain"
          source={require('../../assets/fundRaising.png')}
        />
        <View style={styles.formContainer}>
          <Controller
            control={control}
            rules={{
              required: true,
              pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            }}
            render={({field: {value, onChange, name}}) => {
              return (
                <Input placeholder="email" onChange={onChange} value={value} />
              );
            }}
            name="email"
          />
          {errors?.email && (
            <Text style={styles.errorTextColor}>
              {' '}
              {emailErrorMessage(errors?.email)}
            </Text>
          )}
          <Controller
            control={control}
            rules={{
              required: true,
              minLength: 8,
              pattern: /(?=.*[a-z])(?=.*[A-Z])/,
            }}
            render={({field: {onChange, value, name}}) => {
              return (
                <Input
                  placeholder="password"
                  value={value}
                  onChange={onChange}
                  hide={true}
                />
              );
            }}
            name="password"
          />
          {errors?.password && (
            <Text style={styles.errorTextColor}>
              {passwordErrorMessage(errors?.password)}
            </Text>
          )}
        </View>
        <View style={styles.radioContainer}>
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
            name="userType"
          />
          {errors?.userType && (
            <Text style={styles.errorTextColor}> Please select User Type</Text>
          )}
        </View>
        <View style={styles.buttonContainer}>
          {!load ? (
            <AppButton
              onPress={handleSubmit(submit)}
              width={Metrix.HorizontalSize(150)}
              title="Login"
            />
          ) : (
            <ActivityIndicator color={Colors.darkBlue} size="large" />
          )}
        </View>

        <View style={styles.createAccContainer}>
          <Text style={styles.dontHaveAcc}>Don't have an account yet? </Text>
          <TouchableOpacity activeOpacity={0.7} onPress={logIn}>
            <Text style={styles.createAccText}> Create account </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerIconContainer}>
          <FotterIcon
            onPress={() => openApp('https://twitter.com/intent/tweet?')}
            image={TwitterIcon}
          />
          <FotterIcon
            onPress={() => openApp('https://instagram.com/')}
            image={InstaIcon}
          />
          <FotterIcon
            onPress={() => openApp('facebook://')}
            image={FacebookIcon}
          />
          <FotterIcon
            onPress={() => openApp('https://linkedin.com/')}
            image={LinkedInIcon}
          />
          <FotterIcon
            onPress={() => openApp('http://api.whatsapp.com/')}
            image={WhatsAppIcon}
          />

        </View>
      </ScrollView>
    </View>
  );
};
const FotterIcon = props => {
  return (
    <TouchableOpacity onPress={props.onPress} activeOpacity={0.7}>
      <Image style={styles.footerImageStyle} source={props.image} />
    </TouchableOpacity>
  );
};
export default Login;
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  mainLogoStyle: {
    height: Metrix.VerticalSize(210),
    width: Metrix.VerticalSize(260),
    alignSelf: 'center',
  },
  formContainer: {
    width: '90%',
    height: '30%',
    alignSelf: 'center',
    backgroundColor: Colors.lightBlue,
    flexDirection: 'column',
    padding: Metrix.VerticalSize(10),
    justifyContent: 'space-around',
    borderRadius:Metrix.VerticalSize(20)
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Metrix.VerticalSize(45),
  },
  createAccContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Metrix.VerticalSize(35),
  },
  createAccText: {
    color: Colors.darkBlue,
    fontSize: Metrix.VerticalSize(15),
    fontWeight: 'bold',
  },
  dontHaveAcc: {
    color: Colors.grey,
    fontSize: Metrix.VerticalSize(15.5),
    fontWeight: 'bold',
  },
  radioContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Metrix.VerticalSize(45),
  },
  footerImageStyle: {
    height: Metrix.VerticalSize(30),
    width: Metrix.VerticalSize(30),
    // marginLeft:Metrix.HorizontalSize(20),
    // marginTop:Metrix.VerticalSize(25)
  },
  footerIconContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '50%',
    marginTop: Metrix.VerticalSize(35),
    height: Metrix.VerticalSize(50),
    marginBottom: Metrix.VerticalSize(100),
  },
  errorTextColor: {
    color: Colors.darkBlue,
  },
});
