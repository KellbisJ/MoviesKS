import React from 'react';
import { Link } from 'react-router-dom';
import { CreateSimilarGenresInterface } from '../../types/create-similar-genres-interface';

const CreateSimilarGenres: React.FC<CreateSimilarGenresInterface> = ({ genres, type }) => {
	return genres.map((genre) => (
		<div key={genre.id} className="flex justify-center items-center content-center flex-wrap w-full">
			<Link
				to={`/${type}/category/${genre.id}`}
				className="flex flex-col items-center justify-center text-decoration-none text-xs p-0.5 rounded-md transition duration-300 ease-in-out flex-1 min-w-[40px] min-h-[38px] max-w-full break-words text-center shadow-md lg:bg-inherit dark:lg:bg-inherit bg-fuchsia-700 dark:bg-indigo-700 hover:bg-fuchsia-700 dark:hover:bg-indigo-800 hover:text-white text-white lg:text-black dark:lg:text-white font-bold">
				{genre.name}
			</Link>
		</div>
	));
};

export { CreateSimilarGenres };
