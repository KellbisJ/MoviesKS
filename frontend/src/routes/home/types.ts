import { MediaTypeT } from '@/types/media-type';
import { MovieInterface, TVInterface } from '@/types/movie-and-tv-interface';

interface MediaSectionData {
	title: string;
	type: MediaTypeT;
	media: MovieInterface[] | TVInterface[];
}

interface HomeViewContentInterfaceProps {
	isLoadingComponents: boolean;
	isLoadingMedia: boolean;
	isErrorCatched: boolean;

	mediaSectionData: MediaSectionData[];
}
export { HomeViewContentInterfaceProps };
