import React from 'react';
import { api, API_MOVIE_CATEGORY, API_TV_CATEGORY } from './api';

async function getMediaByCategory(type, genreId) {
	const API_CATEGORY = type === 'movies' ? API_MOVIE_CATEGORY : API_TV_CATEGORY;
	try {
		const { data: media } = await api.get(API_CATEGORY, {
			params: {
				with_genres: genreId,
			},
		});
		return media.results;
	} catch (error) {
		console.error(error);
		return [];
	}
}

export { getMediaByCategory };
