import { MovieInterface, TVInterface } from '../movie-and-tv-interface';

interface SimilarMediaInterface {
	page: number;
	results: MovieInterface[] | TVInterface[];
	total_pages: number;
	total_results: number;
}

export { SimilarMediaInterface };
