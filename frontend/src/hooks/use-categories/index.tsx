import React, { useState, useEffect } from 'react';
import { useValidMediaType } from '../use-valid-media-type';
import { getPreviewCategories } from '../../services/preview-categories';
import { GenreInterface } from '../../types/genre-interface';

const useCategories = () => {
	const mediaType = useValidMediaType();

	const [categories, setCategories] = useState<GenreInterface[]>([]);
	const [isMoviesModalOpen, setIsMoviesModalOpen] = useState(false);
	const [isGenresModalOpen, setIsGenresModalOpen] = useState(false);
	const [componentsLoading, setComponentsLoading] = useState(true);

	useEffect(() => {
		const fetchCategories = async () => {
			if (!mediaType) return;

			try {
				setComponentsLoading(true);
				const filteredCategories = await getPreviewCategories(mediaType);
				setCategories(filteredCategories.genres);
			} catch (error) {
				console.error('Error fetching categories:', error);
			} finally {
				setComponentsLoading(false);
			}
		};

		if (isMoviesModalOpen || isGenresModalOpen) {
			fetchCategories();
		}
	}, [mediaType, isMoviesModalOpen, isGenresModalOpen]);

	const toggleMoviesModal = () => {
		if (isGenresModalOpen) setIsGenresModalOpen(false);
		setIsMoviesModalOpen((prev) => !prev);
	};

	const toggleGenresModal = () => {
		if (isMoviesModalOpen) setIsMoviesModalOpen(false);
		setIsGenresModalOpen((prev) => !prev);
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
// Thanks DeepsSeek to solve this big and humongous issue
