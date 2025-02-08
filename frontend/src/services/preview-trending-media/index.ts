import { api, API_TRENDING_MOVIES_URL, API_TRENDING_TV_URL } from '../index';
import { TrendingMediaPreviewInterface } from '../../types/trending-movies-preview-interface';

async function getPreviewTrendingMedia(type: string, currentPage = 1): Promise<TrendingMediaPreviewInterface> {
	try {
		const { data: trendingMedia }: { data: TrendingMediaPreviewInterface } = await api.get(
			type === 'movies' ? API_TRENDING_MOVIES_URL : API_TRENDING_TV_URL,
			{
				params: {
					page: currentPage,
				},
			}
		);

		return trendingMedia;
	} catch (error) {
		console.error('Error fetching movies: ', error);
		return {
			page: 0,
			results: [],
			total_pages: 0,
			total_results: 0,
		};
	}
}
export { getPreviewTrendingMedia };
