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

interface Dates {
	maximum: Date;
	minimum: Date;
}
//MOVIE MEDIA LIST

//LISTS
interface AiringTodayTvSeriesListInterface {
	page: number;
	results: TvSeriesList[];
	total_pages: number;
	total_results: number;
}

interface OnTheAirTvSeriesListInterface {
	page: number;
	results: TvSeriesList[];
	total_pages: number;
	total_results: number;
}

interface PopularTvSeriesInterface {
	page: number;
	results: TvSeriesList[];
	total_pages: number;
	total_results: number;
}

interface TopRatedTvSeriesListInterface {
	page: number;
	results: TvSeriesList[];
	total_pages: number;
	total_results: number;
}
//LISTS

//TVSERIES MEDIA LIST
interface TvSeriesList {
	backdrop_path: null | string;
	first_air_date: Date;
	genre_ids: number[];
	id: number;
	name: string;
	origin_country: string[] | OriginCountry[];
	original_language: string | OriginalLanguage;
	original_name: string;
	overview: string;
	popularity: number;
	poster_path: string;
	vote_average: number;
	vote_count: number;
}

enum OriginCountry {
	CA = 'CA',
	Jp = 'JP',
	Kr = 'KR',
	Us = 'US',
}

//TVSERIES MEDIA LIST

enum OriginalLanguage {
	En = 'en',
	Es = 'es',
	Ko = 'ko',
	Nl = 'nl',
	Fi = 'fi',
	Ja = 'ja',
}

export {
	NowPlayingMoviesListInterface,
	PopularMoviesInterface,
	TopRatedMoviesListInterface,
	UpcomingMoviesListInterface,
	AiringTodayTvSeriesListInterface,
	OnTheAirTvSeriesListInterface,
	PopularTvSeriesInterface,
	TopRatedTvSeriesListInterface,
};
