import React from 'react';
import { Link } from 'react-router-dom';
import { CreateSimilarGenresInterface } from '../../types/create-similar-genres-interface';

const CreateSimilarGenres: React.FC<CreateSimilarGenresInterface> = ({ genres, type }) => {
	return genres.map((genre) => (
		<div key={genre.id} className="flex justify-center items-center content-center flex-wrap w-full">
			<Link
				to={`/${type}/all/category/${genre.id}`}
				className="flex flex-col items-center justify-center text-decoration-none text-xs p-0.5 rounded-md transition duration-300 ease-in-out flex-1 min-w-[40px] min-h-[38px] max-w-full break-words text-center shadow-md bg-gray-600 hover:bg-cyan-500 dark:hover:bg-cyan-500 text-white font-bold">
				{genre.name}
			</Link>
		</div>
	));
};

export { CreateSimilarGenres };
