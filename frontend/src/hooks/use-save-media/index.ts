import { MovieDetailInterface, TVDetailInterface } from '@/services/media-detail/types';
import { MovieInterface, TVInterface } from '../../types/movie-and-tv-interface';
import { MediaTypeT } from '@/types/media-type';

const useSaveMedia = (media: MovieInterface | TVInterface | MovieDetailInterface | TVDetailInterface, type: MediaTypeT) => {
	const storedFavorites = localStorage.getItem('favoriteMedia');
	const favorites = storedFavorites
		? JSON.parse(storedFavorites)
		: {
				movies: [],
				tv: [],
		  };

	const storageKey = type === MediaTypeT.movie ? 'movies' : 'tv';

	const isSaved = favorites[storageKey].some((item: typeof media) => item.id === media.id);

	if (isSaved) return false;

	favorites[storageKey].push(media);
	localStorage.setItem('favoriteMedia', JSON.stringify(favorites));
	return true;
};

export { useSaveMedia };
