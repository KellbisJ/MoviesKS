import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getPreviewTrendingMedia } from '../../services/preview-trending-media';
import { CreateMedia } from '../../components/create-media';
import { getNextMediaTrendingSection } from '../../services/next-media-trending-section';
import { useMenuContext } from '../../context/menu-context';
import { useFavoriteMedia } from '../../context/favorite-media-context';
import { useInfiniteScroll } from '../../hooks/use-infinite-scroll';
import { MediaSkeleton } from '../../components/loading-skeletons';
import { MovieInterface } from '../../../../backend/api/interfaces/movie';


const MediaAllMovie = (): React.JSX.Element => {
	const { setShowMenuComponents } = useMenuContext();

	useEffect(() => {
		setShowMenuComponents(false);
		return () => setShowMenuComponents(true);
	}, [setShowMenuComponents]);

	const location = useLocation();
  const [loadingComponents, setLoadingComponents] = useState<boolean>(true);
  
	const [movies, setMovies] = useState<MovieInterface[]>([]);
  const [moreMovies, setMoreMovies] = useState<MovieInterface[]>([]);
  
  const [page, setPage] = useState<number>(1);
  
	const [loading, setLoading] = useState<boolean>(false);
	const [canLoadMore, setCanLoadMore] = useState<boolean>(true);
  
  const [prevPath, setPrevPath] = useState<string>('');
  
  const mediaType: string = 'movies'

	useEffect(() => {
		if (location.pathname === '/movies/all') {
			setLoadingComponents(true);
			setMovies([]);
			setMoreMovies([]);
			setPage(1);
			setCanLoadMore(true);
			window.scrollTo(0, 0);

			async function fetchMedia() {
				const previewMovies = await getPreviewTrendingMedia('movies');
				setLoadingComponents(false);
				setMovies(previewMovies as MovieInterface[]);
				setPage(2);
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
		const nextMovies = await getNextMediaTrendingSection(mediaType, page);
		if (nextMovies && nextMovies.length > 0) {
			setMoreMovies((prevMovies) => {
				const movieIds = new Set([...movies, ...prevMovies].map((movie) => movie.id));
				const uniqueNextMovies = nextMovies.filter((movie: MovieInterface) => !movieIds.has(movie.id));
				return [...prevMovies, ...uniqueNextMovies];
			});
			setPage((prevPage) => prevPage + 1);
		} else {
			setCanLoadMore(false);
    }
		setLoading(false);
	};

	useInfiniteScroll(fetchMoreMovies, loading, canLoadMore);

	const allMovies = [...movies, ...moreMovies];

	

	return <>{loadingComponents ? <MediaSkeleton /> : <CreateMedia media={allMovies} type={mediaType} />}</>;
}

export { MediaAllMovie };
