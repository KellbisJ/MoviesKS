import { MovieInterface, TVInterface } from '../movie-and-tv';

interface CreateMediaPropsInterface {
	media: MovieInterface[] | TVInterface[];
	type: string;
}

export { CreateMediaPropsInterface };
