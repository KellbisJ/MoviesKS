import { api, API_GENRE_MOVIE_URL, API_GENRE_TV_URL } from './api';

async function getPreviewCategories(mediaType) {
	const API_CATEGORY = mediaType === 'movies' ? API_GENRE_MOVIE_URL : API_GENRE_TV_URL;
	try {
		const { data: categories } = await api.get(API_CATEGORY);

		return categories.genres || [];
	} catch (error) {
		console.error(error);
		return [];
	}
}

export { getPreviewCategories };
