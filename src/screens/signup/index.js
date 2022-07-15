import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AppButton from '../../components/button';
import Input from '../../components/input';
import Colors from '../../theme/color';
import Metrix from '../../theme/Metrix';
import {useForm, Controller} from 'react-hook-form';
import {baseUrl, showToast} from '../../global';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {addUser, createUser} from '../../redux/action';

const Register = props => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);
  const [laoder, setLoader] = useState(false);
  const {
    control,
    formState: {errors},
    handleSubmit,
    getValues,
  } = useForm({
    defaultValues: {
      // CNIC: '',
      address: '',
      fullName: '',
      mobile: '',
      email: '',
      password: '',
      userType: 'Doner',
    },
  });
  const backToLogin = () => {
    props.navigation.replace('Login');
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
  const passwordErrorMessage = err => {
    if (err.type === 'minLength') {
      return 'password should be 8 characters long';
    } else if (err.type === 'pattern') {
      return 'password must contain one Upper case,one lower case,one digit and special character';
    } else if (err.type === 'required') {
      return 'This field is required';
    } else {
      return '';
    }
  };
  const submit = async data => {
    console.log(data, 'data');
    setLoader(true);
   setTimeout(() => {
    
  
      const isExist = user?.findIndex(user => user?.email === getValues('email').toString());
      console.log(isExist,getValues('email').toString(),'exidskd');
      if (isExist<0) {
        dispatch(
          createUser({
            email: getValues('email'),
            password: getValues('password'),
          }),
        )
        showToast({type: 'success', text: 'User Created'});
        
        dispatch(
              addUser({token: true, userType: getValues('userType')}),
            );
            setLoader(false);
      } else {
        setLoader(false)
        showToast({type: 'error', text: 'User Already Exists'});
      }
    }, 1500);

      // const res = await axios.post(`${baseUrl}/api/v1/user/signup`, data);
      // console.log(res.status, res.data.token);
      // if (res.status == 200) {
      //   await AsyncStorage.setItem('token', res.data.token);
      //   await AsyncStorage.setItem('userType', getValues('userType'));

      //   showToast({type: 'success', text: 'Login Success'});
      //   dispatch(
      //     addUser({token: res.data.token, userType: getValues('userType')}),
      //   );
      // }

      // setLoader(false);
      // console.log(res.data);
      // // showToast({type: 'success', text: 'Login Success'});

      // await AsyncStorage.setItem('token', res.data.token);
      // const store = await AsyncStorage.setItem('userType', userType);
      // if (store) {

      //}
    

    // axios
    //   .post(`${baseUrl}/api/v1/user/signup`, data)
    //   .then(async (data) => {
    //     console.log('sign Up');
    //     await AsyncStorage.setItem('token', data.data.token);
    //     const store = await AsyncStorage.setItem('userType', userType);
    //     if (store) {
    //      return setLoader(false);
    //     } setLoader(false);
    // localStorage.setItem("token", data.data.token);
    // localStorage.setItem("userType", userType);
    // navigate("/home", { replace: true });
    // toast.success("👋 Welcome to Shehnaiyan!", {
    //   position: "top-center",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   // });
    // })
    // .catch((err) => {
    //   setLoader(false);
    //   console.log(err)}
    // );
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          style={styles.mainLogoStyle}
          resizeMode="contain"
          source={require('../../assets/fundRaising.png')}
        />
        <View style={styles.formContainer}>
          <Text style={styles.registerText}>Register</Text>
          <Controller
            rules={{
              required: true,
            }}
            control={control}
            render={({field: {onChange, value, name}}) => {
              return (
                <Input
                  placeholder="Full Name"
                  value={value}
                  onChange={onChange}
                />
              );
            }}
            name="fullName"
          />
          {errors.fullName?.type === 'required' && (
            <Text style={styles.errorTextColor}>This field is required</Text>
          )}
          <Controller
            control={control}
            rules={{
              required: true,
              pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            }}
            render={({field: {onChange, value, name}}) => {
              return (
                <Input placeholder="Email" value={value} onChange={onChange} />
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
            }}
            render={({field: {onChange, value, name}}) => {
              return (
                <Input
                  placeholder="Contact No"
                  value={value}
                  onChange={onChange}
                  maxLength={11}
                />
              );
            }}
            name="mobile"
          />
          {errors?.mobile && (
            <Text style={styles.errorTextColor}> This field is require</Text>
          )}
          
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, value, name}}) => {
              return (
                <Input
                  placeholder="Address"
                  value={value}
                  onChange={onChange}
                />
              );
            }}
            name="address"
          />
          {errors?.address && (
            <Text style={styles.errorTextColor}> This field is required</Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
              minLength: 8,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            }}
            render={({field: {onChange, value, name}}) => {
              return (
                <Input
                  placeholder="Password"
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
              {' '}
              {passwordErrorMessage(errors?.password)}
            </Text>
          )}
        </View>
        {!laoder ? (
          <View>
            <View style={styles.buttonContainer}>
              <Controller
                rules={{
                  required: true,
                }}
                control={control}
                render={({field: {onChange, value, name}}) => {
                  return (
                    <AppButton
                      width={Metrix.HorizontalSize(250)}
                      title="REGISTER AS DONOR"
                      onPress={() => {
                        // console.log('ess');
                        onChange('Donor');
                        handleSubmit(submit)();
                      }}
                    />
                  );
                }}
                name="userType"
              />
            </View>

            <Text style={styles.ORtext}>OR</Text>
            <View
              style={[
                styles.buttonContainer,
                {marginTop: Metrix.VerticalSize(20)},
              ]}>
              <Controller
                rules={{
                  required: true,
                }}
                control={control}
                render={({field: {onChange, value, name}}) => {
                  return (
                    <AppButton
                      width={Metrix.HorizontalSize(250)}
                      title="REGISTER AS ACCEPTOR"
                      onPress={() => {
                        // console.log('ess');
                        onChange('Receiver');
                        handleSubmit(submit)();
                      }}
                    />
                  );
                }}
                name="userType"
              />
            </View>
            <TouchableOpacity activeOpacity={0.7} onPress={backToLogin}>
              <Text style={styles.backToLogInText}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ActivityIndicator
            style={{
              marginBottom: Metrix.VerticalSize(150),
              marginTop: Metrix.VerticalSize(50),
            }}
            color={Colors.darkBlue}
            size="large"
          />
        )}
      </View>
    </ScrollView>
  );
};
export default Register;
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
    alignSelf: 'center',
    backgroundColor: Colors.lightBlue,
    flexDirection: 'column',
    padding: Metrix.VerticalSize(10),
    justifyContent: 'space-around',
    borderRadius: Metrix.VerticalSize(7),
  },
  registerText: {
    fontSize: Metrix.VerticalSize(22),
    fontWeight: 'bold',
    color: Colors.darkBlue,
    textAlign: 'center',
  },
  ORtext: {
    color: Colors.grey,
    fontWeight: 'bold',
    fontSize: Metrix.VerticalSize(26),
    textAlign: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Metrix.VerticalSize(60),
    marginBottom: Metrix.VerticalSize(20),
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
    marginTop: Metrix.VerticalSize(25),
  },
  backToLogInText: {
    color: Colors.darkBlue,
    fontSize: Metrix.VerticalSize(20),
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: Metrix.VerticalSize(15),
    marginBottom: Metrix.VerticalSize(30),
  },
  errorTextColor: {
    color: Colors.darkBlue,
  },
});
