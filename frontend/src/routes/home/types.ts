import { MediaTypeT } from '@/types/media-type';
import { MovieInterface, TVInterface } from '@/types/movie-and-tv-interface';

type SectionMedia = MovieInterface[] | TVInterface[];
type HomeMediaItem = MovieInterface | TVInterface;

interface MediaSectionData {
	id: string;
	title: string;
	type: MediaTypeT;
	media: SectionMedia;
	failed: boolean;
}

interface HomeViewContentInterfaceProps {
	isLoadingMedia: boolean;
	mediaSectionData: MediaSectionData[];
	onRetry: () => void;
}

export type { HomeViewContentInterfaceProps, MediaSectionData, SectionMedia, HomeMediaItem };
