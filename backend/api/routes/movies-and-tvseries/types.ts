import { GenreInterface } from '../genres-and-discover/types';

// MOVIE
interface MovieInterface {
	backdrop_path: string;
	id: number;
	title: string;
	original_title: string;
	overview: string;
	poster_path: string;
	media_type: MediaType;
	adult: boolean;
	original_language: string | OriginalLanguage;
	genre_ids: number[];
	popularity: number;
	release_date: Date;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

enum MediaType {
	Movie = 'movie',
}

enum OriginalLanguage {
	En = 'en',
	Fr = 'fr',
	No = 'no',
	Te = 'te',
}

// Movie
interface MovieDetailInterface {
	adult: boolean;
	backdrop_path: string;
	belongs_to_collection: null;
	budget: number;
	genres: GenreInterface[];
	homepage: string;
	id: number;
	imdb_id: string;
	origin_country: string[];
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: ProductionCompanyInterface[];
	production_countries: ProductionCountryInterface[];
	release_date: Date;
	revenue: number;
	runtime: number;
	spoken_languages: SpokenLanguageInterface[];
	status: string;
	tagline: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

// TV

interface TVInterface {
	backdrop_path: string;
	id: number;
	name: string;
	original_name: string;
	overview: string;
	poster_path: string;
	media_type: MediaType;
	adult: boolean;
	original_language: string;
	genre_ids: number[];
	popularity: number;
	first_air_date: Date;
	vote_average: number;
	vote_count: number;
	origin_country: string[];
}

enum MediaType {
	Tv = 'tv',
}

interface TVDetailInterface {
	adult: boolean;
	backdrop_path: string;
	created_by: CreatedByInterface[];
	episode_run_time: any[];
	first_air_date: Date;
	genres: GenreInterface[];
	homepage: string;
	id: number;
	in_production: boolean;
	languages: string[];
	last_air_date: Date;
	last_episode_to_air: LastEpisodeToAirInterface;
	name: string;
	next_episode_to_air: null;
	networks: NetworkInterface[];
	number_of_episodes: number;
	number_of_seasons: number;
	origin_country: string[];
	original_language: string;
	original_name: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: NetworkInterface[];
	production_countries: ProductionCountryInterface[];
	seasons: SeasonInterface[];
	spoken_languages: SpokenLanguageInterface[];
	status: string;
	tagline: string;
	type: string;
	vote_average: number;
	vote_count: number;
}

// Movie Data -->

interface ProductionCompanyInterface {
	id: number;
	logo_path: string;
	name: string;
	origin_country: string;
}

interface ProductionCountryInterface {
	iso_3166_1: string;
	name: string;
}

interface SpokenLanguageInterface {
	english_name: string;
	iso_639_1: string;
	name: string;
} // <-- SpokenLanguageInterface works for both, movie and tv.

// TV Data -->

interface CreatedByInterface {
	id: number;
	credit_id: string;
	name: string;
	original_name: string;
	gender: number;
	profile_path: string;
}

interface LastEpisodeToAirInterface {
	id: number;
	name: string;
	overview: string;
	vote_average: number;
	vote_count: number;
	air_date: Date;
	episode_number: number;
	episode_type: string;
	production_code: string;
	runtime: number;
	season_number: number;
	show_id: number;
	still_path: string;
}

interface NetworkInterface {
	id: number;
	logo_path: null | string;
	name: string;
	origin_country: string;
}

interface ProductionCountryInterface {
	iso_3166_1: string;
	name: string;
}

interface SeasonInterface {
	air_date: Date;
	episode_count: number;
	id: number;
	name: string;
	overview: string;
	poster_path: string;
	season_number: number;
	vote_average: number;
} // <--

// SIMILAR MEDIA (DETAIL)

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

// MEDIA VIDEOS

interface MediaVideosInterface {
	id: number;
	results: Result[];
}

interface Result {
	iso_639_1: string;
	iso_3166_1: string;
	name: string;
	key: string;
	site: string;
	size: number;
	type: string;
	official: boolean;
	published_at: Date;
	id: string;
}

interface MediaImagesInterface {
	backdrops: Backdrop[];
	id: number;
	logos: Backdrop[];
	posters: Backdrop[];
}

interface Backdrop {
	aspect_ratio: number;
	height: number;
	iso_639_1: null | string;
	file_path: string;
	vote_average: number;
	vote_count: number;
	width: number;
}

export {
	MovieInterface,
	TVInterface,
	MovieDetailInterface,
	TVDetailInterface,
	MovieSimilarInterface,
	TVSimilarInterface,
	MediaVideosInterface,
	MediaImagesInterface,
};
