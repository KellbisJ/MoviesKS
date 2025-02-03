interface MovieInterface {
	backdrop_path: string;
	id: number;
	title: string;
	original_title: string;
	overview: string;
	poster_path: string;
	media_type: MediaType.Movie;
	adult: boolean;
	original_language: string | OriginalLanguage;
	genre_ids: number[];
	popularity: number;
	release_date: Date;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

interface TVInterface {
	backdrop_path: string;
	id: number;
	name: string;
	original_name: string;
	overview: string;
	poster_path: string;
	media_type: MediaType.Tv;
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
	Movie = 'movie',
	Tv = 'tv',
}

enum OriginalLanguage {
	En = 'en',
	Fr = 'fr',
	No = 'no',
	Te = 'te',
}

export { MovieInterface, TVInterface };
