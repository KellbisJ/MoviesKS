import { Outlet } from 'react-router-dom';
import { Menu } from '../menu';
import { Footer } from '../footer';

const Layout = () => (
	<>
		<Menu />
		<div className="flex-1 min-h-screen mt-16">
			<Outlet />
		</div>
		<Footer />
	</>
);

export { Layout };
