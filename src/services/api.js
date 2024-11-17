import axios from 'axios';

export const API_TRENDING_MOVIES_URL = `/api/trending/movie/day`;
export const API_MOVIE_SEARCH = `/api/search/movie`;
export const API_MOVIE_DETAIL = (id) => `/api/movie/${id}`;
export const API_MOVIE_DETAIL_SIMILAR = (id) => `/api/movie/${id}/similar`;
export const API_MOVIE_CATEGORY = `/api/discover/movie`;
export const API_GENRE_MOVIE_URL = `/api/genre/movie/list`;

const api = axios.create({
	baseURL: '',
	headers: {
		'Content-Type': 'application/json;charset=utf-8',
	},
	params: {
		api_key: import.meta.env.VITE_API_KEY || 'default_api_key',
		language: 'es',
	},
});

export { api };
