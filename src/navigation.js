window.addEventListener('DOMContentLoaded', navigationPaths, false);
window.addEventListener('hashchange', navigationPaths, false);

function navigationPaths() {
  console.log({ location });

  location.hash.startsWith('#trends') ? 
  trendsPath() : 
  location.hash.startsWith('#search=') ?
  searchPath() :
  location.hash.startsWith('#movie=') ?
  trendsPath() :
  location.hash.startsWith('#category=') ?
  categoryPath() :
  homePath();
};

const homePath = () => {
  console.log("home");

  arrowBack.classList.add('disabled');
  articleGenericMovies.classList.add('disabled');
  articleMovieDetail.classList.add('disabled');
  headerText.classList.remove('disabled');
  headerText2.classList.remove('disabled');
  containerFormSearch.classList.remove('disabled');
  articleTrendingPreview.classList.remove('disabled')
  articleUpPreviewCategories.classList.remove('disabled');
  articleDownPreviewCategories.classList.remove('disabled');
  
  getPreviewTrendingMovies();
  getCategoriesPreview();
} 
 
const trendsPath = () => {
  console.log("trends");
} 

const searchPath = () => {
  console.log("search");
} 

const moviePath = () => {
  console.log("movie");
} 

const categoryPath = () => {
  console.log("categories");
} 
