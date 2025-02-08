import { MovieInterface, TVInterface } from '../movie-and-tv-interface';

interface MediaBySearchInterface {
	page: number;
	results: MovieInterface[] | TVInterface[];
	total_pages: number;
	total_results: number;
}

export { MediaBySearchInterface };
