import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSaveMedia } from '../../hooks/use-save-media';
import { MovieInterface, TVInterface } from '../../types/movie-and-tv-interface';
import { SaveMediaContextInterface } from './types';
import { MovieDetailInterface, TVDetailInterface } from '@/services/media-detail/types';
import { MediaTypeT } from '@/types/media-type';

const initialContextValue: SaveMediaContextInterface = {
	savedMedia: {
		movies: [],
		tv: [],
	},
	saveMedia: () => {},
};

const SavedMediaContext = createContext<SaveMediaContextInterface>(initialContextValue);

const SavedMediaProvider = ({ children }: { children: React.ReactNode }) => {
	const [savedMedia, setSavedMedia] = useState<SaveMediaContextInterface['savedMedia']>(initialContextValue.savedMedia);

	useEffect(() => {
		const storedFavorites = localStorage.getItem('favoriteMedia');
		const favorites = storedFavorites ? JSON.parse(storedFavorites) : { movies: [], tv: [] };
		setSavedMedia(favorites);
	}, []);

	const saveMedia = (mediaType: MediaTypeT, media: MovieInterface | TVInterface | TVDetailInterface | MovieDetailInterface) => {
		if (!mediaType) {
			console.error(`invalid media type: ${mediaType}`);
			return;
		}

		const isFavorite = useSaveMedia(media, mediaType);
		let updatedFavorites;
		if (!isFavorite) {
			updatedFavorites = {
				...savedMedia,
				[mediaType === MediaTypeT.movie ? 'movies' : MediaTypeT.tv]: savedMedia[mediaType === MediaTypeT.movie ? 'movies' : MediaTypeT.tv].filter(
					(item) => item.id !== media.id
				),
			};
		} else {
			updatedFavorites = {
				...savedMedia,
				[mediaType === MediaTypeT.movie ? 'movies' : MediaTypeT.tv]: [
					...savedMedia[mediaType === MediaTypeT.movie ? 'movies' : MediaTypeT.tv],
					media,
				],
			};
		}
		setSavedMedia(updatedFavorites);
		localStorage.setItem('favoriteMedia', JSON.stringify(updatedFavorites));
	};

	return <SavedMediaContext.Provider value={{ savedMedia, saveMedia }}>{children}</SavedMediaContext.Provider>;
};

const useSavedMedia = () => useContext(SavedMediaContext);

export { SavedMediaProvider, useSavedMedia };
