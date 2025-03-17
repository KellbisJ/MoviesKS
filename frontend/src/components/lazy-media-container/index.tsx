import React from 'react';
import { useInView } from 'react-intersection-observer';
import { MediaContainer } from '../media-container';
import { SingleMediaSkeleton } from '../loading-skeletons';
import { MovieInterface, TVInterface } from '@/types/movie-and-tv-interface';
import { MovieDetailInterface, TVDetailInterface } from '@/types/media-detail-interface';

interface LazyMediaContainerProps {
	media_: MovieInterface | TVInterface | MovieDetailInterface | TVDetailInterface;
	type: string;
}

const LazyMediaContainer: React.FC<LazyMediaContainerProps> = ({ media_, type }) => {
	const { ref, inView } = useInView({
		triggerOnce: true,
		rootMargin: '-20px 0px',
	});

	return (
		<div ref={ref} className="w-full h-full aspect-[2/3]">
			{inView ? <MediaContainer media_={media_} type={type} /> : <SingleMediaSkeleton />}
		</div>
	);
};

export { LazyMediaContainer };
