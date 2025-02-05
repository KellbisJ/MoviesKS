import { MovieInterface, TVInterface } from '../movie-and-tv-interface';

interface FavoriteMediaContextType {
	favorites: {
		movies: MovieInterface[] | [];
		tv: TVInterface[] | [];
	};
	// mediaType: MovieInterface['media_type'] | TVInterface['media_type'] | undefined;
	saveFavoriteMedia?: (mediaType: 'movies' | 'tv', media: MovieInterface | TVInterface) => void;
}

export { FavoriteMediaContextType };
