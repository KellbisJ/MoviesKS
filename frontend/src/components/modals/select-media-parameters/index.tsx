import React from 'react';
import ReactDOM from 'react-dom';
import { CircleX } from 'lucide-react';
import { SelectMediaParametersModalInterface } from './types';

const SelectMediaParameters: React.FC<SelectMediaParametersModalInterface> = ({
	isOpen,
	onClose,
	children,
}) => {
	if (!isOpen) return null;

	return ReactDOM.createPortal(
		<div className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-[999]">
			<div className="bg-gray-600 rounded-lg shadow-md overflow-y-scroll min-h-[70vh] max-h-[70vh] w-[80%] mx-auto p-5">
				<CircleX
					size={32}
					className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center border-none transition duration-300 ease-in-out transform hover:scale-110 shadow-md cursor-pointer text-red-500"
					onClick={onClose}
				/>
				{children}
			</div>
		</div>,
		document.body
	);
};
export { SelectMediaParameters };
