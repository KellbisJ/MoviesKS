import { MovieInterface } from '../movie';

interface PreviewMoviesInterface {
	page: number;
	results: MovieInterface[];
	total_pages: number;
	total_results: number;
}

export { PreviewMoviesInterface };
