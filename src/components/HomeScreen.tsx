import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fetchMovies} from '../utils/api';
import {Movie} from '../interfaces';

const HomeScreen = ({navigation, route}: {navigation: any; route: any}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const category = route.params?.category || 'now_playing';

  const onPress = (id: number) => navigation.navigate('Info', {id});

  const loadMovies = async (page: number) => {
    if (isLoading || !hasMore) {
      return;
    }

    setIsLoading(true);
    const response = await fetchMovies(category, page);
    if (response.results.length > 0) {
      setMovies(prevMovies => [...prevMovies, ...response.results]);
      setCurrentPage(page);
    } else {
      setHasMore(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadMovies(1);
  }, [category]);

  const handleLoadMore = () => {
    if (hasMore) {
      loadMovies(currentPage + 1);
    }
  };

  const renderFooter = () => {
    if (!isLoading) {
      return null;
    }
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  return (
    <FlatList
      data={movies}
      style={styles.list}
      keyExtractor={item => item.id.toString()}
      numColumns={2}
      renderItem={({item}) => (
        <View style={styles.itemContainer}>
          <TouchableHighlight onPress={() => onPress(item.id)}>
            <Image
              style={styles.image}
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
            />
          </TouchableHighlight>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      )}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
    borderRadius: 14,
    padding: 20,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 2 / 3,
    borderRadius: 8,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 5,
  },
  loading: {
    paddingVertical: 20,
  },
});
