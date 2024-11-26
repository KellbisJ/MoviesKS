import React from 'react';
import { api, API_GENRE_MOVIE_URL, API_GENRE_TV_URL } from './api';

async function getPreviewCategories(type) {
	const API_CATEGORY = type === 'movies' ? API_GENRE_MOVIE_URL : API_GENRE_TV_URL;
	try {
		const { data: categories } = await api.get(API_CATEGORY);

		return categories.genres || [];
	} catch (error) {
		console.error(error);
		return [];
	}
}

export { getPreviewCategories };
