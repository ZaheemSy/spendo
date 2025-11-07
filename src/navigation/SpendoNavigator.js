import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/spendoScreens/LoginScreen';
import LandingScreen from '../screens/spendoScreens/LandingScreen';
import SheetListScreen from '../screens/spendoScreens/SheetListScreen';
import SheetDetailScreen from '../screens/spendoScreens/SheetDetailScreen';

const Stack = createStackNavigator();

const SpendoNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="SheetList" component={SheetListScreen} />
      <Stack.Screen name="SheetDetail" component={SheetDetailScreen} />
    </Stack.Navigator>
  );
};

export default SpendoNavigator;
