import { api, API_MOVIE_DETAIL, API_TV_DETAIL } from '../index';
import { MovieDetailInterface, TVDetailInterface } from './types';
import { MediaTypeT } from '@/types/media-type';

async function getMediaDetail(type: `${MediaTypeT}`, id: string): Promise<MovieDetailInterface | TVDetailInterface> {
	try {
		const apiUrl = type === MediaTypeT.movie ? API_MOVIE_DETAIL(id) : API_TV_DETAIL(id);
		const { data: media }: { data: MovieDetailInterface | TVDetailInterface } = await api.get(apiUrl);

		return media;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export { getMediaDetail };
