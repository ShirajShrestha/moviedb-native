import React from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  FlatList,
  Image,
  View,
  Dimensions,
} from 'react-native';

const imageData = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1539470090907-7cc242c37af5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1496851925983-9c879a7038de?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1505820013142-f86a3439c5b2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const AboutScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>About MovieDB App</Text>
      <Text style={styles.description}>
        Welcome to the MovieDB App! This app is designed to help you explore and
        discover movies from various categories such as Now Playing, Popular,
        Top Rated, and Upcoming. All data is fetched from The Movie Database
        (TMDB), a popular and reliable source for movie information.
      </Text>

      <Text style={styles.sectionTitle}>Features</Text>
      <Text style={styles.feature}>
        - <Text style={styles.bold}>Now Playing:</Text> Discover movies that are
        currently in theaters.
      </Text>
      <Text style={styles.feature}>
        - <Text style={styles.bold}>Popular:</Text> Explore the most popular
        movies right now.
      </Text>
      <Text style={styles.feature}>
        - <Text style={styles.bold}>Top Rated:</Text> Check out the
        highest-rated movies of all time.
      </Text>
      <Text style={styles.feature}>
        - <Text style={styles.bold}>Upcoming:</Text> See what movies are coming
        soon to theaters.
      </Text>
      <Text style={styles.feature}>
        - <Text style={styles.bold}>Reviews:</Text> Read reviews for your
        favorite movies.
      </Text>

      <Text style={styles.sectionTitle}>How It Works</Text>
      <Text style={styles.description}>
        The app fetches movie data from the TMDB API and displays it in an
        easy-to-navigate interface. You can browse movies by category, view
        details about each movie, and read reviews from other users.
      </Text>

      <Text style={styles.sectionTitle}>About TMDB</Text>
      <Text style={styles.description}>
        This product uses the TMDB API but is not endorsed or certified by TMDB.
        TMDB is a community-built movie and TV database that provides accurate
        and up-to-date information about movies and TV shows.
      </Text>
      <Text
        style={styles.link}
        onPress={() => Linking.openURL('https://www.themoviedb.org/')}>
        Visit TMDB Website
      </Text>

      <Text style={styles.sectionTitle}>Developer</Text>
      <Text style={styles.description}>
        This app was developed by Shiraj Shrestha. If you have any feedback or
        suggestions, feel free to reach out!
      </Text>
      <View style={styles.imageContainer}>
        <FlatList
          data={imageData}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <Image source={{uri: item.url}} style={styles.image} />
          )}
          snapToAlignment="start"
          decelerationRate={'fast'}
          snapToInterval={Dimensions.get('window').width - 40}
        />
      </View>
    </ScrollView>
  );
};
export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4f46e5',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4f46e5',
  },
  feature: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
  },
  link: {
    fontSize: 16,
    color: '#4f46e5',
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: Dimensions.get('window').width - 40,
    height: 250,
    resizeMode: 'cover',
    borderRadius: 8,
  },
});
