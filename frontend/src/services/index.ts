import axios from 'axios';
import { currentLanguage } from '@/context/lang';

const BASE_API_URL: string = import.meta.env.VITE_APP_SERVER || 'http://localhost:8000/api';

export const API_TRENDING_MOVIES_URL = `${BASE_API_URL}/trending/movie/day`;
export const API_TRENDING_TV_URL = `${BASE_API_URL}/trending/tv/day`;
export const API_MOVIE_SEARCH = `${BASE_API_URL}/search/movie`;
export const API_MOVIE_DETAIL = (id: string) => `${BASE_API_URL}/movie/${id}`;
export const API_TV_DETAIL = (series_id: string) => `${BASE_API_URL}/tv/${series_id}`;
export const API_MOVIE_DETAIL_SIMILAR = (id: string) => `${BASE_API_URL}/movie/${id}/similar`;
export const API_TV_DETAIL_SIMILAR = (series_id: string) =>
	`${BASE_API_URL}/tv/${series_id}/similar`;
export const API_MOVIE_CATEGORY = `${BASE_API_URL}/discover/movie`;
export const API_TV_CATEGORY = `${BASE_API_URL}/discover/tv`;
export const API_GENRE_MOVIE_URL = `${BASE_API_URL}/genre/movie/list`;
export const API_GENRE_TV_URL = `${BASE_API_URL}/genre/tv/list`;
export const API_MOVIE_VIDEOS = (id: string) => `${BASE_API_URL}/movie/${id}/videos`;
export const API_TV_VIDEOS = (series_id: string) => `${BASE_API_URL}/tv/${series_id}/videos`;
export const API_SEARCH_MOVIES = (query: string) => `${BASE_API_URL}/search/movie/${query}`;
export const API_SEARCH_TV = (query: string) => `${BASE_API_URL}/search/tv/${query}`;
export const API_MOVIE_IMAGES = (id: string) => `${BASE_API_URL}/movie/${id}/images`;
export const API_TV_IMAGES = (id: string) => `${BASE_API_URL}/tv/${id}/images`;
export const API_MEDIA_LISTS = (type: string, mediaListType: string) =>
	`${BASE_API_URL}/${type}/${mediaListType}`;
export const API_CONFIG_LANGUAGES = `${BASE_API_URL}/configurations/languages`;

const api = axios.create({
	baseURL: BASE_API_URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json;charset=utf-8',
		'X-Requested-With': 'XMLHttpRequest',
	},
	timeout: 15000,
	withCredentials: true,

	// xsrfCookieName: 'XSRF-TOKEN',
	// xsrfHeaderName: 'X-XSRF-TOKEN',
});

api.interceptors.request.use((config) => {
	if (!config.url?.startsWith(BASE_API_URL)) {
		throw new axios.Cancel('Bloqueado: Petición a dominio no permitido');
	}

	config.headers['X-LANG-CONTEXT'] = currentLanguage;
	return config;
});

export { api };
