import { MovieInterface, TVInterface } from '../movie-and-tv-interface';

interface MediaNullSkeletonPropsInterface {
	data: MovieInterface | TVInterface;
	type: string;
	title: string;
}

export { MediaNullSkeletonPropsInterface };
