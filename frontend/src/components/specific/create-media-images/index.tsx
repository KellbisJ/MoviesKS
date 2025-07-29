import React, { useState, useEffect } from 'react';
import { MediaImagesContainer } from '@/components/common/media-images-container';
import { MediaImagesInterface, Backdrop, Logo, Poster } from '@/services/media-images/types';

const CreateMediaImages = ({ images }: { images: MediaImagesInterface }): React.JSX.Element => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const isLogo = (media: Backdrop | Logo | Poster): media is Logo => {
		return 'iso_639_1' in media && media.iso_639_1 !== undefined;
	};

	const isBackdrop = (media: Backdrop | Logo | Poster): media is Backdrop => {
		return 'file_path' in media && !isLogo(media);
	};

	const allImages = [...images.backdrops, ...images.logos, ...images.posters];

	console.log(allImages);

	// useEffect(() => {
	// 	if (images.length > 1) {
	// 		const interval = setInterval(() => {
	// 			setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
	// 		}, 6000);

	// 		return () => clearInterval(interval);
	// 	}
	// }, [images.length]);

	// console.log(media);

	return (
		<>
			{allImages.length > 0 ? (
				<section className="flex items-center justify-center container">
					{allImages.map((mediaImg, index) => (
						<div key={index} className="w-full h-full">
							<img
								className="w-full h-full"
								src={`https://image.tmdb.org/t/p/${
									isLogo(mediaImg) ? 'w92' : isBackdrop(mediaImg) ? 'w1280' : 'w500'
								}/${mediaImg.file_path}`}
							/>
						</div>
					))}
				</section>
			) : (
				<h3>There are no additional images</h3>
			)}
		</>
	);
};

export { CreateMediaImages };
