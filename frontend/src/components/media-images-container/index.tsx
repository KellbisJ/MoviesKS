import React from 'react';
import { MediaImagesContainerProps } from './types';

const MediaImagesContainer: React.FC<MediaImagesContainerProps> = ({ image, className }) => {
	return (
		<div className={className}>
			<img
				className="w-full h-full object-cover rounded-md transition inset-0"
				src={`https://image.tmdb.org/t/p/w1280/${image.file_path}`}
				alt="Media Image"
			/>
		</div>
	);
};

export { MediaImagesContainer };
