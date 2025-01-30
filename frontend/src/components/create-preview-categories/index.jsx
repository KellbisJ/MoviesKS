import React from 'react';
// import './CategoriesPreviewContainer.css';
import { Link } from 'react-router-dom';

function CreatePreviewCategories(categories, onCategoryClick, onCloseModal) {
	return categories.map((category) => (
		<div
			key={category.id}
			className="flex justify-center items-center content-center flex-wrap w-full cursor-pointer rounded p-2 hover:bg-fuchsia-700 dark:hover:bg-indigo-700 transition"
			onClick={() => {
				onCategoryClick(category);
				onCloseModal();
			}}>
			<Link className="">{category.name}</Link>
		</div>
	));
}

export { CreatePreviewCategories };
