import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getPreviewTrendingMedia } from '../../services/preview-trending-media';
import { CreateMedia } from '../../components/create-media';
import { useMenuContext } from '../../context/menu-context';
import { useInfiniteScroll } from '../../hooks/use-infinite-scroll';
import { MediaSkeleton } from '../../components/loading-skeletons';
import { MovieInterface } from '@/types/movie-and-tv-interface';


const MediaAllMovie = (): React.JSX.Element => {
	const { setShowMenuComponents } = useMenuContext();

	useEffect(() => {
		setShowMenuComponents(false);
		return () => setShowMenuComponents(true);
	}, [setShowMenuComponents]);

  const location = useLocation();

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingComponents, setLoadingComponents] = useState<boolean>(true);
	const [movies, setMovies] = useState<MovieInterface[]>([]);
  const [moreMovies, setMoreMovies] = useState<MovieInterface[]>([]);
  
  const [page, setPage] = useState<number>(2);
  
	const [canLoadMore, setCanLoadMore] = useState<boolean>(true);
  const [prevPath, setPrevPath] = useState<string>('');
  
  const mediaType: string = 'movies'

	useEffect(() => {
    if (location.pathname === '/movies/all') {
      window.scrollTo(0, 0);
			setLoadingComponents(true);
			setMovies([]);
			setMoreMovies([]);
			setCanLoadMore(true);
			

			async function fetchMedia() {
        const previewMovies = await getPreviewTrendingMedia(mediaType);
        const moviesData = previewMovies.results
				setLoadingComponents(false);
				setMovies(moviesData as MovieInterface[]);
			}

			fetchMedia();
		}
	}, [location]);

	useEffect(() => {
		if (location.pathname === '/movies/all' && prevPath !== '/movies/all') {
			window.scrollTo(0, 0);
			setPrevPath('/movies/all');
		}
	}, [location, prevPath]);

  const fetchMoreMovies = async () => {
		setLoading(true);
    const nextMoviesMedia = await getPreviewTrendingMedia(mediaType, page);
    const nextMoviesMediaData = nextMoviesMedia.results

    if (nextMoviesMediaData && nextMoviesMediaData.length > 0){
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

	useInfiniteScroll({ callback: fetchMoreMovies, isLoading:loading, canLoadMore: canLoadMore});

	const allMovies = [...movies, ...moreMovies];

	return <>{loadingComponents ? <MediaSkeleton /> : <CreateMedia media={allMovies} type={mediaType} />}</>;
}

export { MediaAllMovie };
