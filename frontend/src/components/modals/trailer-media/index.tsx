import React from 'react';
import ReactDOM from 'react-dom';
import { CircleX } from 'lucide-react';
import { TrailerMediaModalPropsInterface } from '../../../types/modals/trailer-media-modal-interface';

const TrailerMedia: React.FC<TrailerMediaModalPropsInterface> = ({ isOpen, onClose, videoKey }) => {
	if (!isOpen) return null;
	return ReactDOM.createPortal(
		<div className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-[999]">
			<div className="relative w-[80%] max-w-[800px] bg-blue-100 dark:bg-[#363062] p-5 rounded-lg shadow-lg flex flex-col items-center">
				<CircleX
					size={32}
					className="absolute -bottom-10 sm:-bottom-14 left-1/2 -translate-x-1/2 text-center border-none transition duration-300 ease-in-out transform hover:scale-110 shadow-md cursor-pointer text-red-500"
					onClick={onClose}
				/>

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
