import { Outlet } from 'react-router-dom';
import { Menu } from '../Menu';
import { NavbarHero } from '../navbar-hero';
import { Footer } from '../Footer';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Layout = (): React.JSX.Element => {
	const location = useLocation();

	const showNavbarHeroPaths: string[] = ['/', '/home', '/search/about', '/search/discover'];

	const showNavbarHero = showNavbarHeroPaths.some((path) => location.pathname === path || location.pathname.startsWith(`${path}/`));

	useEffect(() => {
		// console.log(location);
		// console.log(showNavbarHero);
	}, [location]);

	return (
		<main className="bg-gray-100 dark:bg-[#1E1A2F] flex flex-col min-h-screen dark:bg-gradient-to-b transition">
			{showNavbarHero ? <NavbarHero /> : <Menu />}

			<div className="flex-1 min-h-screen mt-16 p-6 lg:p-8">
				<Outlet />
			</div>
			<Footer />
		</main>
	);
};

export { Layout };
