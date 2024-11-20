import React, { useEffect, useState, useCallback } from 'react';
import { getPreviewTrendingMovies } from '../services/PreviewTrendingMovies';
import { createMovies } from '../components/CreateMovies';
import { getNextMoviesTrendingSection } from '../services/NextMoviesTrendingSection';
import { Link } from 'react-router-dom';

function Home() {
	const [movies, setMovies] = useState([]);
	const [moreMovies, setMoreMovies] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function fetchMovies() {
			const previewMovies = await getPreviewTrendingMovies();
			setMovies(previewMovies);
		}
		fetchMovies();
	}, []);

	const handleScroll = useCallback(async () => {
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
	}, [page, loading, movies]);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [handleScroll]);

	const allMovies = [...movies, ...moreMovies];
	const movieElements = createMovies(allMovies);

	return (
		<>
			<section className="trendingPreviewMovies">{movieElements}</section>
		</>
	);
}

export { Home };
