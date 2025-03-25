import { useEffect, useState } from 'react';
import { MovieInterface, TVInterface } from '@/types/movie-and-tv-interface';
import { getMediaLists } from '@/services/media-lists';
import { MoviesListInterface, TvSeriesListInterface, ListTypeMovies, ListTypeTvSeries } from '@/services/media-lists/types';
import { HomeViewContent } from './HomeViewContent';

const Home = (): React.JSX.Element => {
	const [isLoadingComponents, setIsLoadingComponents] = useState<boolean>(true);

	const [isLoadingMedia, setIsLoadingMedia] = useState<boolean>(true);

	const [isErrorCatched, setIsErrorCatched] = useState<boolean>(false);

	const [movieMediaPopularList, setMovieMediaPopularList] = useState<MoviesListInterface[]>([]);
	const [movieMediaTopRatedList, setMovieMediaTopRatedList] = useState<MoviesListInterface[]>([]);

	const [tvSeriesMediaPopularList, setTvSeriesMediaPopularList] = useState<TvSeriesListInterface[]>([]);
	const [tvSeriesMediaTopRatedList, setTvSeriesMediaTopRatedList] = useState<TvSeriesListInterface[]>([]);

	useEffect(() => {
		const fetchPopularMediaList: () => Promise<void> = async () => {
			try {
				setIsErrorCatched(false);

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
				setIsLoadingComponents(false);
				setIsLoadingMedia(false);
				setIsErrorCatched(true);

				console.error(err);
			} finally {
				setIsLoadingMedia(false);
			}
		};

		fetchPopularMediaList();
	}, []);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsLoadingComponents(false);
		}, 300);
		return () => clearTimeout(timeout);
	}, []);

	const POPULAR_MOVIES_RENDER = movieMediaPopularList as MovieInterface[];
	const TOP_RATED_MOVIES_RENDER = movieMediaTopRatedList as MovieInterface[];

	const POPULAR_TV_SERIES_RENDER = tvSeriesMediaPopularList as TVInterface[];
	const TOP_RATED_TV_SERIES_RENDER = tvSeriesMediaTopRatedList as TVInterface[];

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
		<HomeViewContent
			isLoadingComponents={isLoadingComponents}
			isLoadingMedia={isLoadingMedia}
			isErrorCatched={isErrorCatched}
			mediaSectionData={mediaSectionData}
		/>
	);
};

export { Home };
