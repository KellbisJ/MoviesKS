import { api, API_TRENDING_MOVIES_URL } from '../index';
import { TrendingMediaPreviewInterface } from '../../types/trending-movies-preview-interface';
import { MovieInterface, TVInterface } from '../../types/movie-and-tv-interface';

async function getPreviewTrendingMovies(): Promise<(MovieInterface | TVInterface)[]> {
	try {
		const { data: movies }: { data: TrendingMediaPreviewInterface } = await api.get(API_TRENDING_MOVIES_URL);
		return movies.results;
	} catch (error) {
		console.error('Error fetching movies: ', error);
		return [];
	}
}
export { getPreviewTrendingMovies };
