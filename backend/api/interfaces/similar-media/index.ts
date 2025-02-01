import { MovieInterface } from '../movie';
import { TVInterface } from '../tv';

interface MovieSimilarInterface {
	page: number;
	results: MovieInterface[];
	total_pages: number;
	total_results: number;
}

interface TVSimilarInterface {
	page: number;
	results: TVInterface[];
	total_pages: number;
	total_results: number;
}

export { MovieSimilarInterface, TVSimilarInterface };
