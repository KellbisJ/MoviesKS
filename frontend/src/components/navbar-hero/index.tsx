import { Link } from 'react-router-dom';
import { useDarkMode } from '@/hooks/use-dark-mode';
import { House, Film, Tv, Save, Sun, Moon } from 'lucide-react';

const NavbarHero = (): React.JSX.Element => {
	const [isDarkMode, setIsDarkMode] = useDarkMode();

	return (
		<nav className="bg-transparent">
			<div className="container mx-auto px-4 sm:px-6 py-3">
				<div className="flex items-start sm:items-center justify-between">
					{/* Mobile Navigation (left side) */}
					<div className="flex sm:hidden gap-4">
						{[
							{ to: '/', label: 'Home', icon: House },
							{ to: '/movies', label: 'Movies', icon: Film },
							{ to: '/tv', label: 'TV', icon: Tv },
							{ to: '/favorites', label: 'Saved', icon: Save },
						].map((item) => (
							<Link
								key={item.to}
								to={item.to}
								className="flex flex-col items-center gap-1 text-gray-600 hover:text-cyan-500 
                                   dark:text-gray-300 dark:hover:text-cyan-400 
                                   transition-colors duration-200 text-xs"
								aria-label={item.label}>
								<item.icon size={20} className="flex-shrink-0" />
								<span>{item.label}</span>
							</Link>
						))}
					</div>

					{/* Desktop*/}
					<h1 className="hidden sm:block text-xl font-bold text-gray-800 dark:text-gray-100 hover:text-cyan-500 transition-colors">
						<Link to="/">MoviesKS</Link>
					</h1>

					{/* Desktop Navigation (center) */}
					<div className="hidden sm:flex items-center gap-6">
						{[
							{ to: '/', label: 'Home', icon: House },
							{ to: '/movies', label: 'Movies', icon: Film },
							{ to: '/tv', label: 'TV Shows', icon: Tv },
							{ to: '/favorites', label: 'Saved', icon: Save },
						].map((item) => (
							<Link
								key={item.to}
								to={item.to}
								className="flex items-center gap-2 text-gray-600 hover:text-cyan-500 
                                   dark:text-gray-300 dark:hover:text-cyan-400 
                                   transition-colors duration-200 text-sm"
								aria-label={item.label}>
								<item.icon size={20} className="flex-shrink-0" />
								<span className="font-medium">{item.label}</span>
							</Link>
						))}
					</div>

					{/* Right side ( for both mobile/desktop) */}
					<div className="flex items-start sm:items-center">
						<button
							type="button"
							className="p-1.5 text-gray-600 hover:text-cyan-500 
                               dark:text-gray-300 dark:hover:text-cyan-400 
                               rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 
                               transition-colors duration-200"
							onClick={() => setIsDarkMode(!isDarkMode)}
							aria-label={isDarkMode ? 'Light mode' : 'Dark mode'}>
							{isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
};

export { NavbarHero };
