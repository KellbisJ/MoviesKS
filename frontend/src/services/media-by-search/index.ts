import { api, API_SEARCH_MOVIES, API_SEARCH_TV } from '../index';
import { MediaBySearchInterface } from './types';
import { MediaTypeT } from '@/types/media-type';

async function getMediaBySearch(type: `${MediaTypeT}`, query: string, page = 1): Promise<MediaBySearchInterface> {
	try {
		const apiUrl = type === MediaTypeT.movie ? API_SEARCH_MOVIES(query) : API_SEARCH_TV(query);
		// console.log('Fetching API URL:', apiUrl);
		const { data: media }: { data: MediaBySearchInterface } = await api.get(apiUrl, {
			params: {
				page: page,
			},
		});
		// console.log('API Response:', media);
		return media;
	} catch (error) {
		// console.error('Error fetching media:', error);
		return {
			page: 1,
			results: [],
			total_pages: 0,
			total_results: 0,
		};
	}
}
export { getMediaBySearch };
