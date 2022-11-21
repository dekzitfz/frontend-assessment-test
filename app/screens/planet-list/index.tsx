import { Planet } from "@app/states/types";
import usePlanet from "@app/states/usePlanet";
import thousandSeparator from "@app/utils/thousandSeparator";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { FlatList, ListRenderItem, View } from "react-native";
import styled from "styled-components/native";

const StyledProgress = styled.ActivityIndicator`
  background-color: transparent;
  padding: 20px;
  border-radius: 10px;
`;

const StyledFlatList = styled.FlatList`
  background-color: "white";
  padding-top: 20px;
` as unknown as typeof FlatList;

const StyledItem = styled.TouchableOpacity`
  display: flex;
  padding: 20px;
  background-color: aliceblue;
  margin-bottom: 10px;
  margin-left: 20px;
  margin-right: 20px;
  border-radius: 8px;
  flex-direction: row;
  justify-content: space-between;
`;

const StyleItemPlanet = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;
const StyleItemDesc = styled.Text`
  font-size: 16px;
  margin-right: 5px;
`;

const StyleRightContent = styled.View`
  display: flex;
  align-items: flex-end;
`;

const StyleLeftContent = styled.View`
  display: flex;
  justify-content: space-between;
`;

const StyleDescContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const renderItem: ListRenderItem<Planet> = ({ item }) => {
  return (
    <StyledItem>
      <StyleLeftContent>
        <Ionicons name="planet" size={25} />
        <StyleItemPlanet>{item.name}</StyleItemPlanet>
      </StyleLeftContent>
      <StyleRightContent>
        <StyleDescContainer>
          <StyleItemDesc>{thousandSeparator(item.population)}</StyleItemDesc>
          <MaterialIcons name="person-outline" size={16} />
        </StyleDescContainer>
        <StyleDescContainer>
          <StyleItemDesc>{thousandSeparator(item.diameter)}</StyleItemDesc>
          <MaterialCommunityIcons name="diameter-variant" size={16} />
        </StyleDescContainer>
        <StyleDescContainer>
          <StyleItemDesc>{item.climate}</StyleItemDesc>
          <MaterialCommunityIcons name="weather-cloudy-clock" size={16} />
        </StyleDescContainer>
      </StyleRightContent>
    </StyledItem>
  );
};

const PlanetList = () => {
  const { fetchMore, planet, isLoading, isError, errorMessage } = usePlanet();

  return (
    <View style={{ flex: 1, paddingBottom: 20 }}>
      <StyledFlatList
        data={planet}
        renderItem={renderItem}
        keyExtractor={(item) => item.url}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={true && <StyledProgress size="large" />}
      />
    </View>
  );
};

export default PlanetList;
