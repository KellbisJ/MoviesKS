import React, { useState, useEffect } from 'react';
import { getPreviewCategories } from '../services/PreviewCategories';

const useCategories = () => {
	const [categories, setCategories] = useState([]);
	const [isMoviesModalOpen, setIsMoviesModalOpen] = useState(false);
	const [isGenresModalOpen, setIsGenresModalOpen] = useState(false);

	useEffect(() => {
		async function fetchCategories() {
			const previewCategories = await getPreviewCategories();
			setCategories(previewCategories);
		}
		if (isMoviesModalOpen || isGenresModalOpen) {
			fetchCategories();
		}
	}, [isMoviesModalOpen, isGenresModalOpen]);

	const toggleMoviesModal = () => {
		if (isGenresModalOpen) {
			setIsGenresModalOpen(false);
		}
		setIsMoviesModalOpen(!isMoviesModalOpen);
	};
	const toggleGenresModal = () => {
		if (isMoviesModalOpen) {
			setIsMoviesModalOpen(false);
		}
		setIsGenresModalOpen(!isGenresModalOpen);
	};

	return { categories, toggleMoviesModal, toggleGenresModal, isMoviesModalOpen, isGenresModalOpen };
};

export { useCategories };
