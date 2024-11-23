import React, { useEffect, useState } from 'react';
import { getPreviewCategories } from '../services/PreviewCategories';
import { CreatePreviewCategories } from '../components/CreatePreviewCategories';

function Categories() {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		async function fetchCategories() {
			const previewCategories = await getPreviewCategories();
			setCategories(previewCategories);
		}
		fetchCategories();
	}, []);
	const categoryElements = CreatePreviewCategories(categories);
	return <section className="trendingPreviewCategoriesContainer">{categoryElements}</section>;
}

export { Categories };
