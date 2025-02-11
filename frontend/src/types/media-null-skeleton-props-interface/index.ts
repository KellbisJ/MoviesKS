import { MovieDetailInterface, TVDetailInterface } from '../media-detail-interface';
import { MovieInterface, TVInterface } from '../movie-and-tv-interface';

interface MediaNullSkeletonPropsInterface {
	data: MovieInterface | TVInterface | MovieDetailInterface | TVDetailInterface;
	type: string;
	title: string;
}

export { MediaNullSkeletonPropsInterface };
