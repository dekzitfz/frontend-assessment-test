import PlanetList from "@app/screens/planet-list";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { RecoilRoot } from "recoil";

const Stack = createNativeStackNavigator();

export default function Main() {
  return (
    <RecoilRoot>
      <StatusBar style="light" />
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator>
          <Stack.Screen name="Planet List" component={PlanetList} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}
