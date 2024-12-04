import React from 'react';
import { api, API_MOVIE_VIDEOS, API_TV_VIDEOS } from './api';

async function getMediaVideos(id, type) {
	try {
		const apiUrl = type === 'movies' ? API_MOVIE_VIDEOS(id) : API_TV_VIDEOS(id);
		const { data: media } = await api.get(apiUrl);

		// console.log({ media });
		if (media && media.id && media.results && media.results.length > 0) {
			return media;
		} else {
			return null;
		}
	} catch (error) {
		console.error('Error fetching media videos:', error);
		return null;
	}
}

export { getMediaVideos };
