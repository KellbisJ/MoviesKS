import React, { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, ImageOff, X } from 'lucide-react';
import { MediaImagesInterface, Backdrop, Logo, Poster } from '@/services/media-images/types';
import { MediaImageContainer } from '@/components/common/media-image-container';
import { Dialog } from '@/components/common/dialog';
import { mediaImageSrc } from '@/utils/media-image-src';

type MediaImageT = (Backdrop | Logo | Poster) & { type: 'backdrop' | 'logo' | 'poster' };

const viewerButton =
	'flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white cursor-pointer transition-colors duration-200 hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-accent';

const CreateMediaImages = ({
	images,
	title,
	isEs,
}: {
	images: MediaImagesInterface;
	title: string;
	isEs: boolean;
}): React.JSX.Element => {
	const [viewerIndex, setViewerIndex] = useState<number | null>(null);

	// Stable order (TMDB ranks by votes): backdrops first, then posters.
	const allImages: MediaImageT[] = useMemo(
		() => [
			...(images.backdrops || []).map((img) => ({ ...img, type: 'backdrop' as const })),
			...(images.posters || []).map((img) => ({ ...img, type: 'poster' as const })),
		],
		[images]
	);

	const kindLabel = (image: MediaImageT) =>
		image.type === 'backdrop' ? (isEs ? 'Fondo' : 'Backdrop') : isEs ? 'Póster' : 'Poster';
	const positionLabel = (index: number) =>
		isEs ? `${index + 1} de ${allImages.length}` : `${index + 1} of ${allImages.length}`;

	const step = (direction: 1 | -1) =>
		setViewerIndex((index) => (index === null ? null : (index + direction + allImages.length) % allImages.length));

	if (allImages.length === 0) {
		return (
			<div className="mx-auto flex max-w-md flex-col items-center gap-2 rounded-xl bg-surface-2 px-5 py-10 text-center text-text-low dark:bg-dark-surface-2 dark:text-dark-text-low">
				<ImageOff className="h-8 w-8 text-secondary dark:text-dark-secondary" aria-hidden="true" />
				{isEs ? 'Este título no tiene imágenes adicionales.' : 'This title has no additional images.'}
			</div>
		);
	}

	const current = viewerIndex === null ? null : allImages[viewerIndex];

	return (
		<>
			<ul className="grid grid-flow-row-dense grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
				{allImages.map((mediaImg, index) => (
					// w-full + h-full, both: aspect-ratio only sizes the row. With h-full alone the ratio
					// derived the width from the (taller) row height and the backdrop overflowed its span;
					// without h-full it didn't stretch and left a gap. Both definite = fill the cell exactly.
					<li
						key={mediaImg.file_path}
						className="h-full w-full"
						style={{
							gridColumn: `span ${mediaImg.type === 'backdrop' ? 2 : 1}`,
							aspectRatio: mediaImg.aspect_ratio,
						}}>
						<MediaImageContainer
							mediaImg={mediaImg}
							label={`${kindLabel(mediaImg)} ${positionLabel(index)}`}
							onOpen={() => setViewerIndex(index)}
						/>
					</li>
				))}
			</ul>

			<Dialog
				open={current !== null}
				onClose={() => setViewerIndex(null)}
				label={isEs ? `Imágenes de ${title}` : `${title} images`}
				onKeyDown={(event) => {
					if (event.key === 'ArrowLeft') step(-1);
					if (event.key === 'ArrowRight') step(1);
				}}
				className="flex h-[calc(100dvh-2rem)] w-full max-w-6xl flex-col gap-3">
				{current ? (
					<>
						<div className="flex items-center justify-between gap-3 text-sm text-white/85">
							<p aria-live="polite" className="tabular-nums">
								{kindLabel(current)} · {positionLabel(viewerIndex!)}
							</p>
							<button
								type="button"
								onClick={() => setViewerIndex(null)}
								data-autofocus
								aria-label={isEs ? 'Cerrar visor' : 'Close viewer'}
								className={viewerButton}>
								<X className="h-5 w-5" aria-hidden="true" />
							</button>
						</div>

						<div className="relative flex min-h-0 flex-1 items-center justify-center">
							<img
								key={current.file_path}
								className="max-h-full max-w-full rounded-lg object-contain motion-safe:animate-fade-in"
								src={mediaImageSrc(current.file_path, current.type === 'backdrop' ? 'w1280' : 'w780')}
								alt={`${title}: ${kindLabel(current).toLowerCase()} ${positionLabel(viewerIndex!)}`}
							/>
						</div>

						{allImages.length > 1 ? (
							<div className="flex items-center justify-center gap-3">
								<button
									type="button"
									onClick={() => step(-1)}
									aria-label={isEs ? 'Imagen anterior' : 'Previous image'}
									className={viewerButton}>
									<ChevronLeft className="h-6 w-6" aria-hidden="true" />
								</button>
								<button
									type="button"
									onClick={() => step(1)}
									aria-label={isEs ? 'Imagen siguiente' : 'Next image'}
									className={viewerButton}>
									<ChevronRight className="h-6 w-6" aria-hidden="true" />
								</button>
							</div>
						) : null}
					</>
				) : null}
			</Dialog>
		</>
	);
};

export { CreateMediaImages, MediaImageT };
