import { GenreInterface } from '@/types/genre-interface';
import { MovieDetailInterface, TVDetailInterface } from '@/services/media-detail/types';
import { MediaImagesInterface } from '@/services/media-images/types';
import { MediaVideosResultInterface } from '@/services/media-videos/types';
import { MovieInterface, TVInterface } from '@/types/movie-and-tv-interface';
import { MediaTypeT } from '@/types/media-type';
import { MediaReviewInterface } from '@/services/reviews/types';

interface MediaDetailPropsInterface {
	mediaDetail: MovieDetailInterface | TVDetailInterface;
	mediaDetailVideos: MediaVideosResultInterface[];
	mediaImages: MediaImagesInterface;
	similarGenres: GenreInterface[];
	similarMedia: MovieInterface[] | TVInterface[];
	mediaReviews: MediaReviewInterface;
	isMovie: (media: MovieDetailInterface | TVDetailInterface) => media is MovieDetailInterface;
	handleSaveMedia: (
		type: MediaTypeT,
		media: MovieInterface | TVInterface | MovieDetailInterface | TVDetailInterface
	) => (event: React.MouseEvent<HTMLSpanElement>) => void;
	showTrailer: boolean;
	setShowTrailer: React.Dispatch<React.SetStateAction<boolean>>;
	videoKey: string | undefined;
	mediaType: MediaTypeT;
}

export { MediaDetailPropsInterface };
