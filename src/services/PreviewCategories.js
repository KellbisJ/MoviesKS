import { api, API_GENRE_MOVIE_URL } from './api';

async function getPreviewCategories() {
	try {
		const { data: categories } = await api.get(API_GENRE_MOVIE_URL);

		return categories.genres || [];
	} catch (error) {
		console.error(error);
		return [];
	}
}

export { getPreviewCategories };
