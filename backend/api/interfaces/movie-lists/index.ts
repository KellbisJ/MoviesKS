//LISTS
interface NowPlayingMoviesListInterface {
	dates: Dates;
	page: number;
	results: MoviesList[];
	total_pages: number;
	total_results: number;
}

interface PopularMoviesInterface {
	page: number;
	results: MoviesList[];
	total_pages: number;
	total_results: number;
}

interface TopRatedMoviesListInterface {
	page: number;
	results: MoviesList[];
	total_pages: number;
	total_results: number;
}
interface UpcomingMoviesListInterface {
	dates: Dates;
	page: number;
	results: MoviesList[];
	total_pages: number;
	total_results: number;
}
//LISTS

//MOVIE MEDIA LIST
interface MoviesList {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: OriginalLanguage | string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: Date;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

enum OriginalLanguage {
	En = 'en',
	Es = 'es',
	Ko = 'ko',
	Nl = 'nl',
	Fi = 'fi',
}

interface Dates {
	maximum: Date;
	minimum: Date;
}
//MOVIE MEDIA LIST

export { NowPlayingMoviesListInterface, PopularMoviesInterface, TopRatedMoviesListInterface, UpcomingMoviesListInterface };
