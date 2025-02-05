import { MovieInterface, TVInterface } from '../movie-and-tv-interface';

interface CreateMediaPropsInterface {
	media: MovieInterface[] | TVInterface[];
	type: string;
}

export { CreateMediaPropsInterface };
