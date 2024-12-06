import { api, API_SEARCH_MOVIES, API_SEARCH_TV } from './api';

async function getMediaBySearch(type, query, page = 1) {
	try {
		const apiUrl = type === 'movies' ? API_SEARCH_MOVIES(query) : API_SEARCH_TV(query);
		console.log('Fetching API URL:', apiUrl); // Log para depuración
		const { data: media } = await api.get(apiUrl, {
			params: { page }, // Añadir parámetro de página
		});
		console.log('API Response:', media); // Log para depuración
		return media;
	} catch (error) {
		console.error('Error fetching media:', error); // Log para depuración
		return null;
	}
}
export { getMediaBySearch };
