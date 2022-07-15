// import React from "react";
// import {View ,Text} from 'react-native';

import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './src/navigation/authStack';
import store from './src/redux/reducer';
import {useDispatch, useSelector} from 'react-redux';
import DonorStack from './src/navigation/donarStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addUser} from './src/redux/action';
import AcceptorStack from './src/navigation/acceptorStack';
import Toast from 'react-native-toast-message';
import AppLoader from './src/components/loader';
import {View, Animated, Easing} from 'react-native';
import Metrix from './src/theme/Metrix';

const App = () => {
  let rotateValueHolder = new Animated.Value(0);

  const startImageRotateFunction = () => {
    rotateValueHolder.setValue(0);
    Animated.timing(rotateValueHolder, {
      toValue: 1,
      duration: 2500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => startImageRotateFunction());
  };

  const rotateData = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const [splash, setSplash] = useState(false);
  const dispatch = useDispatch();
  const checkLocalStorage = async () => {
    // await AsyncStorage.multiRemove(['token', 'userType']);
    const keys = await AsyncStorage.multiGet(['token', 'userType']);
    if (keys[0][1]) {
      dispatch(addUser({token: keys[0][1], userType: keys[1][1]}));
    }
    
  };
  useEffect(() => {
    //  checkLocalStorage();
    startImageRotateFunction();
    setTimeout(()=>{
      setSplash(true)
    },2535)
  
  }, []);
  const {token, userType} = useSelector(state => state.user);
  console.log(token,userType,'ssdssdsd');

  return !splash ? (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'white'
      }}>
      <Animated.Image
        style={{
          height: Metrix.VerticalSize(250),
          width: Metrix.VerticalSize(250),
          transform: [{rotate: rotateData}],
          alignSelf: 'center',
        }}
        source={require('./src/assets/fundRaising.png')}
      />
    </View>
  ) : (
    <>
      <NavigationContainer>
        {!token ? (
          <AuthStack />
        ) : userType === 'Donor' ? (
          <DonorStack />
        ) : (
          <AcceptorStack />
        )}
        {/* <AuthStack/> */}
      </NavigationContainer>
      <Toast position="bottom" bottomOffset={20} />
      <AppLoader />
    </>
  );
};
export default App;

// const App=()=>{
//   return(
//     <View>
//       <Text>main view</Text>
//     </View>
//   )
// };
// export default App;
