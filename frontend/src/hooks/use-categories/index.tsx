import React, { useState, useEffect } from 'react';
import { getPreviewCategories } from '../../services/preview-categories';
import { GenreInterface } from '../../types/genre-interface';
import { useParams } from 'react-router-dom';

const useCategories = () => {
	const { type } = useParams();
	const mediaType = type as string;
	const [categories, setCategories] = useState<GenreInterface[]>([]);
	const [isMoviesModalOpen, setIsMoviesModalOpen] = useState<boolean>(false);
	const [isGenresModalOpen, setIsGenresModalOpen] = useState<boolean>(false);
	const [componentsLoading, setComponentsLoading] = useState(true);

	useEffect(() => {
		async function fetchCategories() {
			setComponentsLoading(true);
			const filteredCategories = await getPreviewCategories(mediaType);
			setCategories(filteredCategories);
			// console.log(filteredCategories);
			setComponentsLoading(false);
		}
		if (isMoviesModalOpen || isGenresModalOpen) {
			fetchCategories();
		}
	}, [type, isMoviesModalOpen, isGenresModalOpen]);

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

	return {
		categories,
		toggleMoviesModal,
		toggleGenresModal,
		isMoviesModalOpen,
		setIsMoviesModalOpen,
		isGenresModalOpen,
		setIsGenresModalOpen,
		componentsLoading,
	};
};

export { useCategories };
