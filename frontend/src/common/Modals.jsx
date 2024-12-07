import React from 'react';
import ReactDOM from 'react-dom';
import './Modals.css';
import '../services/icons.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SelectMovies = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null;

	return ReactDOM.createPortal(
		<div className="modal selectMoviesModal">
			<div className="modalContentMovies">
				<button className="closeModal" onClick={onClose}>
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
		<div className="modal SelectGenresModal">
			<div className="modalContentGenres">
				<button className="closeModal" onClick={onClose}>
					<FontAwesomeIcon icon={'times'} />
				</button>
				{children}
			</div>
		</div>,
		document.body
	);
};

const TrailerMedia = ({ isOpen, onClose, videoKey }) => {
	if (!isOpen) return null;
	return ReactDOM.createPortal(
		<div className="modal trailerMediaModal">
			<div className="modalContentTrailer">
				<button className="closeModal closeModalTrailer" onClick={onClose}>
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
						allowFullScreen></iframe>
				)}
			</div>
		</div>,
		document.body
	);
};

export { SelectMovies, SelectGenres, TrailerMedia };
