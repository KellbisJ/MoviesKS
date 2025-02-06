import { MovieInterface, TVInterface } from '../movie-and-tv-interface';

interface MediaContainerPropsInterface {
	media_: MovieInterface | TVInterface;
	type: string;
}

export { MediaContainerPropsInterface };
