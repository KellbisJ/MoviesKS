import { MovieDetailInterface, TVDetailInterface } from '../media-detail-interface';
import { MovieInterface, TVInterface } from '../movie-and-tv-interface';

interface FavoriteMediaContextType {
	favorites: {
		movies: MovieInterface[] | MovieDetailInterface[] | [];
		tv: TVInterface[] | TVDetailInterface[] | [];
	};
	saveFavoriteMedia?: (mediaType: 'movies' | 'tv', media: MovieInterface | TVInterface | MovieDetailInterface | TVDetailInterface) => void;
}

export { FavoriteMediaContextType };
