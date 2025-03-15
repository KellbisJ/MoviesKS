import { Outlet } from 'react-router-dom';
import { Menu } from '../Menu';
import { NavbarHero } from '../navbar-hero';
import { Footer } from '../Footer';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Layout = (): React.JSX.Element => {
	const location = useLocation();

	const showNavbarHeroPaths: string[] = ['/', '/home'];

	const showNavbarHero = showNavbarHeroPaths.includes(location.pathname);

	useEffect(() => {}, [location]);

	return (
		<main className="bg-gray-100 dark:bg-[#22092C]  flex flex-col min-h-screen dark:bg-gradient-to-b transition">
			{showNavbarHero ? <NavbarHero /> : <Menu />}

			<div className="flex-1 min-h-screen mt-16 p-6 lg:p-8">
				<Outlet />
			</div>
			<Footer />
		</main>
	);
};

export { Layout };
