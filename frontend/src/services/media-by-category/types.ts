import { MovieInterface, TVInterface } from '@/types/movie-and-tv-interface';

interface MediaByCategoryInterface {
	page: number;
	results: MovieInterface[] | TVInterface[];
	total_pages: number;
	total_results: number;
}

export { MediaByCategoryInterface };
