import { useNavigate } from 'react-router-dom';
import { MovieInterface, TVInterface } from '../../types/movie-and-tv-interface';
import { MediaNullSkeletonPropsInterface } from './types';
import { MovieDetailInterface, TVDetailInterface } from '@/services/media-detail/types';

const MediaSkeleton = () => {
	const count = 20;
	return (
		<div className="max-w-[1536px] mx-auto">
			<div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
				{Array.from({ length: count }, (_, index) => (
					<div
						key={index}
						className="w-full h-36 md:h-80 xl:h-[400px] aspect-[2/3] bg-gray-700 animate-pulse rounded-lg shadow-lg cursor-pointer p-2"></div>
				))}
			</div>
		</div>
	);
};

const MediaNullSkeleton: React.FC<MediaNullSkeletonPropsInterface> = ({ data, type, title }) => {
	const navigate = useNavigate();
	const handleNavigation = (
		data: MovieInterface | TVInterface | MovieDetailInterface | TVDetailInterface
	) => {
		const idParam = data.id;
		navigate(`/${type}/detail/${idParam}`);
	};
	return (
		<div
			className="w-full h-60 md:h-80 xl:h-[400px] aspect-[2/3] bg-gray-700 rounded-lg shadow-lg cursor-pointer flex justify-center items-center p-4 text-center text-gray-100 text-sm"
			onClick={() => handleNavigation(data)}>
			No image available for: {title}
		</div>
	);
};

const CategoriesSkeleton = () => {
	const count = 16;
	return (
		<>
			{Array.from({ length: count }, (_, index) => (
				<div
					key={index}
					className="flex justify-center items-center w-full bg-gray-700 animate-pulse shadow-md cursor-pointer p-1 rounded-md min-w-[40px] min-h-[38px] max-w-full"></div>
			))}
		</>
	);
};

const BigPosterPathNullSkeleton = () => {
	return (
		<div className="w-full h-full aspect-[2/3] bg-gray-700 rounded-lg flex justify-center items-center">
			No image available
		</div>
	);
};

const SimilarGenresNullSkeleton = () => {
	return (
		<div className="flex justify-center items-center bg-gray-100 dark:bg-gray-700 rounded-md p-1 m-1 min-w-[40px] min-h-[38px] max-w-full text-center text-gray-700 dark:text-stone-100 text-sm">
			No similar genres available
		</div>
	);
};

// const SimilarMediaSkeleton = () => {
// 	const count = 20;
// 	return (
// 		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
// 			{Array.from({ length: count }, (_, index) => (
// 				<div key={index} className="w-full h-80 bg-gray-700 animate-pulse rounded-lg shadow-lg cursor-pointer p-2"></div>
// 			))}
// 		</div>
// 	);
// };

const MediaSavedVoid = () => {
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5 lg:gap-8 w-full">
			<div className="col-span-full w-full bg-gray-200 dark:bg-gray-700 border-2 border-dashed border-gray-400 rounded-lg h-80 flex items-center justify-center text-gray-500 dark:text-gray-400 italic">
				No Favorites Yet
			</div>
		</div>
	);
};

const MediaHomeSkeleton = () => {
	const count = 20;

	return (
		<div className="w-full overflow-x-auto scrollbar-minimal break-words bg-blue-100 dark:bg-[#14273c]">
			<div className="flex space-x-4 p-3">
				{Array.from({ length: count }, (_, index) => (
					<div
						key={index}
						className="flex-shrink-0 w-32 h-48 md:w-48 md:h-60 2xl:w-60 2xl:h-80 bg-gray-700 rounded-lg shadow-lg cursor-pointer p-2 text-red-500 animate-pulse"></div>
				))}
			</div>
		</div>
	);
};

const MediaHomeErrorSkeleton = () => {
	const count = 20;

	return (
		<div className="w-full overflow-x-auto scrollbar-minimal break-words bg-blue-100 dark:bg-[#14273c]">
			<div className="flex space-x-4 p-3">
				{Array.from({ length: count }, (_, index) => (
					<div
						key={index}
						className="flex-shrink-0 w-32 h-48 md:w-48 md:h-60 2xl:w-60 2xl:h-80 bg-gray-700 rounded-lg shadow-lg cursor-pointer p-2 text-red-500">
						Error loading this, check internet connection or reload the page.
					</div>
				))}
			</div>
		</div>
	);
};

const MediaNullSkeletonHome: React.FC<MediaNullSkeletonPropsInterface> = ({
	data,
	type,
	title,
}) => {
	const navigate = useNavigate();
	const handleNavigation = (
		data: MovieInterface | TVInterface | MovieDetailInterface | TVDetailInterface
	) => {
		const idParam = data.id;
		navigate(`/${type}/detail/${idParam}`);
	};
	return (
		<div
			className="w-32 h-48 md:w-48 md:h-60 2xl:w-60 2xl:h-80 bg-gray-700 rounded-lg shadow-lg cursor-pointer flex justify-center items-center p-4 text-center text-gray-100 text-sm"
			onClick={() => handleNavigation(data)}>
			No image available for: {title}
		</div>
	);
};

const SingleMediaSkeleton = () => (
	<div className="w-full h-36 md:h-80 xl:h-[400px] aspect-[2/3] bg-gray-700 animate-pulse rounded-lg shadow-lg cursor-pointer p-2"></div>
);

export {
	MediaSkeleton,
	MediaNullSkeleton,
	CategoriesSkeleton,
	BigPosterPathNullSkeleton,
	SimilarGenresNullSkeleton,
	// SimilarMediaSkeleton,
	MediaSavedVoid,
	MediaHomeSkeleton,
	MediaHomeErrorSkeleton,
	SingleMediaSkeleton,
	MediaNullSkeletonHome,
};
