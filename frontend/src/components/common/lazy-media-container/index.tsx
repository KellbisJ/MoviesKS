import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { MediaContainer } from '../media-container';
import { SingleMediaSkeleton } from '@/components/utilities/loading-skeletons';
import { LazyMediaContainerProps } from './types';
import { MediaImageContainer } from '../media-image-container';

const LazyMediaContainer: React.FC<LazyMediaContainerProps> = ({
	media_,
	type,
	containerType,
	images,
	colSpan,
	imgUrl,
	mediaImg,
}) => {
	const pxIntersection =
		containerType === 'Normal' ? '0px 0px' : containerType === 'Images' ? '0px 0px' : '200px 0px';

	const { ref, inView } = useInView({
		triggerOnce: true,
		rootMargin: pxIntersection,
	});

	const [isLoaded, setIsLoaded] = useState<boolean>(false);

	const containerStyles =
		containerType === 'Normal'
			? 'w-full h-36 md:h-80 xl:h-[400px] transition-opacity duration-500'
			: containerType === 'Minimal'
			? 'flex-shrink-0 w-32 h-48 md:w-48 md:h-60 2xl:w-60 2xl:h-80'
			: containerType === 'Similar'
			? 'w-full h-36 md:h-80 xl:h-[400px] transition-opacity duration-500'
			: containerType === 'Images'
			? 'relative overflow-hidden rounded-lg shadow-lg group w-full h-full'
			: '';

	const dynamicStyles = {
		...(colSpan !== undefined && { gridColumn: `span ${colSpan}` }),
		...(mediaImg?.aspect_ratio && { aspectRatio: mediaImg.aspect_ratio }),
	};

	const variantForMediaContainer = containerType === 'Minimal' ? 'Minimal' : 'Default';

	useEffect(() => {
		if (inView) {
			const timer = setTimeout(() => {
				setIsLoaded(true);
			}, 150);

			return () => clearTimeout(timer);
		}
	}, [inView]);
	const renderContent = () => {
		if (!inView || !isLoaded) {
			return <SingleMediaSkeleton />;
		}

		if (containerType === 'Normal' || containerType === 'Similar' || containerType === 'Minimal') {
			if (media_ && type) {
				return <MediaContainer media_={media_} type={type} variant={variantForMediaContainer} />;
			}
			return <div className="text-red-500">Missing media or type</div>;
		}

		if (containerType === 'Images') {
			if (images) {
				return <MediaImageContainer mediaImg={mediaImg} colSpan={colSpan} imgUrl={imgUrl} />;
			}
			return <div className="text-red-500">No images available</div>;
		}

		return <div className="text-red-500">Unhandled container type</div>;
	};

	return (
		<div ref={ref} className={containerStyles} style={dynamicStyles}>
			{renderContent()}
		</div>
	);
};

export { LazyMediaContainer };
