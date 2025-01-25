import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMenuContext } from '../context/MenuContext';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { getMediaByCategory } from '../services/MediaByCategory';
import { CreateMedia } from '../components/CreateMedia';
import { MediaSkeleton } from '../components/LoadingSkeletons';

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
				<div className="mediaByCategoryContainer">
					<h3 className="pt-4 pl-8">All Media by Category: {type}</h3>

					<CreateMedia media={allMedia} type={type} />
				</div>
			)}
		</>
	);
}

export { MediaByCategory };
