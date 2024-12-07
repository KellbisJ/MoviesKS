import React from 'react';
import { api, API_MOVIE_DETAIL_SIMILAR, API_TV_DETAIL_SIMILAR } from './api';

async function getSimilarMediaDetail(id, type) {
	try {
		const apiUrl = type === 'movies' ? API_MOVIE_DETAIL_SIMILAR(id) : API_TV_DETAIL_SIMILAR(id);
		const { data: media } = await api.get(apiUrl);

		// console.log('Similar media:', media);
		return media;
	} catch (error) {
		console.error(error);
	}
}

export { getSimilarMediaDetail };
