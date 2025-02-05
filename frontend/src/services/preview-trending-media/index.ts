import { api, API_TRENDING_MOVIES_URL, API_TRENDING_TV_URL } from '../index';
import { TrendingMediaPreviewInterface } from '../../types/trending-movies-preview-interface';
import { MovieInterface, TVInterface } from '../../types/movie-and-tv-interface';

async function getPreviewTrendingMedia(type: string): Promise<MovieInterface[] | TVInterface[]> {
	try {
		const { data: trendingMedia }: { data: TrendingMediaPreviewInterface } = await api.get(
			type === 'movies' ? API_TRENDING_MOVIES_URL : API_TRENDING_TV_URL
		);

		return trendingMedia.results;
	} catch (error) {
		console.error('Error fetching movies: ', error);
		return [];
	}
}
export { getPreviewTrendingMedia };
