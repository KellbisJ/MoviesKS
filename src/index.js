const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    'api_key': API_KEY,
  },
});

function createMovies(movies) {
  movies.forEach(movie => {

    const trendingMovieContainer = articleTrendingPreview;
    const trendingPreviewMovies = containerTrendingPreviewMovies;

    
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

function CreateCategoriesPreview(categoriesUp, categoriesDown) {
  categoriesUp.forEach(category => {
    const previewCategoriesContainer = articleUpPreviewCategories;
    const previewLinksCategories = containerLinks;

    const categoryLink = document.createElement('a');
    const categoryTitle = document.createTextNode(category.name);
    // const categoryIcon = document.createElement('i');
    // const filmIconClass = ['fa-sharp','fa-solid','film-icon']
    
    categoryLink.classList.add('movieLink');
    categoryLink.setAttribute('id', category.id);
    categoryLink.append(categoryTitle);
    // categoryIcon.classList.add(filmIconClass);

    previewLinksCategories.append(categoryLink);
    previewCategoriesContainer.append(previewLinksCategories);

  });
  categoriesDown.forEach(category => {
    const previewCategoriesContainer = articleDownPreviewCategories;
    const previewLinksCategories = containerLinks2;

    const categoryLink = document.createElement('a');
    const categoryTitle = document.createTextNode(category.name);
    // const categoryIcon = document.createElement('i');
    // const filmIconClass = ['fa-sharp','fa-solid','film-icon']
    
    categoryLink.classList.add('movieLink');
    categoryLink.setAttribute('id', category.id);
    categoryLink.append(categoryTitle);
    // categoryIcon.classList.add(filmIconClass);

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
    CreateCategoriesPreview(categories, categories);

  } catch (error) {
    console.error(error);
  }
}
