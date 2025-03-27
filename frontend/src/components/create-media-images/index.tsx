import React, { useState, useEffect } from 'react';
import { CreateMediaImagePropsInterface } from './types';
import { MediaImagesContainer } from '../media-images-container';
import { Backdrop } from '@/services/media-images/types';

const CreateMediaImages: React.FC<CreateMediaImagePropsInterface> = ({ media, type }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	if (!media || (!media.posters && !media.backdrops)) {
		return null;
	}

	const images: Backdrop[] = [...media.backdrops, ...media.posters];

	useEffect(() => {
		if (images.length > 1) {
			const interval = setInterval(() => {
				setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
			}, 6000);

			return () => clearInterval(interval);
		}
	}, [images.length]);

	console.log(media);

	return (
		<div className="flex items-center justify-center relative w-full h-full ">
			{images.length > 1 ? (
				images.map((mediaImg, index) => (
					<MediaImagesContainer
						image={mediaImg}
						key={index}
						className={`absolute w-full object-fit-cover h-full transition-opacity duration-[2500ms] ${
							index === currentIndex ? 'opacity-100' : 'opacity-0'
						}`}
					/>
				))
			) : (
				<h3>There are no additional posters</h3>
			)}
		</div>
	);
};

export { CreateMediaImages };
