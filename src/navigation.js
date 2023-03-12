window.addEventListener('DOMContentLoaded', navigationPaths, false);
window.addEventListener('hashchange', navigationPaths, false);

arrowBack.addEventListener('click', () => {
  window.history.back();
});
searchBtn.addEventListener('click', () => {
  searchText.value.length >= 2 ? location.hash = `#search=${searchText.value}` :
  console.warn('Busqueda debe llevar minimo 2 carácteres');
});
trendingBtn.addEventListener('click', () => {
  location.hash = `#trends`;
});

function navigationPaths() {
  console.log({ location });

  location.hash.startsWith('#trends') ? 
  trendsPath() : 
  location.hash.startsWith('#search=') ?
  searchPath() :
  location.hash.startsWith('#movie=') ?
  moviePath() :
  location.hash.startsWith('#category=') ?
  categoryPath() :
  homePath();

  window.scroll({ top: 0})
};

const homePath = () => {
  console.log("home");

  sectionHeader.classList.remove('header-container-category');
  sectionHeader.classList.add('header-container');
  arrowBack.classList.add('disabled');
  articleGenericMovies.classList.add('disabled');
  articleMovieDetail.classList.add('disabled');
  headerCategoryText.classList.add('disabled');
  headerText.classList.remove('disabled');
  headerText2.classList.remove('disabled');
  containerFormSearch.classList.remove('disabled');
  articleTrendingPreview.classList.remove('disabled')
  articleUpPreviewCategories.classList.remove('disabled');
  articleDownPreviewCategories.classList.remove('disabled');

  getPreviewTrendingMovies();
  getPreviewCategories();
};
 
const trendsPath = () => {
  console.log("trends");

  sectionHeader.classList.add('header-container');
  sectionHeader.classList.remove('header-container-category');
  arrowBack.classList.remove('disabled');
  containerFormSearch.classList.add('disabled');
  headerCategoryText.classList.add('disabled');
  articleMovieDetail.classList.add('disabled');
  headerText.classList.add('disabled');
  headerText2.classList.add('disabled');
  articleGenericMovies.classList.add('disabled');
  articleTrendingPreview.classList.remove('disabled')
  articleUpPreviewCategories.classList.add('disabled');
  articleDownPreviewCategories.classList.remove('disabled');

  getPreviewTrendingMovies();
  getPreviewCategories();
} 

const searchPath = () => {
  console.log("search");

  arrowBack.classList.remove('disabled');
  containerFormSearch.classList.remove('disabled');
  headerCategoryText.classList.remove('disabled');
  articleGenericMovies.classList.remove('disabled');
  
  headerText.classList.add('disabled');
  headerText2.classList.add('disabled');
  articleTrendingPreview.classList.add('disabled');
  articleMovieDetail.classList.add('disabled');
  articleUpPreviewCategories.classList.add('disabled');
  articleDownPreviewCategories.classList.add('disabled');

  const [_, query] = location.hash.split('=');
  
  getMoviesBySearch(query);
} 

const moviePath = () => {
  console.log("movieDetail");

  sectionHeader.classList.remove('header-container');
  sectionHeader.classList.add('header-container-category');
  arrowBack.classList.remove('disabled');
  articleMovieDetail.classList.remove('disabled');
  headerCategoryText.classList.add('disabled');
  headerText.classList.add('disabled');
  headerText2.classList.add('disabled');
  containerFormSearch.classList.add('disabled');
  articleTrendingPreview.classList.add('disabled')
  articleUpPreviewCategories.classList.add('disabled');
  articleDownPreviewCategories.classList.add('disabled');
  articleGenericMovies.classList.add('disabled');

  const [_, movieId] = location.hash.split('=');
  
  getMovieDetail(movieId);
  getSimilarMoviesDetail(movieId)
} 

const categoryPath = () => {
  console.log("categories");
  
  sectionHeader.classList.remove('header-container');
  sectionHeader.classList.add('header-container-category');
  arrowBack.classList.remove('disabled');
  articleGenericMovies.classList.remove('disabled');
  headerCategoryText.classList.remove('disabled');
  articleMovieDetail.classList.add('disabled');
  headerText.classList.add('disabled');
  headerText2.classList.add('disabled');
  containerFormSearch.classList.add('disabled');
  articleTrendingPreview.classList.add('disabled')
  articleUpPreviewCategories.classList.add('disabled');
  articleDownPreviewCategories.classList.add('disabled');

  const [_, categoryData] = location.hash.split('=');
  const [categoryId, categoryName] = categoryData.split('-');
  headerCategoryText.textContent = categoryName;

  getMoviesByCategory(categoryId);
}; 
