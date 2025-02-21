import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';
import InfoScreen from '../components/InfoScreen';

const RootStack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen name="Drawer" component={DrawerNavigator} />
      <RootStack.Screen name="Info" component={InfoScreen} />
    </RootStack.Navigator>
  );
};

export default AppNavigator;
