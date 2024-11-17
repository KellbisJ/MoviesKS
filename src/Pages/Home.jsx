import React, { useEffect, useState } from 'react';
import { getPreviewCategories } from '../services/PreviewCategories';
import { CreatePreviewCategories } from '../components/CreatePreviewCategories';
import { getPreviewTrendingMovies } from '../services/PreviewTrendingMovies';
import { createMovies } from '../components/CreateMovies';
import { Link } from 'react-router-dom';

function Home() {
	const [movies, setMovies] = useState([]);
	const [categories, setCategoriess] = useState([]);

	useEffect(() => {
		async function fetchCategories() {
			const previewCategories = await getPreviewCategories();
			console.log(previewCategories);

			setCategoriess(previewCategories);
		}
		async function fetchMovies() {
			const previewMovies = await getPreviewTrendingMovies();
			console.log(previewMovies);

			setMovies(previewMovies);
		}

		fetchCategories();
		fetchMovies();
	}, []);

	const movieElements = createMovies(movies);
	const categoryElements = CreatePreviewCategories(categories);

	return (
		<>
			<div className="filterBar">
				<p>See all</p>
				<p>Categories</p>
				<Link>Favorites</Link>
			</div>
			<section className="trendingPreviewCategories">
				<div className="categoriesContainer">{categoryElements}</div>
			</section>
			<section className="trendingPreviewMovies">{movieElements}</section>
		</>
	);
}

export { Home };

// older index.html body template

{
	/* <body>
    <header class="header-container">
      <!-- <header class="header-container header-container-category"> -->
      <div class="text_header_bar_left">
        <h1 class="page_name">MoviesKS</h1>
      </div>

      <div class="text_header_bar_center">
        <h2 class="header-text">Peliculas, busca, descubre y analiza.</h2>
      </div>

      <button class="button_bar_search_right">
        <i class="fa-solid fa-magnifying-glass searchIcon"></i>
      </button>
      <!-- <i class="fa-solid fa-bars bar_menu">
        <span class="bar_menu_trends"></span>
        <span class="bar_menu_category"></span>
      </i> -->

      <form class="searchForm-container disabled">
        <input class="searchText" type="text" placeholder="Buscar Peliculas" />
        <button class="searchBtn_results">BUSCAR</button>
      </form>
    </header>

    <div class="name_category_container disabled">
      <h2 class="name_category">Acción</h2>
    </div>

    <h2 class="trending_text">...</h2>

    <article class="trendingPreview-container">
      <section class="trendingPreview-movies">
        <div class="movie_container movie_loading">
          <div class="movie-container_detail">
            <span class="movie_name_title"></span>
            <span class="rating_card"></span>
          </div>
        </div>
        <div class="movie_container movie_loading"></div>
        <div class="movie_container movie_loading"></div>
        <div class="movie_container movie_loading"></div>
        <div class="movie_container movie_loading"></div>
        <div class="movie_container movie_loading"></div>
        <div class="movie_container movie_loading"></div>
        <div class="movie_container movie_loading"></div>
        <div class="movie_container movie_loading"></div>
        <div class="movie_container movie_loading"></div>
        <div class="movie_container movie_loading"></div>
        <div class="movie_container movie_loading"></div>
        <div class="movie_container movie_loading"></div>
        <div class="movie_container movie_loading"></div>
        <div class="movie_container movie_loading"></div>
        <div class="movie_container movie_loading"></div>
        <div class="movie_container movie_loading"></div>
        <div class="movie_container movie_loading"></div>
        <div class="movie_container movie_loading"></div>
        <div class="movie_container movie_loading"></div>
        <!-- <div class="movie-void movie_loading"></div> -->
      </section>
      <button class="trendingPage-btn">...</button>
    </article>

    <button class="trending_text_btn">...</button>

    <article class="previewCategories_container">
      <div class="previewCategories_text_icon">
        <h2 class="previewCategories_text"></h2>
        <i class="fa-solid fa-list previewCategories_icon"></i>
      </div>
      <section class="previewCategories_links">
        <div class="previewCategories-loading"></div>
        <div class="previewCategories-loading"></div>
        <div class="previewCategories-loading"></div>
        <div class="previewCategories-loading"></div>
      </section>
    </article>

    <h2 class="noResults_message disabled">Oops No hay Resultados</h2>
    <article class="genericMovies disabled">
      <div class="movie_container movie_loading"></div>
      <div class="movie_container movie_loading"></div>
      <div class="movie_container movie_loading"></div>
      <div class="movie_container movie_loading"></div>
      <div class="movie_container movie_loading"></div>
      <div class="movie_container movie_loading"></div>
      <div class="movie_container movie_loading"></div>
      <div class="movie_container movie_loading"></div>
      <div class="movie_container movie_loading"></div>
      <div class="movie_container movie_loading"></div>
      <div class="movie_container movie_loading"></div>
      <div class="movie_container movie_loading"></div>
      <div class="movie_container movie_loading"></div>
      <div class="movie_container movie_loading"></div>
      <div class="movie_container movie_loading"></div>
      <div class="movie_container movie_loading"></div>
      <div class="movie_container movie_loading"></div>
      <div class="movie_container movie_loading"></div>
      <div class="movie_container movie_loading"></div>
      <div class="movie_container movie_loading"></div>
    </article>

    <article class="movieDetail_container_general disabled">
      <div class="movieDetail_container_info">
        <div class="movieDetail_movie">
          <h2 class="movieDetail-name disabled"></h2>
          <img class="movieImgDetail movie_loading" src="" alt="movie name" />
          <span class="movieDetail-rating-container">
            ...
            <i class="fa-solid fa-star rating_icon"></i>
          </span>
        </div>

        <div class="movieDetail-info">
          <h2 class="movie_release_info"></h2>

          <div class="categoriesList-container">
            <div class="movieLink2 previewCategories-loading"></div>
            <div class="movieLink2 previewCategories-loading"></div>
            <div class="movieLink2 previewCategories-loading"></div>
          </div>

          <span class="movieDetail-description"></span>
        </div>
      </div>

      <section class="relatedMovies-container">
        <h2 class="relatedMovies-text">Peliculas Similares</h2>
        <h2 class="NoSimilarMoviesText disabled">No se encontraron peliculas similares</h2>

        <div class="relatedMovies-gridContainer">
          <div class="movie_container movie_loading"></div>
          <div class="movie_container movie_loading"></div>
          <div class="movie_container movie_loading"></div>
          <div class="movie_container movie_loading"></div>
          <div class="movie_container movie_loading"></div>
          <div class="movie_container movie_loading"></div>
          <div class="movie_container movie_loading"></div>
          <div class="movie_container movie_loading"></div>
          <div class="movie_container movie_loading"></div>
          <div class="movie_container movie_loading"></div>
          <div class="movie_container movie_loading"></div>
          <div class="movie_container movie_loading"></div>
          <div class="movie_container movie_loading"></div>
          <div class="movie_container movie_loading"></div>
          <div class="movie_container movie_loading"></div>
          <div class="movie_container movie_loading"></div>
          <div class="movie_container movie_loading"></div>
          <div class="movie_container movie_loading"></div>
          <div class="movie_container movie_loading"></div>
        </div>
      </section>
    </article>

    <footer class="footer-container"></footer>

    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="./src/auth.js"></script>
    <script src="./src/nodeElements.js"></script>
    <script src="./src/navigation.js"></script>
    <script src="./src/index.js"></script>
  </body> */
}
