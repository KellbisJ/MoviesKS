window.addEventListener('DOMContentLoaded', navigationPaths, false);
window.addEventListener('hashchange', navigationPaths, false);

arrowBack.addEventListener('click', () => {
  window.history.back();
  window.scroll({ top: 0 });
});
searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  searchText.value.length >= 2 ? (location.hash = `#search=${searchText.value}`) : console.warn('Busqueda debe llevar minimo 2 carácteres');
});
trendingHomeBtn.addEventListener('click', () => {
  location.hash = '#trends';
});
trendingPageBtn.addEventListener('click', () => {
  getNextMoviesTrendingSection();
});

function navigationPaths() {
  console.log({ location });

  location.hash.startsWith('#trends')
    ? trendsPath()
    : location.hash.startsWith('#search=')
    ? searchPath()
    : location.hash.startsWith('#movie=')
    ? moviePath()
    : location.hash.startsWith('#category=')
    ? categoryPath()
    : homePath();

  window.scroll({ top: 0 });
}

const homePath = () => {
  console.log('home');

  sectionHeader.classList.remove('header-container-category');
  sectionHeader.classList.add('header-container');
  arrowBack.classList.add('disabled');
  trendingHomeBtn.classList.remove('disabled');
  trendingPageBtn.classList.add('disabled');
  movieDetailName.classList.add('disabled');
  articleGenericMovies.classList.add('disabled');
  articleMovieDetail.classList.add('disabled');
  headerCategoryText.classList.add('disabled');
  headerText.classList.remove('disabled');
  headerText2.classList.remove('disabled');
  containerFormSearch.classList.remove('disabled');
  articleTrendingPreview.classList.remove('disabled');
  articleUpPreviewCategories.classList.remove('disabled');
  articleDownPreviewCategories.classList.remove('disabled');
  document.body.style.backgroundImage = '';
  searchText.value = '';

  getPreviewTrendingMoviesHome();
  getPreviewCategories();
};

const trendsPath = () => {
  console.log('trends');

  sectionHeader.classList.add('header-container');
  sectionHeader.classList.remove('header-container-category');
  arrowBack.classList.remove('disabled');
  trendingHomeBtn.classList.add('disabled');
  trendingPageBtn.classList.remove('disabled');
  movieDetailName.classList.add('disabled');
  containerFormSearch.classList.add('disabled');
  headerCategoryText.classList.add('disabled');
  articleMovieDetail.classList.add('disabled');
  headerText.classList.add('disabled');
  headerText2.classList.add('disabled');
  articleGenericMovies.classList.add('disabled');
  articleTrendingPreview.classList.remove('disabled');
  articleUpPreviewCategories.classList.add('disabled');
  articleDownPreviewCategories.classList.remove('disabled');
};

const searchPath = () => {
  console.log('search');

  arrowBack.classList.remove('disabled');
  containerFormSearch.classList.remove('disabled');
  headerCategoryText.classList.remove('disabled');
  articleGenericMovies.classList.remove('disabled');

  movieDetailName.classList.add('disabled');
  headerText.classList.add('disabled');
  headerText2.classList.add('disabled');
  articleTrendingPreview.classList.add('disabled');
  articleMovieDetail.classList.add('disabled');
  articleUpPreviewCategories.classList.add('disabled');
  articleDownPreviewCategories.classList.add('disabled');
  document.body.style.backgroundImage = '';

  const [_, query] = location.hash.split('=');
  searchText.value = query;

  getMoviesBySearch(query);
};

const moviePath = () => {
  console.log('movieDetail');

  sectionHeader.classList.remove('header-container');
  sectionHeader.classList.add('header-container-category');
  arrowBack.classList.remove('disabled');
  movieDetailName.classList.remove('disabled');
  articleMovieDetail.classList.remove('disabled');
  headerCategoryText.classList.add('disabled');
  headerText.classList.add('disabled');
  headerText2.classList.add('disabled');
  containerFormSearch.classList.add('disabled');
  articleTrendingPreview.classList.add('disabled');
  articleUpPreviewCategories.classList.add('disabled');
  articleDownPreviewCategories.classList.add('disabled');
  articleGenericMovies.classList.add('disabled');

  const [_, movieId] = location.hash.split('=');

  getMovieDetail(movieId);
  getSimilarMoviesDetail(movieId);
};

const categoryPath = () => {
  console.log('categories');

  sectionHeader.classList.remove('header-container');
  sectionHeader.classList.add('header-container-category');
  arrowBack.classList.remove('disabled');
  movieDetailName.classList.add('disabled');
  articleGenericMovies.classList.remove('disabled');
  headerCategoryText.classList.remove('disabled');
  articleMovieDetail.classList.add('disabled');
  headerText.classList.add('disabled');
  headerText2.classList.add('disabled');
  containerFormSearch.classList.add('disabled');
  articleTrendingPreview.classList.add('disabled');
  articleUpPreviewCategories.classList.add('disabled');
  articleDownPreviewCategories.classList.add('disabled');
  document.body.style.backgroundImage = '';

  const [_, categoryData] = location.hash.split('=');
  const [categoryId, categoryName] = categoryData.split('-');
  headerCategoryText.textContent = categoryName;

  getMoviesByCategory(categoryId);
};
