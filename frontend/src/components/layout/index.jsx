import { Outlet } from 'react-router-dom';
import { Menu } from '../menu';
import { Footer } from '../footer';

const Layout = () => (
	<main className="flex flex-col min-h-screen bg-stone-100">
		<Menu />
		<div className="flex-1 min-h-screen mt-16 p-6 lg:p-8">
			<Outlet />
		</div>
		<Footer />
	</main>
);

export { Layout };
