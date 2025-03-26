import React from 'react';
import { MediaImagesContainerProps } from './types';

const MediaImagesContainer: React.FC<MediaImagesContainerProps> = ({ image, className }) => {
	return (
		<div className={className}>
			<img
				className="w-full h-full object-center rounded-md transition"
				src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
				alt="Media Image"
			/>
		</div>
	);
};

export { MediaImagesContainer };
