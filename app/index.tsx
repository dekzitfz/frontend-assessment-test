import { APP_NAME } from "@app/constants";
import React from "react";
import { Text, View } from "react-native";

const Main = () => {
  return (
    <View>
      <Text>{APP_NAME}</Text>
    </View>
  );
};

export default Main;
