import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/menu.css';
import '../services/icons.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SelectMovies, SelectGenres } from '../common/Modals';
import { getPreviewCategories } from '../services/PreviewCategories';
import { CreatePreviewCategories } from '../components/CreatePreviewCategories';

function Menu() {
	const [isMoviesModalOpen, setIsMoviesModalOpen] = useState(false);
	const [isGenresModalOpen, setIsGenresModalOpen] = useState(false);

	const [categories, setCategories] = useState([]);

	useEffect(() => {
		async function fetchCategories() {
			const previewCategories = await getPreviewCategories();
			setCategories(previewCategories);
		}
		fetchCategories();
	}, []);

	const categoryElements = CreatePreviewCategories(categories);

	return (
		<>
			<nav className="navBar">
				<ul className="navList">
					<li className="navItem">
						<Link className="navLink" to="/">
							MoviesKS
						</Link>
					</li>
					<li className="navItem">
						<button className="navItemSearchButton">
							<FontAwesomeIcon icon="search" />
						</button>
					</li>
				</ul>
			</nav>

			{/* Wide NavBar */}
			<nav className="navBarWide">
				<ul className="navListWide">
					<li className="navItemWide">
						<Link className="navLink" to="/">
							MoviesKS
						</Link>
					</li>
					<li className="navItemWide">Home</li>
					<li className="navItemWide">Movies</li>
					<li className="navItemWide">Series</li>
					<li className="navItemWide">Genres</li>
				</ul>
				<ul className="navListWideSearch">
					<li className="navItemWideSearch">
						<input className="navItemSearchInput" placeholder="Search..."></input>
						<button className="navItemSearchButtonWide">
							<FontAwesomeIcon icon="search" />
						</button>
					</li>
				</ul>
			</nav>

			<div className="filterBarContainer">
				<div className="filterBar filterBarType">
					All Movies
					<button onClick={() => setIsMoviesModalOpen(true)} className="navBtn">
						<FontAwesomeIcon icon="chevron-down" />
					</button>
				</div>
				<div className="filterBar filterBarGenre">
					All Genres
					<button onClick={() => setIsGenresModalOpen(true)} className="navBtn">
						<FontAwesomeIcon icon="chevron-down" />
					</button>
				</div>
			</div>

			<SelectMovies isOpen={isMoviesModalOpen} onClose={() => setIsMoviesModalOpen(false)}>
				<h1>Movies</h1>
			</SelectMovies>
			<SelectGenres isOpen={isGenresModalOpen} onClose={() => setIsGenresModalOpen(false)}>
				<h2>Genres</h2>
				{categoryElements}
			</SelectGenres>

			<div className="AllMoviesText">
				<h2>Movies</h2>
				<p>1000+ movies to discover and enjoy. Only pick up information and discover, no downloads or streaming links.</p>
			</div>
		</>
	);
}
export { Menu };
