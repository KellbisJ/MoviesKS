const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    api_key: API_KEY,
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
    const movieImg = document.createElement('img');

    movieContainer.classList.add('movie-container');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute(intersectionObserver ? 'data-img' : 'src', `https://image.tmdb.org/t/p/original/${movie.poster_path}`);

    movieContainer.append(movieImg);
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

  // container == containerTrendingPreviewMovies ? container.append(movieVoid) : movieVoid.classList.add('disabled');
}

function createCategoriesPreview(categoriesUp, categoriesDown) {
  containerLinks.innerHTML = '';
  containerLinks2.innerHTML = '';
  categoriesUp.forEach((category) => {
    const categoryLink = document.createElement('a');
    const categoryTitle = document.createTextNode(category.name);

    categoryLink.classList.add('movieLink');
    categoryLink.setAttribute('id', category.id);
    categoryLink.append(categoryTitle);

    containerLinks.append(categoryLink);

    categoryLink.addEventListener('click', () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });
  });
  categoriesDown.forEach((category) => {
    const categoryLink = document.createElement('a');
    const categoryTitle = document.createTextNode(category.name);

    categoryLink.classList.add('movieLink');
    categoryLink.setAttribute('id', category.id);
    categoryLink.append(categoryTitle);

    containerLinks2.append(categoryLink);

    categoryLink.addEventListener('click', () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });
  });
}

async function getPreviewTrendingMoviesHome() {
  try {
    const { data: movies } = await api.get(API_TRENDING_MOVIES_URL);
    console.log(movies);
    createMovies(movies.results, containerTrendingPreviewMovies, { intersectionObserver: false, cleanContain: true });
  } catch (error) {
    console.error(error);
  }
}

async function getPreviewCategories() {
  try {
    const { data } = await api.get(API_GENRE_MOVIE_URL);
    console.log(data);
    const categories = data.genres;
    createCategoriesPreview(categories, categories);
  } catch (error) {
    console.error(error);
  }
}

let page = 1;

async function getNextMoviesTrendingSection() {
  try {
    page++;

    const { data: movies } = await api.get(API_TRENDING_MOVIES_URL, {
      params: {
        page,
      },
    });
    console.log(movies);
    createMovies(movies.results, containerTrendingPreviewMovies, { intersectionObserver: true, cleanContain: false });
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
    console.log(movies);

    createMovies(movies.results, articleGenericMovies, { intersectionObserver: true, cleanContain: true });
  } catch (error) {
    console.error(error);
  }
}

async function getMoviesBySearch(id) {
  try {
    const { data: movies } = await api.get(API_MOVIE_SEARCH, {
      params: {
        query: id,
      },
    });
    console.log(movies);

    createMovies(movies.results, articleGenericMovies, { intersectionObserver: true, cleanContain: true });
  } catch (error) {
    console.error(error);
  }
}

async function getMovieDetail(id) {
  try {
    const { data: movie } = await api.get(API_MOVIE_DETAIL(id));

    movieDetailImgContainer.classList.remove('movie-loading-detail');
    movieDetailName.textContent = movie.title;
    movieDetailRating.textContent = movie.vote_average;
    movieDetailDescription.textContent = movie.overview;
    movieDetailImg.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
    movieDetailImg.classList.remove('disabled');

    movieDetailImg.addEventListener('error', () => {
      movieDetailImg.setAttribute('src', 'https://img.freepik.com/vector-gratis/ilustracion-concepto-pagina-no-encontrada_114360-1869.jpg');
    });

    const createSimilarGenres = (genres) => {
      containerCategoriesList.innerHTML = '';
      genres.forEach((genre) => {
        const categoryLink = document.createElement('a');
        const categoryTitle = document.createTextNode(genre.name);

        categoryLink.classList.add('movieLink');
        categoryLink.setAttribute('id', genre.id);
        categoryLink.append(categoryTitle);

        containerCategoriesList.append(categoryLink);

        categoryLink.addEventListener('click', () => {
          location.hash = `#category=${genre.id}-${genre.name}`;
        });
      });
    };
    createSimilarGenres(movie.genres);
  } catch (error) {
    console.error(error);
  }
}

async function getSimilarMoviesDetail(id) {
  const { data: movie } = await api.get(API_MOVIE_DETAIL_SIMILAR(id));

  createMovies(movie.results, containerRelatedMoviesGrid, { intersectionObserver: false, cleanContain: true });
}
