import React from 'react';

const useSaveMedia = (media, type) => {
	const storedFavorites = localStorage.getItem('favoriteMedia');
	const favorites = storedFavorites
		? JSON.parse(storedFavorites)
		: {
				movies: [],
				tv: [],
		  };

	const isFavorite = favorites[type].some((item) => item.id === media.id);

	if (isFavorite) {
		return false;
	}
	favorites[type].push(media);
	localStorage.setItem('favoriteMedia', JSON.stringify(favorites));
	return true;
};

export { useSaveMedia };
