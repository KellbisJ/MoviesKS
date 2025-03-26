import { api, API_GENRE_MOVIE_URL, API_GENRE_TV_URL } from '../index';
import { GenreMediaListInterface } from './types';
import { MediaTypeT } from '@/types/media-type';

async function getPreviewCategories(type: `${MediaTypeT}`): Promise<GenreMediaListInterface> {
	const API_CATEGORY = type === MediaTypeT.movie ? API_GENRE_MOVIE_URL : API_GENRE_TV_URL;
	try {
		const { data: categories }: { data: GenreMediaListInterface } = await api.get(API_CATEGORY);

		return categories;
	} catch (error) {
		throw new Error(`${error}`);
	}
}

export { getPreviewCategories };
