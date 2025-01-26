import React from 'react';
import { MediaContainer } from '../media-container';

const CreateMedia = ({ media = [], type }) => {
	if (!Array.isArray(media)) {
		console.error('Invalid media data:', media);
		return null;
	}

	return (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 auto-rows-auto justify-center justify-items-center items-start gap-6 p-6 lg:p-8">
			{media.map((media_, index) => (
				<MediaContainer key={`${media_.id}-${index}`} media_={media_} type={type} />
			))}
		</div>
	);
};

export { CreateMedia };
