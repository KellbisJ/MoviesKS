import { useState } from 'react';
import { CreateMediaHome } from '@/components/specific/create-media';
import {
	MediaHomeSkeleton,
	MediaHomeErrorSkeleton,
} from '@/components/utilities/loading-skeletons';
import { useNavigate } from 'react-router-dom';
import { HomeViewContentInterfaceProps } from './types';
import { PopcornParticlesLoader } from '@/components/utilities/loaders-animation';

const HomeViewContent: React.FC<HomeViewContentInterfaceProps> = ({
	isLoadingComponents,
	isLoadingMedia,
	isErrorCatched,
	mediaSectionData,
}) => {
	const [query, setQuery] = useState('');

	const navigate = useNavigate();

	const handleSearch = (e: React.FormEvent, query: string) => {
		e.preventDefault();

		if (query.length > 0) {
			const sanitizedQuery = query.replace(/[^a-zA-Z0-9\s]/g, '').trim();
			navigate(`/search/about/${sanitizedQuery}`); // isn't allowed an empty search query
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};

	return (
		<>
			{isLoadingComponents ? (
				<PopcornParticlesLoader />
			) : (
				<div className="min-h-screen flex justify-center items-start">
					<div className="container mx-auto px-4 sm:px-6 py-3">
						<div className="text-center mt-4 mb-4">
							<h1 className="text-3xl md:text-5xl font-playfair font-bold text-gray-800 dark:text-white mb-6">
								MoviesKS
							</h1>
							{/* <p className="text-lg text-gray-300 max-w-2xl mx-auto">
						Explore and discover detailed information about your favorite movies and TV shows. Only explore and pick up information.
					</p> */}
							<p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
								Explora y descubre información detallada sobre tus películas y series favoritas.
								Solo explora y recopila información.
							</p>
						</div>

						{/* Search Bar */}
						<form onSubmit={(e) => handleSearch(e, query)} className="max-w-3xl mx-auto relative">
							<div className="flex items-center bg-gray-700  rounded-full px-6 py-4 border border-white/20 dark:border-gray-700">
								<input
									type="text"
									placeholder="Busca películas, series..."
									className="w-full bg-transparent border-none focus:ring-0 text-gray-300 placeholder-gray-400 outline-none no-underline pr-2"
									onChange={handleInputChange}
								/>
								<button type="submit" className="w-6 h-6 text-gray-400">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="size-6">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
										/>
									</svg>
								</button>
							</div>
						</form>

						{mediaSectionData.map((section, index) => (
							<section
								key={`${section.type}-${index}`}
								className="space-y-2 mt-12"
								role="region"
								lang="es">
								<h3 className="text-gray-700 dark:text-gray-300">{section.title}</h3>
								{isLoadingMedia ? (
									<MediaHomeSkeleton />
								) : isErrorCatched ? (
									<MediaHomeErrorSkeleton />
								) : (
									<CreateMediaHome type={section.type} media={section.media} />
								)}
							</section>
						))}
					</div>
				</div>
			)}
		</>
	);
};

export { HomeViewContent };
