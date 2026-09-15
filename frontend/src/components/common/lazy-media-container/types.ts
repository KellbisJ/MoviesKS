import { MovieInterface, TVInterface } from '@/types/movie-and-tv-interface';
import { MovieDetailInterface, TVDetailInterface } from '@/services/media-detail/types';
import { MediaTypeT } from '@/types/media-type';

interface LazyMediaContainerProps {
	media_: MovieInterface | TVInterface | MovieDetailInterface | TVDetailInterface;
	type: MediaTypeT;
	containerType: 'Minimal' | 'Normal' | 'Similar';
}

export { LazyMediaContainerProps };
