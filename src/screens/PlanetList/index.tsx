import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ListRenderItem,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {fetchPlanets} from '../../apis/PlanetListApi';
import {planetResult} from './types';

const PlanetList = (props: any) => {
  const {navigation} = props;
  const [planets, setPlanets] = useState<planetResult[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isMore, setIsMore] = useState(false);
  const [isEndBottom, setIsEndBottom] = useState(false);

  const getPlanets = useCallback(async () => {
    if (page === 1) {
      setIsLoading(true);
    } else {
      setIsMore(true);
    }
    const response = await fetchPlanets(page);
    setIsLoading(false);
    setIsMore(false);
    if (response.next === null) {
      setIsEndBottom(true);
      return;
    }
    setPlanets([...planets, ...response.results]);
  }, [page, planets]);
  useEffect(() => {
    getPlanets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  const renderItem: ListRenderItem<planetResult> = ({item}) => {
    console.log('item', item);
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() =>
          navigation.navigate('PlanetDetail', {
            url: item.url,
          })
        }>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const fetchMoreData = () => {
    if (isEndBottom) {
      return;
    }
    if (!isEndBottom && !isMore) {
      console.log('masuk');
      setPage(page + 1);
    }
  };

  const listEmpty = () => {
    if (isLoading) {
      return (
        <TouchableOpacity>
          <ActivityIndicator />
        </TouchableOpacity>
      );
    }
    if (planets.length === 0) {
      return (
        <View style={styles.loading}>
          <Text>List Planet Empty</Text>
        </View>
      );
    }
    return null;
  };

  const renderFooter = () => {
    return (
      <View style={styles.footerList}>
        {isMore && <ActivityIndicator />}
        {isEndBottom && <Text>No more planets</Text>}
      </View>
    );
  };
  return (
    <View style={styles.flex1}>
      <FlatList
        data={planets}
        renderItem={renderItem}
        ListEmptyComponent={listEmpty}
        ListFooterComponent={renderFooter}
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 16,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.01}
        onEndReached={fetchMoreData}
      />
    </View>
  );
};

export default PlanetList;

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    flex: 1,
    backgroundColor: '#ffff',
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
  },
  footerList: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
});
