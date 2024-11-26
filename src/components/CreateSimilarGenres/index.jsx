import React from 'react';
import '../CreatePreviewCategories/CategoriesPreviewContainer.css';
import { Link } from 'react-router-dom';

const createSimilarGenres = (genres) => {
	return genres.map((genre) => (
		<div key={genre.id} className="categoriesContainer">
			<Link className="categoryItem">{genre.name}</Link>
		</div>
	));
};

export { createSimilarGenres };
