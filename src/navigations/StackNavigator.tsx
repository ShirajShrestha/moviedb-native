import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyTopTabs from './TopTapNavigator';
import InfoScreen from '../components/InfoScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={MyTopTabs} />
      <Stack.Screen name="Info" component={InfoScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
