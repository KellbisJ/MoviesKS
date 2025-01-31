import React from 'react';
import ReactDOM from 'react-dom';
import { FaWindowClose } from 'react-icons/fa';

const SelectMediaParameters = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null;

	return ReactDOM.createPortal(
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
			<div className="bg-fuchsia-900 dark:bg-gray-700 rounded-lg shadow-md overflow-y-scroll min-h-[70vh] max-h-[70vh] w-[80%] mx-auto p-5 relative">
				<FaWindowClose
					onClick={onClose}
					className="absolute top-4 right-4 transition duration-300 ease-in-out transform hover:scale-125 cursor-pointer text-2xl text-white dark:text-gray-300 outline-none"
				/>
				{children}
			</div>
		</div>,
		document.body
	);
};
export { SelectMediaParameters };
