import { MovieDetailInterface, TVDetailInterface } from '../media-detail-interface';
import { MovieInterface, TVInterface } from '../movie-and-tv-interface';

interface MediaContainerPropsInterface {
	media_: MovieInterface | TVInterface | MovieDetailInterface | TVDetailInterface;
	type: string;
}

export { MediaContainerPropsInterface };
