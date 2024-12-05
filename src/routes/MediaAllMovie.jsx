import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getPreviewTrendingMovies } from '../services/PreviewTrendingMovies';
import { CreateMedia } from '../components/CreateMedia';
import { getNextMoviesTrendingSection } from '../services/NextMoviesTrendingSection';
import { useMenuContext } from '../context/MenuContext';
import { useFavoriteMedia } from '../context/FavoriteMediaContext';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { MediaSkeleton } from '../components/LoadingSkeletons';

function MediaAllMovie() {
	const { setShowMenuComponents } = useMenuContext();

	useEffect(() => {
		setShowMenuComponents(false);
		return () => setShowMenuComponents(true);
	}, [setShowMenuComponents]);

	const location = useLocation();
	const { favorites, saveFavoriteMedia } = useFavoriteMedia();
	const [loadingComponents, setLoadingComponents] = useState(true);
	const [movies, setMovies] = useState([]);
	const [moreMovies, setMoreMovies] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [canLoadMore, setCanLoadMore] = useState(true);
	const [prevPath, setPrevPath] = useState('');

	useEffect(() => {
		if (location.pathname === '/movies/all') {
			setLoadingComponents(true);
			setMovies([]);
			setMoreMovies([]);
			setPage(1);
			setCanLoadMore(true);
			window.scrollTo(0, 0);

			async function fetchMedia() {
				const previewMovies = await getPreviewTrendingMovies();
				setLoadingComponents(false);
				setMovies(previewMovies);
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
		const nextMovies = await getNextMoviesTrendingSection(page);
		if (nextMovies && nextMovies.length > 0) {
			setMoreMovies((prevMovies) => {
				const movieIds = new Set([...movies, ...prevMovies].map((movie) => movie.id));
				const uniqueNextMovies = nextMovies.filter((movie) => !movieIds.has(movie.id));
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

	const handleFavoriteClick = (item) => {
		const type = item.media_type;
		saveFavoriteMedia(item, type);
	};

	return (
		<>
			{loadingComponents ? (
				<MediaSkeleton />
			) : (
				<section className="allTrendingMediaContainer">
					<CreateMedia media={allMovies} type="movies" handleFavoriteClick={handleFavoriteClick} />
				</section>
			)}
		</>
	);
}

export { MediaAllMovie };
