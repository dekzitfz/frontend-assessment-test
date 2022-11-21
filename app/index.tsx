import PlanetList from "@app/screens/planet-list";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { RecoilRoot } from "recoil";

const Stack = createNativeStackNavigator();

export default function Main() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Planet Lis" component={PlanetList} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}
