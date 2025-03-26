import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getPreviewTrendingMedia } from '../../services/preview-trending-media';
import { CreateMedia } from '../../components/create-media';
import { useInfiniteScroll } from '../../hooks/use-infinite-scroll';
import { MediaSkeleton } from '@/components/loading-skeletons';
import { MovieInterface } from '@/types/movie-and-tv-interface';
import { MediaTypeT } from '@/types/media-type';

const MediaAllMovie = (): React.JSX.Element => {
	const location = useLocation();

	const [loading, setLoading] = useState<boolean>(false);
	const [loadingComponents, setLoadingComponents] = useState<boolean>(true);
	const [movies, setMovies] = useState<MovieInterface[]>([]);
	const [moreMovies, setMoreMovies] = useState<MovieInterface[]>([]);

	const [page, setPage] = useState<number>(2);

	const [canLoadMore, setCanLoadMore] = useState<boolean>(true);
	const [prevPath, setPrevPath] = useState<string>('');

	const mediaType: MediaTypeT.movie = MediaTypeT.movie;

	useEffect(() => {
		if (location.pathname === '/movie/all') {
			window.scrollTo(0, 0);
			setLoadingComponents(true);
			setMovies([]);
			setMoreMovies([]);
			setCanLoadMore(true);

			async function fetchMedia() {
				const previewMovies = await getPreviewTrendingMedia(mediaType);
				const moviesData = previewMovies.results;
				setLoadingComponents(false);
				setMovies(moviesData as MovieInterface[]);
			}

			fetchMedia();
		}
	}, [location]);

	useEffect(() => {
		if (location.pathname === '/movie/all' && prevPath !== '/movie/all') {
			window.scrollTo(0, 0);
			setPrevPath('/movie/all');
		}
	}, [location, prevPath]);

	const fetchMoreMovies = async () => {
		setLoading(true);
		const nextMoviesMedia = await getPreviewTrendingMedia(mediaType, page);
		const nextMoviesMediaData = nextMoviesMedia.results;

		if (nextMoviesMediaData && nextMoviesMediaData.length > 0) {
			setMoreMovies((prevMovies) => {
				const movieIds = new Set([...movies, ...prevMovies].map((movie) => movie.id));
				const uniqueNextMovies = nextMoviesMediaData.filter((movie): movie is MovieInterface => !movieIds.has(movie.id));
				return [...prevMovies, ...uniqueNextMovies];
			});
			setPage((prevPage) => prevPage + 1);
		} else {
			setCanLoadMore(false);
		}
		setLoading(false);
	};

	useInfiniteScroll({ callback: fetchMoreMovies, isLoading: loading, canLoadMore: canLoadMore });

	const allMovies = [...movies, ...moreMovies];

	return <>{loadingComponents ? <MediaSkeleton /> : <CreateMedia media={allMovies} type={mediaType} />}</>;
};

export { MediaAllMovie };
