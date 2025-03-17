import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMediaBySearch } from '@/services/media-by-search';
import { MediaBySearchInterface } from '@/types/media-by-search-interface';
import { CircleLoaderStart } from '@/components/circle-loader';
import { Film, Tv } from 'lucide-react';
import { CreateMedia } from '@/components/create-media';
import { NoResults } from '@/components/no-results';

const SearchAboutPage = () => {
	const { query } = useParams();

	const [loadingComponents, setLoadingComponents] = useState(true);

	const [movies, setMovies] = useState<MediaBySearchInterface>({ page: 1, results: [], total_pages: 0, total_results: 0 });
	const [tv, setTv] = useState<MediaBySearchInterface>({ page: 1, results: [], total_pages: 0, total_results: 0 });

	useEffect(() => {
		const fetchAllSearches = async () => {
			if (!query) return;
			try {
				const [moviesData, tvData] = await Promise.all([getMediaBySearch('movies', query), getMediaBySearch('tv', query)]);
				setMovies(moviesData);
				setTv(tvData);
			} finally {
				setLoadingComponents(false);
			}
		};
		fetchAllSearches();
	}, [query]);

	const limitResultsMediaToShow = 6;
	const limitedMovies = movies.results.slice(0, limitResultsMediaToShow);
	const limitedTv = tv.results.slice(0, limitResultsMediaToShow);

	return (
		<>
			{loadingComponents ? (
				<>
					<CircleLoaderStart />
				</>
			) : (
				<div className="flex flex-col justify-center items-center">
					<h1 className="text-gray-600 dark:text-gray-300 mb-4">Results for "{query}"</h1>
					<div className="flex flex-col sm:flex-row gap-4 sm:gap-8 w-auto">
						{[
							{ to: `/search/discover/movies?query=${query}`, label: `Peliculas  (${movies.results.length})`, icon: Film },
							{ to: `/search/discover/tv?query=${query}`, label: `Series de Tv  (${tv.results.length})`, icon: Tv },
						].map((item, index) => (
							<Link
								key={`${item.to}-${index}`}
								to={item.to}
								className="flex flex-col items-start p-4 bg-blue-100 dark:bg-[#14273c] text-gray-600 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors rounded-lg min-w-40 w-40">
								<div className="flex items-start gap-2">
									<item.icon size={14} />
									<span className="leading-none">{item.label}</span>
								</div>
							</Link>
						))}
					</div>

					{movies.results.length > 0 && (
						<div className="mt-8">
							<h3 className="text-gray-600 dark:text-gray-300 mb-4">About Movies</h3>
							<CreateMedia type="movies" media={limitedMovies} />
						</div>
					)}

					{tv.results.length > 0 && (
						<div className="mt-8">
							<h3 className="text-gray-600 dark:text-gray-300 mb-4">About Tv</h3>
							<CreateMedia type="tv" media={limitedTv} />
						</div>
					)}

					{movies.results.length === 0 && tv.results.length === 0 && (
						<div className="mt-4 sm:mt-20">
							<NoResults />
							<p className="text-lg text-center text-gray-500">
								Vuelve al{' '}
								<a href="/home" className="text-cyan-500 hover:underline">
									homepage
								</a>
								.
							</p>
						</div>
					)}
				</div>
			)}
		</>
	);
};

export { SearchAboutPage };
