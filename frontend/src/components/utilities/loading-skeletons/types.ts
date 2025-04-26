import { MovieDetailInterface, TVDetailInterface } from '@/services/media-detail/types';
import { MediaTypeT } from '@/types/media-type';
import { MovieInterface, TVInterface } from '@/types/movie-and-tv-interface';

interface MediaNullSkeletonPropsInterface {
	data: MovieInterface | TVInterface | MovieDetailInterface | TVDetailInterface;
	type: MediaTypeT;
	title: string;
}

export { MediaNullSkeletonPropsInterface };
