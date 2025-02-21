import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {removeBookmark} from '../stores/bookmarkSlice';
import Icon from 'react-native-vector-icons/FontAwesome';

const BookmarksScreen = ({navigation}: {navigation: any}) => {
  const bookmarks = useSelector((state: any) => state.bookmark.bookmarks);
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      {bookmarks.length === 0 ? (
        <Text style={styles.noBookmarks}>No bookmarks yet</Text>
      ) : (
        <FlatList
          data={bookmarks}
          keyExtractor={item => item.id.toString()}
          style={styles.listContainer}
          renderItem={({item}) => (
            <View style={styles.item}>
              <Image
                source={{uri: `https://image.tmdb.org/t/p/w200${item.poster}`}}
                style={styles.poster}
              />
              <View style={styles.details}>
                <Text style={styles.movieTitle}>{item.title}</Text>
                <TouchableOpacity
                  onPress={() => dispatch(removeBookmark({id: item.id}))}>
                  <Icon name="bookmark" size={30} color="#312e81" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default BookmarksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    padding: 15,
  },
  noBookmarks: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 5,
  },
  details: {
    marginLeft: 15,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    width: '80%',
  },
});
