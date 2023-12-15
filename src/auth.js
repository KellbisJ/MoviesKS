const API = `https://api.themoviedb.org/3`;
const API_KEY = `2e62ce3ff4c2c0f7e3c52b9e21b052a9`;
const API_TRENDING_MOVIES_URL = `/trending/movie/day`;
const API_MOVIE_SEARCH = `/search/movie`;
const API_MOVIE_DETAIL = (id) => `/movie/${id}`;
const API_MOVIE_DETAIL_SIMILAR = (id) => `/movie/${id}/similar`;
const API_MOVIE_CATEGORY = `/discover/movie`;
const API_GENRE_MOVIE_URL = `/genre/movie/list`;
