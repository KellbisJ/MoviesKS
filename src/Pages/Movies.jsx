import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { getPreviewTrendingMovies } from '../services/PreviewTrendingMovies';
import { CreateMovies } from '../components/CreateMovies';
import { getNextMoviesTrendingSection } from '../services/NextMoviesTrendingSection';
import { useMenuContext } from '../context/MenuContext';

function Movies() {
	const { setShowMenuComponents } = useMenuContext();
	const location = useLocation();

	useEffect(() => {
		setShowMenuComponents(false);
		return () => setShowMenuComponents(true);
	}, [setShowMenuComponents]);

	const [movies, setMovies] = useState([]);
	const [moreMovies, setMoreMovies] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);

	// useEffect(() => {
	// 	return () => {
	// 		setMovies([]);
	// 		setMoreMovies([]);
	// 		setPage(1);
	// 	};
	// }, [location]);

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

	return (
		<section className="allTrendingMedia">
			<CreateMovies movies={allMovies} />
		</section>
	);
}

export { Movies };
