import { Link } from 'react-router-dom';
import { CreatePreviewCategoriesPropsInterface } from '../../types/create-preview-categories-interface';

const CreatePreviewCategories: React.FC<CreatePreviewCategoriesPropsInterface> = ({ categories, onCategoryClick, onCloseModal }) => {
	return categories.map((genre) => (
		<div
			key={genre.id}
			className="flex justify-center items-center content-center flex-wrap w-full cursor-pointer rounded p-2 bg-fuchsia-700 hover:bg-fuchsia-700 dark:hover:bg-indigo-700 transition dark:bg-indigo-700 sm:bg-none"
			onClick={() => {
        if (onCloseModal) {
          onCloseModal();
        }
        onCategoryClick(genre.id.toString())
			}}
		>
			<p>{genre.name}</p>
		</div>
	));
};

export { CreatePreviewCategories };