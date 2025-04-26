import { GenreInterface } from '@/types/genre-interface';
import { MediaTypeT } from '@/types/media-type';

interface CreateSimilarGenresInterface {
	genres: GenreInterface[];
	type: MediaTypeT;
}

export { CreateSimilarGenresInterface };
