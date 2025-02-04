import { api, API_MOVIE_CATEGORY, API_TV_CATEGORY } from '../index';
import { MediaByCategoryInterface } from '../../types/media-by-category-interface';
import { MovieInterface, TVInterface } from '../../types/movie-and-tv-interface';

async function getMediaByCategory(mediaType: string, genreId: string, page = 1): Promise<(MovieInterface | TVInterface)[]> {
	const API_CATEGORY = mediaType === 'movies' ? API_MOVIE_CATEGORY : API_TV_CATEGORY;
	try {
		const { data: media }: { data: MediaByCategoryInterface } = await api.get(API_CATEGORY, {
			params: {
				with_genres: genreId,
				page: page,
			},
		});

		return media.results;
	} catch (error) {
		console.error(error);
		return [];
	}
}

export { getMediaByCategory };
