import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {Props} from './types';
import {fetchPlanetDetail} from '../../apis/PlanetDetailApi';
import {planetResult} from '../PlanetList/types';
import Icon from 'react-native-vector-icons/Ionicons';

const PlanetDetail = ({route}: Props) => {
  const [planetDetail, setPlanetDetail] = useState<planetResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddWhistList, setIsAddWhistList] = useState(false);
  const getPlanetDetail = useCallback(async () => {
    setIsLoading(true);
    const planetDetailResponse = await fetchPlanetDetail(route.params.url);
    setPlanetDetail(planetDetailResponse);
    setIsLoading(false);
  }, [route.params.url]);
  useEffect(() => {
    getPlanetDetail();
  }, [getPlanetDetail]);

  const renderInnerCard = (name: string, value?: string) => {
    return (
      <View style={styles.contentCard}>
        <Text>{name}</Text>
        <Text>{value}</Text>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <ScrollView
      style={styles.container}
      // eslint-disable-next-line react-native/no-inline-styles
      contentContainerStyle={{flexGrow: 1, paddingBottom: 32}}>
      <View style={styles.card}>
        {renderInnerCard('Name', planetDetail?.name)}
        <View style={styles.spacer} />
        {renderInnerCard('Climate', planetDetail?.climate)}
        <View style={styles.spacer} />
        {renderInnerCard('Diameter', planetDetail?.diameter)}
        <View style={styles.spacer} />
        {renderInnerCard('Gravity', planetDetail?.gravity)}
        <View style={styles.spacer} />
        {renderInnerCard('Orbital Period', planetDetail?.orbital_period)}
        <View style={styles.spacer} />
        {renderInnerCard('Rotation Period', planetDetail?.rotation_period)}
        <View style={styles.spacer} />
        {renderInnerCard('Surface Water', planetDetail?.surface_water)}
        <View style={styles.spacer} />
        {renderInnerCard('Terrain', planetDetail?.terrain)}
        <View style={styles.spacer} />
        {renderInnerCard(
          'Created',
          planetDetail?.created.split('T')[0].split('-').reverse().join('-'),
        )}
        <View style={styles.spacer} />
        {renderInnerCard(
          'Edited',
          planetDetail?.edited.split('T')[0].split('-').reverse().join('-'),
        )}
      </View>
      <View style={styles.spacer} />
      <View style={styles.card}>
        <Text>Films</Text>
        {planetDetail?.films.map((film: string) => (
          <Text key={film}>{film}</Text>
        ))}
      </View>
      <View style={styles.spacer} />
      <View style={styles.card}>
        <Text>Residents</Text>
        {planetDetail?.residents.map((resident: string) => (
          <Text key={resident}>{resident}</Text>
        ))}
      </View>
      <TouchableOpacity
        style={styles.btnWhistList}
        onPress={() => setIsAddWhistList(!isAddWhistList)}>
        <Icon
          name="heart-circle-outline"
          size={40}
          color={isAddWhistList ? '#900' : '#000'}
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PlanetDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    padding: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: '#cccc',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    backgroundColor: '#fff',
  },
  contentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  spacer: {
    height: 16,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnWhistList: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: '#ffff',
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
