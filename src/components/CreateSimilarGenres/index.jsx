import React from 'react';
import '../CreatePreviewCategories/CategoriesPreviewContainer.css';
import { Link } from 'react-router-dom';

const CreateSimilarGenres = ({ genres, type }) => {
	return genres.map((genre) => (
		<div key={genre.id} className="categoriesContainer">
			<Link to={`/${type}/category/${genre.id}`} className="categoryItem">
				{genre.name}
			</Link>
		</div>
	));
};

export { CreateSimilarGenres };
