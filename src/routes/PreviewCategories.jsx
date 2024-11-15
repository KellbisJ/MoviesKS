async function getPreviewCategories() {
	try {
		const { data } = await api.get(API_GENRE_MOVIE_URL);

		const categories = data.genres;
		createCategoriesPreview(categories);
	} catch (error) {
		console.error(error);
	}
}
