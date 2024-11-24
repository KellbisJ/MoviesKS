import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider, Outlet } from 'react-router-dom';
import { MenuProvider } from './context/MenuContext';
import { Menu } from './components/Menu';
import { Footer } from './components/Footer';
import { Home } from './routes/Home';
import { Movies } from './routes/Movies';
import { Categories } from './routes/Categories';
import { MediaFavorites } from './routes/MediaFavorites';
import { FavoriteMediaProvider } from './context/FavoriteMediaContext';

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
				element: <MediaFavorites />,
			},
		],
	},
]);

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<MenuProvider>
			<FavoriteMediaProvider>
				<RouterProvider router={router} />
			</FavoriteMediaProvider>
		</MenuProvider>
	</StrictMode>
);
