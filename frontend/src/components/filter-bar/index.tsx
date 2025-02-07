import React, { useState, useEffect } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import { SelectMediaParameters } from '../modals/select-media-parameters';
import { CreatePreviewCategories } from '../create-preview-categories';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMenuContext } from '../../context/menu-context';
import { CategoriesSkeleton } from '../loading-skeletons';

import { FilterBarPropsInterface } from '../../types/filterbar-interface';
// import { GenreInterface } from '../../types/genre';

const FilterBar: React.FC<FilterBarPropsInterface> = ({ isMobile, isMoviesModalOpen, isGenresModalOpen, toggleMoviesModal, toggleGenresModal, categories, componentsLoading }) => {
	const { mediaType, setMediaType, selectedGenre, setSelectedGenre } = useMenuContext();
	const navigate = useNavigate();
  const location = useLocation();
  
	const [selectedMediaType, setSelectedMediaType] = useState<string | null>(localStorage.getItem('selectedMediaType') || null);

	const handleNavigation = (route: string) => {
		navigate(route);
	};

	const handleMediaTypeChange = (type: string) => {
		setSelectedMediaType(type);
    setMediaType(type);
    setSelectedGenre('')
		localStorage.setItem('selectedMediaType', type);
		handleNavigation(type === 'movies' ? '/movies' : '/tv');
	};

	const handleCategoryChange = (genreId: string) => {
    if (selectedMediaType) {
    const category = categories.find(genre => genre.id.toString() === genreId)
      if (category) {
      setSelectedGenre(category.id.toString());
      const route = `${selectedMediaType === 'movies' ? '/movies' : '/tv'}/preview/genre/${category.id}`;
      handleNavigation(route);
      }
      toggleGenresModal()
  }
};

	useEffect(() => {
		const pathsToExclude = ['/movies', '/tv'];
		const pathsToInclude = ['/movies/preview/genre/', '/tv/preview/genre/'];
		const isExcludedPath = pathsToExclude.some((path) => location.pathname.startsWith(path));
		const isIncludedPath = pathsToInclude.some((path) => location.pathname.startsWith(path));

		if (!isExcludedPath && !isIncludedPath) {
			setSelectedMediaType(null);
			setSelectedGenre('');
			localStorage.removeItem('selectedMediaType');
		} else if (isIncludedPath) {
			const mediaType = location.pathname.includes('/movies') ? 'movies' : 'tv';
			setSelectedMediaType(mediaType);
			setMediaType(mediaType);
		}
	}, [location]);

  const categoryElements = CreatePreviewCategories({
  categories: categories,
  onCategoryClick: handleCategoryChange,

});

	return (
		<div className="flex flex-col items-center md:items-start p-6 lg:p-8 mt-[60px] lg:mt-16 bg-fuchsia-700 dark:bg-slate-950 w-full gap-4 text-stone-100 transition">
			<div className="flex justify-between items-center w-full md:w-2/5 sm:w-lg p-2.5 px-5 bg-fuchsia-900 dark:bg-gray-700 rounded relative transition">
				{selectedMediaType ? selectedMediaType.charAt(0).toUpperCase() + selectedMediaType.slice(1) : 'Select Media Type'}
				<button onClick={toggleMoviesModal} className="">
					<FaAngleRight />
				</button>
				{!isMobile && isMoviesModalOpen && (
					<div className="absolute top-0 left-full w-80 p-2.5 bg-fuchsia-900 dark:bg-gray-700 z-50 ml-2 shadow-md rounded-lg hidden md:block transition">
						<div className="mb-3 ml-3">
							<h2 className="text-base lg:text-xl">Type</h2>
						</div>
						<div className="grid grid-cols-1 gap-2.5">
							<div className="flex w-auto">
								<span
									className={`text-white text-sm mb-1.25 font-medium cursor-pointer ${
										selectedMediaType === 'movies'
											? 'bg-fuchsia-700 dark:bg-indigo-700 p-2.5 pl-2.5 rounded-lg shadow-md transition-all duration-300 ease-in-out border-l-5 border-white w-52 box-border'
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
											? 'bg-fuchsia-700 dark:bg-indigo-700 p-2.5 pl-2.5 rounded-lg shadow-md transition-all duration-300 ease-in-out border-l-5 border-white w-52 box-border'
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
				<div className="flex justify-between items-center w-full md:w-2/5 p-2.5 px-5 bg-fuchsia-900 dark:bg-gray-700 rounded relative transition">
					Genres
					<button onClick={toggleGenresModal}>
						<FaAngleRight />
					</button>
					{!isMobile && isGenresModalOpen && (
						<div className="absolute top-0 left-full ml-2 w-80 p-2.5 bg-fuchsia-900 dark:bg-gray-700 z-20 shadow-md rounded-lg transition text-sm">
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
					<SelectMediaParameters isOpen={isMoviesModalOpen} onClose={toggleMoviesModal}>
						<div className="flex flex-col text-gray-100">
							<h2 className="mb-2">Trending Media</h2>

							<span
								className="mb-3 p-1 bg-fuchsia-700 dark:bg-indigo-700 rounded"
								onClick={() => {
									handleMediaTypeChange('movies');
									toggleMoviesModal();
								}}>
								Movies
							</span>

							<span
								className="mb-3 p-1 bg-fuchsia-700 dark:bg-indigo-700 rounded"
								onClick={() => {
									handleMediaTypeChange('tv');
									toggleMoviesModal();
								}}>
								TV
							</span>
						</div>
					</SelectMediaParameters>
					<SelectMediaParameters isOpen={isGenresModalOpen} onClose={toggleGenresModal}>
						<div className="flex flex-col text-gray-100">
							<h2 className="mb-2">Genres</h2>
							<div className="flex flex-col gap-2">{categoryElements}</div>
						</div>
					</SelectMediaParameters>
				</>
			)}
		</div>
	);
}

export { FilterBar };
