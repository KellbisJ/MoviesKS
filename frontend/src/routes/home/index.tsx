import { useEffect, useState } from 'react';
import { MovieInterface, TVInterface } from '@/types/movie-and-tv-interface';
import { getMediaLists } from '@/services/media-lists';
import { MoviesListInterface, TvSeriesListInterface, ListTypeMovies, ListTypeTvSeries } from '@/services/media-lists/types';
import { CreateMediaHome } from '@/components/create-media';

const Home = (): React.JSX.Element => {
	const [movieMediaPopularList, setMovieMediaPopularList] = useState<MoviesListInterface[]>([]);
	const [movieMediaTopRatedList, setMovieMediaTopRatedList] = useState<MoviesListInterface[]>([]);

	const [tvSeriesMediaPopularList, setTvSeriesMediaPopularList] = useState<TvSeriesListInterface[]>([]);
	const [tvSeriesMediaTopRatedList, setTvSeriesMediaTopRatedList] = useState<TvSeriesListInterface[]>([]);

	useEffect(() => {
		const fetchPopularMediaList: () => Promise<void> = async () => {
			try {
				const popularMoviesList = await getMediaLists(1, 'movie', ListTypeMovies.popular);
				const topRatedMoviesList = await getMediaLists(1, 'movie', ListTypeMovies.topRated);

				const topRatedTvSeriesList = await getMediaLists(1, 'tv', ListTypeTvSeries.topRated);
				const popularTvSeriesList = await getMediaLists(1, 'tv', ListTypeTvSeries.popular);

				const popularMoviesData = popularMoviesList.results;
				const topRatedMoviesData = topRatedMoviesList.results;

				const popularTvSeriesData = popularTvSeriesList.results;
				const topRatedTvSeriesData = topRatedTvSeriesList.results;

				setMovieMediaPopularList(popularMoviesData);
				setMovieMediaTopRatedList(topRatedMoviesData);

				setTvSeriesMediaPopularList(popularTvSeriesData);
				setTvSeriesMediaTopRatedList(topRatedTvSeriesData);
			} catch (err) {
				console.error(err);
			}
		};
		fetchPopularMediaList();
	}, []);

	const POPULAR_MOVIES_RENDER = movieMediaPopularList as MovieInterface[];
	const TOP_RATED_MOVIES_RENDER = movieMediaTopRatedList as MovieInterface[];

	const POPULAR_TV_SERIES_RENDER = tvSeriesMediaPopularList as TVInterface[];
	const TOP_RATED_TV_SERIES_RENDER = tvSeriesMediaTopRatedList as TVInterface[];

	return (
		<div className="min-h-screen flex justify-center items-start">
			<div className="container">
				<div className="text-center mt-4 mb-4">
					<h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 dark:text-white mb-6">MoviesKS</h2>
					{/* <p className="text-lg text-gray-300 max-w-2xl mx-auto">
						Explore and discover detailed information about your favorite movies and TV shows. Only explore and pick up information.
					</p> */}
					<p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
						Explora y descubre información detallada sobre tus películas y series favoritas. Solo explora y recopila información.
					</p>
				</div>

				{/* Search Bar */}
				<div className="max-w-3xl mx-auto relative">
					<div className="flex items-center bg-gray-700 dark:bg-gradient-to-b dark:from-gray-100 dark:to-gray-50 rounded-full px-6 py-4 border border-white/20">
						<input
							type="text"
							placeholder="Search movies, series..."
							className="w-full bg-transparent border-none focus:ring-0 text-gray-300 dark:text-gray-700 placeholder-gray-400 outline-none no-underline pr-2"
						/>
						<button type="button" className="w-6 h-6 text-gray-400">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
								/>
							</svg>
						</button>
					</div>
				</div>

				<div className="space-y-2 mt-16">
					{/* <h3 className="text-white">Recent Popular Movies</h3> */}
					<h3 className="text-white">Películas populares recientes</h3>
					<CreateMediaHome type="movies" media={POPULAR_MOVIES_RENDER} />
				</div>

				<div className="space-y-2 mt-16">
					{/* <h3 className="text-white">Recent Popular Tv Series</h3> */}
					<h3 className="text-white">Series de televisión populares recientes</h3>
					<CreateMediaHome type="tv" media={POPULAR_TV_SERIES_RENDER} />
				</div>

				<div className="space-y-2 mt-16">
					{/* <h3 className="text-white">Top Rated Movies</h3> */}
					<h3 className="text-white">Películas mejor valoradas</h3>
					<CreateMediaHome type="movies" media={TOP_RATED_MOVIES_RENDER} />
				</div>

				<div className="space-y-2 mt-16">
					{/* <h3 className="text-white">Top Rated Tv Series</h3> */}
					<h3 className="text-white">Series de televisión mejor valoradas</h3>
					<CreateMediaHome type="tv" media={TOP_RATED_TV_SERIES_RENDER} />
				</div>
			</div>
		</div>
	);
};

export { Home };
