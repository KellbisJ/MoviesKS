import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getPreviewTrendingMedia } from '../../services/preview-trending-media';
import { getNextMediaTrendingSection } from '../../services/next-media-trending-section';
import { CreateMedia } from '../../components/create-media';
import { useMenuContext } from '../../context/menu-context';
import { useFavoriteMedia } from '../../context/favorite-media-context';
import { useInfiniteScroll } from '../../hooks/use-infinite-scroll';
import { MediaSkeleton } from '../../components/loading-skeletons';
import { TVInterface } from '../../types/movie-and-tv-interface';

const MediaAllTV = (): React.JSX.Element => {
	const { setShowMenuComponents } = useMenuContext();

	useEffect(() => {
		setShowMenuComponents(false);
		return () => setShowMenuComponents(true);
	}, [setShowMenuComponents]);

	const location = useLocation();
  const { favorites, saveFavoriteMedia } = useFavoriteMedia();
  
  // const favoriteTV = favorites.tv;
  
	const [loadingComponents, setLoadingComponents] = useState<boolean>(true);
	const [tv, setTv] = useState<TVInterface[]>([]);
  const [moreMediaTv, setMoreMediaTv] = useState<TVInterface[]>([]);
  
  const [page, setPage] = useState<number>(1);
  
	const [loading, setLoading] = useState<boolean>(false);
	const [canLoadMore, setCanLoadMore] = useState<boolean>(true);
  const [prevPath, setPrevPath] = useState<string>('');
  
  const mediaType:string = 'tv'

	useEffect(() => {
		if (location.pathname === '/tv/all') {
			setLoadingComponents(true);
			setTv([]);
			setMoreMediaTv([]);
			setPage(1);
			setCanLoadMore(true);
			window.scrollTo(0, 0);

			async function fetchMedia() {
				const previewTV = await getPreviewTrendingMedia(mediaType);
				setLoadingComponents(false);
				setTv(previewTV as TVInterface[]);
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
		const nextTvMedia = await getNextMediaTrendingSection(mediaType, page);
		if (nextTvMedia && nextTvMedia.length > 0) {
			setMoreMediaTv((prevTvMedia) => {
				const tvMediaIds = new Set([...tv, ...prevTvMedia].map((tv) => tv.id));
				const uniqueNextTv = nextTvMedia.filter((tv: TVInterface) => !tvMediaIds.has(tv.id));
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

	return <>{loadingComponents ? <MediaSkeleton /> : <CreateMedia media={allTv} type="tv" />}</>;
}

export { MediaAllTV };
