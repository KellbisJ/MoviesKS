import React from 'react';
import { MediaContainerMinimalist } from '../media-container-minimalist';
import { MediaContainer } from '../media-container';
import { CreateMediaPropsInterface } from '../../types/create-media-interface';
import { MovieInterface, TVInterface } from '@/types/movie-and-tv-interface';
import { MovieDetailInterface, TVDetailInterface } from '@/types/media-detail-interface';

const isMovieOrTV = (
	media: MovieInterface | TVInterface | MovieDetailInterface | TVDetailInterface
): media is MovieInterface | TVInterface | MovieDetailInterface | TVDetailInterface => {
	return (media as MovieInterface | MovieDetailInterface).title !== undefined || (media as TVInterface | TVDetailInterface).name !== undefined;
};

const CreateMediaHome: React.FC<CreateMediaPropsInterface> = ({ media, type }) => {
	if (!Array.isArray(media)) {
		console.error('Invalid media data:', media);
		return null;
	}

	return (
		<div className="w-full overflow-x-auto overflow-y-hidden scrollbar-minimal bg-blue-100 dark:bg-[#363062] rounded-lg">
			<div className="flex space-x-4 p-3">
				{media.filter(isMovieOrTV).map((media_) => (
					<div key={media_.id} className="flex-shrink-0 w-48 h-60 2xl:w-60 2xl:h-80">
						<MediaContainerMinimalist media_={media_} type={type} />
					</div>
				))}
			</div>
		</div>
	);
};

const CreateMedia: React.FC<CreateMediaPropsInterface> = ({ media, type }) => {
	if (!Array.isArray(media)) {
		console.error('Invalid media data:', media);
		return null;
	}

	return (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 auto-rows-auto justify-center justify-items-center items-start gap-6">
			{media.filter(isMovieOrTV).map((media_) => (
				<MediaContainer key={media_.id} media_={media_} type={type} />
			))}
		</div>
	);
};

export { CreateMediaHome, CreateMedia };
