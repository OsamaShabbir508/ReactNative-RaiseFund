import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Donor from '../screens/Donor';

const Stack = createStackNavigator();
const DonorStack = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name='Donor' component={Donor}/>
    </Stack.Navigator>
  );
};
export default DonorStack;