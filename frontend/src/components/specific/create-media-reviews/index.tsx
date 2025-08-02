import { useValidMediaType } from '@/hooks/use-valid-media-type';
import { getMediaReviews } from '@/services/reviews';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthorReview } from '@/services/media-reviews/types';

const createMediaReviews = (): React.JSX.Element => {
	const { id } = useParams();

	const mediaId = id || '';

	const type = useValidMediaType();

	const [reviews, setReviews] = useState<AuthorReview[]>();

	useEffect(() => {
		const fetchMediaReviews = async () => {
			const req = await getMediaReviews(type, mediaId);
			const reviewsData = req.results;
			setReviews(reviewsData);
		};
	}, []);

	return <></>;
};
