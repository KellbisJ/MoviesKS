import React from 'react';
import { useNavigate } from 'react-router-dom';

const MediaSkeleton = () => {
	const count = 20;
	return (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 p-6 lg:p-8">
			{Array.from({ length: count }, (_, index) => (
				<div
					key={index}
					className="w-full h-80 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 animate-pulse rounded-lg shadow-lg cursor-pointer p-2"></div>
			))}
		</div>
	);
};

const MediaNullSkeleton = ({ data, type, title }) => {
	const navigate = useNavigate();
	const handleNavigation = (data) => {
		const idParam = data.id;
		navigate(`/${type}/detail/${idParam}`);
	};
	return (
		<div
			className="w-full h-80 bg-gray-800 rounded-lg shadow-lg cursor-pointer flex justify-center items-center p-4 text-center text-gray-400 text-sm"
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
					className="flex justify-center items-center w-full bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 animate-pulse shadow-md cursor-pointer p-1 rounded-md min-w-[40px] min-h-[38px] max-w-full"></div>
			))}
		</>
	);
};

const BigPosterPathSkeleton = () => {
	return <div className="w-full h-full bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 animate-pulse rounded-lg"></div>;
};

const BigPosterPathNullSkeleton = () => {
	return <div className="w-full h-full bg-gray-800 rounded-lg flex justify-center items-center">No image available</div>;
};

const SimilarGenresNullSkeleton = () => {
	return (
		<div className="flex justify-center items-center bg-gray-800 rounded-md p-1 m-1 min-w-[40px] min-h-[38px] max-w-full text-center text-gray-400 text-sm">
			No similar genres available
		</div>
	);
};

const SimilarMediaSkeleton = () => {
	const count = 20;
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-2.5">
			{Array.from({ length: count }, (_, index) => (
				<div
					key={index}
					className="w-full h-80 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 animate-pulse rounded-lg shadow-lg cursor-pointer p-2"></div>
			))}
		</div>
	);
};

const MediaDetailSkeleton = () => {
	return (
		<div className="p-6 mt-18 mb-4 mx-1 rounded-lg">
			<div className="flex flex-wrap gap-5 mb-6">
				<div className="flex-1 min-w-[200px]">
					<div className="w-full pt-[150%] bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 animate-pulse rounded-lg"></div>
				</div>
				<div className="flex-2 flex flex-col gap-4 bg-gray-800 p-4 rounded-lg text-white">
					<div className="w-3/5 h-7 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 animate-pulse rounded-lg"></div>
					<div className="w-2/5 h-5 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 animate-pulse rounded-lg"></div>
					<div className="w-2/5 h-5 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 animate-pulse rounded-lg"></div>
					<div className="w-2/5 h-5 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 animate-pulse rounded-lg"></div>
					<div className="w-2/5 h-5 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 animate-pulse rounded-lg"></div>
					<div className="w-2/5 h-5 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 animate-pulse rounded-lg"></div>
				</div>
			</div>
			<div className="flex flex-wrap gap-6 mb-6">
				<div className="bg-gray-800 p-4 rounded-lg text-white w-4/5">
					<div className="w-full h-full bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 animate-pulse rounded-lg mb-4"></div>
				</div>
				<div className="flex-1 bg-gray-800 p-4 rounded-lg flex gap-2.5 min-w-0 flex-wrap justify-center h-50">
					<div className="w-full h-full bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 animate-pulse rounded-lg shadow-md"></div>
				</div>
			</div>
		</div>
	);
};

const MediaFavoritesVoid = () => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
			{Array.from({ length: 7 }, (_, index) => (
				<div
					key={index}
					className="w-full bg-gray-800 border-2 border-dashed border-gray-400 rounded-lg h-80 flex items-center justify-center text-gray-400 text-lg italic text-center relative transition-colors duration-300 hover:bg-gray-200 hover:border-gray-500">
					<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 text-base opacity-60">
						No Favorites Yet
					</div>
				</div>
			))}
		</div>
	);
};

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
};
