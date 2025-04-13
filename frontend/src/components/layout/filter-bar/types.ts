import { GenreInterface } from '@/types/genre-interface';

interface FilterBarPropsInterface {
	isMobile: boolean;
	isMoviesModalOpen: boolean;
	isGenresModalOpen: boolean;
	toggleMoviesModal: () => void;
	toggleGenresModal: () => void;
	categories: GenreInterface[];
	componentsLoading: boolean;
}

export { FilterBarPropsInterface };
