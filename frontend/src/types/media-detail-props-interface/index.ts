import { GenreInterface } from '../genre-interface';
import { MovieDetailInterface, TVDetailInterface } from '../media-detail-interface';
import { MediaImagesInterface } from '../media-images-interface';
import { MediaVideosResultInterface } from '../media-videos-interface';
import { MovieInterface, TVInterface } from '../movie-and-tv-interface';

interface MediaDetailPropsInterface {
	mediaDetail: MovieDetailInterface | TVDetailInterface;
	mediaDetailVideos: MediaVideosResultInterface[];
	mediaImages: MediaImagesInterface;
	similarGenres: GenreInterface[];
	similarMedia: MovieInterface[] | TVInterface[];
	isMovie: (media: MovieDetailInterface | TVDetailInterface) => media is MovieDetailInterface;
	handleFavoriteClick: () => void;
	showTrailer: boolean;
	setShowTrailer: React.Dispatch<React.SetStateAction<boolean>>;
	videoKey: string | undefined;
	mediaType: string;
}

export { MediaDetailPropsInterface };
