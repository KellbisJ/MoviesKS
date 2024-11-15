async function getNextMoviesTrendingSection() {
	try {
		const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
		const scrollEnd = scrollTop + clientHeight >= scrollHeight - 600;
		const pageIsNotMax = page < maxPage;

		if (scrollEnd && pageIsNotMax) {
			page++;

			const { data: movies } = await api.get(API_TRENDING_MOVIES_URL, {
				params: {
					page,
				},
			});
			createMovies(movies.results, containerTrendingPreviewMovies, { intersectionObserver: true, cleanContain: false });
		}
		return;
	} catch (error) {
		console.error(error);
	}
}
