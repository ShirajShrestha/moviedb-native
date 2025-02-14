import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fetchMovies} from '../utils/api';

const HomeScreen = ({navigation}) => {
  const [movies, setMovies] = useState([]);
  const onPress = (id, title) =>
    navigation.navigate('Info', {id: id, name: title});
  // const onPress = id => console.log('id:', id);

  const getMovies = async () => {
    const response = await fetchMovies('now_playing');
    setMovies(response.results);
  };
  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={movies}
          style={styles.list}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          renderItem={({item}) => (
            <View style={styles.itemContainer}>
              <TouchableHighlight onPress={() => onPress(item.id, item.title)}>
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
        />
      </View>
      {/* <Button
        title="Go to Jane's profile"
        onPress={() => navigation.navigate('Info', {name: 'Jane'})}
      /> */}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
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
});
