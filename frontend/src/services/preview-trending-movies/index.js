import React from 'react';
import { api, API_TRENDING_MOVIES_URL } from '../index';

async function getPreviewTrendingMovies() {
	try {
		const { data: movies } = await api.get(API_TRENDING_MOVIES_URL);
		return movies.results || [];
	} catch (error) {
		console.error('Error fetching movies: ', error);
		return [];
	}
}
export { getPreviewTrendingMovies };
