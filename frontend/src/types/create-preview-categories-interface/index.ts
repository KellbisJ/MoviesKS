import { GenreInterface } from '../genre';

interface CreatePreviewCategoriesPropsInterface {
	categories: GenreInterface[];
	onCategoryClick: (genreId: string) => void;
	onCloseModal?: () => void;
}

export { CreatePreviewCategoriesPropsInterface };
