import axios from 'axios';

const BASE_API_URL = import.meta.env.VITE_APP_SERVER || 'http://localhost:8000/api';

export const API_TRENDING_MOVIES_URL = `${BASE_API_URL}/trending/movie/day`;
export const API_TRENDING_TV_URL = `${BASE_API_URL}/trending/tv/day`;
export const API_MOVIE_SEARCH = `${BASE_API_URL}/search/movie`;
export const API_MOVIE_DETAIL = (id) => `${BASE_API_URL}/movie/${id}`;
export const API_TV_DETAIL = (series_id) => `${BASE_API_URL}/tv/${series_id}`;
export const API_MOVIE_DETAIL_SIMILAR = (id) => `${BASE_API_URL}/movie/${id}/similar`;
export const API_TV_DETAIL_SIMILAR = (series_id) => `${BASE_API_URL}/tv/${series_id}/similar`;
export const API_MOVIE_CATEGORY = `${BASE_API_URL}/discover/movie`;
export const API_TV_CATEGORY = `${BASE_API_URL}/discover/tv`;
export const API_GENRE_MOVIE_URL = `${BASE_API_URL}/genre/movie/list`;
export const API_GENRE_TV_URL = `${BASE_API_URL}/genre/tv/list`;
export const API_MOVIE_VIDEOS = (id) => `${BASE_API_URL}/movie/${id}/videos`;
export const API_TV_VIDEOS = (series_id) => `${BASE_API_URL}/tv/${series_id}/videos`;
export const API_SEARCH_MOVIES = (query) => `${BASE_API_URL}/search/movie/${query}`;
export const API_SEARCH_TV = (query) => `${BASE_API_URL}/search/tv/${query}`;

const api = axios.create({
	headers: {
		'Content-Type': 'application/json;charset=utf-8',
	},
});

export { api };
