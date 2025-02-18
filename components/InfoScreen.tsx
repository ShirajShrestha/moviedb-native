import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fetchMovieDetails, fetchReviews} from '../utils/api';
import Icon from 'react-native-vector-icons/FontAwesome';
import {MovieDetails, Review} from '../interfaces';

const MAX_REVIEW_LENGTH = 150;

const InfoScreen = ({navigation, route}: {navigation: any; route: any}) => {
  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [expandedReviews, setExpandedReviews] = useState<{
    [key: string]: boolean;
  }>({});

  const id = route.params.id;

  useEffect(() => {
    const getMovieDetails = async () => {
      const response = await fetchMovieDetails(id);
      setDetails(response);
    };
    const getReviews = async () => {
      const response = await fetchReviews(id);
      setReviews(response.results);
    };
    getMovieDetails();
    getReviews();
  }, [id]);

  const toggleExpand = (reviewId: string) => {
    setExpandedReviews(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  return (
    <>
      <ScrollView>
        <Image
          style={styles.image}
          source={{
            uri: `https://image.tmdb.org/t/p/original${details?.backdrop_path}`,
          }}
        />
        <View style={styles.details}>
          <Text style={styles.title}>{details?.title}</Text>
          <Text style={styles.detailTitle}>Description</Text>
          <Text style={styles.description}>{details?.overview}</Text>
          <FlatList
            data={details?.genres}
            style={styles.detailItem}
            keyExtractor={item => item.id.toString()}
            horizontal={true}
            renderItem={({item}) => (
              <Text style={styles.genre}>{item.name}</Text>
            )}
          />
          <View style={styles.row}>
            <Icon name="clock-o" size={30} color="#f9a603" />
            <Text style={styles.description}>{details?.runtime} min</Text>
          </View>
          <View style={styles.row}>
            <Icon name="star" size={30} color="#f9a603" />
            <Text style={styles.description}>{details?.vote_average}</Text>
          </View>
        </View>

        <View style={styles.reviewSection}>
          <Text style={styles.reviewTitle}>Reviews</Text>
          {reviews.length > 0 ? (
            reviews.map(item => {
              const isExpanded = expandedReviews[item.id];
              const displayText =
                isExpanded || item.content.length <= MAX_REVIEW_LENGTH
                  ? item.content
                  : `${item.content.substring(0, MAX_REVIEW_LENGTH)}...`;

              return (
                <View key={item.id} style={styles.reviewItem}>
                  <View style={styles.reviewHeader}>
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>{item.author[0]}</Text>
                    </View>
                    <Text style={styles.reviewAuthor}>{item.author}</Text>
                  </View>
                  <Text style={styles.reviewContent}>{displayText}</Text>
                  {item.content.length > MAX_REVIEW_LENGTH && (
                    <TouchableOpacity onPress={() => toggleExpand(item.id)}>
                      <Text style={styles.seeMoreText}>
                        {isExpanded ? 'See Less' : 'See More'}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })
          ) : (
            <Text style={styles.noReviews}>No reviews yet</Text>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    // height: undefined,
    // aspectRatio: 1,
    height: 250,
    resizeMode: 'cover',
  },
  details: {
    padding: 15,
  },
  detailTitle: {
    fontWeight: 'bold',
    fontSize: 18,
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
    marginLeft: 10,
    marginBottom: 5,
    textAlign: 'justify',
    padding: 5,
  },
  genre: {
    backgroundColor: '#312e81',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    color: '#fff',
  },
  // runTime: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginLeft: 10,
  //   marginBottom: 5,
  // },
  // rating: {
  //   fontSize: 20,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginLeft: 10,
  // },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  review: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 5,
    color: '#f9a603',
  },
  // reviewSection: {
  //   padding: 10,
  // },
  // reviewItem: {
  //   marginBottom: 15,
  // },
  // reviewAuthor: {
  //   fontWeight: 'bold',
  //   fontSize: 16,
  //   padding: 5,
  // },
  // reviewContent: {
  //   fontSize: 14,
  //   marginTop: 5,
  //   textAlign: 'justify',
  //   marginLeft: 20,
  //   padding: 5,
  // },
  reviewSection: {
    padding: 15,
    marginTop: 10,
  },
  reviewTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#f9a603',
    marginBottom: 10,
  },
  reviewItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 5,
    backgroundColor: '#f9a603',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  reviewAuthor: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  reviewContent: {
    fontSize: 14,
    textAlign: 'justify',
  },
  seeMoreText: {
    fontSize: 14,
    color: '#007bff',
    marginTop: 5,
    fontWeight: 'bold',
  },
  noReviews: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
