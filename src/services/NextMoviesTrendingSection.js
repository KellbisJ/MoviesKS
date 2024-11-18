import { api, API_TRENDING_MOVIES_URL } from './api';

async function getNextMoviesTrendingSection(currentPage) {
	try {
		const { data: movies } = await api.get(API_TRENDING_MOVIES_URL, {
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

export { getNextMoviesTrendingSection };
