import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from '../screens/LandingScreen';
import SheetListScreen from '../screens/SheetListScreen';
import SheetDetailScreen from '../screens/SheetDetailScreen';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="SheetList" component={SheetListScreen} />
      <Stack.Screen name="SheetDetail" component={SheetDetailScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
