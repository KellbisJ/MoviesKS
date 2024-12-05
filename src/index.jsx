import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider, Outlet } from 'react-router-dom';
import { MenuProvider } from './context/MenuContext';
import { Menu } from './components/Menu';
import { Footer } from './components/Footer';
import { Home } from './routes/Home';
import { MediaMovie } from './routes/MediaMovie';
import { MediaAllMovie } from './routes/MediaAllMovie';
import { MediaPreviewByGenre } from './routes/MediaPreviewByGenre';
import { MediaFavorites } from './routes/MediaFavorites';
import { FavoriteMediaProvider } from './context/FavoriteMediaContext';
import { MediaTV } from './routes/MediaTV';
import { MediaAllTV } from './routes/MediaAllTV';
import { MediaDetail } from './routes/MediaDetail';
import { MediaByCategory } from './routes/MediaByCategory';
import { PageNotFound } from './components/PageNotFound';

const Layout = () => (
	<>
		<Menu />
		<div className="mainContent">
			<Outlet />
		</div>
		<Footer />
	</>
);

const router = createHashRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <PageNotFound />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: '/movies',
				element: <MediaMovie />,
			},
			{
				path: '/movies/all',
				element: <MediaAllMovie />,
			},
			{
				path: '/tv',
				element: <MediaTV />,
			},
			{
				path: '/tv/all',
				element: <MediaAllTV />,
			},
			{
				path: ':type/preview/genre/:id',
				element: <MediaPreviewByGenre />,
			},
			{
				path: ':type/detail/:id',
				element: <MediaDetail />,
			},
			{
				path: ':type/category/:id',
				element: <MediaByCategory />,
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
