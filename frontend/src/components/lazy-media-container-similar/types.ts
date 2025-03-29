import { MovieInterface, TVInterface } from '@/types/movie-and-tv-interface';
import { MovieDetailInterface, TVDetailInterface } from '@/services/media-detail/types';
import { MediaTypeT } from '@/types/media-type';

interface LazyMediaContainerSimilarProps {
	mediaData: MovieInterface | TVInterface | MovieDetailInterface | TVDetailInterface;
	type: MediaTypeT;
}

export { LazyMediaContainerSimilarProps };
