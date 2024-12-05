import React from 'react';
import './LoadingSkeletons.css';
import { useNavigate } from 'react-router-dom';

const MediaSkeleton = () => {
	const count = 20;
	return (
		<div className="mediaSkeletonsContainer">
			{Array.from({ length: count }, (_, index) => (
				<div key={index} className="mediaLoading"></div>
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
		<div className="mediaNullSkeleton" onClick={() => handleNavigation(data)}>
			No image available for: {title}
		</div>
	);
};

const CategoriesSkeleton = () => {
	const count = 16;
	return (
		<>
			{Array.from({ length: count }, (_, index) => (
				<div key={index} className="categoryLoading"></div>
			))}
		</>
	);
};

const BigPosterPathSkeleton = () => {
	return <div className="bigPosterPathSkeleton"></div>;
};

const BigPosterPathNullSkeleton = () => {
	return <div className="bigPosterPathNullSkeleton">No image available</div>;
};

const SimilarGenresNullSkeleton = () => {
	return <div className="similarGenresNullSkeleton">No similar genres available</div>;
};

const SimilarMediaSkeleton = () => {
	const count = 20;
	return (
		<div className="similarMediaSkeletonsContainer">
			{Array.from({ length: count }, (_, index) => (
				<div key={index} className="mediaLoading"></div>
			))}
		</div>
	);
};

const MediaDetailSkeleton = () => {
	return (
		<div className="mediaDetailSkeletonContainer">
			<div className="mediaDetailSkeletonHeader">
				<div className="mediaDetailImageContainer">
					<div className="bigPosterPathSkeleton"></div>
				</div>
				<div className="mediaDetailInformationSkeleton">
					<div className="titleSkeleton"></div>
					<div className="textSkeleton"></div>
					<div className="textSkeleton"></div>
					<div className="textSkeleton"></div>
					<div className="textSkeleton"></div>
					<div className="textSkeleton"></div>
					<div className="textSkeleton"></div>
				</div>
			</div>
			<div className="mediaDetailInformationOverviewSkeleton">
				<div className="mediaOverviewSkeleton">
					<div className="overviewSkeleton"></div>
				</div>
				<div className="mediaDetailSimilarGenresSkeleton">
					<div className="similarGenresSkeleton"></div>
				</div>
			</div>
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
};
