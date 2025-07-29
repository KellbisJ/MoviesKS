import React, { useMemo } from 'react';
import { MediaImagesInterface, Backdrop, Logo, Poster } from '@/services/media-images/types';

type MediaImage = (Backdrop | Logo | Poster) & { type: 'backdrop' | 'logo' | 'poster' };

const CreateMediaImages = ({ images }: { images: MediaImagesInterface }): React.JSX.Element => {
	const allImages: MediaImage[] = useMemo(() => {
		const combined = [
			...images.backdrops.map((img) => ({ ...img, type: 'backdrop' as const })),
			...images.posters.map((img) => ({ ...img, type: 'poster' as const })),
		];

		return combined.sort(() => Math.random() - 0.5);
	}, [images]);

	const getColSpan = (media: MediaImage) => {
		return media.type === 'backdrop' ? 2 : 1;
	};

	if (allImages.length === 0) {
		return <h3 className="text-center py-8 text-xl">There are no additional images</h3>;
	}

	return (
		<section
			className="grid
        grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
        grid-auto-rows: auto;
        grid-flow-row-dense
        gap-4
        container">
			{allImages.map((mediaImg) => {
				const colSpan = getColSpan(mediaImg);
				const imgSize = mediaImg.type === 'backdrop' ? 'w1280' : 'w500';
				const imageUrl = `https://image.tmdb.org/t/p/${imgSize}${mediaImg.file_path}`;

				return (
					<div
						key={mediaImg.file_path}
						className="relative overflow-hidden rounded-lg shadow-lg group w-full h-full"
						style={{
							gridColumn: `span ${colSpan}`,
							aspectRatio: mediaImg.aspect_ratio,
						}}>
						<img
							className="w-full h-full object-cover opacity-0 transition-opacity duration-500"
							src={imageUrl}
							alt=""
							loading="lazy"
							onError={(e) => {
								const target = e.target as HTMLImageElement;
								target.src = '/fallback-image.jpg';
							}}
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
			})}
		</section>
	);
};

export { CreateMediaImages };
