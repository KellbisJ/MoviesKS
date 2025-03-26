import { MovieDetailInterface, TVDetailInterface } from '@/services/media-detail/types';
import { MediaTypeT } from '@/types/media-type';
import { MovieInterface, TVInterface } from '@/types/movie-and-tv-interface';

interface SaveMediaContextInterface {
	savedMedia: {
		movies: MovieInterface[] | MovieDetailInterface[] | [];
		tv: TVInterface[] | TVDetailInterface[] | [];
	};
	saveMedia: (mediaType: MediaTypeT, media: MovieInterface | TVInterface | MovieDetailInterface | TVDetailInterface) => void;
}

export { SaveMediaContextInterface };
