import { api, API_GENRE_MOVIE_URL, API_GENRE_TV_URL } from '../index';
import { GenreInterface } from '../../types/genre-interface';
import { GenreMediaListInterface } from '../../types/genre-media-list';

async function getPreviewCategories(type: string): Promise<GenreInterface[]> {
	const API_CATEGORY = type === 'movies' ? API_GENRE_MOVIE_URL : API_GENRE_TV_URL;
	try {
		const { data: categories }: { data: GenreMediaListInterface } = await api.get(API_CATEGORY);

		return categories.genres;
	} catch (error) {
		console.error(error);
		return [];
	}
}

export { getPreviewCategories };
