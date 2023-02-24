const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

function createMovies(movies) {
  movies.forEach(movie => {

    const trendingMovieContainer = document.querySelector('.trendingPreview-container');
    const trendingPreviewMovies = document.querySelector('.trendingPreview-movies')

    
    const movieContainer = document.createElement('div');
    const movieImg = document.createElement('img');

    movieContainer.classList.add('movie-container');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300/${movie.poster_path}`);

    movieContainer.append(movieImg);
    trendingPreviewMovies.append(movieContainer)
    trendingMovieContainer.append(trendingPreviewMovies);
  });
};

function CreateCategoriesPreview(categories) {
  categories.forEach(category => {
    const previewCategoriesContainer = document.querySelector('.previewCategories-container');
    const previewLinksCategories = document.querySelector('.previewCategories-links')

    const categoryLink = document.createElement('a');
    const categoryTitle = document.createTextNode(category.name);
    
    categoryLink.classList.add('movieLink');
    categoryLink.setAttribute('id', category.id);
    categoryLink.append(categoryTitle);


    previewLinksCategories.append(categoryLink);
    previewCategoriesContainer.append(previewLinksCategories);

  });
};

async function getPreviewTrendingMovies() {
  try {
    const { data } = await api.get(API_TRENDING_MOVIES_URL);
    console.log(data);
    const movies = data.results
    createMovies(movies);

  } catch (error) {
    console.error(error);
  }
}

async function getCategoriesPreview() {
  try {
    const { data } = await api.get(API_GENRE_MOVIE_URL);
    console.log(data);
    const categories = data.genres
    CreateCategoriesPreview(categories);

  } catch (error) {
    console.error(error);
  }
}

getPreviewTrendingMovies();
getCategoriesPreview();