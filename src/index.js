const api = axios.create({
	baseURL: 'https://api.themoviedb.org/3',
	headers: {
		'Content-Type': 'application/json;charset=utf-8',
	},
	params: {
		api_key: API_KEY,
		language: 'es',
	},
});

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			const url = entry.target.getAttribute('data-img');
			entry.target.setAttribute('src', url);
			return;
		}
	});
});

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

function createCategoriesPreview(categories) {
	containerPreviewLinks.innerHTML = '';
	categories.forEach((category) => {
		const categoryLink = document.createElement('a');
		const categoryTitle = document.createTextNode(category.name);

		containerPreviewText.textContent = 'BUSCAR PELICULA POR GÉNERO';

		categoryLink.classList.add('movieLink');
		categoryLink.setAttribute('id', category.id);
		categoryLink.append(categoryTitle);

		containerPreviewLinks.append(categoryLink);

		categoryLink.addEventListener('click', () => {
			location.hash = `#category=${category.id}-${category.name}`;
		});
	});
}

async function getPreviewTrendingMovies() {
	try {
		const { data: movies } = await api.get(API_TRENDING_MOVIES_URL);
		maxPage = movies.total_pages;

		createMovies(movies.results, containerTrendingPreviewMovies, { intersectionObserver: false, cleanContain: true });
	} catch (error) {
		console.error(error);
	}
}

async function getPreviewCategories() {
	try {
		const { data } = await api.get(API_GENRE_MOVIE_URL);

		const categories = data.genres;
		createCategoriesPreview(categories);
	} catch (error) {
		console.error(error);
	}
}

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
function getNextMoviesByCategory(id) {
	return async function () {
		try {
			const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
			const scrollEnd = scrollTop + clientHeight >= scrollHeight - 600;
			const pageIsNotMax = page < maxPage;

			if (scrollEnd && pageIsNotMax) {
				page++;

				const { data: movies } = await api.get(API_MOVIE_CATEGORY, {
					params: {
						with_genres: id,
						page,
					},
				});
				console.log(movies);

				createMovies(movies.results, articleGenericMovies, { intersectionObserver: true, cleanContain: false });
			}
		} catch (error) {
			console.error(error);
		}
	};
}

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

async function getSimilarMoviesDetail(id) {
	const { data: movie } = await api.get(API_MOVIE_DETAIL_SIMILAR(id));

	movie.total_results == 0
		? mensajesDePeliculasSimilaresNoEncontrados.classList.remove('disabled')
		: mensajesDePeliculasSimilaresNoEncontrados.classList.add('disabled');

	createMovies(movie.results, containerRelatedMoviesGrid, { intersectionObserver: false, cleanContain: true });
}
