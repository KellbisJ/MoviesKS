import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { getPreviewTrendingTV } from '../services/PreviewTrendingTv';
import { getNextTvTrendingSection } from '../services/NextTvTrendingSection';
import { CreateMedia } from '../components/CreateMedia';
import { useMenuContext } from '../context/MenuContext';
import { useFavoriteMedia } from '../context/FavoriteMediaContext';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

function MediaAllTV() {
	const { setShowMenuComponents } = useMenuContext();
	const location = useLocation();
	const { favorites, saveFavoriteMedia } = useFavoriteMedia();
	// const favoriteTV = favorites.tv;

	useEffect(() => {
		setShowMenuComponents(false);
		return () => setShowMenuComponents(true);
	}, [setShowMenuComponents]);

	const [tv, setTv] = useState([]);
	const [moreMediaTv, setMoreMediaTv] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const canLoadMore = true;

	useEffect(() => {
		if (location.pathname !== '/tv/all') return;

		async function fetchMedia() {
			const previewTV = await getPreviewTrendingTV();

			setTv(previewTV);
			setPage(2);
		}
		fetchMedia();
	}, [location]);

	const fetchMoreTvMedia = async () => {
		setLoading(true);
		const nextTvMedia = await getNextTvTrendingSection(page);
		if (nextTvMedia && nextTvMedia.length > 0) {
			setMoreMediaTv((prevTvMedia) => {
				const tvMediaIds = new Set([...tv, ...prevTvMedia].map((tv) => tv.id));
				const uniqueNextTv = nextTvMedia.filter((tv) => !tvMediaIds.has(tv.id));
				return [...prevTvMedia, ...uniqueNextTv];
			});
			setPage((prevPage) => prevPage + 1);
		}
		setLoading(false);
	};

	useInfiniteScroll(fetchMoreTvMedia, loading, canLoadMore);

	const allTv = [...tv, ...moreMediaTv];

	const handleFavoriteClick = (item) => {
		const type = item.media_type;

		saveFavoriteMedia(item, type);
	};

	return (
		<>
			<section className="trendingPreviewMediaContainer">
				<CreateMedia media={allTv} type="tv" handleFavoriteClick={handleFavoriteClick} />
			</section>
		</>
	);
}

export { MediaAllTV };
