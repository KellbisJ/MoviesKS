import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getPreviewTrendingMedia } from '../../services/preview-trending-media';
import { CreateMedia } from '../../components/specific/create-media';
import { useInfiniteScroll } from '../../hooks/use-infinite-scroll';
import { MediaSkeleton } from '../../components/utilities/loading-skeletons';
import { TVInterface } from '@/types/movie-and-tv-interface';
import { MediaTypeT } from '@/types/media-type';

const MediaAllTV = (): React.JSX.Element => {
	const location = useLocation();

	const [loadingComponents, setLoadingComponents] = useState<boolean>(true);
	const [loading, setLoading] = useState<boolean>(false);

	const [tv, setTv] = useState<TVInterface[]>([]);
	const [moreMediaTv, setMoreMediaTv] = useState<TVInterface[]>([]);

	const [page, setPage] = useState<number>(2);

	const [canLoadMore, setCanLoadMore] = useState<boolean>(true);
	const [prevPath, setPrevPath] = useState<string>('');

	const mediaType: MediaTypeT = MediaTypeT.tv;

	useEffect(() => {
		if (location.pathname === '/tv/all') {
			setTv([]);
			setMoreMediaTv([]);
			setCanLoadMore(true);
			window.scrollTo(0, 0);

			async function fetchMedia() {
				const previewTV = await getPreviewTrendingMedia(mediaType);
				const tvData = previewTV.results;
				setTv(tvData as TVInterface[]);
				setLoadingComponents(false);
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
		const nextTvMedia = await getPreviewTrendingMedia(mediaType, page);
		const nextTvMediaData = nextTvMedia.results;

		if (nextTvMediaData && nextTvMediaData.length > 0) {
			setMoreMediaTv((prevTvMedia) => {
				const tvMediaIds = new Set([...tv, ...prevTvMedia].map((tv) => tv.id));
				const uniqueNextTv = nextTvMediaData.filter(
					(tv): tv is TVInterface => !tvMediaIds.has(tv.id)
				);
				return [...prevTvMedia, ...uniqueNextTv];
			});
			setPage((prevPage) => prevPage + 1);
		} else {
			setCanLoadMore(false);
		}
		setLoading(false);
	};

	useInfiniteScroll({ callback: fetchMoreTvMedia, isLoading: loading, canLoadMore: canLoadMore });

	const allTv = [...tv, ...moreMediaTv];

	return (
		<>
			{tv.length === 0 && loadingComponents && <MediaSkeleton />}

			<CreateMedia media={allTv} type={mediaType} />
		</>
	);
};

export { MediaAllTV };
