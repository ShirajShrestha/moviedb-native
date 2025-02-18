import Config from 'react-native-config';
import axios from 'axios';

const MOVIE_BASE_URL = 'https://api.themoviedb.org/3/movie';
const key = Config.API_KEY;

export const fetchMovies = async (type: string, currentPage = 1) => {
  const response = await axios.get(
    `${MOVIE_BASE_URL}/${type}?language=en-US&page=${currentPage}&api_key=${key}`,
  );
  return response.data;
};

export const fetchMovieDetails = async (id: number) => {
  const response = await axios.get(
    `${MOVIE_BASE_URL}/${id}?language=en-US&api_key=${key}`,
  );
  return response.data;
};

export const fetchReviews = async (id: number) => {
  try {
    const response = await axios.get(
      `${MOVIE_BASE_URL}/${id}/reviews?language=en-US&page=1&api_key=${key}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
