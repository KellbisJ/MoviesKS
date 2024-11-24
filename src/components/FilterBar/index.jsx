import React, { useState, useEffect } from 'react';
import './FilterBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SelectMovies, SelectGenres } from '../../common/Modals';
import { CreatePreviewCategories } from '../CreatePreviewCategories';
import { useNavigate } from 'react-router-dom';

function FilterBar({ isMobile, isMoviesModalOpen, isGenresModalOpen, toggleMoviesModal, toggleGenresModal, categories }) {
	const navigate = useNavigate();
	const handleNavigation = (route) => {
		navigate(route);
	};

	const categoryElements = CreatePreviewCategories(categories);

	if (isMoviesModalOpen) {
		!isGenresModalOpen;
	} else {
		!isMoviesModalOpen;
	}

	return (
		<div className="filterBarContainer">
			<div className="filterBar filterBarType">
				Trending Media
				<button onClick={toggleMoviesModal} className="navBtn">
					<FontAwesomeIcon icon="chevron-down" />
				</button>
				{!isMobile && isMoviesModalOpen && (
					<div className="filterBarBoxContent">
						<div className="filterBarBoxHeader">
							<h1>Trending Media</h1>
						</div>
						<div className="filterBarBoxElements">movies</div>
					</div>
				)}
			</div>
			<div className="filterBar filterBarGenre">
				Genres
				<button onClick={toggleGenresModal} className="navBtn">
					<FontAwesomeIcon icon="chevron-down" />
				</button>
				{!isMobile && isGenresModalOpen && (
					<div className="filterBarBoxContent">
						<div className="filterBarBoxHeader">
							<h2>Genres</h2>
						</div>
						<div className="filterBarBoxElements">{categoryElements}</div>
					</div>
				)}
			</div>

			{isMobile && (
				<>
					<SelectMovies isOpen={isMoviesModalOpen} onClose={toggleMoviesModal}>
						<div className="filterBarBoxElementsMedia">
							<h2>Trending Media</h2>

							<div className="mediaElementContainer">
								<span
									className="mediaElement selected"
									onClick={() => {
										handleNavigation('/');
										toggleMoviesModal();
									}}>
									Movies
								</span>
							</div>
							<div className="mediaElementContainer">
								<span
									className="mediaElement"
									onClick={() => {
										handleNavigation('/tv');
										toggleMoviesModal();
									}}>
									TV
								</span>
							</div>
						</div>
					</SelectMovies>
					<SelectGenres isOpen={isGenresModalOpen} onClose={toggleGenresModal}>
						<h2>Genres</h2>
						{categoryElements}
					</SelectGenres>
				</>
			)}
		</div>
	);
}

export { FilterBar };
