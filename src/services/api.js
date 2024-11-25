import axios from 'axios';

export const API_TRENDING_MOVIES_URL = `/api/trending/movie/day`;
export const API_TRENDING_TV_URL = `/api/trending/tv/day`;
export const API_MOVIE_SEARCH = `/api/search/movie`;
export const API_MOVIE_DETAIL = (id) => `/api/movie/${id}`;
export const API_MOVIE_DETAIL_SIMILAR = (id) => `/api/movie/${id}/similar`;
export const API_MOVIE_CATEGORY = `/api/discover/movie`;
export const API_TV_CATEGORY = `/api/discover/tv`;
export const API_GENRE_MOVIE_URL = `/api/genre/movie/list`;
export const API_GENRE_TV_URL = `/api/genre/tv/list`;

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

const setLanguageBasedOnLocation = async () => {
	try {
		const response = await axios.get('https://ipapi.co/json/');
		const { country, languages } = response.data;

		// Extract the first language from the returned list
		const userLanguage = languages.split(',')[0];

		// Update api instance with user's language
		api.defaults.params.language = userLanguage || 'es'; // Default to 'es' if no language is detected

		// console.log(`Detected language: ${userLanguage}`);
	} catch (error) {
		console.error('Error detecting location:', error);
	}
};

setLanguageBasedOnLocation();

export { api };
