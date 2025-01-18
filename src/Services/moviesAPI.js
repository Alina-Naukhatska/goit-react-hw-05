import axios from 'axios';

const API_KEY = '704ad332e8246742d3e7e2e15020c5da';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMoviesByQuery = async (query) => {
  const { data } = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query,
    },
  });
  return data;
};

export const fetchMovieDetails = async (movieId) => {
  const { data } = await axios.get(`${BASE_URL}/movie/${movieId}`, {
    params: {
      api_key: API_KEY,
    },
  });
  return data;
};

export const fetchMovieCast = async (movieId) => {
  const { data } = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
    params: {
      api_key: API_KEY,
    },
  });
  return data;
};

export const fetchMovieReviews = async (movieId) => {
  const { data } = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
    params: {
      api_key: API_KEY,
    },
  });
  return data;
};

export const fetchTrendingMovies = async () => {
  const { data } = await axios.get(`${BASE_URL}/trending/movie/day`, {
    params: {
      api_key: API_KEY,
    },
  });
  return data;
};
