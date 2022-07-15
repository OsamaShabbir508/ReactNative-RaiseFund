import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Acceptor from '../screens/acceptor';
import Status from '../screens/status';


const Stack = createStackNavigator();
const AcceptorStack = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name='Acceptor' component={Acceptor}/>
        <Stack.Screen name='Status' component={Status}/>
    </Stack.Navigator>
  );
};
export default AcceptorStack;