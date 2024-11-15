async function getPreviewTrendingMovies() {
	try {
		const { data: movies } = await api.get(API_TRENDING_MOVIES_URL);
		maxPage = movies.total_pages;

		createMovies(movies.results, containerTrendingPreviewMovies, { intersectionObserver: false, cleanContain: true });
	} catch (error) {
		console.error(error);
	}
}
