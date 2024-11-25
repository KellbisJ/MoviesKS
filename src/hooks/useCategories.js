import React, { useState, useEffect } from 'react';
import { getPreviewCategories } from '../services/PreviewCategories';
import { useMenuContext } from '../context/MenuContext';

const useCategories = () => {
	const { mediaType } = useMenuContext();
	const [categories, setCategories] = useState([]);
	const [isMoviesModalOpen, setIsMoviesModalOpen] = useState(false);
	const [isGenresModalOpen, setIsGenresModalOpen] = useState(false);

	useEffect(() => {
		async function fetchCategories() {
			const filteredCategories = await getPreviewCategories(mediaType);
			setCategories(filteredCategories);
			// console.log(filteredCategories);
		}
		if (isMoviesModalOpen || isGenresModalOpen) {
			fetchCategories();
		}
	}, [isMoviesModalOpen, isGenresModalOpen, mediaType]);

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
