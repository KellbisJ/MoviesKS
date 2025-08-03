import React, { useMemo } from 'react';
import { MediaImagesInterface, Backdrop, Logo, Poster } from '@/services/media-images/types';
import { LazyMediaContainer } from '@/components/common/lazy-media-container';
import { MediaImageContainer } from '@/components/common/media-image-container';

type MediaImageT = (Backdrop | Logo | Poster) & { type: 'backdrop' | 'logo' | 'poster' };

const CreateMediaImages = ({ images }: { images: MediaImagesInterface }): React.JSX.Element => {
	const allImages: MediaImageT[] = useMemo(() => {
		const combined = [
			...images.backdrops.map((img) => ({ ...img, type: 'backdrop' as const })),
			...images.posters.map((img) => ({ ...img, type: 'poster' as const })),
		];

		return combined.sort(() => Math.random() - 0.5);
	}, [images]);

	const getColSpan = (media: MediaImageT) => {
		return media.type === 'backdrop' ? 2 : 1;
	};

	if (allImages.length === 0) {
		return <h3 className="text-center py-8 text-xl">There are no additional images</h3>;
	}

	return (
		<section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-auto-rows: auto; grid-flow-row-dense gap-4 container">
			{allImages.map((mediaImg) => {
				const colSpan = getColSpan(mediaImg);
				const imgSize = mediaImg.type === 'backdrop' ? 'w1280' : 'w500';
				const imgUrl = `https://image.tmdb.org/t/p/${imgSize}${mediaImg.file_path}`;

				return (
					<LazyMediaContainer
						key={mediaImg.file_path}
						containerType="Images"
						colSpan={colSpan}
						imgUrl={imgUrl}
						mediaImg={mediaImg}
						allImages={allImages}
						mediaImageId={images.id}
					/>
				);
			})}
		</section>
	);
};

export { CreateMediaImages, MediaImageT };
