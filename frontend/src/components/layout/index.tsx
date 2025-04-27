import { Outlet } from 'react-router-dom';
import { Menu } from './Menu';
import { NavbarHero } from './navbar-hero';
import { Footer } from './Footer';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
	NavbarSkeletonHero,
	NavbarSkeletonForwards,
} from '../utilities/loading-skeletons/NavbarSkeletons';

const Layout = (): React.JSX.Element => {
	const location = useLocation();
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const showNavbarHeroPaths: string[] = ['/', '/home', '/search/about', '/search/discover'];

	const showNavbarHero = showNavbarHeroPaths.some(
		(path) => location.pathname === path || location.pathname.startsWith(`${path}/`)
	);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsLoading(false);
		}, 200);
		return () => clearTimeout(timeout);
	}, []);

	useEffect(() => {
		// console.log(location);
		// console.log(showNavbarHero);
	}, [location]);

	return (
		<main className="bg-gray-100 dark:bg-[#1E1A2F] flex flex-col min-h-screen dark:bg-gradient-to-b transition">
			{showNavbarHero && isLoading && <NavbarSkeletonHero />}

			{!showNavbarHero && isLoading && <NavbarSkeletonForwards />}

			{showNavbarHero && !isLoading && <NavbarHero />}

			{!showNavbarHero && !isLoading && <Menu />}

			<div className="flex-1 min-h-screen lg:mt-16 lg:p-8">
				<Outlet />
			</div>
			<Footer />
		</main>
	);
};

export { Layout };
