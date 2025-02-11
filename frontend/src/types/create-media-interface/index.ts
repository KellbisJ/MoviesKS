import { MovieDetailInterface, TVDetailInterface } from '../media-detail-interface';
import { MovieInterface, TVInterface } from '../movie-and-tv-interface';

interface CreateMediaPropsInterface {
	media: MovieInterface[] | TVInterface[] | MovieDetailInterface[] | TVDetailInterface[];
	type: string;
}

export { CreateMediaPropsInterface };
