import { useNavigate } from 'react-router-dom';
import { MovieInterface, TVInterface } from '../../types/movie-and-tv-interface';
import { MediaNullSkeletonPropsInterface } from '../../types/media-null-skeleton-props-interface';
import { MovieDetailInterface, TVDetailInterface } from '@/types/media-detail-interface';

const MediaSkeleton = () => {
	const count = 20;
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5 lg:gap-8">
			{Array.from({ length: count }, (_, index) => (
				<div key={index} className="w-full h-60 md:h-80 2xl:h-[400px] bg-gray-700 animate-pulse rounded-lg shadow-lg cursor-pointer p-2"></div>
			))}
		</div>
	);
};

const MediaNullSkeleton: React.FC<MediaNullSkeletonPropsInterface> = ({ data, type, title }) => {
	const navigate = useNavigate();
	const handleNavigation = (data: MovieInterface | TVInterface | MovieDetailInterface | TVDetailInterface) => {
		const idParam = data.id;
		navigate(`/${type}/detail/${idParam}`);
	};
	return (
		<div
			className="w-full h-60 md:h-80 2xl:h-[400px] bg-gray-700 rounded-lg shadow-lg cursor-pointer flex justify-center items-center p-4 text-center text-gray-100 text-sm"
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

const BigPosterPathSkeleton = () => {
	return <div className="w-full h-full bg-gray-700 animate-pulse rounded-lg"></div>;
};

const BigPosterPathNullSkeleton = () => {
	return <div className="w-full h-full bg-gray-700 rounded-lg flex justify-center items-center">No image available</div>;
};

const SimilarGenresNullSkeleton = () => {
	return (
		<div className="flex justify-center items-center bg-gray-100 dark:bg-gray-700 rounded-md p-1 m-1 min-w-[40px] min-h-[38px] max-w-full text-center text-gray-700 dark:text-stone-100 text-sm">
			No similar genres available
		</div>
	);
};

const SimilarMediaSkeleton = () => {
	const count = 20;
	return (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
			{Array.from({ length: count }, (_, index) => (
				<div key={index} className="w-full h-80 bg-gray-700 animate-pulse rounded-lg shadow-lg cursor-pointer p-2"></div>
			))}
		</div>
	);
};

const MediaDetailSkeleton = () => {
	return (
		<div className="rounded-lg">
			<div className="flex flex-wrap gap-5 mb-6 flex-col items-center sm:flex-row md:items-normal">
				<div className="flex-1 w-full h-[460px] p-4 rounded-lg bg-blue-100 dark:bg-[#14273c] flex justify-center">
					<div className="min-w-64 sm:max-w-[320px] h-[420px] bg-gray-700 animate-pulse rounded-lg"></div>
				</div>
				<div className="flex-[2] flex flex-col gap-4 bg-blue-100 dark:bg-[#14273c] p-4 rounded-lg w-full sm:h-[460px]">
					<div className="w-2/5 h-7 bg-gray-700 animate-pulse rounded-lg"></div>
					<div className="w-2/5 h-5 bg-gray-700 animate-pulse rounded-lg"></div>
					<div className="w-2/5 h-5 bg-gray-700 animate-pulse rounded-lg"></div>
					<div className="w-2/5 h-5 bg-gray-700 animate-pulse rounded-lg"></div>
					<div className="w-2/5 h-5 bg-gray-700 animate-pulse rounded-lg"></div>
					<div className="w-2/5 h-5 bg-gray-700 animate-pulse rounded-lg"></div>
				</div>
			</div>
			<div className="flex flex-col sm:flex-row flex-wrap gap-6 mb-6">
				<div className="bg-blue-100 dark:bg-[#14273c] h-32 p-4 rounded-lg text-white w-full sm:w-4/5">
					<div className="w-full h-full bg-gray-700 animate-pulse rounded-lg mb-4"></div>
				</div>
				<div className="flex-[2] h-32 bg-blue-100 dark:bg-[#14273c] p-4 rounded-lg gap-2.5 min-w-0 flex-wrap justify-center w-1/5 hidden sm:flex">
					<div className="w-full h-full bg-gray-700 animate-pulse rounded-lg shadow-md"></div>
				</div>
			</div>
		</div>
	);
};

const MediaFavoritesVoid = () => {
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5 lg:gap-8">
			{Array.from({ length: 3 }, (_, index) => (
				<div
					key={index}
					className="w-full bg-gray-700 border-2 border-dashed border-gray-400 rounded-lg h-80 flex items-center justify-center text-gray-400 text-lg italic text-center relative transition-colors duration-300 hover:bg-gray-200 hover:border-gray-500">
					<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 text-base opacity-60">
						No Favorites Yet
					</div>
				</div>
			))}
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

const MediaNullSkeletonHome: React.FC<MediaNullSkeletonPropsInterface> = ({ data, type, title }) => {
	const navigate = useNavigate();
	const handleNavigation = (data: MovieInterface | TVInterface | MovieDetailInterface | TVDetailInterface) => {
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
	<div className="w-full h-60 md:h-80 2xl:h-[400px] bg-gray-700 animate-pulse rounded-lg shadow-lg cursor-pointer p-2"></div>
);

export {
	MediaSkeleton,
	MediaNullSkeleton,
	CategoriesSkeleton,
	BigPosterPathSkeleton,
	BigPosterPathNullSkeleton,
	SimilarGenresNullSkeleton,
	SimilarMediaSkeleton,
	MediaDetailSkeleton,
	MediaFavoritesVoid,
	MediaHomeSkeleton,
	MediaHomeErrorSkeleton,
	SingleMediaSkeleton,
	MediaNullSkeletonHome,
};
