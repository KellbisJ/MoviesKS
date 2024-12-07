import React from 'react';
import './PageNotFound.css';

function PageNotFound() {
	return (
		<div className="PageNotFound">
			<h1>404 - Page Not Found</h1>
			<p>
				Vuelve al <a href="/">homepage</a>.
			</p>
		</div>
	);
}
export { PageNotFound };
