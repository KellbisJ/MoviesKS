import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TrailerMedia = ({ isOpen, onClose, videoKey }) => {
	if (!isOpen) return null;
	return ReactDOM.createPortal(
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-1000">
			<div className="relative w-[80%] max-w-[800px] bg-[#050d18] p-5 rounded-lg shadow-lg flex flex-col items-center">
				<button
					className="flex justify-center items-center absolute -bottom-10 sm:-bottom-14 left-1/2 -translate-x-1/2 bg-white rounded-full text-center border-none w-10 h-10 transition duration-300 ease-in-out transform hover:scale-110 shadow-md cursor-pointer text-black text-lg"
					onClick={onClose}>
					<FontAwesomeIcon icon={'times'} />
				</button>
				{videoKey && (
					<iframe
						width="560"
						height="315"
						src={`https://www.youtube.com/embed/${videoKey}`}
						title="Trailer"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
						className="w-full h-64 lg:h-[450px] border-none rounded-lg md:h-80"></iframe>
				)}
			</div>
		</div>,
		document.body
	);
};

export { TrailerMedia };
