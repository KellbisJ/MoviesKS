async function getMoviesBySearch(query) {
	try {
		const { data: movies } = await api.get(API_MOVIE_SEARCH, {
			params: {
				query,
				language: 'es',
			},
		});

		maxPage = movies.total_pages;

		createMovies(movies.results, articleGenericMovies, { intersectionObserver: true, cleanContain: true });
		movies.total_results === 0
			? mensajeResultadosDeBusquedaNoEncontrados.classList.remove('disabled')
			: mensajeResultadosDeBusquedaNoEncontrados.classList.add('disabled');
		console.log(movies);
	} catch (error) {
		console.error(error);
	}
}
