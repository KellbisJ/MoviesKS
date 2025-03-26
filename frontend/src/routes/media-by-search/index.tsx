import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useValidMediaType } from '@/hooks/use-valid-media-type';
import { getMediaBySearch } from '../../services/media-by-search';
import { useInfiniteScroll } from '../../hooks/use-infinite-scroll';
import { CreateMedia } from '../../components/create-media';
import { MediaSkeleton } from '../../components/loading-skeletons';
import { MovieInterface, TVInterface } from '../../types/movie-and-tv-interface';
import { NoResults } from '@/components/no-results';
import { MediaTypeT } from '@/types/media-type';

const MediaBySearch = (): React.JSX.Element => {
	const { query } = useParams();

	const mediaType = useValidMediaType();
	const querySearch = query || '';

	const [loading, setLoading] = useState<boolean>(false);
	const [loadingComponents, setLoadingComponents] = useState<boolean>(true);

	const [media, setMedia] = useState<MovieInterface[] | TVInterface[]>([]);
	const [moreMedia, setMoreMedia] = useState<MovieInterface[] | TVInterface[]>([]);

	const [page, setPage] = useState<number>(1);
	const [canLoadMore, setCanLoadMore] = useState<boolean>(true);

	useEffect(() => {
		if (mediaType && querySearch) {
			window.scrollTo(0, 0);
			setLoadingComponents(true);
			setMedia([]);
			setMoreMedia([]);
			setCanLoadMore(true);

			async function fetchMedia() {
				const mediaData = await getMediaBySearch(mediaType as MediaTypeT, querySearch, 1);
				setLoadingComponents(false);
				const mediaDataResults = mediaData.results;
				setMedia(mediaDataResults);
			}
			fetchMedia();
		}
	}, [mediaType, querySearch]);

	// useEffect(() => {
	//   console.log(mediaType);
	//   console.log(querySearch);
	// }, [])

	const fetchMoreMedia = async () => {
		setLoading(true);
		const nextMedia = await getMediaBySearch(mediaType as MediaTypeT, querySearch, page);
		const nextMediaData = nextMedia.results;

		if (nextMediaData && nextMediaData.length > 0) {
			setMoreMedia((prevMedia) => {
				const mediaIds = new Set([...media, ...prevMedia].map((media) => media.id));
				const uniqueNextMedia = nextMediaData.filter((media): media is MovieInterface | TVInterface => !mediaIds.has(media.id));
				return [...prevMedia, ...uniqueNextMedia] as MovieInterface[] | TVInterface[];
			});
			setPage((prevPage) => prevPage + 1);
		} else {
			setCanLoadMore(false);
		}
		setLoading(false);
	};

	useInfiniteScroll({ callback: fetchMoreMedia, isLoading: loading, canLoadMore: canLoadMore });

	const allMedia = [...media, ...moreMedia] as MovieInterface[] | TVInterface[];

	if (media.length === 0) {
		return (
			<>
				<NoResults />
			</>
		);
	}

	return (
		<>
			{loadingComponents ? (
				<MediaSkeleton />
			) : (
				<>
					<h3 className="my-8 dark:text-gray-100">
						Search Results for "{querySearch}" in {mediaType === MediaTypeT.movie ? 'Movies' : 'TV Shows'}
					</h3>
					<CreateMedia media={allMedia} type={mediaType} />
				</>
			)}
		</>
	);
};

export { MediaBySearch };
