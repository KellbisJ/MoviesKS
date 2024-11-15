async function getMoviesByCategory(id) {
	try {
		const { data: movies } = await api.get(API_MOVIE_CATEGORY, {
			params: {
				with_genres: id,
			},
		});
		maxPage = movies.total_pages;

		createMovies(movies.results, articleGenericMovies, { intersectionObserver: true, cleanContain: true });
	} catch (error) {
		console.error(error);
	}
}
