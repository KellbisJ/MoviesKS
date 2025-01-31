import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMenuContext } from '../../context/menu-context';
import { useInfiniteScroll } from '../../hooks/use-infinite-scroll';
import { getMediaByCategory } from '../../services/MediaByCategory';
import { CreateMedia } from '../../components/create-media';
import { MediaSkeleton } from '../../components/loading-skeletons';

function MediaByCategory() {
	const { setShowMenuComponents } = useMenuContext();
	const { type, id: genreId } = useParams();
	const [media, setMedia] = useState([]);
	const [loadingComponents, setLoadingComponents] = useState(true);

	useEffect(() => {
		setShowMenuComponents(false);
		return () => setShowMenuComponents(true);
	}, [setShowMenuComponents]);

	const [moreMedia, setMoreMedia] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const canLoadMore = true;

	useEffect(() => {
		window.scrollTo(0, 0);
		setLoadingComponents(true);

		async function fetchMedia() {
			const mediaData = await getMediaByCategory(type, genreId);
			// console.log(mediaData);

			setLoadingComponents(false);
			setMedia(mediaData);
		}
		fetchMedia();
	}, [type, genreId]);

	const fetchMoreMedia = async () => {
		setLoading(true);
		const nextMedia = await getMediaByCategory(type, genreId, page);
		if (nextMedia && nextMedia.length > 0) {
			setMoreMedia((prevMedia) => {
				const mediaIds = new Set([...media, ...prevMedia].map((media) => media.id));
				const uniqueNextMedia = nextMedia.filter((media) => !mediaIds.has(media.id));
				return [...prevMedia, ...uniqueNextMedia];
			});
			setPage((prevPage) => prevPage + 1);
		}
		setLoading(false);
	};

	useInfiniteScroll(fetchMoreMedia, loading, canLoadMore);

	const allMedia = Array.from(new Set([...media, ...moreMedia].map((media) => media.id))).map((id) => {
		return [...media, ...moreMedia].find((media) => media.id === id);
	});

	return (
		<>
			{loadingComponents ? (
				<MediaSkeleton />
			) : (
				<>
					<h2 className="my-8 dark:text-gray-100">All Media by Category: {type}</h2>

					<CreateMedia media={allMedia} type={type} />
				</>
			)}
		</>
	);
}

export { MediaByCategory };
