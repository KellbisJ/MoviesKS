let page = 1;
let maxPage;
let infiniteScroll;

window.addEventListener('DOMContentLoaded', navigationPaths, false);
window.addEventListener('hashchange', navigationPaths, false);
window.addEventListener('scroll', infiniteScroll, false);

pageName.addEventListener('click', () => {
  location.hash = '';
  window.location.reload();
  // window.history.back();
  window.scroll({ top: 0 });
  movieDetailImg.src = `https://image.tmdb.org/t/p/original/`;
});

search_btn_icon.addEventListener('click', (e) => {
  e.preventDefault();
  containerFormSearch.classList.toggle('disabled');
});

buttonBarResults.addEventListener('click', (e) => {
  e.preventDefault();
  searchText.value.length >= 1 ? (location.hash = `#search=${searchText.value}`) : console.warn('Busqueda debe llevar minimo 2 carácteres');
});

trendingBtnMore.addEventListener('click', () => {
  location.hash = '#trends';
});

function navigationPaths() {
  infiniteScroll
    ? (window.removeEventListener('scroll', infiniteScroll, { passive: false }), (infiniteScroll = undefined))
    : (infiniteScroll = undefined);

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

  infiniteScroll ? window.addEventListener('scroll', infiniteScroll, { passive: false }) : (infiniteScroll = undefined);
}

const homePath = () => {
  trendingPageBtn.classList.add('disabled');
  movieDetailName.classList.add('disabled');
  articleGenericMovies.classList.add('disabled');
  articleMovieDetail.classList.add('disabled');
  nameMovieCategory.classList.add('disabled');
  mensajeResultadosDeBusquedaNoEncontrados.classList.add('disabled');
  headerText.classList.remove('disabled');
  trendingText.classList.remove('disabled');
  pageName.classList.remove('disabled');
  articleTrendingPreview.classList.remove('disabled');
  articlePreviewCategories.classList.remove('disabled');
  trendingBtnMore.classList.remove('disabled');
  nameMovieCategory.classList.add('disabled');
  document.body.style.backgroundImage = '';
  searchText.value = '';

  getPreviewTrendingMovies();
  getPreviewCategories();
};

const trendsPath = () => {
  trendingText.classList.remove('disabled');
  trendingBtnMore.classList.add('disabled');
  trendingPageBtn.classList.remove('disabled');
  movieDetailName.classList.add('disabled');
  containerFormSearch.classList.add('disabled');
  nameMovieCategory.classList.add('disabled');
  articleMovieDetail.classList.add('disabled');
  nameMovieCategory.classList.add('disabled');
  headerText.classList.add('disabled');
  articleGenericMovies.classList.add('disabled');
  articleTrendingPreview.classList.remove('disabled');
  articlePreviewCategories.classList.add('disabled');
  mensajeResultadosDeBusquedaNoEncontrados.classList.add('disabled');
  nameMovieCategory.classList.add('disabled');

  getPreviewTrendingMovies();
  getPreviewCategories();

  infiniteScroll = getNextMoviesTrendingSection;
};

const searchPath = () => {
  containerFormSearch.classList.remove('disabled');
  articleGenericMovies.classList.remove('disabled');

  trendingText.classList.add('disabled');
  nameMovieCategory.classList.add('disabled');
  trendingBtnMore.classList.add('disabled');
  movieDetailName.classList.add('disabled');
  nameMovieCategory.classList.add('disabled');
  headerText.classList.add('disabled');
  articleTrendingPreview.classList.add('disabled');
  articleMovieDetail.classList.add('disabled');
  articlePreviewCategories.classList.add('disabled');
  nameMovieCategory.classList.add('disabled');
  document.body.style.backgroundImage = '';

  const [_, query] = location.hash.split('=');
  searchText.value = decodeURIComponent(query);

  getMoviesBySearch(query);

  infiniteScroll = getNextMoviesBySearch(query);
};

const moviePath = () => {
  movieDetailName.classList.remove('disabled');
  articleMovieDetail.classList.remove('disabled');
  trendingText.classList.add('disabled');
  trendingBtnMore.classList.add('disabled');
  headerText.classList.add('disabled');
  articleTrendingPreview.classList.add('disabled');
  articlePreviewCategories.classList.add('disabled');
  articleGenericMovies.classList.add('disabled');
  mensajeResultadosDeBusquedaNoEncontrados.classList.add('disabled');
  nameMovieCategory.classList.add('disabled');

  const [_, movieId] = location.hash.split('=');

  getMovieDetail(movieId);
  getSimilarMoviesDetail(movieId);
};

const categoryPath = () => {
  pageName.classList.remove('disabled');
  trendingBtnMore.classList.add('disabled');
  movieDetailName.classList.add('disabled');
  trendingText.classList.add('disabled');
  articleGenericMovies.classList.remove('disabled');
  nameMovieCategory.classList.remove('disabled');
  articleMovieDetail.classList.add('disabled');
  headerText.classList.add('disabled');
  containerFormSearch.classList.add('disabled');
  articleTrendingPreview.classList.add('disabled');
  articlePreviewCategories.classList.add('disabled');
  mensajeResultadosDeBusquedaNoEncontrados.classList.add('disabled');
  nameMovieCategory.classList.remove('disabled');
  document.body.style.backgroundImage = '';

  const [_, categoryData] = location.hash.split('=');
  const [categoryId, categoryName] = categoryData.split('-');
  nameCategoryText.textContent = `Has buscado peliculas por el genero "${decodeURIComponent(categoryName)}"`;

  getMoviesByCategory(categoryId);

  infiniteScroll = getNextMoviesByCategory(categoryId);
};
