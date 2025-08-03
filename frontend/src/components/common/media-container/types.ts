import { MovieDetailInterface, TVDetailInterface } from '@/services/media-detail/types';
import { MovieInterface, TVInterface } from '@/types/movie-and-tv-interface';
import { MediaTypeT } from '@/types/media-type';

interface MediaContainerPropsInterface {
	media_: MovieInterface | TVInterface | MovieDetailInterface | TVDetailInterface;
	type: MediaTypeT;
	variant: 'Default' | 'Minimal';
}

export { MediaContainerPropsInterface };
