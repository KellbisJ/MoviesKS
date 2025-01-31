import React from 'react';
import { api, API_TRENDING_TV_URL } from '../index';

async function getNextTvTrendingSection(currentPage) {
	try {
		const { data: tv } = await api.get(API_TRENDING_TV_URL, {
			params: {
				page: currentPage,
			},
		});
		return tv.results || [];
	} catch (error) {
		console.error(error);
		return [];
	}
}

export { getNextTvTrendingSection };
