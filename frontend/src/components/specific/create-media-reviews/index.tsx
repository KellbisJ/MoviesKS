import { useEffect, useState } from 'react';
import { AuthorReview } from '@/services/reviews/types';
import { Star, ExternalLink } from 'lucide-react';

const CreateMediaReviews = ({
	mediaReviews,
}: {
	mediaReviews: AuthorReview[];
}): React.JSX.Element => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setIsLoading(false);
		}, 200);
		return () => clearTimeout(timeoutId);
	}, [mediaReviews]);

	const StarRating = ({ rating }: { rating?: number }) => {
		if (!rating) return null;

		const normalizedRating = rating / 2;
		const fullStars = Math.floor(normalizedRating);
		const hasHalfStar = normalizedRating - fullStars >= 0.5;
		const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

		return (
			<div className="flex items-center">
				<div className="flex">
					{/* Full stars */}
					{[...Array(fullStars)].map((_, i) => (
						<Star
							key={`full-${i}`}
							className="w-4 h-4 text-yellow-400 fill-current"
							strokeWidth={0}
						/>
					))}

					{hasHalfStar && (
						<div key="half" className="relative">
							<Star className="w-4 h-4 text-gray-300 fill-current" strokeWidth={0} />

							<div className="absolute top-0 left-0 overflow-hidden" style={{ width: '50%' }}>
								<Star className="w-4 h-4 text-yellow-400 fill-current" strokeWidth={0} />
							</div>
						</div>
					)}

					{[...Array(emptyStars)].map((_, i) => (
						<Star
							key={`empty-${i}`}
							className="w-4 h-4 text-gray-300 fill-current"
							strokeWidth={0}
						/>
					))}
				</div>
				<span className="ml-2 text-sm font-medium text-gray-500 dark:text-stone-100">{rating}</span>
			</div>
		);
	};

	const formatDate = (dateString: string) => {
		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		};
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	return (
		<div className="w-full max-w-3xl mx-auto py-8">
			{isLoading ? (
				<div className="flex flex-col gap-8 animate-pulse my-16">
					{[...Array(3)].map((_, i) => (
						<div key={i} className="bg-white dark:bg-gray-600 rounded-xl shadow-sm p-6 mt-18">
							<div className="flex justify-between">
								<div className="flex items-center space-x-3">
									<div className="bg-gray-200 dark:bg-blue-100  rounded-full h-10 w-10"></div>
									<div className="space-y-2">
										<div className="h-4 bg-gray-200 dark:bg-blue-100  rounded w-24"></div>
										<div className="h-4 bg-gray-200 dark:bg-blue-100  rounded w-16"></div>
									</div>
								</div>
								<div className="h-4 bg-gray-200 dark:bg-blue-100  rounded w-20"></div>
							</div>
							<div className="mt-4 space-y-3">
								<div className="h-5 bg-gray-200 dark:bg-blue-100  rounded w-3/4"></div>
								<div className="h-4 bg-gray-200 dark:bg-blue-100  rounded"></div>
								<div className="h-4 bg-gray-200 dark:bg-blue-100  rounded w-5/6"></div>
							</div>
						</div>
					))}
				</div>
			) : !isLoading && mediaReviews.length === 0 ? (
				<div className="bg-blue-100 dark:bg-gray-500 text-gray-700 dark:text-stone-100 p-4 rounded-lg">
					<p>No reviews available for this media.</p>
				</div>
			) : (
				<>
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-2xl font-bold text-gray-900 dark:text-stone-100">User Reviews</h2>
						<div className="text-sm text-gray-500 dark:text-stone-100">
							{mediaReviews.length} reviews
						</div>
					</div>

					<div className="space-y-6 w-full max-w-3xl">
						{mediaReviews.map((review) => (
							<div
								key={review.id}
								className="bg-white dark:bg-gray-600 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 hover:shadow-md dark:hover:shadow-lg transition-shadow">
								<div className="flex justify-between items-start">
									<div className="flex items-center">
										{review.author_details.avatar_path ? (
											<img
												src={`https://image.tmdb.org/t/p/w64_and_h64_face${review.author_details.avatar_path}`}
												alt={review.author_details.name || review.author}
												className="w-10 h-10 rounded-full object-cover"
											/>
										) : (
											<div className="bg-gray-100 border-2 rounded-full w-10 h-10 flex items-center justify-center">
												<span className="text-gray-400 text-lg">
													{review.author_details.name?.charAt(0) || review.author.charAt(0)}
												</span>
											</div>
										)}
										<div className="ml-3">
											<h3 className="font-semibold text-gray-900 dark:text-stone-50">
												{review.author_details.name || review.author}
											</h3>
											{review.author_details.username && (
												<p className="text-sm text-gray-500 dark:text-stone-100">
													@{review.author_details.username}
												</p>
											)}
										</div>
									</div>

									<div className="text-right">
										<span className="text-sm text-gray-500 dark:text-stone-100">
											{formatDate(review.created_at)}
										</span>
										{review.updated_at !== review.created_at && (
											<p className="text-xs text-gray-400 dark:text-gray-300  mt-1">(Edited)</p>
										)}
									</div>
								</div>

								<div className="mt-4">
									<StarRating rating={review.author_details.rating} />
								</div>

								<div className="mt-4">
									<p className="text-gray-700 dark:text-stone-100 whitespace-pre-line break-words">
										{review.content}
									</p>
								</div>

								<div className="mt-4">
									<a
										href={review.url}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center text-cyan-500 hover:underline text-sm">
										<ExternalLink className="w-4 h-4 mr-1" />
										View original review
									</a>
								</div>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export { CreateMediaReviews };
