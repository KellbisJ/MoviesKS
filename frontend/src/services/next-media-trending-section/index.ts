import React from 'react';
import { api, API_TRENDING_MOVIES_URL, API_TRENDING_TV_URL } from '../index';

async function getNextMediaTrendingSection(type: string, currentPage: number) {
	try {
		const { data: movies } = await api.get(type === 'movies' ? API_TRENDING_MOVIES_URL : API_TRENDING_TV_URL, {
			params: {
				page: currentPage,
			},
		});
		return movies.results || [];
	} catch (error) {
		console.error(error);
		return [];
	}
}

export { getNextMediaTrendingSection };
