import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider, Outlet } from 'react-router-dom';
import { MenuProvider } from './context/MenuContext';
import { Menu } from './components/Menu';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Movies } from './pages/Movies';
import { Categories } from './pages/Categories';
import { MoviesFavorites } from './pages/MoviesFavorites';
import { FavoriteMoviesProvider } from './context/FavoriteMoviesContext';

const Layout = () => (
	<>
		<Menu />
		<Outlet />
		<Footer />
	</>
);

const router = createHashRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: 'movies/all',
				element: <Movies />,
			},
			{
				path: '/categories',
				element: <Categories />,
			},
			{
				path: '/favorites',
				element: <MoviesFavorites />,
			},
		],
	},
]);

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<MenuProvider>
			<FavoriteMoviesProvider>
				<RouterProvider router={router} />
			</FavoriteMoviesProvider>
		</MenuProvider>
	</StrictMode>
);
