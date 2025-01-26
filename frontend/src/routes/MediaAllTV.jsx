import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getPreviewTrendingTV } from '../services/PreviewTrendingTv';
import { getNextTvTrendingSection } from '../services/NextTvTrendingSection';
import { CreateMedia } from '../components/create-media';
import { useMenuContext } from '../context/MenuContext';
import { useFavoriteMedia } from '../context/FavoriteMediaContext';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { MediaSkeleton } from '../components/loading-skeletons';

function MediaAllTV() {
	const { setShowMenuComponents } = useMenuContext();

	useEffect(() => {
		setShowMenuComponents(false);
		return () => setShowMenuComponents(true);
	}, [setShowMenuComponents]);

	const location = useLocation();
	const { favorites, saveFavoriteMedia } = useFavoriteMedia();
	// const favoriteTV = favorites.tv;
	const [loadingComponents, setLoadingComponents] = useState(true);
	const [tv, setTv] = useState([]);
	const [moreMediaTv, setMoreMediaTv] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [canLoadMore, setCanLoadMore] = useState(true);
	const [prevPath, setPrevPath] = useState('');

	useEffect(() => {
		if (location.pathname === '/tv/all') {
			setLoadingComponents(true);
			setTv([]);
			setMoreMediaTv([]);
			setPage(1);
			setCanLoadMore(true);
			window.scrollTo(0, 0);

			async function fetchMedia() {
				const previewTV = await getPreviewTrendingTV();
				setLoadingComponents(false);
				setTv(previewTV);
				setPage(2);
			}

			fetchMedia();
		}
	}, [location]);

	useEffect(() => {
		if (location.pathname === '/tv/all' && prevPath !== '/tv/all') {
			window.scrollTo(0, 0);
			setPrevPath('/tv/all');
		}
	}, [location, prevPath]);

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
		} else {
			setCanLoadMore(false);
		}
		setLoading(false);
	};

	useInfiniteScroll(fetchMoreTvMedia, loading, canLoadMore);

	const allTv = [...tv, ...moreMediaTv];

	const handleFavoriteClick = (item) => {
		const type = item.media_type;
		saveFavoriteMedia(item, type);
	};

	return <>{loadingComponents ? <MediaSkeleton /> : <CreateMedia media={allTv} type="tv" handleFavoriteClick={handleFavoriteClick} />}</>;
}

export { MediaAllTV };
