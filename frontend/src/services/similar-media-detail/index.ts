import { api, API_MOVIE_DETAIL_SIMILAR, API_TV_DETAIL_SIMILAR } from '../index';
import { SimilarMediaInterface } from './types';
import { MovieInterface, TVInterface } from '../../types/movie-and-tv-interface';
import { MediaTypeT } from '@/types/media-type';

async function getSimilarMediaDetail(type: `${MediaTypeT}`, id: string): Promise<MovieInterface[] | TVInterface[]> {
	try {
		const apiUrl = type === MediaTypeT.movie ? API_MOVIE_DETAIL_SIMILAR(id) : API_TV_DETAIL_SIMILAR(id);
		const { data: similarMedia }: { data: SimilarMediaInterface } = await api.get(apiUrl);

		// console.log('Similar media:', media);
		return similarMedia.results;
	} catch (error) {
		console.error(error);
		return [];
	}
}

export { getSimilarMediaDetail };
