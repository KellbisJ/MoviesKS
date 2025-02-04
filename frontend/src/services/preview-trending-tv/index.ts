import { api, API_TRENDING_TV_URL } from '../index';
import { TrendingMediaPreviewInterface } from '../../types/trending-movies-preview-interface';
import { MovieInterface, TVInterface } from '../../types/movie-and-tv-interface';

async function getPreviewTrendingTV(): Promise<(MovieInterface | TVInterface)[]> {
	try {
		const { data: tv }: { data: TrendingMediaPreviewInterface } = await api.get(API_TRENDING_TV_URL);
		return tv.results;
	} catch (error) {
		console.error('Error fetching movies: ', error);
		return [];
	}
}
export { getPreviewTrendingTV };
