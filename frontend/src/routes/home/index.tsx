import { useEffect, useState } from 'react';
import { MovieInterface, TVInterface } from '@/types/movie-and-tv-interface';
import { getMediaLists } from '@/services/media-lists';
import { MoviesListInterface, TvSeriesListInterface, ListTypeMovies, ListTypeTvSeries } from '@/services/media-lists/types';
import { CreateMediaHome } from '@/components/create-media';
import { MediaHomeSkeleton, MediaHomeErrorSkeleton } from '@/components/loading-skeletons';
import { useNavigate } from 'react-router-dom';

const Home = (): React.JSX.Element => {
	const [loadingComponents, setLoadingComponents] = useState<boolean>(true);
	const [errorCatched, setErrorCatched] = useState<boolean>(false);

	const [movieMediaPopularList, setMovieMediaPopularList] = useState<MoviesListInterface[]>([]);
	const [movieMediaTopRatedList, setMovieMediaTopRatedList] = useState<MoviesListInterface[]>([]);

	const [tvSeriesMediaPopularList, setTvSeriesMediaPopularList] = useState<TvSeriesListInterface[]>([]);
	const [tvSeriesMediaTopRatedList, setTvSeriesMediaTopRatedList] = useState<TvSeriesListInterface[]>([]);

	useEffect(() => {
		const fetchPopularMediaList: () => Promise<void> = async () => {
			try {
				setErrorCatched(false);

				const [popularMoviesList, topRatedMoviesList, topRatedTvSeriesList, popularTvSeriesList] = await Promise.all([
					getMediaLists(1, 'movie', ListTypeMovies.popular),
					getMediaLists(1, 'movie', ListTypeMovies.topRated),
					getMediaLists(1, 'tv', ListTypeTvSeries.topRated),
					getMediaLists(1, 'tv', ListTypeTvSeries.popular),
				]);

				const popularMoviesData = popularMoviesList.results;
				const topRatedMoviesData = topRatedMoviesList.results;
				const popularTvSeriesData = popularTvSeriesList.results;
				const topRatedTvSeriesData = topRatedTvSeriesList.results;

				setMovieMediaPopularList(popularMoviesData);
				setMovieMediaTopRatedList(topRatedMoviesData);
				setTvSeriesMediaPopularList(popularTvSeriesData);
				setTvSeriesMediaTopRatedList(topRatedTvSeriesData);
			} catch (err) {
				setLoadingComponents(false);
				setErrorCatched(true);
				console.error(err);
			} finally {
				setLoadingComponents(false);
			}
		};

		fetchPopularMediaList();
	}, []);

	const POPULAR_MOVIES_RENDER = movieMediaPopularList as MovieInterface[];
	const TOP_RATED_MOVIES_RENDER = movieMediaTopRatedList as MovieInterface[];

	const POPULAR_TV_SERIES_RENDER = tvSeriesMediaPopularList as TVInterface[];
	const TOP_RATED_TV_SERIES_RENDER = tvSeriesMediaTopRatedList as TVInterface[];

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

	const mediaSectionData = [
		{
			title: 'Películas populares recientes',
			type: 'movies' as const,
			media: POPULAR_MOVIES_RENDER,
		},
		{
			title: 'Series de televisión populares recientes',
			type: 'tv' as const,
			media: POPULAR_TV_SERIES_RENDER,
		},
		{
			title: 'Películas mejor valoradas',
			type: 'movies' as const,
			media: TOP_RATED_MOVIES_RENDER,
		},
		{
			title: 'Series de televisión mejor valoradas',
			type: 'tv' as const,
			media: TOP_RATED_TV_SERIES_RENDER,
		},
	];

	return (
		<div className="min-h-screen flex justify-center items-start">
			<div className="container">
				<div className="text-center mt-4 mb-4">
					<h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 dark:text-white mb-6">MoviesKS</h1>
					{/* <p className="text-lg text-gray-300 max-w-2xl mx-auto">
						Explore and discover detailed information about your favorite movies and TV shows. Only explore and pick up information.
					</p> */}
					<p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
						Explora y descubre información detallada sobre tus películas y series favoritas. Solo explora y recopila información.
					</p>
				</div>

				{/* Search Bar */}
				<form onSubmit={(e) => handleSearch(e, query)} className="max-w-3xl mx-auto relative">
					<div className="flex items-center bg-gray-700  rounded-full px-6 py-4 border border-white/20 dark:border-gray-700">
						<input
							type="text"
							placeholder="Search movies, series..."
							className="w-full bg-transparent border-none focus:ring-0 text-gray-300 placeholder-gray-400 outline-none no-underline pr-2"
							onChange={handleInputChange}
						/>
						<button type="submit" className="w-6 h-6 text-gray-400">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
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
					<section key={`${section.type}-${index}`} className="space-y-2 mt-16" role="region" lang="es">
						<h3 className="text-gray-700 dark:text-gray-300">{section.title}</h3>
						{loadingComponents ? (
							<MediaHomeSkeleton />
						) : !errorCatched ? (
							<CreateMediaHome type={section.type} media={section.media} />
						) : (
							<MediaHomeErrorSkeleton />
						)}
					</section>
				))}
			</div>
		</div>
	);
};

export { Home };
