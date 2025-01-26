import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SelectMovies = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null;

	return ReactDOM.createPortal(
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-1000">
			<div className="bg-[#151b23] rounded-lg shadow-md overflow-y-scroll min-h-[70vh] max-h-[70vh] w-[80%] mx-auto p-5">
				<button
					className="flex justify-center items-center absolute bottom-2.5 left-1/2 -translate-x-1/2 bg-white rounded-full text-center border-none w-10 h-10 transition duration-300 ease-in-out transform hover:scale-110 shadow-md cursor-pointer text-black text-lg"
					onClick={onClose}>
					<FontAwesomeIcon icon={'times'} />
				</button>
				{children}
			</div>
		</div>,
		document.body
	);
};

const SelectGenres = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null;

	return ReactDOM.createPortal(
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-1000">
			<div className="bg-[#151b23] rounded-lg shadow-md overflow-y-scroll min-h-[70vh] max-h-[70vh] w-[80%] mx-auto p-5">
				<button
					className="flex justify-center items-center absolute bottom-2.5 left-1/2 -translate-x-1/2 bg-white rounded-full text-center border-none w-10 h-10 transition duration-300 ease-in-out transform hover:scale-110 shadow-md cursor-pointer text-black text-lg"
					onClick={onClose}>
					<FontAwesomeIcon icon={'times'} />
				</button>
				{children}
			</div>
		</div>,
		document.body
	);
};
export { SelectMovies, SelectGenres };
