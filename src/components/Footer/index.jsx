import React from 'react';
import './Footer.css';

function Footer() {
	return (
		<footer className="footer">
			<p>
				This website was created using <a href="https://www.themoviedb.org/documentation/api">TheMovieDB API</a>
			</p>
			<div className="footerSocialIcons">
				<a href="https://instagram.com/salazarkellbis/" target="_blank" rel="noopener noreferrer">
					<i className="fab fa-instagram"></i>
				</a>
				<a href="https://github.com/KellbisJ/" target="_blank" rel="noopener noreferrer">
					<i className="fab fa-github"></i>
				</a>
				<a href="https://www.linkedin.com/in/kellbis-salazar-arnaez-3a844833a/" target="_blank" rel="noopener noreferrer">
					<i className="fab fa-linkedin"></i>
				</a>
				<a href="https://www.workana.com/freelancer/e072aa54f79255ba72152fc89c698d31" target="_blank" rel="noopener noreferrer">
					<img src="https://wkncdn.com/newx/assets/build/img/logos/mobile_logo.16f3a81b5.svg" alt="Workana" />
				</a>
			</div>
			<p>Kellbis Salazar</p>
		</footer>
	);
}

export { Footer };
