import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type PlanetDetailStackNavigatorParamList = {
  PlanetDetail: {
    url: string;
  };
};

export type Props = NativeStackScreenProps<
  PlanetDetailStackNavigatorParamList,
  'PlanetDetail'
>;
