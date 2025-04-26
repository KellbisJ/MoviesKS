import { useEffect, useState } from 'react';
import { MovieInterface, TVInterface } from '@/types/movie-and-tv-interface';
import { getMediaLists } from '@/services/media-lists';
import {
	MoviesListInterface,
	TvSeriesListInterface,
	ListTypeMovies,
	ListTypeTvSeries,
} from '@/services/media-lists/types';
import { HomeViewContent } from './HomeViewContent';
import { MediaTypeT } from '@/types/media-type';
import { isSpanishLang } from '@/utils/is-spanish-lang';
import { useLanguages } from '@/context/lang';

const Home = (): React.JSX.Element => {
	const { language } = useLanguages();

	const [isLoadingComponents, setIsLoadingComponents] = useState<boolean>(true);

	const [isLoadingMedia, setIsLoadingMedia] = useState<boolean>(true);

	const [isErrorCatched, setIsErrorCatched] = useState<boolean>(false);

	const [movieMediaPopularList, setMovieMediaPopularList] = useState<MoviesListInterface[]>([]);
	const [movieMediaTopRatedList, setMovieMediaTopRatedList] = useState<MoviesListInterface[]>([]);

	const [tvSeriesMediaPopularList, setTvSeriesMediaPopularList] = useState<TvSeriesListInterface[]>(
		[]
	);
	const [tvSeriesMediaTopRatedList, setTvSeriesMediaTopRatedList] = useState<
		TvSeriesListInterface[]
	>([]);

	useEffect(() => {
		const fetchPopularMediaList: () => Promise<void> = async () => {
			try {
				setIsErrorCatched(false);

				const [popularMoviesList, topRatedMoviesList, topRatedTvSeriesList, popularTvSeriesList] =
					await Promise.all([
						getMediaLists(1, MediaTypeT.movie, ListTypeMovies.popular),
						getMediaLists(1, MediaTypeT.movie, ListTypeMovies.topRated),
						getMediaLists(1, MediaTypeT.tv, ListTypeTvSeries.topRated),
						getMediaLists(1, MediaTypeT.tv, ListTypeTvSeries.popular),
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
			title: isSpanishLang(language) ? 'Películas populares recientes' : 'Recent popular movies',
			type: MediaTypeT.movie,
			media: POPULAR_MOVIES_RENDER,
		},
		{
			title: isSpanishLang(language)
				? 'Series de televisión populares recientes'
				: 'Recent Popular TV Series',
			type: MediaTypeT.tv,
			media: POPULAR_TV_SERIES_RENDER,
		},
		{
			title: isSpanishLang(language) ? 'Películas mejor valoradas' : 'Top-rated movies',
			type: MediaTypeT.movie,
			media: TOP_RATED_MOVIES_RENDER,
		},
		{
			title: isSpanishLang(language)
				? 'Series de televisión mejor valoradas'
				: 'Top-rated TV series',
			type: MediaTypeT.tv,
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
