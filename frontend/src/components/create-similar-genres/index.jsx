import React from 'react';
import { Link } from 'react-router-dom';

const CreateSimilarGenres = ({ genres, type }) => {
	return genres.map((genre) => (
		<div key={genre.id} className="flex justify-center items-center content-center flex-wrap w-full">
			<Link
				to={`/${type}/category/${genre.id}`}
				className="flex flex-col items-center justify-center text-decoration-none text-xs p-0.5 rounded-md transition duration-300 ease-in-out flex-1 min-w-[40px] min-h-[38px] max-w-full break-words text-center shadow-md">
				{genre.name}
			</Link>
		</div>
	));
};

export { CreateSimilarGenres };
