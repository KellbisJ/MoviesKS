import React from 'react';
import { MediaImagesContainerProps } from './types';
import { MediaImagesInterface } from '@/services/media-images/types';
import { MediaImageT } from '@/components/specific/create-media-images';

const MediaImageContainer = ({
	mediaImg,
	colSpan,
	imgUrl,
}: {
	mediaImg?: MediaImageT;
	colSpan?: number;
	imgUrl?: string;
}): React.JSX.Element => {
	console.log(mediaImg);

	if (mediaImg) {
		return (
			<div
				className="relative overflow-hidden rounded-lg shadow-lg group w-full h-full"
				style={{
					gridColumn: `span ${colSpan}`,
					aspectRatio: mediaImg.aspect_ratio,
				}}>
				<img
					className="w-full h-full object-cover opacity-0 transition-opacity duration-500"
					src={imgUrl}
					alt=""
					loading="lazy"
					// onError={(e) => {
					// 	const target = e.target as HTMLImageElement;
					// 	target.src = '/fallback-image.jpg';
					// }}
					onLoad={(e) => (e.currentTarget.style.opacity = '1')}
				/>

				<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
					<div className="text-white text-center p-2">
						<p className="font-bold">{mediaImg.type === 'backdrop' ? 'Backdrop' : 'Poster'}</p>
						<p className="text-sm">
							{mediaImg.width}×{mediaImg.height}
						</p>
					</div>
				</div>
			</div>
		);
	}
	return <p>No Images</p>;
};

export { MediaImageContainer };
