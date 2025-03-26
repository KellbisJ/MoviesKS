import { MovieInterface, TVInterface } from '@/types/movie-and-tv-interface';

interface TrendingMediaPreviewInterface {
	page: number;
	results: MovieInterface[] | TVInterface[];
	total_pages: number;
	total_results: number;
}

export { TrendingMediaPreviewInterface };
