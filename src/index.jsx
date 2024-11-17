import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Menu } from './components/Menu';
import { Footer } from './components/Footer';
import { Home } from './Pages/Home';

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
		],
	},
]);

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
