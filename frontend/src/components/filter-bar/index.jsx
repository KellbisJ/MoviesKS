import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SelectMovies, SelectGenres } from '../modals/select-movies-and-genres';
import { CreatePreviewCategories } from '../create-preview-categories';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMenuContext } from '../../context/MenuContext';
import { CategoriesSkeleton } from '../loading-skeletons';

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
		<div className="flex flex-col items-center md:items-start p-6 lg:p-8 mt-15 bg-fuchsia-700 w-full gap-4 text-stone-100">
			<div className="flex justify-between items-center w-full sm:w-lg p-2.5 px-5 bg-fuchsia-900 rounded relative">
				{selectedMediaType ? selectedMediaType.charAt(0).toUpperCase() + selectedMediaType.slice(1) : 'Select Media Type'}
				<button onClick={toggleMoviesModal} className="">
					<FontAwesomeIcon icon="chevron-down" />
				</button>
				{!isMobile && isMoviesModalOpen && (
					<div className="absolute top-0 left-full w-md p-2.5 bg-fuchsia-900 z-50 shadow-md rounded-lg hidden md:block">
						<div className="mb-3 ml-3">
							<h2 className="text-base lg:text-xl">Type</h2>
						</div>
						<div className="grid grid-cols-1 gap-2.5">
							<div className="flex w-auto">
								<span
									className={`text-white text-sm mb-1.25 font-medium cursor-pointer ${
										selectedMediaType === 'movies'
											? 'bg-fuchsia-700 p-2.5 pl-2.5 rounded-lg shadow-md transition-all duration-300 ease-in-out border-l-5 border-white w-52 box-border'
											: 'inline-flex text-white text-sm mb-3 font-medium border-l-5 border-transparent pl-2.5 box-border items-center'
									}`}
									onClick={() => {
										handleMediaTypeChange('movies');
										toggleMoviesModal();
									}}>
									Movies
								</span>
							</div>
							<div className="flex w-auto">
								<span
									className={`text-white text-sm mb-1.25 font-medium cursor-pointer ${
										selectedMediaType === 'tv'
											? 'bg-fuchsia-700 p-2.5 pl-2.5 rounded-lg shadow-md transition-all duration-300 ease-in-out border-l-5 border-white w-52 box-border'
											: 'inline-flex text-white text-sm mb-3 font-medium border-l-5 border-transparent pl-2.5 box-border items-center'
									}`}
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
				<div className="flex justify-between items-center w-full sm:w-lg p-2.5 px-5 bg-fuchsia-900 rounded relative">
					Genres
					<button onClick={toggleGenresModal}>
						<FontAwesomeIcon icon="chevron-down" />
					</button>
					{!isMobile && isGenresModalOpen && (
						<div className="absolute top-0 left-full w-md p-2.5 bg-fuchsia-900 z-50 shadow-md rounded-lg">
							<div className="mb-3 ml-3">
								<h2 className="text-base lg:text-xl">Genres</h2>
							</div>
							<div className="grid grid-cols-2 gap-2.5">{componentsLoading ? <CategoriesSkeleton /> : categoryElements}</div>
						</div>
					)}
				</div>
			)}
			{isMobile && (
				<>
					<SelectMovies isOpen={isMoviesModalOpen} onClose={toggleMoviesModal}>
						<div className="flex flex-col pl-4">
							<h2>Trending Media</h2>
							<div className="flex w-auto">
								<span
									className="inline-flex text-white text-sm mb-3 font-medium border-l-5 border-transparent pl-2.5 box-border items-center"
									onClick={() => {
										handleMediaTypeChange('movies');
										toggleMoviesModal();
									}}>
									Movies
								</span>
							</div>
							<div className="flex w-auto">
								<span
									className="inline-flex text-white text-sm mb-3 font-medium border-l-5 border-transparent pl-2.5 box-border items-center"
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
