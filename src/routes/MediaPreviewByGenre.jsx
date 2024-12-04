import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CreateMedia } from '../components/CreateMedia';
import { getMediaByCategory } from '../services/MediaByCategory';
import { useMenuContext } from '../context/MenuContext';
import { MediaSkeleton } from '../components/LoadingSkeletons';

const MediaPreviewByGenre = () => {
	const [loadingComponents, setLoadingComponents] = useState(true);
	const [media, setMedia] = useState(null);
	const { type, id } = useParams();
	const { selectedGenre } = useMenuContext();
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
		return <div style={{ display: 'flex', margin: '50px auto 300px auto', justifyContent: 'center' }}>Loading...</div>;
	}

	// genreName tambien debe ser guardado en localStorage para preservar su valor entre recargas de página

	return (
		<>
			{loadingComponents ? (
				<MediaSkeleton />
			) : (
				<div className="mediaPreviewContainer">
					<h3 style={{ padding: '0 8px' }}>{`Preview for ${type} in genre: ${'genreName'}`}</h3>
					<div className="mediaPreviewContainerGrid">
						<CreateMedia media={media} type={type} />
					</div>
				</div>
			)}
		</>
	);
};

export { MediaPreviewByGenre };
