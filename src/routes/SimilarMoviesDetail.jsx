async function getSimilarMoviesDetail(id) {
	const { data: movie } = await api.get(API_MOVIE_DETAIL_SIMILAR(id));

	movie.total_results == 0
		? mensajesDePeliculasSimilaresNoEncontrados.classList.remove('disabled')
		: mensajesDePeliculasSimilaresNoEncontrados.classList.add('disabled');

	createMovies(movie.results, containerRelatedMoviesGrid, { intersectionObserver: false, cleanContain: true });
}
