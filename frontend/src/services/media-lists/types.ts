//MOVIES LISTS
interface NowPlayingMoviesListInterface {
	dates: Dates;
	page: number;
	results: MoviesListInterface[];
	total_pages: number;
	total_results: number;
}

interface PopularMoviesListInterface {
	page: number;
	results: MoviesListInterface[];
	total_pages: number;
	total_results: number;
}

interface TopRatedMoviesListInterface {
	page: number;
	results: MoviesListInterface[];
	total_pages: number;
	total_results: number;
}
interface UpcomingMoviesListInterface {
	dates: Dates;
	page: number;
	results: MoviesListInterface[];
	total_pages: number;
	total_results: number;
}
//MOVIES LISTS

//MOVIE MEDIA LIST
interface MoviesListInterface {
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
//MOVIE MEDIA LIST

// TV SERIES LISTS
interface AiringTodayTvSeriesListInterface {
	page: number;
	results: TvSeriesListInterface[];
	total_pages: number;
	total_results: number;
}

interface OnTheAirTvSeriesListInterface {
	page: number;
	results: TvSeriesListInterface[];
	total_pages: number;
	total_results: number;
}

interface PopularTvSeriesInterface {
	page: number;
	results: TvSeriesListInterface[];
	total_pages: number;
	total_results: number;
}

interface TopRatedTvSeriesListInterface {
	page: number;
	results: TvSeriesListInterface[];
	total_pages: number;
	total_results: number;
}
// TV SERIES LISTS

//TV SERIES MEDIA LIST
interface TvSeriesListInterface {
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
//TVSERIES MEDIA LIST

enum OriginalLanguage {
	En = 'en',
	Es = 'es',
	Ja = 'ja',
	Ko = 'ko',
	Nl = 'nl',
	Fi = 'fi',
}

enum OriginCountry {
	CA = 'CA',
	Jp = 'JP',
	Kr = 'KR',
	Us = 'US',
}

enum ListTypeMovies {
	nowPlaying = 'now_playing',
	popular = 'popular',
	topRated = 'top_rated',
	upcoming = 'upcoming',
}

enum ListTypeTvSeries {
	airingToday = 'airing_today',
	onTheAir = 'on_the_air',
	popular = 'popular',
	topRated = 'top_rated',
}

interface Dates {
	maximum: Date;
	minimum: Date;
}

export {
	NowPlayingMoviesListInterface,
	PopularMoviesListInterface,
	TopRatedMoviesListInterface,
	UpcomingMoviesListInterface,
	AiringTodayTvSeriesListInterface,
	OnTheAirTvSeriesListInterface,
	PopularTvSeriesInterface,
	TopRatedTvSeriesListInterface,
	MoviesListInterface,
	TvSeriesListInterface,
	ListTypeMovies,
	ListTypeTvSeries,
};
