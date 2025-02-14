import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fetchMovieDetails} from '../utils/api';

const InfoScreen = ({navigation, route}) => {
  const [details, setDetails] = useState('');
  const id = route.params.id;

  const getMovieDetails = async () => {
    const response = await fetchMovieDetails(id);
    setDetails(response);
  };
  useEffect(() => {
    getMovieDetails();
  }, []);

  console.log(details);

  return (
    <>
      <Image
        style={styles.image}
        source={{
          uri: `https://image.tmdb.org/t/p/original${details.backdrop_path}`,
        }}
      />
      <View style={styles.details}>
        <Text style={styles.title}>{details.title}</Text>

        <Text style={styles.detailItem}>
          Description{'\n'}
          <Text style={styles.description}>{details.overview}</Text>
        </Text>
        <FlatList
          data={details.genres}
          style={styles.detailItem}
          keyExtractor={item => item.id.toString()}
          horizontal={true}
          renderItem={({item}) => <Text style={styles.genre}>{item.name}</Text>}
        />
        <Text style={styles.detailItem}>
          Movie length:
          <Text style={styles.description}>{details.runtime} min</Text>
        </Text>
        <Text style={styles.detailItem}>
          Review: <Text style={styles.description}>{details.vote_average}</Text>
        </Text>
      </View>
    </>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  details: {
    padding: 10,
  },
  detailItem: {
    marginBottom: 8,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'justify',
  },
  title: {
    fontSize: 24,
    color: '#f9a603',
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  description: {
    fontWeight: 'normal',
    fontSize: 16,
  },
  genre: {
    backgroundColor: 'black',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    color: '#fff',
  },
});
