import { api, API_MOVIE_CATEGORY, API_TV_CATEGORY } from '../index';
import { MediaByCategoryInterface } from './types';
import { MediaTypeT } from '@/types/media-type';

async function getMediaByCategory(
	mediaType: `${MediaTypeT}`,
	genreId: string,
	page = 1
): Promise<MediaByCategoryInterface> {
	const API_CATEGORY = mediaType === MediaTypeT.movie ? API_MOVIE_CATEGORY : API_TV_CATEGORY;
	try {
		const { data: media }: { data: MediaByCategoryInterface } = await api.get(API_CATEGORY, {
			params: {
				with_genres: genreId,
				page: page,
			},
		});

		return media;
	} catch (error) {
		console.error(error);
		return {
			page: 0,
			results: [],
			total_pages: 0,
			total_results: 0,
		};
	}
}

export { getMediaByCategory };
