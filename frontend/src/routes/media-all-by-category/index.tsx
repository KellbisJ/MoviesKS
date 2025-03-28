import React, { useEffect, useState } from 'react';
import { useValidMediaType } from '@/hooks/use-valid-media-type';
import { useParams } from 'react-router-dom';
import { useInfiniteScroll } from '../../hooks/use-infinite-scroll';
import { getMediaByCategory } from '../../services/media-by-category';
import { CreateMedia } from '../../components/create-media';
import { MediaSkeleton } from '../../components/loading-skeletons';
import { MovieInterface, TVInterface } from '../../types/movie-and-tv-interface';
import { MediaTypeT } from '@/types/media-type';

const MediaAllByCategory = (): React.JSX.Element => {
	const { id } = useParams();

	const mediaType = useValidMediaType();
	const mediaIdGenre = id || '';

	if (mediaType !== MediaTypeT.movie && mediaType !== MediaTypeT.tv) {
		console.error('Invalid media type');
	}

	const [loading, setLoading] = useState<boolean>(false);
	const [loadingComponents, setLoadingComponents] = useState<boolean>(true);
	const [media, setMedia] = useState<MovieInterface[] | TVInterface[]>([]);
	const [moreMedia, setMoreMedia] = useState<MovieInterface[] | TVInterface[]>([]);

	const [page, setPage] = useState<number>(1);
	const [canLoadMore, setCanLoadMore] = useState<boolean>(true);

	useEffect(() => {
		window.scrollTo(0, 0);
		setLoadingComponents(true);
		setMedia([]);
		setMoreMedia([]);
		setCanLoadMore(true);

		async function fetchMedia() {
			const mediaData = await getMediaByCategory(mediaType, mediaIdGenre);
			const mediaDataResults = mediaData.results;
			setLoadingComponents(false);
			setMedia(mediaDataResults);
			setCanLoadMore(true);
		}
		fetchMedia();
	}, []);

	const fetchMoreMedia = async () => {
		setLoading(true);
		const nextMedia = await getMediaByCategory(mediaType, mediaIdGenre, page);
		const nextMediaData = nextMedia.results;

		if (nextMediaData && nextMediaData.length > 0) {
			setMoreMedia((prevMedia) => {
				const mediaIds = new Set([...media, ...prevMedia].map((media) => media.id)); // Create a Set of all media IDs from the current and previous media

				// Filter out media items that are already in the Set
				const uniqueNextMedia = nextMediaData.filter((media): media is MovieInterface | TVInterface => !mediaIds.has(media.id));

				// Return the combined list of previous media and unique new media
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

	return (
		<>
			{loadingComponents ? (
				<>
					<h2 className="my-8 dark:text-gray-100">Loading...</h2>
					<MediaSkeleton />
				</>
			) : (
				<>
					<h2 className="my-8 dark:text-gray-100">All Media by Category: {mediaType}</h2>
					<CreateMedia media={allMedia} type={mediaType} />
				</>
			)}
		</>
	);
};

export { MediaAllByCategory };
