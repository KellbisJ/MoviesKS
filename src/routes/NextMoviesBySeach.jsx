function getNextMoviesBySearch(query) {
	return async function () {
		try {
			const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
			const scrollEnd = scrollTop + clientHeight >= scrollHeight - 600;
			const pageIsNotMax = page < maxPage;

			if (scrollEnd && pageIsNotMax) {
				page++;

				const { data: movies } = await api.get(API_MOVIE_SEARCH, {
					params: {
						query,
						page,
					},
				});

				createMovies(movies.results, articleGenericMovies, { intersectionObserver: true, cleanContain: false });
			}
		} catch (error) {
			console.error(error);
		}
	};
}
