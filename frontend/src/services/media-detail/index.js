import React from 'react';
import { api, API_MOVIE_DETAIL, API_TV_DETAIL } from '../index';

async function getMediaDetail(id, type) {
	try {
		const apiUrl = type === 'movies' ? API_MOVIE_DETAIL(id) : API_TV_DETAIL(id);

		const { data: media } = await api.get(apiUrl);

		// console.log({ media });
		return media;
	} catch (error) {
		console.error(error);
	}
}

export { getMediaDetail };
