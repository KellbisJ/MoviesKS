import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { MediaContainer } from '../media-container';
import { SingleMediaSkeleton } from '@/components/utilities/loading-skeletons';
import { LazyMediaContainerProps } from './types';

const LazyMediaContainer: React.FC<LazyMediaContainerProps> = ({ media_, type }) => {
	const { ref, inView } = useInView({
		triggerOnce: true,
		rootMargin: '0px 0px',
	});

	const [isLoaded, setIsLoaded] = useState<boolean>(false);

	useEffect(() => {
		if (inView) {
			const timer = setTimeout(() => {
				setIsLoaded(true);
			}, 150);

			return () => clearTimeout(timer);
		}
	}, [inView]); // this logic is to avoid abrupt flickering. When the content of the div below go from SingleMediaSkeleton to MediaContainer.

	return (
		<div ref={ref} className="w-full h-36 md:h-80 xl:h-[400px] transition-opacity duration-500">
			{inView && isLoaded ? (
				<MediaContainer media_={media_} type={type} />
			) : (
				<SingleMediaSkeleton />
			)}
		</div>
	);
};

export { LazyMediaContainer };
