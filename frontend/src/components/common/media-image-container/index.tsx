import React, { useCallback, useEffect, useState } from 'react';
import { MediaImagesContainerProps } from './types';
import { MediaImagesInterface } from '@/services/media-images/types';
import { MediaImageT } from '@/components/specific/create-media-images';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';

const MediaImageContainer = ({
	mediaImg,
	colSpan,
	imgUrl,
	allImages,
	mediaImageId,
}: {
	mediaImg: MediaImageT;
	colSpan: number;
	imgUrl: string;
	allImages: MediaImageT[];
	mediaImageId: number;
}): React.JSX.Element => {
	console.log(mediaImg);

	const [viewerIndex, setViewerIndex] = useState<number | null>(null);
	const [isViewerClosing, setIsViewerClosing] = useState(false);

	const getCurrentIndex = useCallback(() => {
		return allImages.findIndex((img) => img.file_path === mediaImg.file_path);
	}, [allImages, mediaImg.file_path]);

	const openViewer = () => {
		const currentIndex = getCurrentIndex();
		if (currentIndex !== -1) {
			setViewerIndex(currentIndex);
		}
	};

	const closeViewer = () => {
		setIsViewerClosing(true);
		setTimeout(() => {
			setViewerIndex(null);
			setIsViewerClosing(false);
		}, 300);
	};

	const navigateImage = (direction: 'prev' | 'next') => {
		if (viewerIndex === null) return;

		const lastIndex = allImages.length - 1;
		const newIndex =
			direction === 'prev'
				? viewerIndex === 0
					? lastIndex
					: viewerIndex - 1
				: viewerIndex === lastIndex
				? 0
				: viewerIndex + 1;

		setViewerIndex(newIndex);
	};

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (viewerIndex === null) return;

			switch (e.key) {
				case 'Escape':
					closeViewer();
					break;
				case 'ArrowLeft':
					navigateImage('prev');
					break;
				case 'ArrowRight':
					navigateImage('next');
					break;
				default:
					break;
			}
		},
		[viewerIndex, allImages.length]
	);

	useEffect(() => {
		if (viewerIndex !== null) {
			window.addEventListener('keydown', handleKeyDown);
			document.body.style.overflow = 'hidden';
		}

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			document.body.style.overflow = 'unset';
		};
	}, [viewerIndex, handleKeyDown]);

	const getFullImageUrl = (filePath: string) => {
		return `https://image.tmdb.org/t/p/original${filePath}`;
	};

	// const [expandImg, setExpandImg] = useState<boolean>(false);

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
				alt="mediaImg"
				loading="lazy"
				onLoad={(e) => (e.currentTarget.style.opacity = '1')}
			/>

			<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
				<div className="text-white text-center p-2">
					<p className="font-bold">{mediaImg.type === 'backdrop' ? 'Backdrop' : 'Poster'}</p>
					<p className="text-sm">
						{mediaImg.width}×{mediaImg.height}
					</p>
				</div>
				<Expand
					onClick={openViewer}
					className="absolute top-2 right-2 text-white cursor-pointer hover:scale-110 transition-transform"
					size={22}
				/>
			</div>

			{/* Image Viewer Modal */}
			{viewerIndex !== null && (
				<div
					className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-90 transition-opacity duration-300 ${
						isViewerClosing ? 'opacity-0' : 'opacity-100'
					}`}
					onClick={closeViewer}>
					<div
						className="relative w-full max-w-xl lg:max-w-3xl xl:max-w-5xl max-h-[90vh]"
						onClick={(e) => e.stopPropagation()}>
						<img
							className="w-full h-full max-h-[90vh] object-contain opacity-0 transition-opacity duration-300"
							src={getFullImageUrl(allImages[viewerIndex].file_path)}
							alt={`${allImages[viewerIndex].type} image ${viewerIndex + 1}`}
							onLoad={(e) => (e.currentTarget.style.opacity = '1')}
						/>
					</div>

					{allImages.length > 1 && (
						<>
							<button
								className="absolute left-4 top-[80%] -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 z-10 hover:bg-opacity-80 transition-all"
								onClick={(e) => {
									e.stopPropagation();
									navigateImage('prev');
								}}
								aria-label="Previous image">
								<ChevronLeft size={30} />
							</button>
							<button
								className="absolute right-4 top-[80%] -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 z-10 hover:bg-opacity-80 transition-all"
								onClick={(e) => {
									e.stopPropagation();
									navigateImage('next');
								}}
								aria-label="Next image">
								<ChevronRight size={30} />
							</button>
						</>
					)}

					<div className="absolute top-4 left-4 text-white bg-black bg-opacity-50 py-1 px-3 rounded-md z-10">
						{allImages.length > 1 && (
							<span className="ml-2">
								({viewerIndex + 1} of {allImages.length})
							</span>
						)}
					</div>

					<button
						className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 z-10 hover:bg-opacity-80 transition-all"
						onClick={(e) => {
							e.stopPropagation();
							closeViewer();
						}}
						aria-label="Close viewer">
						<X size={30} />
					</button>
				</div>
			)}
		</div>
	);
};

export { MediaImageContainer };
