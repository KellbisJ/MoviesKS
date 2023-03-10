const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    'api_key': API_KEY,
  },
});

function createMovies(movies, container) {
  movies.forEach(movie => {   
    const movieContainer = document.createElement('div');
    const movieImg = document.createElement('img');

    movieContainer.classList.add('movie-container');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300/${movie.poster_path}`);

    movieContainer.append(movieImg);
    container.append(movieContainer)

    movieImg.addEventListener('click', () => {location.hash = `#movie=${movie.id}`;}, true);
  });
};
function createCategoriesPreview(categoriesUp, categoriesDown) {
  categoriesUp.forEach(category => {
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
  categoriesDown.forEach(category => {
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
};

async function getPreviewTrendingMovies() {
  try {
    const { data } = await api.get(API_TRENDING_MOVIES_URL);
    console.log(data);
    const movies = data.results
    createMovies(movies, containerTrendingPreviewMovies);

  } catch (error) {
    console.error(error);
  };
};

async function getPreviewCategories() {
  try {
    const { data } = await api.get(API_GENRE_MOVIE_URL);
    console.log(data);
    const categories = data.genres
    createCategoriesPreview(categories, categories);

  } catch (error) {
    console.error(error);
  };
};

async function getMoviesByCategory(id) {
  try {
    const { data } = await api.get(API_MOVIE_CATEGORY, {
      params: {
        with_genres: id,
      },
    });
    console.log(data);
    const movies = data.results;
    createMovies(movies, articleGenericMovies);

  } catch (error) {
    console.error(error);
  };
};

async function getMoviesBySearch(id) {
  try {
    const { data } = await api.get(API_MOVIE_SEARCH, {
      params: {
        query: id,
      },
    });
    console.log(data);
    const movies = data.results;
    createMovies(movies, articleGenericMovies);

  } catch (error) {
    console.error(error);
  };
};

async function getMovieDetail(id) {
  try {
    const { data: movie } = await api.get(API_MOVIE_DETAIL(id));

    movieDetailText.textContent = movie.title;
    movieDetailRating.textContent = movie.vote_average;
    movieDetailDescription.textContent = movie.overview;
    movieDetailImg.src = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`;
  
    const createSimilarGenres = (genres) => {
      genres.forEach(genre => {
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

  createMovies(movie.results, containerRelatedMoviesGrid);
}
