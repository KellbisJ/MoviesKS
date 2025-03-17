import { Link } from 'react-router-dom';
import { CreatePreviewCategoriesPropsInterface } from '../../types/create-preview-categories-interface';

const CreatePreviewCategories: React.FC<CreatePreviewCategoriesPropsInterface> = ({ categories, onCategoryClick, onCloseModal }) => {
	return categories.map((genre) => (
		<div
			key={genre.id}
			className="flex justify-center items-center content-center flex-wrap w-full cursor-pointer rounded p-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-cyan-500 dark:hover:bg-cyan-500 transition-all"
			onClick={() => {
				if (onCloseModal) {
					onCloseModal();
				}
				onCategoryClick(genre.id.toString());
			}}>
			<p>{genre.name}</p>
		</div>
	));
};

export { CreatePreviewCategories };
