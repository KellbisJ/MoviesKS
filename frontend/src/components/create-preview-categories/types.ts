import { GenreInterface } from '@/types/genre-interface';

interface CreatePreviewCategoriesPropsInterface {
	categories: GenreInterface[];
	onCategoryClick: (genreId: string) => void;
	onCloseModal?: () => void;
}

export { CreatePreviewCategoriesPropsInterface };
