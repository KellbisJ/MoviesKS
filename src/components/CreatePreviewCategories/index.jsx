import React from 'react';
import './CategoriesPreviewContainer.css';
import { Link } from 'react-router-dom';

function CreatePreviewCategories(categories) {
	return categories.map((category) => (
		<div key={category.id} className="categoriesContainer">
			<Link className="categoryItem">{category.name}</Link>
		</div>
	));
}

export { CreatePreviewCategories };
