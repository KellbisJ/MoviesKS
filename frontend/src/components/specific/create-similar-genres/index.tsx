import React from 'react';
import { Link } from 'react-router-dom';
import { CreateSimilarGenresInterface } from './types';

const CreateSimilarGenres: React.FC<CreateSimilarGenresInterface> = ({ genres, type }) => {
	return genres.map((genre) => (
		<Link
			key={genre.id}
			to={`/${type}/all/category/${genre.id}`}
			className="p-2 min-w-40 w-40 text-sm text-center rounded-full bg-gray-500 hover:bg-cyan-500 transition">
			{genre.name}
		</Link>
	));
};

export { CreateSimilarGenres };
