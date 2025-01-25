import React, { useState, useEffect } from 'react';
import './FilterBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SelectMovies, SelectGenres } from '../../common/Modals';
import { CreatePreviewCategories } from '../CreatePreviewCategories';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMenuContext } from '../../context/MenuContext';
import { CategoriesSkeleton } from '../LoadingSkeletons';

function FilterBar({ isMobile, isMoviesModalOpen, isGenresModalOpen, toggleMoviesModal, toggleGenresModal, categories, componentsLoading }) {
	const { mediaType, setMediaType, selectedGenre, setSelectedGenre } = useMenuContext();
	const navigate = useNavigate();
	const location = useLocation();
	const [selectedMediaType, setSelectedMediaType] = useState(localStorage.getItem('selectedMediaType') || null);

	const handleNavigation = (route) => {
		navigate(route);
	};

	const handleMediaTypeChange = (type) => {
		setSelectedGenre(null);
		setSelectedMediaType(type);
		setMediaType(type);
		localStorage.setItem('selectedMediaType', type);
		handleNavigation(type === 'movies' ? '/movies' : '/tv');
	};

	const handleCategoryChange = (category) => {
		if (selectedMediaType) {
			setSelectedGenre({ id: category.id, genreName: category.name });
			const route = `${selectedMediaType === 'movies' ? '/movies' : '/tv'}/preview/genre/${category.id}`;
			handleNavigation(route);
		}
	};

	useEffect(() => {
		const pathsToExclude = ['/movies', '/tv'];
		const pathsToInclude = ['/movies/preview/genre/', '/tv/preview/genre/'];
		const isExcludedPath = pathsToExclude.some((path) => location.pathname.startsWith(path));
		const isIncludedPath = pathsToInclude.some((path) => location.pathname.startsWith(path));

		if (!isExcludedPath && !isIncludedPath) {
			setSelectedMediaType(null);
			setSelectedGenre(null);
			localStorage.removeItem('selectedMediaType');
		} else if (isIncludedPath) {
			const mediaType = location.pathname.includes('/movies') ? 'movies' : 'tv';
			setSelectedMediaType(mediaType);
			setMediaType(mediaType);
		}
	}, [location]);

	const categoryElements = CreatePreviewCategories(categories, handleCategoryChange, toggleGenresModal);

	return (
		<div className="filterBarContainer">
			<div className="filterBar filterBarType">
				{selectedMediaType ? selectedMediaType.charAt(0).toUpperCase() + selectedMediaType.slice(1) : 'Select Media Type'}
				<button onClick={toggleMoviesModal} className="navBtn">
					<FontAwesomeIcon icon="chevron-down" />
				</button>
				{!isMobile && isMoviesModalOpen && (
					<div className="filterBarBoxContent">
						<div className="filterBarBoxHeader">
							<h2 className="text-sm">Type</h2>
						</div>
						<div className="filterBarBoxElements filterBarBoxMediaElements">
							<div className="mediaElementContainer">
								<span
									className={selectedMediaType === 'movies' ? 'selected' : 'mediaElement'}
									onClick={() => {
										handleMediaTypeChange('movies');
										toggleMoviesModal();
									}}>
									Movies
								</span>
							</div>
							<div className="mediaElementContainer">
								<span
									className={selectedMediaType === 'tv' ? 'selected' : 'mediaElement'}
									onClick={() => {
										handleMediaTypeChange('tv');
										toggleMoviesModal();
									}}>
									TV
								</span>
							</div>
						</div>
					</div>
				)}
			</div>
			{selectedMediaType && (
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
							<div className="filterBarBoxElements">{componentsLoading ? <CategoriesSkeleton /> : categoryElements}</div>
						</div>
					)}
				</div>
			)}
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
