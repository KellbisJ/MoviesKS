function createMovies(movies, container, { intersectionObserver = false, cleanContain = false } = {}) {
	cleanContain == true ? (container.innerHTML = '') : (cleanContain = false);

	// const movieVoid = document.createElement('div');
	// movieVoid.classList.add('movie-void');
	// movieVoid.textContent = 'Envio de Peliculas Impar (*Ignorar*)';

	movies.forEach((movie) => {
		const movieContainer = document.createElement('div');
		const movieDetailContainer = document.createElement('div');
		const movieImg = document.createElement('img');
		const movieCardTitle = document.createElement('span');
		const movieCardRating = document.createElement('span');
		const movieName = document.createElement('h2');
		const movieRating = document.createElement('i');

		movieContainer.classList.add('movie_container');
		movieDetailContainer.classList.add('movie-container_detail');
		movieImg.classList.add('movie-img');
		movieCardTitle.classList.add('movie_name_title');
		movieCardRating.classList.add('rating_card');
		movieImg.setAttribute('alt', movie.title);
		movieImg.setAttribute(intersectionObserver ? 'data-img' : 'src', `https://image.tmdb.org/t/p/w300/${movie.poster_path}`);
		trendingBtnMore.textContent = 'Ver todas las peliculas';
		trendingText.textContent = 'Lo mas reciente en tendencia';
		trendingPageBtn.textContent = 'Ver mas';

		movieRating.setAttribute('class', 'fa-solid fa-star rating_icon');
		movieName.textContent = movie.title;
		movieCardRating.textContent = movie.vote_average.toFixed(1);

		movieCardTitle.append(movieName);
		movieCardRating.append(movieRating);

		movieDetailContainer.append(movieCardTitle, movieCardRating);

		movieContainer.append(movieImg, movieDetailContainer);
		container.append(movieContainer);

		if (intersectionObserver) {
			observer.observe(movieImg);
		}

		movieImg.addEventListener('click', () => {
			location.hash = `#movie=${movie.id}`;
		});
		movieImg.addEventListener('error', () => {
			movieImg.setAttribute('src', 'https://img.freepik.com/vector-gratis/ilustracion-concepto-pagina-no-encontrada_114360-1869.jpg');
		});
	});
}
