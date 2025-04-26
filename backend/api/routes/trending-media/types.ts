import { MovieInterface, TVInterface } from '../movies-and-tvseries/types';

interface PreviewMoviesInterface {
	page: number;
	results: MovieInterface[];
	total_pages: number;
	total_results: number;
}

interface PreviewTvInterface {
	page: number;
	results: TVInterface[];
	total_pages: number;
	total_results: number;
}

export { PreviewMoviesInterface, PreviewTvInterface };
