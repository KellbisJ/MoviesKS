import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CreateMedia } from '../../components/create-media';
import { getMediaByCategory } from '../../services/media-by-category';
import { useMenuContext } from '../../context/menu-context';
import { MediaSkeleton } from '../../components/loading-skeletons';

const MediaPreviewByGenre = () => {
	const [loadingComponents, setLoadingComponents] = useState(true);
	const [media, setMedia] = useState(null);
	const { type, id } = useParams();
	// const { selectedGenre } = useMenuContext();
	// const genreName = selectedGenre.genreName;

	useEffect(() => {
		setLoadingComponents(true);
		async function fetchMedia() {
			if (id) {
				const filteredMedia = await getMediaByCategory(type, id);
				setMedia(filteredMedia);
				// console.log(filteredMedia);
			}
		}

		setLoadingComponents(false);
		fetchMedia();
	}, [type, id]);

	if (!media) {
		return <MediaSkeleton />;
	}

	return (
		<>
			{loadingComponents ? (
				<MediaSkeleton />
			) : (
				<div className="mediaPreviewContainer">
					<CreateMedia media={media} type={type} />
				</div>
			)}
		</>
	);
};

export { MediaPreviewByGenre };
