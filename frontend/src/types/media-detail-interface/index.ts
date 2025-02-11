import { GenreInterface } from '../genre-interface';

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

export { MovieDetailInterface, TVDetailInterface };
