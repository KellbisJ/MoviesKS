import { api, API_MOVIE_DETAIL_SIMILAR, API_TV_DETAIL_SIMILAR } from '../index';
import { SimilarMediaInterface } from '../../types/similar-media-interface';
import { MovieInterface, TVInterface } from '../../types/movie-and-tv-interface';

async function getSimilarMediaDetail(type: string, id: string): Promise<MovieInterface[] | TVInterface[]> {
	try {
		const apiUrl = type === 'movies' ? API_MOVIE_DETAIL_SIMILAR(id) : API_TV_DETAIL_SIMILAR(id);
		const { data: similarMedia }: { data: SimilarMediaInterface } = await api.get(apiUrl);

		// console.log('Similar media:', media);
		return similarMedia.results;
	} catch (error) {
		console.error(error);
		return [];
	}
}

export { getSimilarMediaDetail };
