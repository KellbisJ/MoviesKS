import { GenreInterface } from '@/types/genre-interface';
import { MovieDetailInterface, TVDetailInterface } from '@/services/media-detail/types';
import { MediaTypeT } from '@/types/media-type';

interface MediaDetailPropsInterface {
	mediaDetail: MovieDetailInterface | TVDetailInterface;
	similarGenres: GenreInterface[];
	mediaType: MediaTypeT;
	mediaId: string;
	isMovie: (media: MovieDetailInterface | TVDetailInterface) => media is MovieDetailInterface;
}

export { MediaDetailPropsInterface };
