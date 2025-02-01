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

export { TVInterface };
