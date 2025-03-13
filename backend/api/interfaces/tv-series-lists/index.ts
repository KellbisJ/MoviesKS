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

enum OriginalLanguage {
	En = 'en',
	Ja = 'ja',
	Ko = 'ko',
}
//TVSERIES MEDIA LIST

export { AiringTodayTvSeriesListInterface, OnTheAirTvSeriesListInterface, PopularTvSeriesInterface, TopRatedTvSeriesListInterface };
