import { MovieInterface, TVInterface } from '../../types/movie-and-tv-interface';

const useSaveMedia = (media: MovieInterface | TVInterface, type: string) => {
	const storedFavorites = localStorage.getItem('favoriteMedia');
	const favorites = storedFavorites
		? JSON.parse(storedFavorites)
		: {
				movies: [],
				tv: [],
		  };

	const isFavorite = favorites[type].some((item: MovieInterface | TVInterface) => item.id === media.id);

	if (isFavorite) {
		return false;
	}
	favorites[type].push(media);
	localStorage.setItem('favoriteMedia', JSON.stringify(favorites));
	return true;
};

export { useSaveMedia };
