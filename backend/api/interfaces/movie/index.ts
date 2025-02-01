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

export { MovieInterface };
