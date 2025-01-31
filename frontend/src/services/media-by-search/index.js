import { api, API_SEARCH_MOVIES, API_SEARCH_TV } from '../index';

async function getMediaBySearch(type, query, page = 1) {
	try {
		const apiUrl = type === 'movies' ? API_SEARCH_MOVIES(query) : API_SEARCH_TV(query);
		// console.log('Fetching API URL:', apiUrl);
		const { data: media } = await api.get(apiUrl, {
			params: { page },
		});
		// console.log('API Response:', media);
		return media;
	} catch (error) {
		// console.error('Error fetching media:', error);
		return null;
	}
}
export { getMediaBySearch };
