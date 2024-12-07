import React from 'react';
import { api, API_TRENDING_TV_URL } from './api';

async function getPreviewTrendingTV() {
	try {
		const { data: tv } = await api.get(API_TRENDING_TV_URL);
		return tv.results || [];
	} catch (error) {
		console.error('Error fetching movies: ', error);
		return [];
	}
}
export { getPreviewTrendingTV };
