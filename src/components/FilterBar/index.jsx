import React, { useState, useEffect } from 'react';
import './FilterBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SelectMovies, SelectGenres } from '../../common/Modals';
import { CreatePreviewCategories } from '../CreatePreviewCategories';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMenuContext } from '../../context/MenuContext';

function FilterBar({ isMobile, isMoviesModalOpen, isGenresModalOpen, toggleMoviesModal, toggleGenresModal, categories }) {
	const { mediaType, setMediaType, selectedGenre, setSelectedGenre } = useMenuContext();
	const navigate = useNavigate();
	const location = useLocation();
	const [selectedMediaType, setSelectedMediaType] = useState(mediaType);

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const genre = params.get('genre');
		if (genre) {
			setSelectedGenre(genre);
		} else {
			setSelectedGenre(null);
		}
	}, [location, setSelectedGenre]);

	useEffect(() => {
		setSelectedMediaType(mediaType);
	}, [mediaType]);

	const handleNavigation = (route) => {
		navigate(route);
	};

	const handleMediaTypeChange = (type) => {
		setSelectedGenre(null);
		setSelectedMediaType(type);
		setMediaType(type);
		handleNavigation(type === 'movies' ? '/' : '/tv');
	};
	const handleCategoryChange = (category) => {
		setSelectedGenre(category.id);
		const route = `${selectedMediaType === 'movies' ? '/' : '/tv'}?genre=${category.id}`;
		handleNavigation(route);
	};

	const categoryElements = CreatePreviewCategories(categories, handleCategoryChange, toggleGenresModal);

	return (
		<div className="filterBarContainer">
			<div className="filterBar filterBarType">
				{selectedMediaType === 'movies' ? 'Movies' : 'TV'}
				<button onClick={toggleMoviesModal} className="navBtn">
					<FontAwesomeIcon icon="chevron-down" />
				</button>
				{!isMobile && isMoviesModalOpen && (
					<div className="filterBarBoxContent">
						<div className="filterBarBoxHeader">
							<h1>{selectedMediaType === 'movies' ? 'Movies' : 'TV'}</h1>
						</div>
						<div className="filterBarBoxElements">
							<span
								className={selectedMediaType === 'movies' ? 'selected' : ''}
								onClick={() => {
									handleMediaTypeChange('movies');
								}}>
								Movies
							</span>
							<span
								className={selectedMediaType === 'tv' ? 'selected' : ''}
								onClick={() => {
									handleMediaTypeChange('tv');
								}}>
								TV
							</span>
						</div>
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
									className="mediaElement"
									onClick={() => {
										handleMediaTypeChange('movies');
										toggleMoviesModal();
									}}>
									Movies
								</span>
							</div>
							<div className="mediaElementContainer">
								<span
									className="mediaElement"
									onClick={() => {
										handleMediaTypeChange('tv');
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
