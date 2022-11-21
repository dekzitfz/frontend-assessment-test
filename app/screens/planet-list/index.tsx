import { APP_NAME } from "@app/constants/index";
import { Planet } from "@app/states/types";
import usePlanet from "@app/states/usePlanet";
import { FlatList, ListRenderItem, Text, View } from "react-native";
import styled from "styled-components/native";

const StyledItem = styled.TouchableOpacity`
  padding: 10px;
  border-bottom-width: 1px;
  background-color: aliceblue;
`;

const renderItem: ListRenderItem<Planet> = ({ item }) => {
  return (
    <StyledItem>
      <Text>{item.name}</Text>
    </StyledItem>
  );
};

const PlanetList = () => {
  const { fetchMore, planet, isLoading, isError, errorMessage } = usePlanet();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={planet}
        renderItem={renderItem}
        keyExtractor={(item) => item.url}
      />
      <Text>{APP_NAME}</Text>
    </View>
  );
};

export default PlanetList;
