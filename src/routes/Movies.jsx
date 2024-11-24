import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { getPreviewTrendingMovies } from '../services/PreviewTrendingMovies';
import { CreateMedia } from '../components/CreateMedia';
import { getNextMoviesTrendingSection } from '../services/NextMoviesTrendingSection';
import { useMenuContext } from '../context/MenuContext';
import { useFavoriteMedia } from '../context/FavoriteMediaContext';

function Movies() {
	const { setShowMenuComponents } = useMenuContext();
	const location = useLocation();
	const { favorites, saveFavoriteMedia } = useFavoriteMedia();
	const favoriteMovies = favorites.movies;

	useEffect(() => {
		setShowMenuComponents(false);
		return () => setShowMenuComponents(true);
	}, [setShowMenuComponents]);

	const [movies, setMovies] = useState([]);
	const [moreMovies, setMoreMovies] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (location.pathname !== '/movies/all') return;

		async function fetchMovies() {
			const previewMovies = await getPreviewTrendingMovies();
			setMovies(previewMovies);
			setPage(2);
		}
		fetchMovies();
	}, [location]);

	useEffect(() => {
		if (location.pathname !== '/movies/all') return;

		const handleScroll = async () => {
			const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

			if (scrollTop + clientHeight >= scrollHeight - 600 && !loading) {
				setLoading(true);
				const newMovies = await getNextMoviesTrendingSection(page);
				if (newMovies && newMovies.length > 0) {
					setMoreMovies((prevMovies) => {
						const movieIds = new Set([...movies, ...prevMovies].map((movie) => movie.id));
						const uniqueNewMovies = newMovies.filter((movie) => !movieIds.has(movie.id));
						return [...prevMovies, ...uniqueNewMovies];
					});
					setPage((prevPage) => prevPage + 1);
				}
				setLoading(false);
			}
		};
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [location, page, loading, movies]);

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
