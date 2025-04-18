import { MovieInterface, TVInterface } from '../movies-and-tvseries/types';

interface SearchMediaInterface {
	page: number;
	results: MovieInterface[] | TVInterface[];
	total_pages: number;
	total_results: number;
}

export { SearchMediaInterface };
