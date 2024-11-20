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

export { SelectMovies, SelectGenres };
