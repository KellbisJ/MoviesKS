async function getMovieDetail(id) {
	try {
		const { data: movie } = await api.get(API_MOVIE_DETAIL(id));

		movieDetailImg.src = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`;
		movieDetailImg.classList.remove('movie_loading');

		const movieRating = document.createElement('i');
		movieRating.setAttribute('class', 'fa-solid fa-star rating_icon');

		movieDetailName.textContent = movie.title;
		containerMovieDetailRating.textContent = movie.vote_average.toFixed(1);
		containerMovieDetailRating.append(movieRating);
		movieDetailDescription.textContent = movie.overview ? movie.overview : 'Sin descripción';
		movieReleaseInfo.textContent = movie.release_date ? `Fecha de lanzamiento: ${movie.release_date}` : 'Sin fecha de lanzamiento';

		movieDetailImg.addEventListener('error', () => {
			movieDetailImg.setAttribute('src', 'https://img.freepik.com/vector-gratis/ilustracion-concepto-pagina-no-encontrada_114360-1869.jpg');
		});

		const createSimilarGenres = (genres) => {
			containerCategoriesList.innerHTML = '';
			containerCategoriesList.textContent = 'Genero:';
			genres.forEach((genre) => {
				const categoryLink = document.createElement('a');
				const categoryTitle = document.createTextNode(`(${genre.name})`);

				categoryLink.classList.add('movieLink2');
				categoryLink.setAttribute('id', genre.id);
				categoryLink.append(categoryTitle);

				containerCategoriesList.append(categoryLink);

				categoryLink.addEventListener('click', () => {
					location.hash = `#category=${genre.id}-${genre.name}`;
				});
			});
		};
		createSimilarGenres(movie.genres);
		console.log({ movie });
	} catch (error) {
		console.error(error);
	}
}
