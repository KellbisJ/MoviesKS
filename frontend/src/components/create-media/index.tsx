import React from 'react';
import { MediaContainer } from '../media-container';
import { CreateMediaPropsInterface } from '../../types/create-media-interface';
import { MovieInterface, TVInterface } from '@/types/movie-and-tv-interface';
import { MovieDetailInterface, TVDetailInterface } from '@/types/media-detail-interface';


const isMovieOrTV = (media: MovieInterface | TVInterface | MovieDetailInterface | TVDetailInterface): media is MovieInterface | TVInterface | MovieDetailInterface | TVDetailInterface => {
	return (media as MovieInterface | MovieDetailInterface).title !== undefined || (media as TVInterface | TVDetailInterface).name !== undefined;
};

const CreateMedia: React.FC<CreateMediaPropsInterface> = ({media, type}) => {
	if (!Array.isArray(media)) {
		console.error('Invalid media data:', media);
		return null;
	}

	return (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 auto-rows-auto justify-center justify-items-center items-start gap-6">
			{media.filter(isMovieOrTV).map((media_, index) => (
				<MediaContainer key={`${media_.id}-${index}`} media_={media_} type={type} />
			))}
		</div>
	);
};

export { CreateMedia };
