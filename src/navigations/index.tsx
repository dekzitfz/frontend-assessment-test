import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PlanetList from '../screens/PlanetList';
import PlanetWishlist from '../screens/PlanetWishlist';
import PlanetDetail from '../screens/PlanetDetail';

const Stack = createNativeStackNavigator();
const RootNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PlanetList" component={PlanetList} />
      <Stack.Screen name="PlanetDetail" component={PlanetDetail} />
      <Stack.Screen name="PlanetWishList" component={PlanetWishlist} />
    </Stack.Navigator>
  );
};

export default RootNavigation;
