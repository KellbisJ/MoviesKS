import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { getPreviewTrendingMovies } from '../services/PreviewTrendingMovies';
import { CreateMedia } from '../components/CreateMedia';
import { getNextMoviesTrendingSection } from '../services/NextMoviesTrendingSection';
import { useMenuContext } from '../context/MenuContext';
import { useFavoriteMedia } from '../context/FavoriteMediaContext';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

function Movies() {
	const { setShowMenuComponents } = useMenuContext();
	const location = useLocation();
	const { favorites, saveFavoriteMedia } = useFavoriteMedia();
	// const favoriteMovies = favorites.movies;

	useEffect(() => {
		setShowMenuComponents(false);
		return () => setShowMenuComponents(true);
	}, [setShowMenuComponents]);

	const [movies, setMovies] = useState([]);
	const [moreMovies, setMoreMovies] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const canLoadMore = true;

	useEffect(() => {
		if (location.pathname !== '/movies/all') return;

		async function fetchMedia() {
			const previewMovies = await getPreviewTrendingMovies();
			setMovies(previewMovies);
			setPage(2);
		}
		fetchMedia();
	}, [location]);

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
		<section className="allTrendingMediaContainer">
			<CreateMedia media={allMovies} type="movies" handleFavoriteClick={handleFavoriteClick} />
		</section>
	);
}

export { Movies };
