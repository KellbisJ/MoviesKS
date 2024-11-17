import React from 'react';
import '../styles/categoriesContainer.css';

function CreatePreviewCategories(categories) {
	return categories.map((category) => (
		<div key={category.id} className="categoryContainer">
			<h4 className="categoriesTitle">{category.name}</h4>
		</div>
	));
}

export { CreatePreviewCategories };
