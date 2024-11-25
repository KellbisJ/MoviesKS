import { api, API_MOVIE_CATEGORY, API_TV_CATEGORY } from './api';

async function getMediaByCategory(mediaType, genreId) {
	const API_CATEGORY = mediaType === 'movies' ? API_MOVIE_CATEGORY : API_TV_CATEGORY;
	try {
		const { data: media } = await api.get(API_CATEGORY, {
			params: {
				with_genres: genreId,
			},
		});
		return media.results;
	} catch (error) {
		console.error(error);
		return [];
	}
}

export { getMediaByCategory };
