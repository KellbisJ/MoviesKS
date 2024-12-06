import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMediaBySearch } from '../services/MediaBySearch';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { CreateMedia } from '../components/CreateMedia';
import { MediaSkeleton } from '../components/LoadingSkeletons';
import { useMenuContext } from '../context/MenuContext';

function MediaBySearch() {
	const { setShowMenuComponents } = useMenuContext();

	useEffect(() => {
		setShowMenuComponents(false);
		return () => setShowMenuComponents(true);
	}, [setShowMenuComponents]);
	const { type, query } = useParams();
	const [media, setMedia] = useState([]);
	const [loadingComponents, setLoadingComponents] = useState(true);

	const [moreMedia, setMoreMedia] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const canLoadMore = true;

	useEffect(() => {
		window.scrollTo(0, 0);
		setMedia([]);
		setLoadingComponents(true);

		async function fetchMedia() {
			const mediaData = await getMediaBySearch(type, query, 1);
			setLoadingComponents(false);
			if (mediaData && Array.isArray(mediaData.results)) {
				setMedia(mediaData.results);
			} else {
				setMedia([]);
			}
		}
		fetchMedia();
	}, [type, query]);

	const fetchMoreMedia = async () => {
		setLoading(true);
		const nextMedia = await getMediaBySearch(type, query, page + 1);
		if (nextMedia && Array.isArray(nextMedia.results) && nextMedia.results.length > 0) {
			setMoreMedia((prevMedia) => {
				const mediaIds = new Set([...media, ...prevMedia].map((media) => media.id));
				const uniqueNextMedia = nextMedia.results.filter((media) => !mediaIds.has(media.id));
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
				<div className="mediaBySearchContainer">
					<h3 style={{ padding: '0 8px' }}>
						Search Results for "{query}" in {type === 'movies' ? 'Movies' : 'TV Shows'}
					</h3>
					<div className="gridMediaContainer">
						<CreateMedia media={allMedia} type={type} />
					</div>
				</div>
			)}
		</>
	);
}

export { MediaBySearch };
