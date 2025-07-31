import { MovieDetailInterface, TVDetailInterface } from '@/services/media-detail/types';
import { MovieInterface, TVInterface } from '@/types/movie-and-tv-interface';
import { MediaTypeT } from '@/types/media-type';

interface CreateMediaPropsInterface {
	media: MovieInterface[] | TVInterface[] | MovieDetailInterface[] | TVDetailInterface[];
	type: MediaTypeT;
	containerType: 'Normal' | 'Similar' | 'Images';
}

export { CreateMediaPropsInterface };
