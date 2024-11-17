import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/menu.css';

function Menu() {
	return (
		<nav className="navBar">
			<ul className="navList">
				<li className="navItem">
					<p>...</p>
				</li>
				<li className="navItem">
					<Link className="navLink" to="/">
						MoviesKS
					</Link>
				</li>
				<li className="navItem">
					<button>Serach</button>
				</li>
			</ul>
		</nav>
	);
}
export { Menu };
